import BaseComponent from '../templateTech/baseClasses/BaseComponent';
import "./nav.scss"

class Menu extends BaseComponent {
  /**
   * Constructor initializes the state with default properties for the menu.
   * @param {Object} props - The props passed to the component.
   */
  constructor(props){
    super(props); // Calls the parent constructor
    this.state = {
      defaultStyle: "navMenu", // Default CSS class for the menu
      renderComp: undefined // Initially, there is no component rendered
    };
  }

  /**
   * Asynchronously opens the menu by invoking the `open` prop function.
   * If the `type` is "topBar", it toggles the state to either show or hide the component.
   */
  async open(){
    let component = await this.props.open(); // Calls the `open` function passed as prop and waits for the result
    if(this.props.type === "topBar") { // Only toggles if the type is "topBar"
      if(!this.state.renderComp) {
        this.setState({ renderComp: component }); // If no component is rendered, set the new component
      } else {
        this.setState({ renderComp: undefined }); // If a component is already rendered, hide it
      }
    }
  }

  /**
   * Renders the menu component.
   * Displays the menu content and conditionally renders the component if `renderComp` is set.
   * @returns {JSX.Element} - The JSX for the Menu component.
   */
  render(){
    let app = this.props.app; // Retrieves the `app` prop, though it's not used in the render method
    return (
      <div>
        {/* Menu button with dynamic CSS class and optional menu content */}
        <div onClick={this.open} className={this.props.menuClass ? this.props.menuClass : this.state.defaultStyle}>
          {this.props.menuContent && <>{this.props.menuContent}</>} {/* Renders the menu content if provided */}
        </div>

        {/* Conditionally renders the component if `renderComp` is set in the state */}
        {this.state.renderComp && <>{this.state.renderComp}</>}
      </div>
    );
  }
}

export default Menu;