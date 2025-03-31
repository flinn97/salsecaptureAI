import {binder} from "../serviceTech/Util/binder";
import OperationsObserver from "./operationsObserver";

// import authService from "../services/auth.service";
export default class OperationsFactory {
    /**
     * A factory class to manage the preparation and registration of components.
     * Handles operations such as adding, removing, and running components, as well as observing these operations.
     * @param {Object} componentListInterface - Interface for interacting with the component list.
     */
    register;
    factory;
    operationsObserver;

    constructor(componentListInterface) {
        binder.bind(this); // Bind context to all methods.
        this.add = []; // List of components being prepared for addition.
        this.lastChange = []; // Tracks the last set of changes made.
        this.factory = componentListInterface.getFactory(); // Component factory.
        this.operationsObserver = new OperationsObserver(); // Observer for operations.
    }

    /**
     * Removes a specific component from the `add` list.
     * @param {Object} comp - The component to remove.
     */
    removeFromList(comp) {
        this.add = this.add.filter(obj => obj !== comp);
    }

    /**
     * Retrieves the operations observer instance.
     * @returns {OperationsObserver} - The operations observer.
     */
    getOperationsObserver() {
        return this.operationsObserver;
    }

    /**
     * Sets a custom operations observer.
     * @param {OperationsObserver} o - The new operations observer.
     */
    setOperationsObserver(o) {
        this.operationsObserver = o;
    }

    /**
     * Subscribes a function to the operations observer.
     * Optionally clears existing subscriptions.
     * @param {Function} f - The function to subscribe.
     * @param {Boolean} clean - If true, clear existing subscriptions before subscribing.
     */
    subscribeToOperations(f, clean) {
        if (clean) {
            this.operationsObserver.clear();
        }
        this.operationsObserver.subscribe(f);
    }

    /**
     * Runs all subscribed functions in the operations observer.
     * @param {...any} args - Arguments to pass to the subscribed functions.
     */
    runOperations(...args) {
        this.operationsObserver.run(...args);
    }

    /**
     * Sets the `add` list and updates the last changes.
     * @param {Array} addList - The new list of components to be added.
     */
    setAddList(addList) {
        this.add = [...addList];
        this.lastChange = [...this.add];
    }

    /**
     * Retrieves the current `add` list.
     * @returns {Array} - The list of components being prepared for addition.
     */
    getAddList() {
        return this.add;
    }

    /**
     * Retrieves the most recent set of prepared components.
     * @returns {Array} - The last prepared components.
     */
    getLastPrepare() {
        return this.lastChange;
    }
    /**
 * Prepare one to many objects based upon JSON sent.
 * Params are {json: {your json}, amount:int} or an array of multiple of those
 * @param {*} obj 
 * @returns add list The updated register with the last changes.
 */
     async prepare(obj, callback) {
        
        let { prepare, amount, clean } = obj;
        amount = amount || 1;
        let arr = Array.isArray(prepare) ? prepare : [prepare];
        arr = arr.flatMap(json => Array(amount).fill(json));
    
        // Use Promise.all to wait for all promises to resolve
        let newArr = []
        for(let json of arr){
            let comp = await this.factory.getComponent({...json})
            newArr.push(comp);

        }
        arr =[...newArr];
        // arr = await Promise.all(arr.map(json => this.factory.getComponent({ ...json })));
    
        this.setAddList(clean ? [...arr] : [...this.add, ...arr]);
        if(callback){
            callback(this.add);
        }
        if(obj.run){
            
            await this.addToComponentList();
        }
        return this.add;
    }

    /**
     * Clears the `add` list and resets the last changes.
     */
    clear() {
        this.setAddList([]);
    }

    /**
     * Removes a specific component from the `add` list.
     * @param {Object} obj - The component to remove.
     */
    removeFromRegister(obj) {
        this.setAddList(this.add.filter(component => component !== obj));
    }

    /**
     * Runs the process of adding components to the component list.
     * Optionally skips backend updates.
     * @param {Boolean} skipBackendUpdate - If true, skip updates to the backend.
     */
    run(skipBackendUpdate) {
        this.addToComponentList(skipBackendUpdate);
    }

    /**
     * Adds the components in the `add` list to the component list and clears the `add` list.
     * @param {Boolean} skipBackendUpdate - If true, skip updates to the backend.
     * @returns {Array} - The list of components that were added.
     */
    addToComponentList(skipBackendUpdate) {
        let comps = [...this.add];
        this.clear(); // Clear the `add` list after transferring components.
        this.register(comps, { skipBackendUpdate: skipBackendUpdate }); // Register the components.
        return comps;
    }

    /**
     * Sets the registration function for the factory.
     * @param {Function} r - The registration function.
     */
    setRegister(r) {
        this.register = r;
    }
}
/**
 * Provides a way to subscribe to the preparation process.
 */