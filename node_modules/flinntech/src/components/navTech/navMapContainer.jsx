import { MapComponent } from '../mapTech/mapComponentInterface';
import BaseComponent from '../templateTech/baseClasses/BaseComponent';

class NavMapContainer extends BaseComponent {
  /**
   * Constructor initializes state and sets up the props setup functions.
   * It also binds the `getNavLists` method to the list of initial props setup functions.
   * @param {Object} props - The properties passed to the component.
   */
  constructor(props) {
    super(props); // Call the base class constructor to set up the component
    // Adding the `getNavLists` function to the initial setup functions list
    this.initialPropsSetupFunctions = [...this.initialPropsSetupFunctions, this.getNavLists];
    this.state = {}; // Initialize state (no specific state properties in the constructor)
  }

  /**
   * Retrieves the links from either props or the app's state.
   * @returns {Array} - The links to be used by the navigation component.
   */
  getLinks() {
    // Check if links are provided through props; otherwise, get them from the app's state
    return this.props.links ? this.props.links : this.props.app?.state?.routes;
  }

  /**
   * Returns the default navigation item object for a given type.
   * @param {string} type - The type of navigation item (e.g., "logo", "links", "logout").
   * @returns {Object} - The object containing properties for the navigation item.
   */
  getDefaultNavItem(type) {
    // Creates an object with default properties based on the type of navigation item
    let typeObs = {
      logo: { imgSrc: this.props.logoURL, label: this.props.logoLabel, ...this.props },
      links: { links: this.getLinks(), ...this.props, class: "fit" },
      logout: { logoutFunc: this.props.logoutFunc, auth: this.props.auth, wrapperClass: "SB-logout", ...this.props }
    };
    return typeObs[type]; // Return the corresponding item based on the type
  }

  /**
   * Builds the navigation list, updating it with default items if necessary.
   * Filters out the "links" item if the `type` is "topBar".
   * @returns {Array} - The list of navigation items.
   */
  getList() {
    // Retrieves the navigation list from props or defaults to the navList prop
    let navList = this.props.navList;
    let list = navList.getList(); // Get the list of navigation items

    // Loop through the list and set default items for each navigation item type
    for (let i = 0; i < list.length; i++) {
      if (list[i].default) {
        let obj = this.getDefaultNavItem(list[i].type); // Get the default properties for the item
        obj.type = list[i].type; // Ensure the type matches the item type
        navList.update(i, obj); // Update the item in the list with default properties
      }
    }

    // If the type is "topBar", remove the "links" item from the list
    if (this.props.type === "topBar") {
      list = list.filter(obj => obj.type !== "links");
    }

    return list; // Return the final navigation list
  }

  /**
   * Generates the HTML for the component using the `MapComponent` with the required properties.
   * @returns {JSX.Element} - The rendered MapComponent with appropriate props.
   */
  getHtml() {
    // Return the MapComponent with the necessary props such as `theme`, `list`, `cells`, etc.
    return <MapComponent theme={this.props.mapTheme} list={this.mapList} cells={this.list} {...this.props.navMapProps} />;
  }

  /**
   * Retrieves the navigation lists either from props or by generating them using `getList`.
   * Also sets the map list, either from props or defaults to an empty object.
   */
  getNavLists() {
    // Get the list from props or build it using the `getList` function
    this.list = this.props.list ? this.props.list : this.getList();
    // Set the map list from props or default to an empty object
    this.mapList = this.props.mapList ? this.props.mapList : [{}];
  }
}

export default NavMapContainer;