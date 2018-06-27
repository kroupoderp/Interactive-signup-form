

function supportsLocalStorage() {
    try {
        return 'sessionStorage' in window && window['sessionStorage'] !== null;
    } catch(e){
        return false;
    }
}

function getRecentProgress() {
    let progress = sessionStorage.getItem('recentProgress');
    if (progress) {
        return JSON.parse(progress);
    }
    return {
        full_name: "",
        email_address: "",
        phone_number: "",
        street_address: "",
        city: "",
        province: "",
        postal_code: "",
        html: false,
        css: false,
        js: false,
        python: false,
        ruby: false,
        html_format: false,
        plaintext_format: false,
        other_topics: "",
    };
}


let progress = getRecentProgress();

let inputs = document.querySelectorAll('input, select, textarea');
let btns = document.querySelectorAll('input[type="checkbox"], input[type="radio"]');

for(let i = 0; i < inputs.length; i++) {
    if (inputs[i].type !== "radio" && inputs[i].type !== "checkbox") {
        inputs[i].addEventListener('input', function (e) {
            let id = e.target.id;
            progress[id] = e.target.value;
            sessionStorage.setItem('recentProgress', JSON.stringify(progress));
        });
    } else {
        inputs[i].addEventListener('click', function(e) {
            for (let i = 0; i < btns.length; i++) {
                progress[btns[i].id] = btns[i].checked;
            }
            sessionStorage.setItem('recentProgress', JSON.stringify(progress));
        });
    }
}

window.onload = function() {
    if(supportsLocalStorage()) {

        let recentProgress = getRecentProgress();

        for(let y = 0; y < inputs.length; y++) {
            if(inputs[y].type !== "radio" && inputs[y].type !== "checkbox") {
                inputs[y].value = recentProgress[inputs[y].id]
            } else {
                inputs[y].checked = recentProgress[inputs[y].id]
            }
        }
    }
};