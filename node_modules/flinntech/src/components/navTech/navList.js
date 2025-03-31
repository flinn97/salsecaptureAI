import {binder} from "../serviceTech/Util/binder";

// NavList class manages a list of navigation items.
class NavList {
  /**
   * Constructor initializes the nav list with default items and binds methods.
   */
  constructor() {
    binder.bind(this); // Binds this context to methods (presumably from binder utility)
    // Initial default list with predefined items
    this.list = [
      { type: "logo", picURL: undefined, label: undefined, default: true },
      { type: "links", linkJson: undefined, default: true },
      { type: "logout", logoutFunc: undefined, auth: undefined, default: true }
    ];
  }

  /**
   * Sets the navigation list to the provided list.
   * @param {Array} list - The new list to set.
   */
  setList(list) {
    this.list = list; // Replaces the current list with the provided list
  }

  /**
   * Retrieves the current navigation list.
   * @returns {Array} - The current list of navigation items.
   */
  getList() {
    return this.list; // Returns the current navigation list
  }

  /**
   * Inserts an item into the list at the specified index.
   * @param {number} index - The index at which to insert the item.
   * @param {Object} item - The item to insert into the list.
   */
  insert(index, item) {
    if (index < 0 || index >= this.list.length) {
      console.error("Index out of bounds"); // Error handling if the index is invalid
      return;
    }
    this.list.splice(index, 0, item); // Inserts the item at the specified index
  }

  /**
   * Adds an item to the list either at the start or the end based on the `atStart` flag.
   * @param {Object} item - The item to add to the list.
   * @param {boolean} atStart - If true, item is added at the start, otherwise at the end.
   */
  add(item, atStart) {
    if (atStart) {
      this.list.unshift(item); // Adds item at the start of the list
    } else {
      this.list.push(item); // Adds item at the end of the list
    }
  }

  /**
   * Adds custom JSX to the navigation list.
   * @param {JSX.Element} jsx - The JSX element to add.
   * @param {number} index - The index where to insert the JSX element.
   * @param {boolean} start - If true, adds at the start, otherwise at the end.
   */
  addCustomJSX(jsx, index, start) {
    let obj = { type: "custom", custom: jsx }; // Creates an object with custom JSX
    if (index) {
      this.insert(index, obj); // Inserts custom JSX at the specified index
    } else {
      this.add(obj, start); // Adds custom JSX either at the start or the end
    }
  }

  /**
   * Updates an item in the list at the specified index with new properties.
   * @param {number} index - The index of the item to update.
   * @param {Object} obj - The new properties to merge into the item.
   */
  update(index, obj) {
    if (index < 0 || index >= this.list.length) {
      console.error("Index out of bounds"); // Error handling if the index is invalid
      return;
    }
    this.list[index] = { ...this.list[index], ...obj }; // Merges the new properties with the item
  }

  /**
   * Removes an item from the list at the specified index.
   * @param {number} index - The index of the item to remove.
   */
  remove(index) {
    if (index < 0 || index >= this.list.length) {
      console.error("Index out of bounds"); // Error handling if the index is invalid
      return;
    }
    this.list.splice(index, 1); // Removes the item at the specified index
  }
}

export default NavList;