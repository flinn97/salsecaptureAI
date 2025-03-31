import BaseComponent from "../templateTech/baseClasses/BaseComponent";
import Card from "../cardTech/Card";

export default class PopupMachine extends BaseComponent {
    /**
     * Constructor initializes the component's state.
     * @param {Object} props - The properties passed to the component.
     */
    constructor(props) {
        super(props); // Calls the parent class constructor to initialize the component
        this.state = {}; // Initialize state (no specific state properties in the constructor)
    }

    /**
     * Checks if the popup switch is active based on the props or app state.
     * @param {boolean} bool - The current state of the popup switch.
     * @returns {boolean} - Updated state indicating whether the popup should be displayed.
     */
    checkPopupSwitch(bool) {
        // Retrieve the popup switch value from props or app state
        this.popupSwitch = this.props.popupSwitch || this.props.app?.state?.popupSwitch;
        
        // If the popup switch is not empty or undefined, set bool to true
        if (this.popupSwitch !== "" && this.popupSwitch !== undefined) {
            bool = true; // Set to true if popupSwitch exists and is not empty
        }
        return bool; // Return the updated boolean value indicating whether to display the popup
    }

    /**
     * Checks if the type of the current popup matches the expected type.
     * @param {boolean} bool - The current state of whether the popup type matches.
     * @returns {boolean} - Updated state indicating if the popup type is correct.
     */
    checkType(bool) {
        // Retrieve the current popup component from props or app state
        let component = this.props.currentPopupComponent || this.props.app?.state?.currentPopupComponent;
        
        // Get the expected component type from the popup factory for the current popup switch
        let type = this.popupFactory.getComponent(this.popupSwitch)?.componentType;

        // If a valid type is found, check if the component matches the expected type
        if (type) {
            // Ensure the component is an array, then check the type of the first element
            component = this.isArray(component);
            bool = component[0]?.getJson()?.type === type && component.length > 0;
        }
        return bool; // Return the updated boolean value indicating if the popup type matches
    }

    /**
     * Renders the popup component if the popup should be displayed.
     * @returns {JSX.Element} - The rendered popup component or null if the popup should not be displayed.
     */
    render() {
        // Initially assume the popup should not be displayed
        let displayPopup = this.checkPopupSwitch(false);
        
        // If the popup switch is active, check if the type of the popup is correct
        if (displayPopup) {
            displayPopup = this.checkType(displayPopup); // Check type compatibility
        }

        // Retrieve the popup factory from props or app state
        this.popupFactory = this.props.factory || this.props.app.state.popupFactory;

        // Get the component for the current popup based on the popup switch value
        let component = this.popupFactory?.getComponent(this.popupSwitch);

        return (
            <>
                {/* If displayPopup is true and the component has content, render the Card component */}
                {displayPopup && component?.content && (
                    <Card
                        content={<component.content />} // Render the content of the popup inside the Card component
                        popup={true} // Indicate that this is a popup Card
                        type={component.popupType || 'biggerCard'} // Set the type of the popup (default to 'biggerCard')
                        theme={component.popupTheme || 'Default'} // Set the theme of the popup (default to 'Default')
                        handleClose={() => {
                            // Handle the close action for the popup
                            if (component.handleClose) {
                                // If the component has a custom close handler, invoke it
                                component.handleClose();
                            } else {
                                // If no custom close handler is provided, perform default close action
                                let currentComponent = this.props.app.state.currentPopupComponent;
                                
                                // Remove the current component from the app state if it exists
                                if (currentComponent) {
                                    this.props.app.state.operationsFactory.removeFromList(currentComponent);
                                }

                                // Dispatch an action to reset the app state (clear currentPopupComponent and popupSwitch)
                                this.props.app.dispatch({
                                    currentPopupComponent: undefined,
                                    popupSwitch: undefined,
                                });
                            }
                        }}
                    />
                )}
            </>
        );
    }
}