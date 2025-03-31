import { Link } from "react-router-dom";
import Card from "../../cardTech/Card";
import BaseComponent from "../baseClasses/BaseComponent";

/**
 * Login Component
 * A React component for rendering a login form.
 * This component extends the `BaseComponent` class and uses pre-defined sub-components
 * (e.g., `container`, `header`, `form`, and `submitButton`) for building the UI.
 */
export default class Login extends BaseComponent {
    constructor(props) {
        super(props);
        // Initialize state with email and password fields.
        this.state = {
            ...this.state,
            email: "",
            password: "",
        };
    }

    /**
     * Validates the login form.
     * This placeholder always returns true but can be extended to include validation logic.
     * @returns {boolean} - Validation result.
     */
    validate() {
        return true;
    }

    /**
     * Handles input changes and updates the state.
     * @param {Event} e - The input change event.
     */
    onChange(e) {
        let { name, value } = e.target;
        this.setState({ [name]: value }); // Dynamically update the state based on input name.
    }

    /**
     * Handles the form submission.
     * If validation passes, it calls the `login` method of the `APIService` with the entered email and password.
     */
    onSub() {
        if (this.validate()) {
            this.APIService.login(this.state.email, this.state.password); // Calls API login with current state.
        }
    }

    /**
     * Returns the JSX for the link to switch to the registration page.
     * @returns {JSX.Element} - Link to the "Sign Up" page.
     */
    getSwitchLink() {
        return (
            <div>
                Don't have an Account? <Link to="/register">Sign Up</Link>
            </div>
        );
    }

    /**
     * Sets up the required sub-components before rendering.
     */
    preSetup() {
        this.setComponents(["container", "header", "form", "submitButton"]);
    }

    /**
     * Returns the JSX for the header element.
     * @returns {JSX.Element} - Header HTML.
     */
    getHeaderHtml() {
        let headerHtml = this.header.getHtml({ type: "h1", content: "Login" });
        return headerHtml;
    }

    /**
     * Returns the JSX for the form element containing email and password inputs.
     * @returns {JSX.Element} - Form HTML.
     */
    getFormHtml() {
        let content = (
            <>
                <div>Email</div>
                <input
                    className="defaultInputFormAuth"
                    name="email"
                    onChange={this.onChange}
                    value={this.state.email} // Corrected the value binding.
                />

                <div style={{ marginTop: "10px" }}>Password</div>
                <input
                    className="defaultInputFormAuth"
                    name="password"
                    type="password"
                    onChange={this.onChange}
                    value={this.state.password} // Corrected the value binding.
                />
            </>
        );

        this.form.setClass("defaultLoginForm"); // Apply a default form class.
        let formHtml = this.form.getHtml({ type: "div", content });
        return formHtml;
    }

    /**
     * Returns the JSX for the submit button element.
     * @returns {JSX.Element} - Submit button HTML.
     */
    getSubmitHtml() {
        this.submitButton.setClass("defaultLoginButton"); // Apply a default button class.
        this.submitButton.setOnClick(this.onSub); // Attach the `onSub` handler to the button.
        let submitHtml = this.submitButton.getHtml({ type: "div", content: "Submit" });
        return submitHtml;
    }

    /**
     * Returns the JSX for the container element, combining header, form, submit button, and switch link.
     * @returns {JSX.Element} - Container HTML.
     */
    getContainerHtml() {
        this.container.setClass(this.props.loginContainer || "fitCC"); // Apply a class to the container.
        let html = (
            <>
                {this.getHeaderHtml()}
                {this.getFormHtml()}
                {this.getSubmitHtml()}
                {this.getSwitchLink()}
            </>
        );
        let containerHtml = this.container.getHtml({ type: "div", content: html });
        return containerHtml;
    }

    /**
     * Returns the full JSX for the login component wrapped in a card layout.
     * @returns {JSX.Element} - Full component HTML.
     */
    getHtml() {
        let html = this.getContainerHtml();

        // Wrap the container HTML inside a card component with layout settings.
        let full = (
            <div className="fullCCLayoutRow">
                <Card type={this.props.loginCardType || "biggerCard"} content={html} />
            </div>
        );

        return full;
    }
}
