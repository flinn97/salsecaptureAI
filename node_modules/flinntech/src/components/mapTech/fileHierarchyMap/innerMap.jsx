import BaseClass from "../baseClass";
import { MapComponent } from "../mapComponentInterface";

/**
 * The InnerMap class is a component that handles the display of a map interface,
 * including an option to expand or collapse the map display.
 * It extends from BaseClass and manages the display state and layout of the map.
 */
export default class InnerMap extends BaseClass {
    /**
     * Initializes the InnerMap component with default state values.
     * @param {Object} props - The properties passed to the component.
     */
    constructor(props) {
        super(props);
        this.state.displayState = false; // State that controls whether the map is displayed or not
        this.state.itemType = "div"; // Default item type (used for the container element)
    }

    /**
     * Renders an option to display or collapse the map.
     * This is represented as an arrow that toggles the display state.
     * @returns {JSX.Element} The rendered display option (an arrow).
     */
    displayOption() {
        return <div 
            style={{ position: 'absolute', left: "0px", top: "0px" }} 
            className={this.state.displayState ? "downward-arrow" : "right-arrow"} 
            onClick={() => {
                // Toggle the map display and adjust the wrapper's height
                this.wrapper.setStyle({ ...this.wrapper.getStyle(), height: "200px" });
                this.setState({ displayState: !this.state.displayState }); // Toggle display state
            }}
        ></div>;
    }

    /**
     * Renders the map component, passing necessary properties for its display.
     * The map is filtered based on the attribute and the current object ID.
     * @returns {JSX.Element} The rendered MapComponent.
     */
    mapOption() {
        let map = <MapComponent 
            name={this.props.name} 
            filter={{ attribute: this.props.filter.attribute, search: this.obj.getJson()._id }} 
            cells={[...this.props.cells]} 
        />;
        return map;
    }

    /**
     * Performs additional setup after the component is initialized.
     * In this case, it adjusts the position style of the item container.
     */
    additionalPostSetup() {
        this.item.setStyle({ ...this.item.getStyle(), position: "relative" });
    }

    /**
     * Renders the final map option container, including the display option and the map itself if visible.
     * The map is only displayed when the displayState is true.
     * @returns {JSX.Element} The rendered container for the map and its display option.
     */
    getOption() {
        return <div style={{ position: 'absolute', width: "100%", height: "100%", display: "flex", flexDirection: 'column' }}>
            {this.displayOption()}  {/* Render the display toggle option */}
            {this.state.displayState && this.mapOption()}  {/* Render the map if displayState is true */}
        </div>;
    }
}