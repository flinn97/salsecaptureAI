import BaseClass from '../baseClass';
import { MapComponent } from '../mapComponentInterface';

//model
/**
 * The LinkContainer class represents a container for links.
 * It manages a list of links, sets an active link, and renders the links using the MapComponent.
 */
export default class LinkContainer extends BaseClass {
  /**
   * Initializes the LinkContainer with the provided props.
   * Sets the item type to "div".
   * @param {Object} props - The properties passed to the component.
   */
  constructor(props) {
    super(props); // Calls the parent class constructor
    this.state.itemType = "div"; // Sets the item type to "div"
  }

  /**
   * Filters and returns the list of links from the provided cell's links.
   * Ignores links that do not have a name.
   * @returns {Array} The filtered list of links.
   */
  getList() {
    this.list = this.props.cell.links.filter(obj => obj?.name !== undefined); // Filters links with a name
    return this.list; // Returns the filtered list
  }

  /**
   * Sets the active link by searching for the link with path "/" and marking it as the home link.
   * Marks all other links as inactive and sets the home link as active.
   */
  getHome() {
    if (!this.state.active) { // If no active link has been set
      this.home = this.list.find(obj => obj.path === "/"); // Find the link with path "/"
      for (let l of this.list) {
        l.active = this.home?.name; // Set the home link as active for all links
      }
    }
  }

  /**
   * Filters and returns the list of links to be displayed.
   * It excludes links that have no name or are explicitly set to not display.
   * Then it renders these links using the MapComponent, which handles the rendering of each link item.
   * @returns {JSX.Element} The JSX element representing the rendered list of links.
   */
  getOption() {
    let list = this.props.cell.links.filter(obj => obj?.name !== undefined && obj.display !== false); // Filter links to display
    return (
      <MapComponent 
        list={list} 
        theme={this.cell.linksTheme || "links"} 
        mapSectionClass={this.props.cell.linkSectionClass||undefined}
        mapSectionStyle={this.props.cell.linkSectionStyle||undefined}

        cells={[{ 
          type: "linkItem", 
          class:this.props.cell.linkItemClass||undefined,
          style:this.props.cell.linkItemStyle||undefined,
          linkClick: (obj) => { // Handles the click event for each link
            for (let l of this.props.cell.links) {
              l.active = obj?.name; // Sets the clicked link as active
            }
            this.setState({ active: obj?.name }); // Updates the active link in the state
          } 
        }]} 
      />
    );
  }

  /**
   * Additional setup for the LinkContainer component.
   * This includes calling the getList and getHome methods to set up the links and the active state.
   */
  additionalSetup() {
    this.getList(); // Retrieves the list of links
    this.getHome(); // Sets the home link and active state
  }
}