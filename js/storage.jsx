

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
        this.updateField = this.updateField.bind(this);
        this.updateTopics = this.updateTopics.bind(this);
        this.updateFormat = this.updateFormat.bind(this);
    }

    updateField(e) {
        this.setState({[e.target.id]: e.target.value});
    }

    updateTopics(e) {
        this.setState({[e.target.id]: e.target.checked})
    }

    updateFormat(e) {
        console.log(e.target.id);
        this.setState({format: e.target.id})
    }

    componentDidUpdate() {
        sessionStorage.setItem('recentProgress', JSON.stringify(this.state))
    }

    componentWillMount() {
        let progress = JSON.parse(sessionStorage.getItem('recentProgress'));
        if(progress !== null) {
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
                            <input onChange={this.updateField} className="validation" id="full_name" type="text" name="person_name"
                                   placeholder="required" value={this.state.full_name} required/>
                                <p className="warn"></p>
                        </div>

                        <div className="clearfix wrap">
                            <label htmlFor="email_address">Email Address</label>
                            <input onChange={this.updateField} className="validation" id="email_address" type="email" name="email"
                                   placeholder="required" value={this.state.email_address} required/>
                                <p className="warn"></p>
                        </div>

                        <div className="clearfix wrap">
                            <label htmlFor="phone_number">Phone Number</label>
                            <input onChange={this.updateField} value={this.state.phone_number} className="validation" id="phone_number" type="tel" name="phone"/>
                                <p className="warn"></p>
                        </div>

                        <div className="clearfix wrap">
                            <label htmlFor="street_address">Street Address</label>
                            <input onChange={this.updateField} value={this.state.street_address} id="street_address" type="text" name="address"/>
                        </div>

                        <div className="clearfix wrap">
                            <label htmlFor="city">City</label>
                            <input onChange={this.updateField} value={this.state.city} id="city" type="text" name="city"/>
                        </div>

                        <div className="clearfix wrap">
                            <label htmlFor="province">Province</label>
                            <select onChange={this.updateField} value={this.state.province} id="province" name="province">
                                <option value="" disabled selected>Select Province</option>
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
                            <input onChange={this.updateField} value={this.state.postal_code} className="validation" id="postal_code" type="text" name="postal_code" maxLength="6"/>
                                <p className="warn"></p>
                        </div>
                    </fieldset>
                    <fieldset className="newsletter">

                        <legend><h2>Newsletter</h2></legend>
                        <p>Select the newsletters you would like to receive:</p>

                        <input onChange={this.updateTopics} checked={this.state.html} id="html" type="checkbox" name="html" value="html_news"/>
                            <label id="kk" htmlFor="html">HTML News</label>
                        <br/>

                        <input onChange={this.updateTopics} checked={this.state.css} id="css" type="checkbox" name="css" value="css_news"/>
                            <label htmlFor="css">CSS News</label>
                        <br/>

                        <input onChange={this.updateTopics} checked={this.state.js} id="js" type="checkbox" name="js" value="js_news"/>
                            <label htmlFor="js">JavaScript News</label>
                        <br/>

                        <input onChange={this.updateTopics} checked={this.state.python} id="python" type="checkbox" name="python" value="python_news"/>
                            <label htmlFor="python">Python News</label>
                        <br/>

                        <input onChange={this.updateTopics} checked={this.state.ruby} id="ruby" type="checkbox" name="ruby" value="ruby_news"/>
                            <label htmlFor="ruby">Ruby News</label>
                        <br/>

                        <p>Newletter format</p>



                        

                        <input onChange={this.updateFormat} checked={this.state.format === "html_format"} id="html_format" type="radio" name="format" value="html_format"/>
                            <label htmlFor="html_format">HTML</label>
                        <br/>

                        <input onChange={this.updateFormat} checked={this.state.format === "plaintext_format"} id="plaintext_format" type="radio" name="format" value="plaintext_format"/>
                            <label htmlFor="plaintext_format">Plaintext</label>
                        <br/>





                        <label htmlFor="other_topics">Other topics you would like to hear about</label><br/>
                            <textarea onChange={this.updateField} value={this.state.other_topics} id="other_topics" name="other_topics"></textarea>
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