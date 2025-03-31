import ThemeFactory from "./themes/themeFactory";
import FormFactory from "./formTypeFactory";
import BaseComponent from "../templateTech/baseClasses/BaseComponent";
import BaseInterface from "../templateTech/baseClasses/interfaceBaseClass";
import InterfaceComponentBaseClass from "../templateTech/baseClasses/interfaceComponentBaseClass";

class FormComponentInterface extends BaseInterface {
    mainFunc=this.getFormComponent;
    
   
   
    /**
     
     * @returns factory for map items
     */
    getFactory() {
        if (this.factory === undefined) {
            this.factory = new FormFactory();
        }
        return this.factory;

    }

    /**
     * 
     * @returns theme factory for map items
     */
    getThemeFactory() {
        if (this.themeFactory === undefined) {
            this.themeFactory = new ThemeFactory();
        }
        return this.themeFactory;
    }

    /**
     * Interface to get forms
     * @param {*} props 
     * @param {*} type 
     * @returns a form by type from the factory
     */
    getFormComponent(props, type) {

        type = type || "input";
        let form = this.factory.getComponent(type, props);
        return form;

    }



}


const formInterface = new FormComponentInterface()

//model
// Base class for form components
class ParentFormComponent extends InterfaceComponentBaseClass {
    /**
     * Initializes the ParentFormComponent.
     * This serves as the base class for various button components.
     * @param {Object} props - The properties passed to the component.
     */
    constructor(props) {
        super(props);
        this.state = {
            type: "input" // Default type for a parent form component
        };
        this.interface = formInterface; // Assigning the form interface
    }
}

/**
 * Represents a button for adding functionality.
 * Extends ParentFormComponent to inherit shared behavior.
 */
class AddButton extends ParentFormComponent {
    constructor(props) {
        super(props);
        this.state = {
            type: "addButton" // Specific type for AddButton
        };
    }
}

/**
 * Represents a generic button with a customizable type.
 * Extends ParentFormComponent to inherit shared behavior.
 */
class Button extends ParentFormComponent {
    constructor(props) {
        super(props);
        this.state = {
            type: props.buttonType || "baseButton" // Default type is "baseButton" unless specified
        };
    }
}

/**
 * Represents a popup button.
 * Extends ParentFormComponent to inherit shared behavior.
 */
class PopupButton extends ParentFormComponent {
    constructor(props) {
        super(props);
        this.state = {
            type: "popupButton" // Specific type for PopupButton
        };
    }
}

/**
 * Represents a button for updating functionality.
 * Extends ParentFormComponent to inherit shared behavior.
 */
class UpdateButton extends ParentFormComponent {
    constructor(props) {
        super(props);
        this.state = {
            type: "updateButton" // Specific type for UpdateButton
        };
    }
}

/**
 * Represents a button for running operations.
 * Extends ParentFormComponent to inherit shared behavior.
 */
class RunButton extends ParentFormComponent {
    constructor(props) {
        super(props);
        this.state = {
            type: "runButton" // Specific type for RunButton
        };
    }
}

/**
 * Represents an upload button.
 * Extends ParentFormComponent to inherit shared behavior.
 * Allows customization of the upload type.
 */
class UploadButton extends ParentFormComponent {
    constructor(props) {
        super(props);
        this.state = {
            type: props.uploadType || "upload" // Default type is "upload" unless specified
        };
    }
}

/**
 * Represents a button for deletion functionality.
 * Extends ParentFormComponent to inherit shared behavior.
 * Allows customization of the deletion type.
 */
class DelButton extends ParentFormComponent {
    constructor(props) {
        super(props);
        this.state = {
            type: props.uploadType || "del" // Default type is "del" unless specified
        };
    }
}

export { ParentFormComponent ,UploadButton, PopupButton, UpdateButton, RunButton, formInterface, FormComponentInterface, AddButton, Button, DelButton }

