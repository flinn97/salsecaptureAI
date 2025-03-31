import InputBaseClass from "../inputBaseClass";
import {mathService} from "../../serviceTech/Util/mathService";

/**
 * DoMathInput extends InputBaseClass to provide functionality for performing mathematical
 * operations based on user input. It listens for the Enter key to trigger calculations
 * and updates the component state accordingly.
 */
export default class DoMathInput extends InputBaseClass {
    /**
     * Initializes the DoMathInput instance.
     * @param {Object} props - Properties passed to the input component.
     */
    constructor(props) {
        super(props);
    }

    /**
     * Lifecycle method invoked after the component is mounted.
     * Adds an event listener to detect keyup events.
     */
    componentDidMount() {
        document.addEventListener("keyup", this.doMath);
    }

    /**
     * Lifecycle method invoked before the component is unmounted.
     * Removes the keyup event listener to avoid memory leaks.
     */
    componentWillUnmount() {
        document.removeEventListener("keyup", this.doMath);
    }

    /**
     * Handles additional changes in the input field.
     * Updates the component's state with the latest value entered by the user.
     * @param {Event} event - The change event triggered by the input field.
     */
    additionalChanges(event) {
        let { name, value } = event.target;
        this.setState({ val: value });
    }

    /**
     * Executes a mathematical operation when the Enter key is pressed.
     * Uses the `mathService` to calculate the result and updates the state of the associated component.
     * @param {KeyboardEvent} e - The keyup event triggered by the user.
     */
    async doMath(e) {
        if (e.key === "Enter" && this.state.val !== undefined) {
            let obj = this.obj[0];
            let math = await mathService.doMath(this.state.val).toString();
            await obj.setCompState({ [this.props.name]: math });
            obj.update();
            await this.setState({ val: undefined });
        }
    }
}