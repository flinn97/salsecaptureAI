import BaseClass from '../baseClass';

/**
 * The AddComponentButton class represents a button that, when clicked, adds a component to a map.
 * It extends from BaseClass and is used to trigger the creation of a new object based on provided properties.
 */
export default class AddComponentButton extends BaseClass {
  /**
   * Initializes the AddComponentButton with the provided props.
   * @param {Object} props - The properties passed to the component.
   */
  constructor(props) {
    super(props); // Calls the parent class constructor
  }

  /**
   * Prepares the component by setting its internal state for components to an empty array.
   * This method can be used to reset the state of the button.
   */
  preSetup() {
    this.setComponents([]); // Initializes an empty components list
  }

  /**
   * Creates the object of the specified type and triggers the necessary actions for adding the item.
   * This method prepares the operations factory with the given parameters and calls the pinAdded callback.
   */
  async createObjType() {
    let opps = this.operationsFactory; // Accesses the operations factory
    let type = this.props.addType; // Gets the type of the object to add from props
    await opps.prepare({
      prepare: { type: type, mapId: this.props.mapId, ...this.props.addPinProps }, // Prepares the object with required parameters
      clean: true,
      run: true,
    });

    this.props.pinAdded(); // Calls the pinAdded callback provided in props after the object is created
  }

  /**
   * Renders the HTML structure for the AddComponentButton.
   * This button triggers the creation of the object when clicked.
   * @returns {JSX.Element} The rendered HTML for the button.
   */
  getHtml() {
    let text = this.props.text || "+ Add Item"; // Sets the text of the button (default: "+ Add Item")
    return (
      <div
        onClick={this.createObjType} // Triggers the createObjType method when clicked
        style={this.props.style} // Applies the style from props
        className={this.props.class || this.theme.MCAddButton} // Applies a default class if not provided
      >
        {text} {/* Displays the button text */}
      </div>
    );
  }
}

/**
 * TODO: Set this up to leverage the full power of item (e.g., improve state management and interactions).
 */
