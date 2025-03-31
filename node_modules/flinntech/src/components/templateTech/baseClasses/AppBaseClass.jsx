
 import { BrowserRouter } from 'react-router-dom';
 import './App.scss';
 import '../../cardTech/layouts.scss'
 import '../../cardTech/page.scss'
 import '../../cardTech/card.scss'
 import '../../cardTech//colors.scss';
 import Router from '../../linkTech/router.jsx';
 import { Navbar, navInterface } from '../../navTech/navInterface.jsx';
 import BaseComponent from './BaseComponent.jsx';
 import ComponentListInterface from '../../componentListNPM/componentListInterface.js';
 import { mapInterface } from '../../mapTech/mapComponentInterface.jsx';
 import {popupCreater} from '../../popupTech/popupCreationInterface.jsx';
 import { formInterface } from '../../formTech/FormComponentsInterface.jsx';
 import { cardInterface } from '../../cardTech/cardInteface.js';
 import { appInterface } from '../appInterface.jsx';
 import BaseRegistry from './baseRegistry.js';
 /**
 * AppBaseClass
 * 
 * This class serves as the foundational base for the application, managing the core application logic, 
 * including routing, user authentication checks, popups, and dynamic component registration. 
 * It integrates various interfaces and utilities to facilitate a modular and scalable app structure.
 * 
 * Key Features:
 * - Dynamic component registration with a factory pattern.
 * - Popup creation and configuration.
 * - User authentication checks during mounting.
 * - Router integration for application navigation.
 * - Global theme and style management.
 */
 class AppBaseClass extends BaseComponent {
  endpoint; // Endpoint for API communication.
  db; // Database instance.
  storage; // Storage instance for file handling.
  auth; // Authentication instance.
  popupComponents; // Predefined popup components.
  popupComponentsProps; // Additional properties for popup components.

  /**
   * Constructor
   * 
   * Initializes the app's core state, component list, and factories. Also processes configuration 
   * and popup components passed via props or other parameters.
   * 
   * @param {Object} props - The props passed to the app component.
   * @param {Object} obj - Configuration object containing app dependencies like endpoint, db, etc.
   * @param {Array} components - List of components to register with the factory.
   */
  constructor(props, obj, components) {
    super(props);
    obj = this.props.config || obj;
    this.popupComponents = this.props.popupComponents;
    this.componentListInterface = new ComponentListInterface(this.dispatch, obj.endpoint, obj.db, obj.storage, obj.auth);
    this.componentList = this.componentListInterface.createComponentList();
    this.factory = this.componentListInterface.getFactory();
    this.operationsFactory = this.componentList.getOperationsFactory();
    this.interfaceRegistry = new BaseRegistry();
    this.initialPropsSetupFunctions = [this.propogateApp, ...this.initialPropsSetupFunctions];

    this.state = {
      componentList: this.componentList,
      componentListInterface: this.componentListInterface,
      operationsFactory: this.operationsFactory,
      factory: this.factory,
      theme: this.props.theme || "default",
      pageClass: this.props.pageClass || "fullScreen",
      pageStyle: this.props.pageStyle,
      extraRouteKey: this.props.extraRouteKey || "extraRoutes",
      navBarProps: this.props.NavBarProps || {},
      popupFactory: popupCreater.getFactory(),
      popups: this.props.popups || [],
      global: this.props.global || {},
      routes: this.props.routes || [],
    };

    if (components) {
      this.registerListWithFactory(components);
    }
  }

  /**
   * checkForUser
   * 
   * Checks if a user is currently logged in and retrieves their details if they are authenticated.
   */
  async checkForUser() {
    let user = await this.APIService.getCurrentUser();

    if (user) {
      let loggedIn = await this.APIService.checkIfLoggedIn();

      if (loggedIn) {
        this.APIService.getuser(user.email);
      }
    }
  }

  /**
   * componentDidMount
   * 
   * Lifecycle method triggered after the component is mounted. Initiates user authentication checks.
   */
  componentDidMount() {
    this.checkForUser();
  }

  /**
   * registerListWithFactory
   * 
   * Registers a list of components with the factory, enabling dynamic component creation.
   * 
   * @param {Array} list - List of components to register.
   */
  registerListWithFactory(list) {
    for (let c of list) {
      let obj = new c();
      let type = obj.getJson().type;
      this.factory.registerComponents({ name: type, component: c });
      this.createPopupDefaultsByType(type);
    }
  }

  /**
   * createPopupDefaultsByType
   * 
   * Creates default popup configurations for a given component type.
   * 
   * @param {String} type - The type of the component for which popups are to be created.
   */
  createPopupDefaultsByType(type) {
    if (this.popupComponents?.[type]) {
      let str = this.getCapitalFirstLetter(type);
      let add = { content: this.popupComponents[type], popupSwitch: "add" + str, componentType: type };
      let update = { ...add, popupSwitch: "update" + str };
      this.state.popups = [...this.state.popups, add, update];
    }
  }

  /**
   * dispatch
   * 
   * Updates the component's state with the provided object.
   * 
   * @param {Object} obj - The object containing state updates.
   */
  dispatch(obj) {
    obj = obj || {};
    this.setState({ ...obj });
  }

  /**
   * setPopups
   * 
   * Registers all configured popups with the popup factory.
   */
  setPopups() {
    for (let obj of this.state.popups) {
      let t = obj.componentType;
      if (t) {
        obj = { ...obj, ...this.popupComponentsProps[t] };
      }
      if (!obj.popupSwitch) {
        obj.popupSwitch = this.classNameToString(obj.content);
      }
      this.state.popupFactory.registerComponent(obj.popupSwitch, obj);
    }
  }

  /**
   * propogateApp
   * 
   * Propagates the app's state and dispatch method to various interfaces, ensuring global availability.
   */
  propogateApp() {
    this.app = { state: this.state, dispatch: this.dispatch.bind(this), ...this.state.global };
    mapInterface.setAppComponent(this.app);
    formInterface.setAppComponent(this.app);
    cardInterface.setAppComponent(this.app);
    navInterface.setAppComponent(this.app);
    appInterface.setAppComponent(this.app);
  }

  /**
   * getHtml
   * 
   * Generates the HTML structure for the application, including the router, navbar, and popups.
   * 
   * @param {Object} Content - Optional content component to render within the app structure.
   * @returns {JSX.Element} The full HTML structure for the app.
   */
  getHtml(Content) {
    this.setPopups();
    let routes = [...this.state.routes];
    if (this.state[this.state.extraRouteKey]) {
      routes = [...routes, ...this.state[this.state.extraRouteKey]];
    }
    return (
      <div className={this.state.pageClass} style={this.state.pageStyle}>
        <BrowserRouter>
          {popupCreater.createPopupMachine({ app: this.app })}
          {this.state.currentUser&&<Navbar {...this.state.navBarProps} />}
          {Content ? <Content.content props={{ ...Content.props }} /> : <></>}
          <Router routes={routes} />
        </BrowserRouter>
      </div>
    );
  }
}

//template tech: global themes that effect everything.
//We should make it so that people can just import a css and it changes all the classes for everything globally.

export default AppBaseClass;
