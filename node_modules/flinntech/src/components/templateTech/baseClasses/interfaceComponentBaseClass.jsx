/**
 * InterfaceComponentBaseClass extends the functionality of BaseComponent to provide an interface for 
 * managing and rendering components dynamically with additional customization options.
 * This class is designed to integrate tightly with an application's interface and factory system.
 */
 import BaseComponent from "./BaseComponent";

 export default class InterfaceComponentBaseClass extends BaseComponent {
     addToProps = {}; // Additional properties to merge with the default props.
     addToInitialSetup = []; // Additional setup functions to execute during initialization.
     getterFunc = undefined; // Function to retrieve the component's HTML representation.
 
     /**
      * Constructor to initialize the InterfaceComponentBaseClass instance.
      * Calls the BaseComponent constructor and initializes state.
      */
     constructor() {
         super();
         this.state = {};
     }
 
     /**
      * Retrieves the combined props object for the component, including interface, app, theme, type, 
      * and additional properties from `addToProps`.
      * @returns {Object} - The combined props object.
      */
     getProps() {
         let props = { 
             interface: this.interface, 
             app: this.app, 
             theme: this.props.theme, 
             type: this.props.type, 
             ...this.props, 
             ...this.addToProps 
         };
         return props;
     }
 
     /**
      * Sets the component list by retrieving it from the interface.
      * This method is typically called during the setup process.
      */
     setComponentList() {
         this.componentList = this.interface?.getComponentList();
     }
 
     /**
      * Placeholder for setting additional props. Can be overridden or expanded.
      */
     setProps() {}
 
     /**
      * Retrieves the HTML representation of the component.
      * This method prepares props, sets the getter function, and calls it to generate the HTML.
      * @returns {JSX.Element} - The rendered HTML.
      */
     getHtml() {
         this.setProps();
         let props = this.getProps();
         this.setGetterFunc(this.props.getterFunc);
 
         if (this.getterFunc) {
             this.html = this.getterFunc({ ...props }, props.type || this.state.type);
         }
         return <>{this.html}</>;
     }
 
     /**
      * Sets the getter function for generating the HTML. 
      * Defaults to `getterFunc` passed in props, or the interface's main function, if available.
      * @param {Function} f - The function to set as the getter.
      */
     setGetterFunc(f) {
         this.getterFunc = f || (this.interface.getMainFunc() || this.getterFunc);
     }
 
     /**
      * Adds components to the factory if `addToFactory` is specified in the props.
      * This registers the specified components in the interface's factory.
      */
     addToFactory() {
         if (this.props.addToFactory) {
             let factory = this.interface.getFactory();
             for (let obj of this.props.addToFactory) {
                 factory.registerComponent(obj.type, obj.comp);
             }
         }
     }
 
     /**
      * Performs pre-setup tasks by preparing the component's setup functions.
      * This method combines custom setup functions with default ones.
      */
     preSetup() {
         this.componentPreSetup();
         this.initialSetupFunctions = [
             ...this.initialSetupFunctions, 
             this.setComponentList, 
             this.addToFactory, 
             ...this.addToInitialSetup
         ];
     }
 
     /**
      * Placeholder for additional pre-setup tasks. Can be overridden in subclasses.
      */
     componentPreSetup() {}
 }
 