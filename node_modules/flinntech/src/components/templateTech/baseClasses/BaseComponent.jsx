
import React, { Component } from 'react';
import BaseObserver from '../observers/baseObserver';
import BuilderObserver from '../observers/builderObserver';
import {binder} from '../../serviceTech/Util/binder';
import { appInterface } from '../appInterface';

/**
 * BaseComponent
 * 
 * This is the base class for React components, providing a foundation for managing component setup, 
 * state, and interactions with the app's global interface. It incorporates observer patterns, 
 * React refs, and initial setup functions to streamline component functionality.
 * 
 * Key Features:
 * - Integration with app-level state and dispatch via the interface.
 * - Observer pattern implementation for dynamic updates.
 * - Automatic React ref creation for component references.
 * - Flexible property and style management for components.
 */
 export default class BaseComponent extends Component {
  resize; // Holds the resize functionality if needed.

  /**
   * Constructor
   * 
   * Initializes the base component, setting up observers, interface connections, 
   * and preparation for component-level property management.
   * 
   * @param {Object} props - The props passed to the component.
   */
  constructor(props) {
    super(props);
    binder.bind(this);
    this.initialBuilderSetupFunctions = [];

    this.setInterface();
    this.setInitialApp();
    this.initialPropsSetupFunctions = [this.setInterface, this.setAppOnInterace, this.setInitialApp, this.setObj, this.setThemeFactory, this.setTheme, this.createReactRefsForComponents];
    this.setupObserver = new BaseObserver();
    this.builderObserver = new BuilderObserver();
    this.ObserverForSetupFunction = new BaseObserver();
    this.builderObserver.setComponent(this);
    this.builderObserver.setObserverFunction(this.setHtmlBuilderSingleton);
    this.initialSetupFunctions = [this.builderObserver.run, this.additionalSetup];
    this.components = [];
  }

  /**
   * setInitialApp
   * 
   * Sets up the app-level state and methods by retrieving them from the interface. 
   * Ensures the component is connected to the global app if available.
   */
  setInitialApp() {
    if (!this.interface) {
      this.app = this.props?.app;
    }
    let app = this.interface.getAppComponent();
    if (app) {
      this.app = app;
    }
    if (this.app) {
      this.propsState = this.app?.state;
      this.dispatch = this.app?.dispatch;
      this.componentList = this.propsState?.componentList;
      this.APIService = this.componentList?.getAPIService();
      this.operationsFactory = this.componentList?.getOperationsFactory();
    }
  }

  /**
   * setInterface
   * 
   * Initializes the interface for the component, defaulting to the app's interface. 
   * If the interface is of type "appInterface", subscribes to the app observer for updates.
   * 
   * @param {Object} [i] - Optional interface object to use.
   */
  setInterface(i) {
    this.interface = i || (this.props?.interface || (this.interface || appInterface));

    if (this.interface.type === "appInterface" && this.subscribeToAppObserverBool === undefined) {
      this.subscribeToAppObserverBool = true;
      this.interface.subscribeToAppObserver(this.setInitialApp);
    }
  }

  /**
   * setAppOnInterace
   * 
   * Assigns the app instance to the interface for global state and functionality propagation.
   */
  setAppOnInterace() {
    if (this.interface) {
      if (this.props.app) {
        this.interface.setAppComponent(this.props.app);
      }
      this.app = this.interface.getAppComponent();
    }
  }

  /**
   * setComponents
   * 
   * Sets the components array for this instance.
   * 
   * @param {Array} c - List of component names.
   */
  setComponents(c) {
    this.components = c;
  }

  /**
   * getComponents
   * 
   * Retrieves the list of components set for this instance.
   * 
   * @returns {Array} - Array of component names.
   */
  getComponents() {
    return this.components;
  }

  /**
   * createReactRefsForComponents
   * 
   * Creates React refs for all components listed in the components array, 
   * enabling easy reference management.
   */
  createReactRefsForComponents() {
    for (let str of this.components) {
      if (!this[str + "Ref"]) {
        this[str + "Ref"] = React.createRef();
      }
    }
  }

  /**
   * createPropObj
   * 
   * Creates a property object for a given component type, including style, class, and event handlers.
   * 
   * @param {String} type - The type of the component (e.g., button, input).
   * @param {String} [objType] - Optional object type to customize the props further.
   * @returns {Object} - The created property object.
   */
  createPropObj(type, objType) {
    objType = objType || this.state.propType;

    let json;
    let className = this[objType || "props"][type + "Class"];
    if (!className) {
      className = this.theme && typeof this.theme !== "string" 
        ? this.theme[this.state[type + "Class"]] 
        : (this["default" + type + "Class"] || "");
    }
    json = {
      name: type,
      ref: this[type + "Ref"],
      style: this[type + "Click"] 
        ? { ...this[objType || "props"][type + "Style"], cursor: "pointer" } 
        : this[objType || "props"][type + "Style"],
      className: className,
      content: this[objType || "props"][type],
      onClick: this[objType || "props"][type + "Click"] || this[type + "Click"],
      obj: this.obj,
    };
    if (json.onClick) {
      json.onClick = json.onClick.bind(this, this.obj);
    }
    return json;
  }

  /**
   * builderPropsSubscribe
   * 
   * Subscribes the props of a component to the builder observer for updates.
   * 
   * @param {String} str - The component's name.
   */
  builderPropsSubscribe(str) {
    this[str + "Props"] = this.createPropObj(str);
    this.builderObserver.subscribe(this[str + "Props"]);
  }

  /**
   * setInitialBuilderPropFunctions
   * 
   * Creates and registers the initial property setup functions for all components.
   * 
   * @returns {Array} - List of initial builder setup functions.
   */
  setInitialBuilderPropFunctions() {
    for (let str of this.components) {
      if (!this["set" + str + "props"]) {
        this["set" + str + "props"] = this.builderPropsSubscribe(str);
      }
      this.initialBuilderSetupFunctions.push(this["set" + str + "props"]);
    }
    return this.initialBuilderSetupFunctions;
  }

  /**
   * loadObserver
   * 
   * Configures the setup observer with the initial setup functions.
   */
  loadObserver() {
    this.setupObserver.setList(this.initialSetupFunctions);
  }

  /**
   * setInitialSetupFunctions
   * 
   * Combines and de-duplicates the initial setup functions from various sources.
   * 
   * @returns {Array} - List of unique initial setup functions.
   */
  setInitialSetupFunctions() {
    const combinedFunctions = [
      ...this.initialPropsSetupFunctions,
      ...this.initialBuilderSetupFunctions,
      ...this.initialSetupFunctions,
      this.additionalPostSetup,
    ];

    // Use a Set to remove duplicates
    const uniqueFunctions = [...new Set(combinedFunctions)];

    this.initialSetupFunctions = uniqueFunctions;

    return this.initialSetupFunctions;
  }

  /**
   * runInitialPropsSetup
   * 
   * Executes all the initial property setup functions defined in the initialPropsSetupFunctions array.
   */
  runInitialPropsSetup() {
    for (let f of this.initialPropsSetupFunctions) {
      if (f) {
        f();
      }
    }
  }


  /**
     * Allows for updating multiple objects with one form.
     * @param {*} obj 
     * @returns 
     */
  isArray(obj) {
    let arr = Array.isArray(obj) ? obj : [obj];
    return arr
  }

    /**
   * setObj
   * 
   * Assigns the `obj` property from the component's props to the class instance.
   * This is used to make the `obj` accessible throughout the component.
   */
     setObj() {
      this.obj = this.props.obj;
    }
  
    /**
     * setThemeFactory
     * 
     * Retrieves the theme factory from the interface, if available. The theme factory is 
     * responsible for providing the themes used across components.
     */
    setThemeFactory() {
      if (this.interface !== undefined) {
        this.themeFactory = this.interface.getThemeFactory();
      }
    }
  
    /**
     * setTheme
     * 
     * Sets the theme for the component using the theme factory. If a theme is specified 
     * in the props, it takes precedence. Otherwise, the default theme from the state 
     * or a "default" theme is applied.
     */
    setTheme() {
      if (this.themeFactory) {
        this.theme = this.themeFactory.getComponent(this.props?.theme || (this.state?.defaultTheme || "default"));
      }
    }
  
    /**
     * clearLists
     * 
     * Clears the lists maintained by the setup observer and the builder observer. 
     * This is useful for resetting or reinitializing the component's setup process.
     */
    clearLists() {
      this.setupObserver.setList([]);
      this.builderObserver.setList([]);
    }
  



  /**
   * need to setup an observer function for thi ssetupItem sometime.
   * @param  {...any} args 
   */
  setupItem(...args) {
    this.clearLists();
    this.preSetup();
    this.runInitialPropsSetup();
    this.setInitialBuilderPropFunctions();
    this.setInitialSetupFunctions();
    this.loadObserver();

    this.setupObserver.run(...args);

  }


    /**
   * preSetup
   * 
   * A placeholder function to be executed before the component setup process begins.
   * This can be overridden in subclasses to include custom pre-setup logic.
   */
     preSetup() { }

     /**
      * setAttribute
      * 
      * Dynamically sets an attribute on the component instance.
      * 
      * @param {string} type - The name of the attribute to set.
      * @param {*} val - The value to assign to the attribute.
      */
     setAttribute(type, val) {
       this[type] = val;
     }
   
     /**
      * setHtmlBuilderSingleton
      * 
      * Ensures that a singleton value is assigned to the component instance. 
      * If the attribute already exists, it will not overwrite it.
      * 
      * @param {string} type - The name of the singleton attribute.
      * @param {*} val - The value to assign if it is not already set.
      */
     setHtmlBuilderSingleton(type, val) {
       if (!this[type]) {
         this[type] = val;
       }
     }
   
     /**
      * getInnerContent
      * 
      * Retrieves the main inner content of the component. This function can 
      * be overridden to provide custom inner content logic.
      * 
      * @returns {*} - The inner content.
      */
     getInnerContent() {
       return this.innerContent;
     }
   
     /**
      * getAdditionalInnerContent
      * 
      * Retrieves additional inner content of the component. Like `getInnerContent`, 
      * this can also be overridden to provide more specific content.
      * 
      * @returns {*} - The additional inner content.
      */
     getAdditionalInnerContent() {
       return this.innerContent;
     }
   
     /**
      * mapList
      * 
      * Filters and maps over a list, removing undefined or false elements, 
      * and wraps the result in a React fragment.
      * 
      * @param {Array} list - The list of elements to process.
      * @returns {React.Fragment} - The processed elements wrapped in a fragment.
      */
     mapList(list) {
       return <>{list.filter(el => el !== undefined && el !== false).map((el) => { return el })}</>;
     }
   
     /**
      * additionalSetup
      * 
      * A placeholder function for any additional setup logic that should 
      * occur after the initial setup functions.
      */
     additionalSetup() { }
   
     /**
      * additionalPostSetup
      * 
      * A placeholder function for additional setup logic to execute after 
      * the main post-setup process.
      */
     additionalPostSetup() { }
   
     /**
      * mapInnerContent
      * 
      * Processes the inner content by retrieving the main and additional content, 
      * mapping them through `mapList`, and assigning the result to `innerContent`.
      * 
      * @returns {*} - The processed inner content.
      */
     mapInnerContent() {
       this.getInnerContent();
       this.getAdditionalInnerContent();
       this.innerContent = this.mapList(this.innerContent);
       return this.innerContent;
     }
   
     /**
      * getHtml
      * 
      * Retrieves the current HTML content of the component.
      * 
      * @returns {*} - The HTML content.
      */
     getHtml() {
       return this.html;
     }
   
     /**
      * getFactoryTypeString
      * 
      * Retrieves the factory type string for a given input string by matching 
      * it to the component list registry.
      * 
      * @param {string} str - The input string to match.
      * @returns {string|undefined} - The matched factory type or undefined if no match is found.
      */
     getFactoryTypeString(str) {
       let list = this.propsState.componentListInterface.getFactory().getRegistry();
       let type = list.find(s => str.toLowerCase() === s);
       type = type || list.find(s => str.toLowerCase().includes(s));
       return type;
     }
   
     /**
      * getCapitalFirstLetter
      * 
      * Capitalizes the first letter of a given string.
      * 
      * @param {string} str - The input string.
      * @returns {string} - The string with its first letter capitalized.
      */
     getCapitalFirstLetter(str) {
       return str?.charAt(0)?.toUpperCase() + str?.slice(1);
     }
   
     /**
      * classNameToString
      * 
      * Converts a class name to a string by lowercasing its first letter.
      * 
      * @param {Function} c - The class whose name is to be converted.
      * @returns {string} - The resulting string.
      */
     classNameToString(c) {
       let className = c.name;
       let str = className.charAt(0).toLowerCase() + className.slice(1);
       return str;
     }
   
     /**
      * render
      * 
      * Sets up the component and renders the HTML content.
      * 
      * @returns {*} - The HTML content of the component.
      */
     render() {
       this.setupItem();
       this.html = this.getHtml();
       return this.html;
     }
   

}

