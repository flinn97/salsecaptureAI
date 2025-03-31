import Factory from "./factory"; // Import the Factory class for creating and managing components.
import OperationsFactory from "./operationsFactory"; // Import the OperationsFactory class for handling operations logic.
import ComponentList from "./componentsList"; // Import the ComponentList class for managing lists of components.
import {binder} from "../serviceTech/Util/binder"; // Import the binder utility for binding methods to the current class context.
import Auth from "../serviceTech/APITech/auth.service"; // Import the Auth class for managing API service authentication.

export default class ComponentListInterface {
  factory; // Factory instance for managing components.
  updater; // Placeholder for any updater logic (not yet implemented in this class).
  operationsFactory; // OperationsFactory instance for managing operations logic.
  dispatch; // Dispatch function for handling state updates.
  APIService; // API service instance for managing API interactions.

  /**
   * Constructor to initialize the ComponentListInterface.
   * @param {Function} dispatch - Dispatch function for state management.
   * @param {string} endpoint - API endpoint.
   * @param {Object} db - Database instance.
   * @param {Object} storage - Storage instance.
   * @param {Object} auth - Authentication instance.
   */
  constructor(dispatch, endpoint, db, storage, auth) {
    binder.bind(this); // Bind all methods of this class to the current instance.
    this.dispatch = dispatch; // Assign the dispatch function.
    this.getFactory(); // Initialize the factory instance.
    this.getAPIService(endpoint, db, storage, auth, dispatch); // Initialize the API service.
  }

  /**
   * Gets or creates a Factory instance for managing components.
   * @returns {Factory} The Factory instance.
   */
  getFactory() {
    if (this.factory === undefined) {
      this.factory = new Factory(this); // Create a new Factory instance if not already initialized.
    }
    return this.factory;
  }

  /**
   * Gets or creates an API service instance for managing API interactions.
   * @param {string} endpoint - API endpoint.
   * @param {Object} db - Database instance.
   * @param {Object} storage - Storage instance.
   * @param {Object} auth - Authentication instance.
   * @param {Function} dispatch - Dispatch function for state management.
   * @returns {Auth} The API service instance.
   */
  getAPIService(endpoint, db, storage, auth, dispatch) {
    if (this.APIService === undefined) {
      this.APIService = new Auth(endpoint, db, storage, auth, dispatch); // Create a new Auth instance if not already initialized.
    }
    return this.APIService;
  }

  /**
   * Creates a new ComponentList instance.
   * @returns {ComponentList} A new ComponentList instance.
   */
  createComponentList() {
    return new ComponentList(this); // Create and return a new ComponentList instance.
  }

  /**
   * Gets or creates an OperationsFactory instance for managing operations logic.
   * @returns {OperationsFactory} The OperationsFactory instance.
   */
  getOperationsFactory() {
    if (this.operationsFactory === undefined) {
      this.operationsFactory = new OperationsFactory(this); // Create a new OperationsFactory instance if not already initialized.
      this.factory.setOperationsFactory(this.operationsFactory); // Link the OperationsFactory to the Factory instance.
    }
    return this.operationsFactory;
  }

  /**
   * Creates and returns a new OperationsFactory instance.
   * @returns {OperationsFactory} A new OperationsFactory instance.
   */
  getNewOperationsFactory() {
    let opps = new OperationsFactory(this); // Create a new OperationsFactory instance.
    return opps;
  }
}
