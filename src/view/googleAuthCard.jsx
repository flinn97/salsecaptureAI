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
import GmailConnect from "./components/feGoogleOauth";
import GmailConnectButton from "./components/googleOauth";
import CsvUpload from "./csvUpload";
import goog from '../assets/logo_google_g.png';

/**
 * ContactsCard class extends BaseComponent to create a contact management card.
 * @extends BaseComponent
 */
export default class GoogleAuthCard extends BaseComponent {
  /**
   * Constructor for the ContactsCard component.
   * Initializes component state and properties.
   * @param {Object} props - Properties passed to the component.
   */
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
      defaultClass: "fit",
      title: "Contacts",
    };
  }

  /**
   * Returns the inner content of the ContactsCard component.
   * @returns {JSX.Element} The inner content of the card.
   */
  getInnerContent() {
    return (
      <div>
        {/* <GmailConnectButton /> */}
        {this.propsState.currentUser.getJson().gmailAuthenticated ? (
          <div style={{ font: "normal normal 900 19px/25px Satoshi", paddingTop:"30px" }}>
            Gmail Authenticated:
            <div
              style={{
                font: "normal normal 400 16px/21px Satoshi",
                color: "#696969", alignItems:"center",
                display:"flex", marginTop:"20px"
              }}
            >
              <img src={goog} style={{width:"30px"}}/>{this.propsState.currentUser.getJson()._id}
            </div>
          </div>
        ) : (
          <GmailConnect />
        )}
      </div>
    );
  }

  /**
   * Renders the ContactsCard component.
   * @returns {JSX.Element} The rendered component.
   */
  render() {
    return (
      <div
        className={this.props.pageClass || this.state.defaultClass}
        style={{ marginLeft: "30px", width: "100%" }}
      >
        {this.getInnerContent()}
      </div>
    );
  }
}
