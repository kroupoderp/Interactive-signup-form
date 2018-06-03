

document.addEventListener('DOMContentLoaded', () => {

    let mistakes = 0;
    // regular expressions
    let email_format = /[^@]+@[^@]+\.[a-z]{2,3}$/i;
    let postal_code_format = /\w{6}$/;
    let phone_num_format = /^[0-9]{10,11}$/;

    let contact_info = document.getElementsByClassName('contact_information')[0];
    let ban = document.getElementsByClassName("warn");

    function create_warning(message, i) {
        ban[i].textContent = message;
        ban[i].style.display = "block";
    }

    contact_info.addEventListener('focusout', function(e) {

        mistakes = 0;
        var val = e.target.value;

        if (e.target.id === "full_name") {
            if (val.length === 0) {
                create_warning("* Please provide a name", 0);
            } else {
                create_warning("", 0);
            }
        }

        if (e.target.id === "email_address") {
            if (val.length === 0) {
                create_warning("* Please provide an email", 1);
            } else if (val.search(email_format) === -1 && val.length > 0) {
                create_warning("* That does not look like a valid email address", 1)
            } else {
                create_warning("", 1);
            }
        }

        if (e.target.id === "phone_number") {
            if (val.search(phone_num_format) === -1 && val.length > 0) {
                create_warning("Not a valid phone number, make sure to include only numbers", 2)
            } else {
                create_warning("", 2);
            }
        }

        if (e.target.id === "postal_code") {
            if (val.search(postal_code_format) === -1 && val.length !== 0) {
                create_warning("Postal code is invalid", 3)
            } else {
                create_warning("", 3);
            }
        }
    });

    let n = document.querySelectorAll('input')[0];
    let el = document.querySelectorAll('input')[1];
    let message = "Please check the following fields: \n";
    let form = document.getElementsByTagName('form')[0];

    form.addEventListener('submit', function(e) {

        if (n.value.length === 0) {
            create_warning("* Please provide a name", 0);
        }
        if (el.value.length === 0) {
            create_warning("* Please provide an email", 1)
        }

        if(ban[0].textContent) {
            message += "\nFull Name ";
            mistakes += 1;
        }
        if(ban[1].textContent) {
            message += "\nEmail Address ";
            mistakes += 1;
        }
        if(ban[2].textContent) {
            message += "\nPhone Number ";
            mistakes += 1;
        }
        if(ban[3].textContent) {
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
