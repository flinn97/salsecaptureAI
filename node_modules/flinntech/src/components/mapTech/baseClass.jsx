import BaseComponent from '../templateTech/baseClasses/BaseComponent';

/**
 * This is the base class for map component items that go into a <MapComponent /> tag. 
 */
export default class BaseClass extends BaseComponent {
  constructor(props) {
    super(props);

    // Initial setup functions for props
    this.initialPropsSetupFunctions = [...this.initialPropsSetupFunctions, this.setCell, this.getUseId];

    // Component state
    this.state = {
      ...this.state,
      defaultTheme: "defaultColumn",
      interface: "map",
      wrapperClass: "MCCell",
      linkClass: "MCLink",
    };
    
    this.setItemPropsRan = false;
  }

  /**
   * Sets the cell property from props.
   */
  setCell() {
    this.cell = this.props.cell;
  }

  /**
   * Prepares components before setup.
   */
  preSetup() {
    this.setComponents(["link", "wrapper", "item", "option"]);
  }

  /**
   * Sets properties for the item component.
   */
  setitemprops() {
    let json = { ...this.createPropObj("item", "cell"), className: this.cell.class || this.theme[this.state.classKey], style: this.cell.style };
    
    if (this.cell.itemClick) {
      json.checkItemClick = true;
    }
    
    if (!this.setItemPropsRan) {
      this.builderObserver.subscribe(json);
      this.setItemPropsRan = true;
    } else {
      this.item.setProps(json);
    }
  }

  /**
   * Sets properties for the wrapper component.
   */
  setwrapperprops() {
    let json = { ...this.createPropObj("wrapper", "cell") };

    if (!this.setWrapperPropsRan) {
      this.builderObserver.subscribe(json);
      this.setWrapperPropsRan = true;
    } else {
      this.wrapper.setProps(json);
    }
  }

  /**
   * Returns an empty option element.
   */
  getOption() {
    return <></>;
  }

  /**
   * Retrieves the useId based on the cell properties and JSON data.
   */
  getUseId() {
    if (this.cell) {
      if (this.obj.getJson) {
        this.useId = this.cell.useId === false ? "" : this.cell.useId === undefined ? this.obj.getJson()._id : this.obj.getJson()[this.cell.useId];
      }
    }
    return this.useId;
  }

  /**
   * Generates the inner content for rendering.
   */
  getInnerContent() {
    this.innerContent = [this.item.getHtml({ type: this.state.itemType || "span", content: this.getOption() })];
    return this.innerContent;
  }

  /**
   * Constructs the link URL based on cell properties.
   */
  getLinkUrl() {
    let url = this.cell?.to ? this.cell.to : `/${this.obj?.getJson()?.type}/${this.useId}`;
    return url;
  }

  /**
   * Sets up link click functionality.
   */
  getLinkFunc() {
    if (this.cell.forceUpdate) {
      let func = () => {
        this.dispatch({ forceUpdate: this.cell.forceUpdate });
      };
      this.link.setOnClick(func);
    }

    if (this.cell.linkClick) {
      let func = () => {
        this.cell.linkClick(this.obj);
        if (this.cell.forceUpdate) {
          this.dispatch({ forceUpdate: this.cell.forceUpdate });
        }
      };
      this.link.setOnClick(func);
    }
  }

  /**
   * Generates and returns the HTML representation of the component.
   */
  getHtml() {
    this.mapInnerContent();
    this.getLinkFunc();

    if (this.cell.type === "backgroundImage") {
      // Additional handling for background images (currently empty)
    }

    let html = !this.cell?.hasLink
      ? this.wrapper.getHtml({ type: this.state.wrapperType || "span", content: this.innerContent })
      : this.link.getHtml({ type: this.state.linkType || "link", content: this.innerContent, props: { to: this.getLinkUrl() } });
    
    this.html = <>{html}</>;
    return this.html;
  }
}

/**
 * change themes for every individual cell
 * create refs and more click/change events.
 * be able to change the cell and link styles/classes depending on what gets sent int.[cell1:cell1theme, cell2:cell2theme etc.]
 */