import {binder} from "../serviceTech/Util/binder";

/**
 * BaseClass provides foundational functionality and structure for derived classes,
 * including operations, API service integration, state management, and component interaction.
 */
export default class BaseClass {
  // Class properties
  operationsFactory;
  dispatch;
  json = {
    _id: "",
    backendKeys: [],
    backendAttributes: [],
    backendFilterKeys: [],
    orderMatters: false,
    orderFilterKey: "",
    filterKey: "",
    removeOwnerQuery: [],
  };
  componentList;
  APIService;

  /**
   * Constructor initializes the BaseClass with an operations factory and binds methods.
   * @param {Object} oppsFactory - The operations factory used for managing operations.
   */
  constructor(oppsFactory) {
    binder.bind(this); // Binds all class methods to ensure proper `this` context.
    this.operationsFactory = oppsFactory;
    this.json._id = this.createId(); // Generates a unique ID for the instance.
  }

  /**
   * Helper function to determine the attribute and filter key for associated items.
   * @param {number} index - The index for backend attributes and filter keys.
   * @returns {Object} Object containing `attribute` and `filterKey`.
   */
  getAssociatedItemsHelper(index) {
    let attribute = this.json._id;
    let filterKey = this.json.type + "Id";
    if (this.json.backendAttributes.length > 0) {
      attribute = this.json[this.json.backendAttributes[index]];
    }
    if (this.json.backendFilterKeys.length > 0) {
      filterKey = this.json.backendFilterKeys[index];
    }
    return { attribute, filterKey };
  }

  /**
   * Fetches associated items for the provided item types using the component list.
   * If no item types are provided, it uses `backendKeys`.
   * @param {Array} itemTypes - The item types to fetch.
   * @returns {Promise<Array>} A promise resolving to the associated items.
   */
  async getAssociatedItems(itemTypes) {
    itemTypes = itemTypes || this.json.backendKeys;
    const promises = itemTypes?.map((item, index) => {
      let { attribute, filterKey } = this.getAssociatedItemsHelper(index);
      return this.componentList.getList(item, attribute, filterKey);
    });
    return await Promise.all(promises);
  }

  /**
   * Fetches associated items directly from the backend for the provided item types.
   * @param {Array} itemTypes - The item types to fetch.
   * @param {Object} listReq - Additional request parameters.
   * @returns {Promise<Array>} A promise resolving to the associated backend items.
   */
  async getAssociatedItemsFromBackend(itemTypes, listReq) {
    itemTypes = itemTypes || this.json.backendKeys;
    let owner = true;

    const promises = itemTypes?.map((item, index) => {
      if (this.json.removeOwnerQuery.includes(item)) {
        owner = false;
      }
      let { attribute, filterKey } = this.getAssociatedItemsHelper(index);
      return this.componentList.getComponentsFromBackend({
        type: item,
        ids: attribute,
        filterKeys: filterKey,
        owner: owner,
        ...listReq,
      });
    });
    return await Promise.all(promises);
  }

  /**
   * Sets the component list for the instance and initializes API and dispatch services.
   * @param {Object} l - The component list to set.
   */
  setComponentList(l) {
    this.componentList = l;
    if (this.componentList.getAPIService) {
      this.setAPIService(this.componentList.getAPIService());
    }
    if (this.componentList.getDispatch) {
      this.setDispatch(this.componentList.getDispatch());
    }
  }

  /**
   * Sets the dispatch function.
   * @param {Function} d - The dispatch function.
   */
  setDispatch(d) {
    this.dispatch = d;
  }

  /**
   * Retrieves the dispatch function.
   * @returns {Function} The dispatch function.
   */
  getDispatch() {
    return this.dispatch;
  }

  /**
   * Retrieves the component list.
   * @returns {Object} The component list.
   */
  getComponentList() {
    return this.componentList;
  }

  /**
   * Sets the API service for the instance.
   * @param {Object} service - The API service to set.
   */
  setAPIService(service) {
    this.APIService = service;
  }

  /**
   * Retrieves the API service.
   * @returns {Object} The API service.
   */
  getAPIService() {
    return this.APIService;
  }

  /**
   * Updates the current instance using the API service.
   * @param {...any} args - Additional arguments for the update operation.
   */
  update(...args) {
    if (this.APIService) {
      this.APIService.update([this], ...args);
    }
  }

  /**
   * Deletes the current instance using the component list.
   * @param {...any} args - Additional arguments for the delete operation.
   */
  del(...args) {
    this.componentList.del(this, { ...args });
  }

  /**
   * Adjusts the order of the current instance within a list.
   * @param {number|boolean} increment - The direction or step to move in the list.
   * @param {string} key - The key used for ordering.
   */
  updateOrder(increment, key) {
    increment = increment || -1;
    if (increment === true) {
      increment = 1;
    }
    let list = this.componentList.getList(
      this.json.type,
      this.json[this.json.orderFilterKey],
      this.json.orderFilterKey
    );
    key = key || (this.json.orderKey ? this.json[this.json.orderKey] : "order");
    let thisCompIndex = list.indexOf(this);
    let nextComp;

    // Handle boundary cases and list shifting.
    if (increment < 0 && thisCompIndex === 0) {
      this.json[key] = list.length;
    } else if (increment > 0 && thisCompIndex === list.length - 1) {
      this.json[key] = 0;
      this.componentList.shiftOrderedList(this, key);
    } else {
      nextComp = list[thisCompIndex + increment];
      nextComp.setCompState({ [key]: thisCompIndex }, { run: true, clean: true });
      this.json[key] = thisCompIndex + increment;
    }

    this.componentList.sortSelectedList(this.json.type, this.json.orderKey || "order");
    this.componentList.resetOrder(this, key);
    this.update();
  }
    /**
   * Prepares the instance by invoking the operations factory's prepare method.
   */
     prepare() {
        this.operationsFactory.prepare({ prepare: this });
      }
    
      /**
       * Sets a single attribute on the instance.
       * @param {string} key - The key of the attribute to set.
       * @param {*} val - The value to set for the attribute.
       */
      setAttribute(key, val) {
        this[key] = val;
      }
    
      /**
       * Sets multiple attributes on the instance.
       * @param {Object} obj - An object containing key-value pairs to set as attributes.
       */
      setAttributes(obj) {
        for (let key in obj) {
          this[key] = obj[key];
        }
      }
    
      /**
       * Retrieves the value of a specific attribute from the instance.
       * @param {string} type - The key of the attribute to retrieve.
       * @returns {*} The value of the requested attribute.
       */
      getAttribute(type) {
        return this[type];
      }
    
      /**
       * Retrieves a specific attribute from the `json` object.
       * @param {string} key - The key of the attribute to retrieve.
       * @returns {*} The value of the requested attribute from `json`.
       */
      getJsonAttribute(key) {
        return this.json[key];
      }
    
      /**
       * Updates the `json` object and optionally performs additional actions like dispatching updates, calling callbacks, or running operations.
       *        
       * * Works exactly like setState in react only I include a function for a callback if needed
       * @param {Object} obj - Key-value pairs to update in the `json` object.
       * @param {Object} subscribe - Options for subscribing to operations.
       * @param {boolean} dispatch - Whether to dispatch updates.
       * @param {Function} callBack - Callback to execute after updating the state.
       */
      setCompState(obj, subscribe, dispatch, callBack) {
        this.subscribeToOperations(subscribe);
        this.json = { ...this.json, ...obj };
        if (dispatch) {
          this.dispatch({ updated: this });
        }
        if (callBack) {
          callBack(obj);
        }
        if (subscribe?.run) {
          this.operationsFactory.runOperations();
        }
      }
    
      /**
       * Retrieves the operations factory associated with the instance.
       * @returns {Object} The operations factory.
       */
      getOperationsFactory() {
        return this.operationsFactory;
      }
    
      /**
       * Sets the `json` object directly and optionally performs actions like dispatching updates, calling callbacks, or running operations.
       * @param {Object} json - The new `json` object to set.
       * @param {Object} subscribe - Options for subscribing to operations.
       * @param {boolean} dispatch - Whether to dispatch updates.
       * @param {Function} callBack - Callback to execute after setting the `json`.
       */
      setJson(json, subscribe, dispatch, callBack) {
        this.subscribeToOperations(subscribe);
        this.json = json;
        if (dispatch) {
          this.dispatch({ updated: this });
        }
        if (callBack) {
          callBack(this);
        }
        if (subscribe?.run) {
          this.operationsFactory.runOperations();
        }
      }
    
      /**
       * Retrieves the entire `json` object.
       * @returns {Object} The `json` object.
       */
      getJson() {
        return this.json;
      }
    
      /**
       * Subscribes to operations in the operations factory.
       * @param {Object} subscribe - Options for subscribing, including the operation and whether to clean previous subscriptions.
       */
      subscribeToOperations(subscribe) {
        if (subscribe) {
          this.operationsFactory.subscribeToOperations(subscribe.operation || this.update, subscribe.clean);
        }
      }
    
      /**
       * Creates a copy of the `json` object, with optional modifications, for creating a new instance.
       * @param {Object} obj - Optional modifications to apply to the copied `json`.
       * @returns {Object} A new `json` object with the specified modifications.
       */
      copyJson(obj) {
        let newJson = { ...this.json, _id: "", ...obj };
        return newJson;
      }
    
      /**
       * Copies the current instance's `json` and adds it to the component list as a new instance.
       * @param {Object} obj - Optional modifications to apply to the new instance.
       */
      copy(obj) {
        let newJson = this.copyJson(obj);
        this.componentList.addComponents(newJson);
      }
    
      /**
       * Updates a nested object inside the `json` by merging it with the provided object.
       * @param {string} key - The key of the nested object to update.
       * @param {Object} obj - The object containing key-value pairs to merge into the nested object.
       */
      updateObjInsideJson(key, obj) {
        this.json[key] = { ...this.json[key], ...obj };
      }
    
      /**
       * Removes specific keys from a nested object inside the `json`.
       * @param {string} key - The key of the nested object to modify.
       * @param {Array<string>} keys - The keys to remove from the nested object.
       */
      removeObjInsideJson(key, keys) {
        let ob = {};
        for (const k in this.json[key]) {
          if (!keys.includes(k)) {
            ob[k] = this.json[key][k];
          }
        }
        this.json[key] = ob;
      }
    
      /**
       * Generates a random five-character alphanumeric string with at least one random letter.
       * @returns {string} A random alphanumeric string.
       */
      randomFiveDigitNumber() {
        let num = Math.floor(Math.random() * 90000) + 10000;
        num = num.toString();
        let randomLetter = String.fromCharCode(97 + Math.floor(Math.random() * 26));
        let randomPosition = Math.floor(Math.random() * 5);
    
        num = num.substring(0, randomPosition) + randomLetter + num.substring(randomPosition + 1);
    
        let randomagain = Math.floor(Math.random() * 2);
        if (randomagain === 1) {
          let randomLetter2 = String.fromCharCode(97 + Math.floor(Math.random() * 26));
          let randomPosition2;
          do {
            randomPosition2 = Math.floor(Math.random() * 5);
          } while (randomPosition2 === randomPosition);
          num = num.substring(0, randomPosition2) + randomLetter2 + num.substring(randomPosition2 + 1);
        }
    
        return num;
      }
    
      /**
       * Creates a unique identifier (ID) based on the current date and a random number.
       * @returns {string} The generated ID.
       */
      createId() {
        const currentDate = new Date();
        const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
        const day = currentDate.getDate().toString().padStart(2, '0');
        const year = currentDate.getFullYear().toString().slice(-2);
    
        let num = this.randomFiveDigitNumber().toString() + month + day + year;
        return num;
      }
    
      /**
       * Creates a unique string of the specified length using alphanumeric characters.
       * @param {number} length - The length of the string to generate.
       * @returns {string} The generated string.
       */
      createUUID(length) {
        let result = '';
        let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz123456789';
        let charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
      }
    }
    