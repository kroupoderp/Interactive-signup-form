

class Form extends React.Component {

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
                this.state.full_name = progress.full_name;
                this.state.email_address = progress.email_address;
                this.state.phone_number = progress.phone_number;
                this.state.street_address = progress.street_address;
                this.state.city = progress.city;
                this.state.province = progress.province;
                this.state.postal_code = progress.postal_code;
                this.state.html = progress.html;
                this.state.css = progress.css;
                this.state.js = progress.js;
                this.state.python = progress.python;
                this.state.ruby = progress.ruby;
                this.state.html_format = progress.html_format;
                this.state.format = progress.format;
                this.state.other_topics = progress.other_topics;
            }
        }

    }

    componentDidMount() {           // contains code for validation
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
                swal({
                    title: "Thank you for signing up",
                    icon: "success"
                });
                $('.swal-button').on('click', () => {
                    $('html, body').scrollTop(0);
                    sessionStorage.removeItem('recentProgress')
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
                });
            }
        });
    }
    // end of component lifecycle methods excluding render


    render() {
        return (
            <div>
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
                    <form action="index.html" method="post" noValidate>
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
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 386.257 386.257">
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

                        <input onChange={this.updateProgress} checked={this.state.html}
                               id="html" type="checkbox" name="html" value="html_news"/>
                            <label id="kk" htmlFor="html">HTML News</label>
                        <br/>

                        <input onChange={this.updateProgress} checked={this.state.css}
                               id="css" type="checkbox" name="css" value="css_news"/>
                            <label htmlFor="css">CSS News</label>
                        <br/>

                        <input onChange={this.updateProgress} checked={this.state.js}
                               id="js" type="checkbox" name="js" value="js_news"/>
                            <label htmlFor="js">JavaScript News</label>
                        <br/>

                        <input onChange={this.updateProgress} checked={this.state.python}
                               id="python" type="checkbox" name="python" value="python_news"/>
                            <label htmlFor="python">Python News</label>
                        <br/>

                        <input onChange={this.updateProgress} checked={this.state.ruby}
                               id="ruby" type="checkbox" name="ruby" value="ruby_news"/>
                            <label htmlFor="ruby">Ruby News</label>
                        <br/>

                        <p>Newletter format</p>

                        <input onChange={this.updateProgress} checked={this.state.format === "html_format"}
                               id="html_format" type="radio" name="format" value="html_format"/>
                            <label htmlFor="html_format">HTML</label>
                        <br/>

                        <input onChange={this.updateProgress} checked={this.state.format === "plaintext_format"}
                               id="plaintext_format" type="radio" name="format" value="plaintext_format"/>
                            <label htmlFor="plaintext_format">Plaintext</label>
                        <br/>

                        <label htmlFor="other_topics">Other topics you would like to hear about</label><br/>
                            <textarea onChange={this.updateProgress} value={this.state.other_topics}
                               id="other_topics" name="other_topics"></textarea>
                        <br/>

                    </fieldset>
                    <button type="submit">Sign Up</button>
                </form>
                </main>
                <footer>
                    <p>&copy; The Code Review</p>
                </footer>
            </div>
        )
    }
}

ReactDOM.render(<Form/>, document.getElementsByClassName('signup')[0]);