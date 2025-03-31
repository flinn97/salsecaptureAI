import BaseClass from './baseClass';

//this could be updated to use the baseclass getHtml
export default class MapComponentItem extends BaseClass {
  /**
   * Constructor initializes the component with props, sets up initial functions, 
   * and defines the default types and state properties.
   * @param {Object} props - The props passed to the component.
   */
  constructor(props) {
    super(props); // Calls the parent constructor

    // Adds functions to the initial setup sequence
    this.initialPropsSetupFunctions = [...this.initialPropsSetupFunctions, this.setList, this.setFactory];

    // Sets up the state properties specific to this component
    this.state = {
      ...this.state,
      mapContainerClass: "MCMapContainer", // Class for the map container
      interface: "map", // Type of interface, set to "map"
      mapSectionClass: "MCMapSection", // Class for the map section
    };

    // Defines default types for map components
    this.defaultTypes = ["del", "edit", "img"];
  }

  /**
   * Initializes the factory property by retrieving the factory from the interface.
   */
  setFactory() {
    this.factory = this.interface.getFactory(); // Retrieves the factory for map components
  }

  /**
   * Returns the default types of components that can be created.
   * @returns {Array} List of default types ["del", "edit", "img"]
   */
  getDefaultTypes() {
    return this.defaultTypes; // Returns the array of default types
  }

  /**
   * Checks if a cell matches any of the default types and returns the matching type if found.
   * @param {Object} cell - The cell object to check.
   * @returns {string|undefined} - The matching default type or undefined if not found.
   */
  checkCellForDefaults(cell) {
    let arr = this.getDefaultTypes(); // Retrieves default types
    return arr[arr.indexOf(cell)]; // Checks and returns matching type
  }

  /**
   * Determines if the value of a cell is text or an attribute.
   * @param {Object} obj - The object containing the data.
   * @param {Object} cell - The cell object to check.
   * @returns {string} - "attribute" if the cell has an attribute, "text" otherwise.
   */
  textOrAttribute(obj, cell) {
    let type = (obj.getJson && obj?.getJson()[cell]) ? "attribute" : "text"; // Determines type based on whether it's an attribute or text
    return type; // Returns the type as "attribute" or "text"
  }

  /**
   * Determines the type of a cell, either using its defined type, checking defaults,
   * or determining if it should be treated as text or attribute.
   * @param {Object} cell - The cell object to determine the type for.
   * @param {Object} obj - The object that may contain the cell data.
   * @returns {string} - The type of the cell (either from its type, defaults, or based on text/attribute).
   */
  getType(cell, obj) {
    let type = cell.type; // Retrieves the type of the cell

    //this stuff is all because we want them to be able to send in text sometimes instead of an obj. So its not important code.
    if (!type) {
      type = this.checkCellForDefaults(cell); // If no type, check for defaults
      if (!type) {
        type = this.textOrAttribute(obj, cell); // If still no type, determine if it's text or an attribute
      }
    }
    return type; // Returns the determined type
  }

  /**
   * Creates the props object to be passed to a component, including the obj, interface, cell, and theme.
   * @param {Object} cell - The cell for which props are being created.
   * @param {Object} obj - The object to be passed to the component.
   * @returns {Object} - The props object for the component.
   */
  getProps(cell, obj) {
    let p = { obj: obj, ...this.props, interface: this.interface, cell: cell, theme: this.props.theme };
    return p; // Returns the constructed props object
  }

  /**
   * Generates a list of cell components based on the cells array from props,
   * passing appropriate props to each component via the factory.
   * @param {Object} obj - The object to be used in the components.
   * @returns {JSX.Element} - A JSX element containing the list of cell components.
   */
  getCellList(obj) {
    let cells = this.props.cells; // Retrieves the list of cells from props

    return (<>{cells.map((cell, i) => {
      let type = this.getType(cell, obj); // Determines the type of each cell
      let p = this.getProps(cell, obj); // Retrieves the props for each cell
      return <>{this.factory.getComponent(type, p)}</>; // Gets the component from the factory based on the type and props
    })}</>); // Maps over the cells and returns the corresponding components
  }

  /**
   * Generates the HTML for the list by mapping over the list and passing each object 
   * to `mapSection.getHtml`, which creates the necessary structure.
   * @returns {JSX.Element} - The JSX representing the list of map sections.
   */
  getListHtml() {
    return (<>{this.list.map((obj) => <>{
      this.mapSection.getHtml({type: "div", content: this.getCellList(obj)})
      }</>
    )}</>); // Maps over the list and generates the HTML for each map section
  }

  /**
   * Sets the list property by extracting the list from props.
   */
  setList() {
    this.list = this.props.list; // Sets the list from the props
  }

  /**
   * Pre-setup function that adds component setup steps to the initialization process.
   * It ensures that the required components (mapContainer, mapSection, link) are set up.
   */
  preSetup() {
    this.setComponents(["mapContainer", "mapSection", "link"]); // Initializes the components for the map container, section, and link
  }

  /**
   * Generates the HTML content for the component by retrieving the HTML for the map container
   * and passing the list HTML as its content.
   * @returns {JSX.Element} - The final HTML structure for the map component.
   */
  getHtml() {
    let html = this.mapContainer.getHtml({type: "div", content: this.getListHtml()}); // Gets the HTML for the map container
    this.html = <>{html}</>; // Stores the generated HTML in the `html` property
    return this.html; // Returns the final HTML content
  }
}