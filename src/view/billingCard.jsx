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
        <div className="billing-card">
          <div className="row row-left billing-summary">
            <div className="col col-left">

              <div className="billing-summary-title">Billing summary</div>
              <div className="row row-space-between billing-due">
                <div className="billing-due-amount">$245 due</div>
                <div className="billing-due-amount-right-col row">
                  <div className="col">
                    <div className="charge-btn">charge</div>
                  </div>
                  <div className="col">
                    <div className="charge-btn ml-2">Send invoice</div>
                  </div>


                </div>
              </div>

              <div className="row row-left">
                <div className="billing-due-date charge-light-btn">Due Apr 28</div>
              </div>

              <div className="row row-left">$120/session $660</div>
              <div className="row row-left">Primary payment method</div>
            </div>
          </div>
          <div className="row after-billing-summary">
            <div className="col col-left cross-start payments-by-date">
              <div className="row row-left">
                <div className="payment-title">Payments by Date</div>
                {/*<hr style={{width:"100%"}}/>*/}

              </div>
              <div className="row row-left">
                <div className="col"><div className="charge-light-btn">all</div></div>
                <div className="col"><div className="trans-btn ml-1">open</div></div>
                <div className="col"><div className="trans-btn ml-1">paid</div></div>
              </div>
              <div className="row row-space-between">

                <div className="col">INV-1043</div>
                <div className="col">Apr10</div>
                <div className="col"><div className="charge-light-btn">Open</div></div>
              </div>
              <div className="row row-space-between">
                <div className="col">Session-50min</div>
                <div className="col">$120</div>
              </div>
              <div className="row row-left">
                <div>Payments by Date</div>
              </div>
              <hr/>
              <div className="row row-space-between">
                <div className="col">$120 paid</div>
                <div className="col">Apr7</div>
              </div>
              <div className="row row-space-between">
                <div className="col">$80 refund</div>
                <div className="col">(no-show-dispute)</div>
              </div>
              <div className="row row-space-between">
                <div className="col">$120 paid</div>
                <div className="col">Apr10</div>
              </div>
            </div>
            <div className="col col-left cross-start actions">
              <div className="row row-left">
                <div className="action-title">Actions</div>
              </div>
              <div className="row row-left">
                <div className="charge-light-btn">+New Invoice</div>
              </div>
              <div className="row row-left">
                <div className="charge-light-btn">Record Payment</div>
              </div>
              <div className="row row-left">
                <div className="charge-light-btn">Add/Update Card on File</div>
              </div>
              <div className="row row-left">
                <div className="charge-light-btn">Set Up Auto-charge</div>
              </div>
              <div className="row row-left">
                <div className="charge-light-btn">Apply Credit / Coupon</div>
              </div>
            </div>
          </div>

        </div>
       
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
