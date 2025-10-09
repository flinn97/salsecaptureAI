/**
 * ContactsCard component. This component renders a card displaying a list of contacts.
 * It includes a header, a button to add a new contact, and a MapComponent to visualize contacts.
 */
import { MapComponent } from "flinntech";
import { PopupButton } from "flinntech";
import { BaseComponent } from "flinntech";
import add from "../assets/add.png";
import CheckIt from "./components/check";
import ContactsCustomItem from "./components/contactsCustom";
import SCAIPopupButtonTest from "./components/debug/CustomPopupButton";
import CsvUpload from "./csvUpload";

/**
 * ContactsCard class extends BaseComponent to create a contact management card.
 * @extends BaseComponent
 */
export default class BillingCard extends BaseComponent {
  /**
   * Constructor for the ContactsCard component.
   * Initializes component state and properties.
   * @param {Object} props - Properties passed to the component.
   */
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
      defaultClass: "fit client-div",
      title: "Contacts",
    };
  }

  /**
   * Returns the inner content of the ContactsCard component.
   * @returns {JSX.Element} The inner content of the card.
   */
  getInnerContent() {
    let selCon = this.propsState.selectedContacts;
    let allCon = this.propsState.componentList.getList("contact");
    let showChecked = selCon?.length > 0;
    let allTotal = allCon?.length?"/"+allCon?.length:"";

    return (
      <div className="map-container">
       
      </div>
    );
  }

  /**
   * Renders the ContactsCard component.
   * @returns {JSX.Element} The rendered component.
   */
  render() {
    return (
      <div className={this.props.pageClass || this.state.defaultClass}>
        {this.getInnerContent()}
      </div>
    );
  }
}
