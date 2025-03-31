import BaseClass from "../baseClass";

/**
 * OrderedArrowsBaseClass manages the order of items with increase and decrease buttons.
 * It provides functionality for altering the order of items via arrows.
 */
export default class OrderedArrowsBaseClass extends BaseClass {
  /**
   * Constructor to initialize the base class and set default states.
   * Sets up the class key for styling and increments/decrements for order manipulation.
   * @param {Object} props - The props passed to the component.
   */
  constructor(props) {
    super(props); // Calls the parent class constructor
    this.state.classKey = "MCOrderedArrows"; // Sets the CSS class key for styling
    this.state.increment = 1; // Sets the value to increase the order by
    this.state.decrement = -1; // Sets the value to decrease the order by
  }

  /**
   * Increases the position/order of the object by the increment value.
   * This method updates the order of the object.
   */
  increasePosition() {
    this.obj.updateOrder(this.state.increment); // Calls updateOrder method on the object to increase its position
  }

  /**
   * Decreases the position/order of the object by the decrement value.
   * This method updates the order of the object.
   */
  decreasePosition() {
    this.obj.updateOrder(this.state.decrement); // Calls updateOrder method on the object to decrease its position
  }

  /**
   * Creates the UI for the increase arrow.
   * The arrow triggers the decreasePosition method when clicked.
   * @returns {JSX.Element} The JSX element representing the increase arrow.
   */
  increaseArrowUI() {
    this.increaseArrow = <div className="upward-arrow" onClick={this.decreasePosition}></div>// Defines the increase arrow with an onClick event that calls decreasePosition
    return this.increaseArrow; // Returns the JSX element for the increase arrow
  }

  /**
   * Creates the UI for the decrease arrow.
   * The arrow triggers the increasePosition method when clicked.
   * @returns {JSX.Element} The JSX element representing the decrease arrow.
   */
  decreaseArrowUI() {
    this.decreaseArrow = <div style={{ marginTop: "5px" }} className="downward-arrow" onClick={this.increasePosition}></div> // Defines the decrease arrow with an onClick event that calls increasePosition
    return this.decreaseArrow; // Returns the JSX element for the decrease arrow
  }

  /**
   * Combines both increase and decrease arrows into a single div container.
   * Returns a JSX element that contains both arrows for UI rendering.
   * @returns {JSX.Element} The JSX element that combines both arrows.
   */
  getOption() {
    this.increaseArrowUI(); // Calls method to create the increase arrow
    this.decreaseArrowUI(); // Calls method to create the decrease arrow
    let div = (
      <div style={{ marginTop: "-4px" }} className="fitCC">
        {this.increaseArrow}
        {this.decreaseArrow}
      </div>
    ); // Combines the increase and decrease arrows into a container div
    return div; // Returns the JSX element containing both arrows
  }
}