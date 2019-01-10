import React from 'react';
import swal from 'sweetalert';
import $ from 'jquery';

export default class Form extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
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
            format: "",
            other_topics: "",
            submitting: false,
        };

        this.updateProgress = this.updateProgress.bind(this);
    }

    updateProgress(e) {

        if(this.supportsLocalStorage()) {

            if(e.target.type !== "radio" && e.target.type !== "checkbox") {
                this.setState({[e.target.id]: e.target.value})

            }   else if (e.target.type === "checkbox") {
                    this.setState({[e.target.id]: e.target.checked})

            }   else if (e.target.type === "radio"){
                    this.setState({format: e.target.id})
            }
        }
    }

    toggleCheck(e) {

        let evt = new Event('input', {bubbles: true});

        if(e.target.tagName === "SPAN") {

            let input = e.target.previousElementSibling;
            input.checked = !input.checked;
            input.dispatchEvent(evt);
        }
            else if (e.target.tagName === "LABEL") {

                let input = e.target.previousElementSibling.previousElementSibling;
                input.checked = !input.checked;
                input.dispatchEvent(evt);
        }
    }

    supportsLocalStorage() {
        try {
            return 'sessionStorage' in window && window['sessionStorage'] !== null;
        } catch(e){
            return false;
        }
    }

    // start of component lifecycle methods excluding render
    componentDidUpdate() {
        if(this.supportsLocalStorage()) {
            sessionStorage.setItem('recentProgress', JSON.stringify(this.state))
        }
    }

    componentWillMount() {

        if(this.supportsLocalStorage()) {
            let progress = JSON.parse(sessionStorage.getItem('recentProgress'));

            if (progress !== null) {
                for (let x in this.state) {     // x represents the field
                    if (this.state[x] !== "submitting") {
                        this.state[x] = progress[x]
                    }
                }
            }
        }

    }

    reset() {
        this.setState({
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
            format: "",
            other_topics: "",
        })
    }

    loadAnimation(boolean) {
        if (boolean) {
            this.setState({
                submitting: true
            })
        } else {
            this.setState({
                submitting: false
            })
        }
    }

    componentDidMount() {

        let reset = this.reset.bind(this);
        let animate = this.loadAnimation.bind(this);

        // contains code for validation
        let mistakes = 0;

        let name_format = /^[a-zA-Z\s]+$/i;
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
        // form fields that require validation

        function validate(e) {      // function runs on focusout and submit
            mistakes = 0;

            if (e.target.id === "full_name" || e.type === "submit") {
                if (inputs[0].value.length === 0) {
                    create_warning("* Please provide a name", 0);
                }   else if(inputs[0].value.search(name_format)
                        && inputs[0].value.length > 0) {
                        create_warning("The name can only contain letters and spaces", 0)
                }   else {
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

            // removes the input event handler for browser auto fills
            for(let i = 0; i < inputs.length; i++) {
                inputs[i].removeEventListener('input', auto_fill);
            }
        }

        contact_info.addEventListener('focusout', validate);


        // function used by unfocused input fields to validate autofill
        function auto_fill(e) {
            validate(e);
        }

        // adds the auto fill event handler to all unfocused input fields
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

        form.addEventListener('submit', e => {
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
                animate(true);
                window.setTimeout(function() {
                    animate(false)
                    swal({
                        title: "Thank you for signing up",
                        icon: "success",
                        closeOnClickOutside: false,
                    });
                    $('.swal-button').on('click', () => {
                        $('html, body').scrollTop(0);
                        console.log($("form").serialize());
                        sessionStorage.removeItem('recentProgress');
                        reset()
                    });
                }, 2000);
            }
        });
    }
    // end of component lifecycle methods excluding render


    render() {
        return (
            <React.Fragment>
                <header>
                    <div className="banner">
                        <h1>The Code review</h1>
                    </div>

                    <div className="intro">
                        <h2>Signup for our newsletter</h2>
                        <p>Get the latest news on how your code is doing right in your inbox.</p>
                    </div>
                </header>
                <main>
                    <hr/>
                    <form action="" method="post" noValidate>
                    <fieldset className="contact_information clearfix">
                        <legend><h2>Contact information</h2></legend>

                        <div className="clearfix wrap">
                            <span><label htmlFor="full_name">Full Name</label></span>
                            <input onChange={this.updateProgress} value={this.state.full_name}
                                   className="validation" id="full_name" type="text" name="person_name"
                                   placeholder="required" required/>
                               <p className="warn"></p>
                        </div>

                        <div className="clearfix wrap">
                            <label htmlFor="email_address">Email Address</label>
                            <input onChange={this.updateProgress} value={this.state.email_address}
                                   className="validation" id="email_address" type="email" name="email"
                                   placeholder="required" required/>
                                <p className="warn"></p>
                        </div>

                        <div className="clearfix wrap">
                            <label htmlFor="phone_number">Phone Number</label>
                            <input onChange={this.updateProgress} value={this.state.phone_number}
                                   className="validation" id="phone_number" type="tel" name="phone"/>
                                <p className="warn"></p>
                        </div>

                        <div className="clearfix wrap">
                            <label htmlFor="street_address">Street Address</label>
                            <input onChange={this.updateProgress} value={this.state.street_address}
                                   id="street_address" type="text" name="address"/>
                        </div>

                        <div className="clearfix wrap">
                            <label htmlFor="city">City</label>
                            <input onChange={this.updateProgress} value={this.state.city}
                                   id="city" type="text" name="city"/>
                        </div>

                        <div className="clearfix wrap">
                            <label htmlFor="province">Province</label>
                            <select onChange={this.updateProgress} value={this.state.province}
                                    id="province" name="province">
                                <option value="" disabled>Select Province</option>
                                <option value="ON">ON</option>
                                <option value="QC">QC</option>
                                <option value="BC">BC</option>
                                <option value="AB">AB</option>
                                <option value="MB">MB</option>
                                <option value="SK">SK</option>
                                <option value="NS">NS</option>
                                <option value="NS">NB</option>
                                <option value="NL">NL</option>
                                <option value="PE">PE</option>
                                <option value="NT">NT</option>
                                <option value="YT">YT</option>
                                <option value="NU">NU</option>
                            </select>

                            <div className="trasp">
                                <svg id="dropdownArrow"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 386.257 386.257">
                                    <path fill="darkblue" d="M0 96.879l193.129 192.5 193.128-192.5z"/>
                                </svg>
                            </div>

                        </div>

                        <div className="clearfix wrap">
                            <label htmlFor="postal_code">Postal Code</label>
                            <input onChange={this.updateProgress} value={this.state.postal_code}
                                   className="validation" id="postal_code" type="text" name="postal_code" maxLength="6"/>
                                <p className="warn"></p>
                        </div>
                    </fieldset>
                    <fieldset className="newsletter">

                        <legend><h2>Newsletter</h2></legend>
                        <p>Select the newsletters you would like to receive:</p>

                        <input onChange={this.change} onInput={this.updateProgress} checked={this.state.html}
                               id="html" type="checkbox" name="html" value="html_news"/>
                        <span onClick={this.toggleCheck}></span>
                            <label onClick={this.toggleCheck} id="kk" htmlFor="html">HTML News</label>
                        <br/>

                        <input onChange={this.change} onInput={this.updateProgress} checked={this.state.css}
                               id="css" type="checkbox" name="css" value="css_news"/>
                        <span onClick={this.toggleCheck}></span>
                            <label onClick={this.toggleCheck} htmlFor="css">CSS News</label>
                        <br/>

                        <input onChange={this.change} onInput={this.updateProgress} checked={this.state.js}
                               id="js" type="checkbox" name="js" value="js_news"/>
                        <span onClick={this.toggleCheck}></span>
                            <label onClick={this.toggleCheck} htmlFor="js">JavaScript News</label>
                        <br/>

                        <input onChange={this.change} onInput={this.updateProgress} checked={this.state.python}
                               id="python" type="checkbox" name="python" value="python_news"/>
                        <span onClick={this.toggleCheck}></span>
                            <label onClick={this.toggleCheck} htmlFor="python">Python News</label>
                        <br/>

                        <input onChange={this.change} onInput={this.updateProgress} checked={this.state.ruby}
                               id="ruby" type="checkbox" name="ruby" value="ruby_news"/>
                        <span onClick={this.toggleCheck}></span>
                            <label onClick={this.toggleCheck} htmlFor="ruby">Ruby News</label>

                        <br/>

                        <p className="newsletter_format">Newletter format</p>

                        <input onChange={this.change} onInput={this.updateProgress} checked={this.state.format === "html_format"}
                               id="html_format" type="radio" name="format" value="html_format"/>
                        <span onClick={this.toggleCheck}></span>
                            <label onClick={this.toggleCheck} htmlFor="html_format">HTML</label>
                        <br/>

                        <input onChange={this.change} onInput={this.updateProgress} checked={this.state.format === "plaintext_format"}
                               id="plaintext_format" type="radio" name="format" value="plaintext_format"/>
                        <span onClick={this.toggleCheck}></span>
                            <label onClick={this.toggleCheck} htmlFor="plaintext_format">Plaintext</label>
                        <br/>

                        <label id="other_topics_label" htmlFor="other_topics">Other topics you would like to hear about</label><br/>
                            <textarea onChange={this.updateProgress} value={this.state.other_topics}
                               id="other_topics" name="other_topics"></textarea>
                        <br/>

                    </fieldset>
                    {this.state.submitting ? 
                    <button id="submitButton" type="submit">
                        <svg id="loadingIcon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 16 16">
                            <path fill="white" d="M9.9.2l-.2 1C12.7 2 15 4.7 15 8c0 3.9-3.1 7-7 7s-7-3.1-7-7c0-3.3 2.3-6 5.3-6.8l-.2-1C2.6 1.1 0 4.3 0 8c0 4.4 3.6 8 8 8s8-3.6 8-8c0-3.7-2.6-6.9-6.1-7.8z"/>
                        </svg>
                    </button>
                        : <button id="submitButton" type="submit">Sign Up</button>}
                </form>
                </main>
                <footer>
                    <p>&copy; The Code Review</p>
                </footer>
            </React.Fragment>
        )
    }
}