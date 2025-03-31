import Card from '../cardTech/Card';
import Menu from './menu';
import { MapComponent } from '../mapTech/mapComponentInterface';

class Nav extends Card {
  /**
   * Constructor initializes the state of the Nav component with default values.
   * @param {Object} props - The props passed to the component.
   */
  constructor(props){
    super(props); // Calls the parent constructor (Card)
    this.state = {
      ...this.state,
      defaultType: this.props.type ? this.props.type : "sideBar", // Default navigation type is "sideBar"
      typeKey: "layout", // Layout type key
      defaultNavType: "default", // Default navigation type
      phoneSize: 850, // Default threshold for phone layout
      left: -400 // Default left offset for positioning
    };
  }

  /**
   * Returns props to be passed to the navigation component, including map theme and routes.
   * @returns {Object} - Props to be passed to the navigation component.
   */
  getProps(){
    return {
      mapTheme: this.props.mapTheme || this.state.defaultType, // Sets the map theme
      links: this.props.links || this.props.app?.state?.routes, // Sets the links (routes) for the menu
      ...this.props // Spread other props
    };
  }

  /**
   * Retrieves the navigation component based on the type.
   * @param {Object} props - The props to be passed to the component.
   * @returns {JSX.Element} - The rendered navigation component.
   */
  getFactoryComponent(props){
    let type = this.props.mapType ? this.props.mapType : this.state.defaultNavType; // Default map type if not provided
    let factory = this.props.factory; // Retrieves the factory passed in props
    let navComponent = factory.getComponent(type, props); // Fetches the component based on type
    return navComponent;
  }

  /**
   * Component lifecycle method that runs after the component mounts.
   * Listens for window resize events and adjusts layout accordingly.
   */
  componentDidMount(){
    if(this.resize !== undefined){
      window.addEventListener("resize", this.resize); // Adds event listener for resize
      this.resize(); // Calls resize method to adjust layout
    }
  }

  /**
   * Component lifecycle method that runs just before the component unmounts.
   * Removes window resize event listener.
   */
  componentWillUnmount(){
    if(this.resize !== undefined){
      window.removeEventListener("resize", this.resize); // Removes resize event listener
    }
  }

  /**
   * Resizes the layout based on the window's width.
   * Adjusts the state to switch between phone, tablet, and default layouts.
   */
  resize(){
    if(window.innerWidth < 850){
      this.setState({
        phone: true,
        tablet: false,
        defaultType: this.props.phoneLayout ? this.props.phoneLayout : this.state.ogType ? this.state.ogType : this.state.defaultType,
        ogType: this.state.ogType ? this.state.ogType : this.state.defaultType
      });
      return;
    }
    if(window.innerWidth < 1224){
      this.setState({
        phone: false,
        tablet: true,
        defaultType: this.props.tabletLayout ? this.props.tabletLayout : this.state.ogType ? this.state.ogType : this.state.defaultType,
        ogType: this.state.ogType ? this.state.ogType : this.state.defaultType
      });
      return;
    }
    if(window.innerWidth > 1224){
      if(this.state.phone){
        this.setState({ phone: false, defaultType: this.state.ogType });
      }
      if(this.state.tablet){
        this.setState({ tablet: false, defaultType: this.state.ogType });
      }
    }
  }

  /**
   * Sets the style for the menu on click by updating the 'left' position.
   * @param {number} i - The position to set for the menu.
   */
  async setStyleOnMenuClick(i){
    const delay = ms => new Promise(res => setTimeout(res, ms)); // Helper function for delay

    this.card.setStyle({...this.card.getStyle(), left: i.toString() + "px"}); // Updates the card style
    await this.setState({ left: i }); // Sets the state for left position
    await delay(10); // Delays to ensure the style update is applied
  }

  /**
   * Opens or closes the navigation based on the current state.
   * Animates the transition of the navigation sliding in and out.
   */
  async setNavOpenClose(){
    if(this.state.left === -400){
      for(let i = -400; i < 600; i = i + 15){
        if(i > 0){
          this.setState({ left: 0 }); // Ensures the final state is 0
          break;
        }
        await this.setStyleOnMenuClick(i); // Animates the left position
      }
    }
    else{
      for(let i = 0; i > -450; i = i - 15){
        if(i < -400){
          this.setState({ left: -400 }); // Ensures the final state is -400
          break;
        }
        await this.setStyleOnMenuClick(i); // Animates the left position
      }
    }
  }

  /**
   * Opens or closes the links section of the navigation.
   * @returns {JSX.Element} - A card containing the map component with links.
   */
  async openCloseLinks(){
    let linkContainer = <MapComponent list={this.props.links || this.props.app?.state?.routes} cells={[{ type: "link" }]} />;
    let card = <Card content={linkContainer} />; // Wraps the link container in a card
    return card;
  }

  /**
   * Opens or closes the navigation based on the current navigation type (topBar or sideBar).
   * @returns {JSX.Element} - The opened or closed navigation.
   */
  async openCloseNavFun(){
    let funcs = {
      topBar: this.openCloseLinks, // Open or close links for topBar
      sideBar: this.setNavOpenClose // Open or close sideBar
    };
    let openOrClose = await funcs[this.state.defaultType](); // Executes the appropriate function based on type
    return openOrClose;
  }

  /**
   * Gets the menu component based on the provided or default menu type.
   * @returns {JSX.Element} - The rendered menu component.
   */
  getMenu(){
    let menu = this.props.menuComponent ? 
      <this.props.menuComponent {...this.props.menuComponentProps} open={this.openCloseNavFun} type={this.state.defaultType} /> :
      <Menu open={this.openCloseNavFun} type={this.state.defaultType} {...this.props.menuComponentProps} />;
    return menu;
  }

  /**
   * Gets the content for the navigation, including the navigation component and the menu.
   * @returns {JSX.Element} - The rendered content for the Nav component.
   */
  getContent(){
    let props = this.getProps(); // Gets the props for the nav component
    let navComponent = this.getFactoryComponent(props); // Gets the nav component based on type
    
    // Conditionally renders the menu if phone layout is active
    this.content = <>{navComponent}{this.props.type !== "type" && (this.state.phone || window.innerWidth < this.state.phoneSize) && <>{this.getMenu()}</>}</>;
    return this.content;
  }
}

export default Nav;