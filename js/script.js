

document.addEventListener('DOMContentLoaded', () => {

    let mistakes = 0;

    let email_format = /[^@]+@[^@]+\.[a-z]{2,3}$/i;
    let postal_code_format = /\w{6}$/;
    let phone_num_format = /^[0-9]{10,11}$/;

    // contains the fieldset element that will listen for events
    let contact_info = document.getElementsByClassName('contact_information')[0];
    
    /* contains the warning paragraphs that initially have no content and are
     not displayed */
    let alert = document.getElementsByClassName("warn");

    function create_warning(message, i, bool) {
        alert[i].textContent = message;
        alert[i].style.display = "block";
        if(bool) {
            alert[i].style.display = "none";
        }
    }

    let inputs = document.querySelectorAll('.validation');

    function validate(e) {
        mistakes = 0;

        if (e.target.id === "full_name" || e.type === "submit") {
            // instead of val use the inputs object
            if (inputs[0].value.length === 0) {
                create_warning("* Please provide a name", 0);
            } else {
                create_warning("", 0, true);
            }
        }
        if (e.target.id === "email_address" || e.type === "submit") {
            if (inputs[1].value.length === 0) {
                create_warning("* Please provide an email", 1);
            } else if (inputs[1].value.search(email_format) === -1
                && inputs[1].value.length > 0) {
                create_warning("* That does not look like a valid email address", 1)
            } else {
                create_warning("", 1, true);
            }
        }
        if (e.target.id === "phone_number" || e.type === "submit") {
            if (inputs[2].value.search(phone_num_format) === -1
                && inputs[2].value.length > 0) {
                create_warning("Not a valid phone number, make sure to include only numbers", 2)
            } else {
                create_warning("", 2, true);
            }
        }
        if (e.target.id === "postal_code" || e.type === "submit") {
            if (inputs[3].value.search(postal_code_format) === -1
                && inputs[3].value.length !== 0) {
                create_warning("Postal code is invalid", 3)
            } else {
                create_warning("", 3, true);
            }
        }

        for(let i = 0; i < inputs.length; i++) {
            inputs[i].removeEventListener('input', auto_fill);
        }
    }

    contact_info.addEventListener('focusout', validate);

    function auto_fill(e) {
        validate(e);
    }

    for(let x = 0; x < inputs.length; x++) {
        inputs[x].addEventListener('focus', function(e) {
            for(let i = 0; i < inputs.length; i++) {
                if(inputs[i] !== document.activeElement) {
                    inputs[i].addEventListener('input', auto_fill);
                }
            }
        });
    }

    let message = "Please check the following fields: \n";
    let form = document.getElementsByTagName('form')[0];

    form.addEventListener('submit', function(e) {
        validate(e);

        if(alert[0].textContent) {
            message += "\nFull Name ";
            mistakes += 1;
        }
        if(alert[1].textContent) {
            message += "\nEmail Address ";
            mistakes += 1;
        }
        if(alert[2].textContent) {
            message += "\nPhone Number ";
            mistakes += 1;
        }
        if(alert[3].textContent) {
            message += "\nPostal Code ";
            mistakes += 1;
        }

        if(mistakes > 0) {
            e.preventDefault();
            swal({
              title: "There are errors in this form",
              text: message,
              icon: "warning"
            });
            message = "Please check the following fields: \n";
        }   else {
              e.preventDefault();
              swal({
                title: "Thank you for signing up",
                icon: "success"
              });
              $('.swal-button').on('click', () => {
                $('html, body').scrollTop(0);
                form.reset();
              });
        }
    });
});