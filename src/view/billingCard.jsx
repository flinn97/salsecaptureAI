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
              <div className="row row-left charge-light-btn mb-1">
                <div className="svg-div">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M256 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 160-160 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l160 0 0 160c0 17.7 14.3 32 32 32s32-14.3 32-32l0-160 160 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-160 0 0-160z"/></svg>
                </div>
                <div>New Invoice</div>
              </div>
              <div className="row row-left charge-light-btn mb-1">
                <div className="svg-div">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M0 128C0 92.7 28.7 64 64 64l384 0c35.3 0 64 28.7 64 64l0 256c0 35.3-28.7 64-64 64L64 448c-35.3 0-64-28.7-64-64L0 128zM96 312c0 13.3 10.7 24 24 24l144 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-144 0c-13.3 0-24 10.7-24 24zm24-136c-13.3 0-24 10.7-24 24s10.7 24 24 24l272 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-272 0z"/></svg>
                </div>
                <div>Record Payment</div>
              </div>
              <div className="row row-left charge-light-btn mb-1">
                <div className="svg-div">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l448 0c35.3 0 64-28.7 64-64l0-320c0-35.3-28.7-64-64-64L64 32zm80 256l64 0c44.2 0 80 35.8 80 80 0 8.8-7.2 16-16 16L80 384c-8.8 0-16-7.2-16-16 0-44.2 35.8-80 80-80zm-24-96a56 56 0 1 1 112 0 56 56 0 1 1 -112 0zm240-48l112 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-112 0c-13.3 0-24-10.7-24-24s10.7-24 24-24zm0 96l112 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-112 0c-13.3 0-24-10.7-24-24s10.7-24 24-24z"/></svg>
                </div>
                <div>Add/Update Card on File</div>
              </div>
              <div className="row row-left charge-light-btn mb-1">
                <div className="svg-div">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M464 256a208 208 0 1 1 -416 0 208 208 0 1 1 416 0zM0 256a256 256 0 1 0 512 0 256 256 0 1 0 -512 0zM232 120l0 136c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2 280 120c0-13.3-10.7-24-24-24s-24 10.7-24 24z"/></svg>
                </div>
                <div>Set Up Auto-charge</div>
              </div>
              <div className="row row-left charge-light-btn mb-1">
                <div className="svg-div">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M64 64C28.7 64 0 92.7 0 128l0 64C0 200.8 7.4 207.7 15.7 210.6 34.5 217.1 48 235 48 256s-13.5 38.9-32.3 45.4C7.4 304.3 0 311.2 0 320l0 64c0 35.3 28.7 64 64 64l448 0c35.3 0 64-28.7 64-64l0-64c0-8.8-7.4-15.7-15.7-18.6-18.8-6.5-32.3-24.4-32.3-45.4s13.5-38.9 32.3-45.4c8.3-2.9 15.7-9.8 15.7-18.6l0-64c0-35.3-28.7-64-64-64L64 64zM416 336l0-160-256 0 0 160 256 0zM112 160c0-17.7 14.3-32 32-32l288 0c17.7 0 32 14.3 32 32l0 192c0 17.7-14.3 32-32 32l-288 0c-17.7 0-32-14.3-32-32l0-192z"/></svg>
                </div>
                <div>Apply Credit / Coupon</div>
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
