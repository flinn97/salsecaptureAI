/**
 * BaseInterface is a foundational class that provides an interface for managing application components, themes, and observers.
 * It acts as a central hub for managing the application's main functionality, component list, and dynamic updates.
 */
 import {binder} from "../../serviceTech/Util/binder";
 import BaseObserver from "../observers/baseObserver";
 
 class BaseInterface {
     factory;
     componentList;
     themeFactory;
     appComponent;
     mainFunc;
     appObserver = new BaseObserver();
 
     /**
      * Constructor to initialize the BaseInterface instance.
      * It binds the class context and initializes factories and the observer.
      */
     constructor() {
         binder.bind(this);
         this.getFactory();
         this.getThemeFactory();
     }
 
     /**
      * Subscribes a function to the app observer.
      * @param {Function} func - The function to subscribe.
      */
     subscribeToAppObserver(func) {
         this.appObserver.subscribe(func);
     }
 
     /**
      * Retrieves the main function of the application.
      * @returns {Function} - The main function.
      */
     getMainFunc() {
         return this.mainFunc;
     }
 
     /**
      * Retrieves the factory for managing components or functionality.
      * To be implemented by subclasses.
      */
     getFactory() {}
 
     /**
      * Retrieves the theme factory for managing application themes.
      * To be implemented by subclasses.
      */
     getThemeFactory() {}
 
     /**
      * Retrieves the main application component.
      * @returns {Object} - The main application component.
      */
     getAppComponent() {
         return this.appComponent;
     }
 
     /**
      * Sets the main application component and notifies observers of the update.
      * @param {Object} APP - The main application component.
      */
     setAppComponent(APP) {
         this.appComponent = APP;
         this.appObserver.run(APP);
     }
 
     /**
      * Retrieves the list of components from the application state.
      * If the list is not already available, it attempts to extract it from the app component's state.
      * @returns {Array|undefined} - The list of components.
      */
     getComponentList() {
         if (!this.componentList) {
             this.componentList = this.appComponent?.state?.componentList;
         }
         return this.componentList;
     }
 }
 
 export default BaseInterface;
 