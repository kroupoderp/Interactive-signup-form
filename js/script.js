"use strict";

var _createClass = (function() {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
        }
    }
    return function(Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);
        if (staticProps) defineProperties(Constructor, staticProps);
        return Constructor;
    };
})();

function _defineProperty(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

function _possibleConstructorReturn(self, call) {
    if (!self) {
        throw new ReferenceError(
            "this hasn't been initialised - super() hasn't been called"
        );
    }
    return call && (typeof call === "object" || typeof call === "function")
        ? call
        : self;
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError(
            "Super expression must either be null or a function, not " +
            typeof superClass
        );
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
            value: subClass,
            enumerable: false,
            writable: true,
            configurable: true
        }
    });
    if (superClass)
        Object.setPrototypeOf
            ? Object.setPrototypeOf(subClass, superClass)
            : (subClass.__proto__ = superClass);
}

var initial_state = {
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
    other_topics: ""
};

var Form = (function(_React$Component) {
    _inherits(Form, _React$Component);

    function Form(props) {
        _classCallCheck(this, Form);

        var _this = _possibleConstructorReturn(
            this,
            (Form.__proto__ || Object.getPrototypeOf(Form)).call(this, props)
        );

        _this.state = _this.props.prog;

        _this.updateProgress = _this.updateProgress.bind(_this);
        return _this;
    }

    _createClass(Form, [
        {
            key: "updateProgress",
            value: function updateProgress(e) {
                if (this.supportsLocalStorage()) {
                    if (e.target.type !== "radio" && e.target.type !== "checkbox") {
                        this.setState(_defineProperty({}, e.target.id, e.target.value));
                    } else if (e.target.type === "checkbox") {
                        this.setState(_defineProperty({}, e.target.id, e.target.checked));
                    } else if (e.target.type === "radio") {
                        this.setState({ format: e.target.id });
                    }
                }
            }
        },
        {
            key: "toggleCheck",
            value: function toggleCheck(e) {
                var evt = new Event("input", { bubbles: true });

                if (e.target.tagName === "SPAN") {
                    var input = e.target.previousElementSibling;
                    input.checked = !input.checked;
                    input.dispatchEvent(evt);
                } else if (e.target.tagName === "LABEL") {
                    var _input = e.target.previousElementSibling.previousElementSibling;
                    _input.checked = !_input.checked;
                    _input.dispatchEvent(evt);
                }
            }
        },
        {
            key: "supportsLocalStorage",
            value: function supportsLocalStorage() {
                try {
                    return (
                        "sessionStorage" in window && window["sessionStorage"] !== null
                    );
                } catch (e) {
                    return false;
                }
            }

            // start of component lifecycle methods excluding render
        },
        {
            key: "componentDidUpdate",
            value: function componentDidUpdate() {
                if (this.supportsLocalStorage()) {
                    sessionStorage.setItem("recentProgress", JSON.stringify(this.state));
                }
            }
        },
        {
            key: "componentWillMount",
            value: function componentWillMount() {
                if (this.supportsLocalStorage()) {
                    var progress = JSON.parse(sessionStorage.getItem("recentProgress"));

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
        },
        {
            key: "componentDidMount",
            value: function componentDidMount() {
                var _this2 = this;

                // contains code for validation
                var mistakes = 0;

                var name_format = /^[a-zA-Z\s]+$/i;
                var email_format = /[^@]+@[^@]+\.[a-z]{2,3}$/i;
                var postal_code_format = /\w{6}$/;
                var phone_num_format = /^[0-9]{10,11}$/;

                // contains the fieldset element that will listen for events
                var contact_info = document.getElementsByClassName(
                    "contact_information"
                )[0];

                /* contains the warning paragraphs that initially have no content and are
                     not displayed */
                var alert = document.getElementsByClassName("warn");

                function create_warning(message, i, bool) {
                    alert[i].textContent = message;
                    alert[i].style.display = "block";
                    if (bool) {
                        alert[i].style.display = "none";
                    }
                }

                var inputs = document.querySelectorAll(".validation");
                // form fields that require validation

                function validate(e) {
                    // function runs on focusout and submit
                    mistakes = 0;

                    if (e.target.id === "full_name" || e.type === "submit") {
                        if (inputs[0].value.length === 0) {
                            create_warning("* Please provide a name", 0);
                        } else if (
                            inputs[0].value.search(name_format) &&
                            inputs[0].value.length > 0
                        ) {
                            create_warning("The name can only contain letters and spaces", 0);
                        } else {
                            create_warning("", 0, true);
                        }
                    }
                    if (e.target.id === "email_address" || e.type === "submit") {
                        if (inputs[1].value.length === 0) {
                            create_warning("* Please provide an email", 1);
                        } else if (
                            inputs[1].value.search(email_format) === -1 &&
                            inputs[1].value.length > 0
                        ) {
                            create_warning(
                                "* That does not look like a valid email address",
                                1
                            );
                        } else {
                            create_warning("", 1, true);
                        }
                    }
                    if (e.target.id === "phone_number" || e.type === "submit") {
                        if (
                            inputs[2].value.search(phone_num_format) === -1 &&
                            inputs[2].value.length > 0
                        ) {
                            create_warning(
                                "Not a valid phone number, make sure to include only numbers",
                                2
                            );
                        } else {
                            create_warning("", 2, true);
                        }
                    }
                    if (e.target.id === "postal_code" || e.type === "submit") {
                        if (
                            inputs[3].value.search(postal_code_format) === -1 &&
                            inputs[3].value.length !== 0
                        ) {
                            create_warning("Postal code is invalid", 3);
                        } else {
                            create_warning("", 3, true);
                        }
                    }

                    // removes the input event handler for browser auto fills
                    for (var i = 0; i < inputs.length; i++) {
                        inputs[i].removeEventListener("input", auto_fill);
                    }
                }

                contact_info.addEventListener("focusout", validate);

                // function used by unfocused input fields to validate autofill
                function auto_fill(e) {
                    validate(e);
                }

                // adds the auto fill event handler to all unfocused input fields
                for (var x = 0; x < inputs.length; x++) {
                    inputs[x].addEventListener("focus", function(e) {
                        for (var i = 0; i < inputs.length; i++) {
                            if (inputs[i] !== document.activeElement) {
                                inputs[i].addEventListener("input", auto_fill);
                            }
                        }
                    });
                }

                var message = "Please check the following fields: \n";
                var form = document.getElementsByTagName("form")[0];

                form.addEventListener("submit", function(e) {
                    validate(e);

                    if (alert[0].textContent) {
                        message += "\nFull Name ";
                        mistakes += 1;
                    }
                    if (alert[1].textContent) {
                        message += "\nEmail Address ";
                        mistakes += 1;
                    }
                    if (alert[2].textContent) {
                        message += "\nPhone Number ";
                        mistakes += 1;
                    }
                    if (alert[3].textContent) {
                        message += "\nPostal Code ";
                        mistakes += 1;
                    }

                    if (mistakes > 0) {
                        e.preventDefault();
                        swal({
                            title: "There are errors in this form",
                            text: message,
                            icon: "warning"
                        });
                        message = "Please check the following fields: \n";
                    } else {
                        e.preventDefault();
                        swal({
                            title: "Thank you for signing up",
                            icon: "success"
                        });
                        $(".swal-button").on("click", function() {
                            $("html, body").scrollTop(0);
                            console.log($("form").serialize());
                            sessionStorage.removeItem("recentProgress");
                            _this2.setState({
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
                                other_topics: ""
                            });
                        });
                    }
                });
            }
            // end of component lifecycle methods excluding render
        },
        {
            key: "render",
            value: function render() {
                return React.createElement(
                    "div",
                    null,
                    React.createElement(
                        "header",
                        null,
                        React.createElement(
                            "div",
                            { className: "banner" },
                            React.createElement("h1", null, "The Code review")
                        ),
                        React.createElement(
                            "div",
                            { className: "intro" },
                            React.createElement("h2", null, "Signup for our newsletter"),
                            React.createElement(
                                "p",
                                null,
                                "Get the latest news on how your code is doing right in your inbox."
                            )
                        )
                    ),
                    React.createElement(
                        "main",
                        null,
                        React.createElement("hr", null),
                        React.createElement(
                            "form",
                            { action: "index.html", method: "post", noValidate: true },
                            React.createElement(
                                "fieldset",
                                { className: "contact_information clearfix" },
                                React.createElement(
                                    "legend",
                                    null,
                                    React.createElement("h2", null, "Contact information")
                                ),
                                React.createElement(
                                    "div",
                                    { className: "clearfix wrap" },
                                    React.createElement(
                                        "span",
                                        null,
                                        React.createElement(
                                            "label",
                                            { htmlFor: "full_name" },
                                            "Full Name"
                                        )
                                    ),
                                    React.createElement("input", {
                                        onChange: this.updateProgress,
                                        value: this.state.full_name,
                                        className: "validation",
                                        id: "full_name",
                                        type: "text",
                                        name: "person_name",
                                        placeholder: "required",
                                        required: true
                                    }),
                                    React.createElement("p", { className: "warn" })
                                ),
                                React.createElement(
                                    "div",
                                    { className: "clearfix wrap" },
                                    React.createElement(
                                        "label",
                                        { htmlFor: "email_address" },
                                        "Email Address"
                                    ),
                                    React.createElement("input", {
                                        onChange: this.updateProgress,
                                        value: this.state.email_address,
                                        className: "validation",
                                        id: "email_address",
                                        type: "email",
                                        name: "email",
                                        placeholder: "required",
                                        required: true
                                    }),
                                    React.createElement("p", { className: "warn" })
                                ),
                                React.createElement(
                                    "div",
                                    { className: "clearfix wrap" },
                                    React.createElement(
                                        "label",
                                        { htmlFor: "phone_number" },
                                        "Phone Number"
                                    ),
                                    React.createElement("input", {
                                        onChange: this.updateProgress,
                                        value: this.state.phone_number,
                                        className: "validation",
                                        id: "phone_number",
                                        type: "tel",
                                        name: "phone"
                                    }),
                                    React.createElement("p", { className: "warn" })
                                ),
                                React.createElement(
                                    "div",
                                    { className: "clearfix wrap" },
                                    React.createElement(
                                        "label",
                                        { htmlFor: "street_address" },
                                        "Street Address"
                                    ),
                                    React.createElement("input", {
                                        onChange: this.updateProgress,
                                        value: this.state.street_address,
                                        id: "street_address",
                                        type: "text",
                                        name: "address"
                                    })
                                ),
                                React.createElement(
                                    "div",
                                    { className: "clearfix wrap" },
                                    React.createElement("label", { htmlFor: "city" }, "City"),
                                    React.createElement("input", {
                                        onChange: this.updateProgress,
                                        value: this.state.city,
                                        id: "city",
                                        type: "text",
                                        name: "city"
                                    })
                                ),
                                React.createElement(
                                    "div",
                                    { className: "clearfix wrap" },
                                    React.createElement(
                                        "label",
                                        { htmlFor: "province" },
                                        "Province"
                                    ),
                                    React.createElement(
                                        "select",
                                        {
                                            onChange: this.updateProgress,
                                            value: this.state.province,
                                            id: "province",
                                            name: "province"
                                        },
                                        React.createElement(
                                            "option",
                                            { value: "", disabled: true },
                                            "Select Province"
                                        ),
                                        React.createElement("option", { value: "ON" }, "ON"),
                                        React.createElement("option", { value: "QC" }, "QC"),
                                        React.createElement("option", { value: "BC" }, "BC"),
                                        React.createElement("option", { value: "AB" }, "AB"),
                                        React.createElement("option", { value: "MB" }, "MB"),
                                        React.createElement("option", { value: "SK" }, "SK"),
                                        React.createElement("option", { value: "NS" }, "NS"),
                                        React.createElement("option", { value: "NS" }, "NB"),
                                        React.createElement("option", { value: "NL" }, "NL"),
                                        React.createElement("option", { value: "PE" }, "PE"),
                                        React.createElement("option", { value: "NT" }, "NT"),
                                        React.createElement("option", { value: "YT" }, "YT"),
                                        React.createElement("option", { value: "NU" }, "NU")
                                    ),
                                    React.createElement(
                                        "div",
                                        { className: "trasp" },
                                        React.createElement(
                                            "svg",
                                            {
                                                xmlns: "http://www.w3.org/2000/svg",
                                                viewBox: "0 0 386.257 386.257"
                                            },
                                            React.createElement("path", {
                                                fill: "darkblue",
                                                d: "M0 96.879l193.129 192.5 193.128-192.5z"
                                            })
                                        )
                                    )
                                ),
                                React.createElement(
                                    "div",
                                    { className: "clearfix wrap" },
                                    React.createElement(
                                        "label",
                                        { htmlFor: "postal_code" },
                                        "Postal Code"
                                    ),
                                    React.createElement("input", {
                                        onChange: this.updateProgress,
                                        value: this.state.postal_code,
                                        className: "validation",
                                        id: "postal_code",
                                        type: "text",
                                        name: "postal_code",
                                        maxLength: "6"
                                    }),
                                    React.createElement("p", { className: "warn" })
                                )
                            ),
                            React.createElement(
                                "fieldset",
                                { className: "newsletter" },
                                React.createElement(
                                    "legend",
                                    null,
                                    React.createElement("h2", null, "Newsletter")
                                ),
                                React.createElement(
                                    "p",
                                    null,
                                    "Select the newsletters you would like to receive:"
                                ),
                                React.createElement("input", {
                                    onChange: this.change,
                                    onInput: this.updateProgress,
                                    checked: this.state.html,
                                    id: "html",
                                    type: "checkbox",
                                    name: "html",
                                    value: "html_news"
                                }),
                                React.createElement("span", { onClick: this.toggleCheck }),
                                React.createElement(
                                    "label",
                                    { onClick: this.toggleCheck, id: "kk", htmlFor: "html" },
                                    "HTML News"
                                ),
                                React.createElement("br", null),
                                React.createElement("input", {
                                    onChange: this.change,
                                    onInput: this.updateProgress,
                                    checked: this.state.css,
                                    id: "css",
                                    type: "checkbox",
                                    name: "css",
                                    value: "css_news"
                                }),
                                React.createElement("span", { onClick: this.toggleCheck }),
                                React.createElement(
                                    "label",
                                    { onClick: this.toggleCheck, htmlFor: "css" },
                                    "CSS News"
                                ),
                                React.createElement("br", null),
                                React.createElement("input", {
                                    onChange: this.change,
                                    onInput: this.updateProgress,
                                    checked: this.state.js,
                                    id: "js",
                                    type: "checkbox",
                                    name: "js",
                                    value: "js_news"
                                }),
                                React.createElement("span", { onClick: this.toggleCheck }),
                                React.createElement(
                                    "label",
                                    { onClick: this.toggleCheck, htmlFor: "js" },
                                    "JavaScript News"
                                ),
                                React.createElement("br", null),
                                React.createElement("input", {
                                    onChange: this.change,
                                    onInput: this.updateProgress,
                                    checked: this.state.python,
                                    id: "python",
                                    type: "checkbox",
                                    name: "python",
                                    value: "python_news"
                                }),
                                React.createElement("span", { onClick: this.toggleCheck }),
                                React.createElement(
                                    "label",
                                    { onClick: this.toggleCheck, htmlFor: "python" },
                                    "Python News"
                                ),
                                React.createElement("br", null),
                                React.createElement("input", {
                                    onChange: this.change,
                                    onInput: this.updateProgress,
                                    checked: this.state.ruby,
                                    id: "ruby",
                                    type: "checkbox",
                                    name: "ruby",
                                    value: "ruby_news"
                                }),
                                React.createElement("span", { onClick: this.toggleCheck }),
                                React.createElement(
                                    "label",
                                    { onClick: this.toggleCheck, htmlFor: "ruby" },
                                    "Ruby News"
                                ),
                                React.createElement("br", null),
                                React.createElement(
                                    "p",
                                    { className: "newsletter_format" },
                                    "Newletter format"
                                ),
                                React.createElement("input", {
                                    onChange: this.change,
                                    onInput: this.updateProgress,
                                    checked: this.state.format === "html_format",
                                    id: "html_format",
                                    type: "radio",
                                    name: "format",
                                    value: "html_format"
                                }),
                                React.createElement("span", { onClick: this.toggleCheck }),
                                React.createElement(
                                    "label",
                                    { onClick: this.toggleCheck, htmlFor: "html_format" },
                                    "HTML"
                                ),
                                React.createElement("br", null),
                                React.createElement("input", {
                                    onChange: this.change,
                                    onInput: this.updateProgress,
                                    checked: this.state.format === "plaintext_format",
                                    id: "plaintext_format",
                                    type: "radio",
                                    name: "format",
                                    value: "plaintext_format"
                                }),
                                React.createElement("span", { onClick: this.toggleCheck }),
                                React.createElement(
                                    "label",
                                    { onClick: this.toggleCheck, htmlFor: "plaintext_format" },
                                    "Plaintext"
                                ),
                                React.createElement("br", null),
                                React.createElement(
                                    "label",
                                    { id: "other_topics_label", htmlFor: "other_topics" },
                                    "Other topics you would like to hear about"
                                ),
                                React.createElement("br", null),
                                React.createElement("textarea", {
                                    onChange: this.updateProgress,
                                    value: this.state.other_topics,
                                    id: "other_topics",
                                    name: "other_topics"
                                }),
                                React.createElement("br", null)
                            ),
                            React.createElement("button", { type: "submit" }, "Sign Up")
                        )
                    ),
                    React.createElement(
                        "footer",
                        null,
                        React.createElement("p", null, "\xA9 The Code Review")
                    )
                );
            }
        }
    ]);

    return Form;
})(React.Component);

Form.propTypes = { prog: React.PropTypes.object.isRequired };

ReactDOM.render(
    React.createElement(Form, { prog: initial_state }),
    document.getElementsByClassName("signup")[0]
);