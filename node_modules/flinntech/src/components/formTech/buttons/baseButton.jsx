import InputBaseClass from "../inputBaseClass";

/**
 * BaseButton class extends InputBaseClass to provide foundational functionality for button components.
 * This class handles button-specific interactions, such as click handling, additional setup, and rendering.
 */
export default class BaseButton extends InputBaseClass {
    /**
     * Initializes the BaseButton instance with default state and props.
     * @param {Object} props - Properties passed to the button component.
     */
    constructor(props) {
        super(props);
        this.state.formClass = "FCDefaultButton"; // Sets the default form class for the button.
    }

    /**
     * Handles the button click event.
     * Invokes a buttonClick handler if provided in props or falls back to the default buttonClickFunc.
     * Executes a callback function if provided in props.
     */
    buttonClick() {
        if (this.props.buttonClick) {
            // Call the buttonClick function from props, passing the button's object.
            this.props.buttonClick(this.obj);
        } else {
            // Fallback to the default buttonClickFunc implementation.
            this.buttonClickFunc();
        }

        // Call the callback function from props if it exists.
        if (this.props.callbackFunc) {
            this.props.callbackFunc(this.obj);
        }
    }

    /**
     * Default button click handler.
     * Can be overridden by subclasses to provide specific behavior.
     */
    buttonClickFunc() {
        // No default behavior; meant to be implemented by subclasses if needed.
    }

    /**
     * Sets up additional configurations for the button, such as attaching click events.
     */
    additionalSetup() {
        this.form.setOnClick(this.buttonClick); // Set the button's click event handler.
    }

    /**
     * Generates and returns the HTML for the button.
     * Sets styles, defines the button content, and specifies the structure.
     * @returns {Object} HTML structure for the button.
     */
    getFormHtml() {
        this.form.setStyle({ cursor: "pointer" }); // Set the button's cursor style.
        this.content = this.props.content || (this.content || <>button</>); // Define the button's content.
        return this.form.getHtml({ type: "div", content: this.content }); // Return the HTML representation.
    }
}