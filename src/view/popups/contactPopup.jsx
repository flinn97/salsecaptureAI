/**
 * @class OemPopupContent
 * @extends {BaseComponent}
 * This component renders a popup for adding or editing OEM information.  It uses other components from 'flinntech' for form elements and buttons.
 */
 import {
  ParentFormComponent,
  RunButton,
  UpdateButton,
  UploadButton,
} from "flinntech";
import { BaseComponent } from "flinntech";
import email from "../../assets/email_24dp_05050.svg";
import phone from "../../assets/phone.svg";

export default class ContactPopup extends BaseComponent {
  /**
   * Constructor for the OemPopupContent component.
   * @param {object} props - The component's properties.
   */
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
      defaultClass: "fit scroller", //Sets a default class for styling
    };
  }

  //or we can import date-fns library
  formatDate(timestamp) {
    const date = new Date(
      timestamp?.seconds * 1000 + timestamp?.nanoseconds / 1000000
    );
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const month = months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month} ${day}, ${year}`;
  }
  /**
   * Renders the OemPopupContent component.
   * @returns {JSX.Element} The rendered component.
   */
  render() {
    // Determine screen-based overrides
    let isWideScreen = window.innerWidth > 600;
    if (this.propsState.popupSwitch?.includes("addContact")) {
      isWideScreen = false;
    }

    let obj = isWideScreen ? this.propsState.currentContact : this.props.obj;

    let createDate =
      obj && obj?.getJson().date ? this.formatDate(obj?.getJson().date) : "";

    const effectivePopupComponent = isWideScreen
      ? this.propsState.currentContact
      : this.propsState.currentPopupComponent;
    const inPopup = isWideScreen ? false : true;

    // Determine the text for the heading based on whether an object is provided
    let text = obj ? "Edit" : "Add";
    // Set default button to RunButton
    let button = (
      <RunButton
        formClass="dark-button-1"
        content="Save"
        isPopup={inPopup}
        callbackFunc={this.props.callbackFunc}
      />
    );
    //If an object is provided, change button to UpdateButton
    if (
      this.propsState.popupSwitch?.includes("updateContact") ||
      (window.innerWidth > 600 &&
        !this.propsState.popupSwitch?.includes("addContact"))
    ) {
      button = (
        <UpdateButton
          formClass="dark-button-1"
          obj={effectivePopupComponent}
          content="Save"
          isPopup={inPopup}
          callbackFunc={this.props.callbackFunc}
        />
      );
    }
    return (
      <>
        <h2 style={{ position: "sticky", top: 0, padding: "2%", width:"80%" }}>
          {text} Contact
        </h2>
        {obj && (
          <h3
            style={{
              padding: "10px",
              font: "normal normal 900 15px/16px Satoshi",
            }}
          >
            {obj.getJson().firstName} {obj.getJson().lastName}
          </h3>
        )}
        <div
          style={{
            padding: "2%",
            paddingBottom: "80px",
            height: "100%",
            paddingTop: "12px",
          }}
          className={this.props.pageClass || this.state.defaultClass}
        >
          {}
          {/*Heading for the popup*/}
          <div className="contact-Add-container">
            <div className="contact-contact-data">
              <div
                className={`row-container ${
                  obj?.getJson().firstName ? "" : "unfilled-container"
                }`}
              >
                <div className="row-name">First Name:</div>
                <div className="row-field">
                  <ParentFormComponent
                    obj={obj}
                    formClass="underline-form"
                    name="firstName"
                    placeholder="FirstName"
                    inPopup={inPopup}
                  />
                </div>
              </div>

              <div
                className={`row-container ${
                  obj?.getJson().lastName ? "" : "unfilled-container"
                }`}
              >
                <div className="row-name">Last Name:</div>
                <div className="row-field">
                  <ParentFormComponent
                    obj={obj}
                    placeholder="LastName"
                    formClass="underline-form"
                    name="lastName"
                    inPopup={inPopup}
                  />
                </div>
              </div>

              <div
                className={`row-container ${
                  obj?.getJson().email ? "" : "unfilled-container"
                }`}
              >
                <div className="row-name">
                  <span>
                    <img src={email} className="contact-img-ico" />
                  </span>
                </div>
                <div className="row-field">
                  <ParentFormComponent
                    formClass="underline-form"
                    obj={obj}
                    name="email"
                    inPopup={inPopup}
                    placeholder="1234@mail.com"
                  />
                </div>
              </div>

              <div
                className={`row-container ${
                  obj?.getJson().mobile ? "" : "unfilled-container"
                }`}
              >
                <div className="row-name">
                  <span>
                    <img src={phone} className="contact-img-ico" />
                  </span>
                </div>
                <div className="row-field">
                  <ParentFormComponent
                    formClass="underline-form"
                    obj={obj}
                    name="mobile"
                    inPopup={inPopup}
                    placeholder="XXX-XXX-XXXX"
                  />
                </div>
              </div>

              <div
                className={`row-container ${
                  obj?.getJson().company ? "" : "unfilled-container"
                }`}
                style={{
                  marginTop: "24px",
                }}
              >
                <div className="row-name">Company:</div>
                <div className="row-field">
                  <ParentFormComponent
                    formClass="underline-form"
                    obj={obj}
                    name="company"
                    inPopup={inPopup}
                    placeholder="SalesCapture AI"
                  />
                </div>
              </div>
              <div
                className={`row-container ${
                  obj?.getJson().title ? "" : "unfilled-container"
                }`}
              >
                <div className="row-name">Title:</div>
                <div className="row-field">
                  <ParentFormComponent
                    formClass="underline-form"
                    obj={obj}
                    placeholder="ie. Vice President of People"
                    name="title"
                    inPopup={inPopup}
                  />
                </div>
              </div>

              {obj && (
                <>
                  <div
                    className={`row-container ${
                      obj?.getJson().address ? "" : "unfilled-container"
                    }`}
                    style={{ marginTop: "24px" }}
                  >
                    <div className="row-name">Address:</div>
                    <div className="row-field">
                      <ParentFormComponent
                        formClass="underline-form"
                        obj={obj}
                        name="address"
                        inPopup={inPopup}
                        placeholder="123 Street Way"
                      />
                    </div>
                  </div>

                  <div
                    className={`row-container ${
                      obj?.getJson().city ? "" : "unfilled-container"
                    }`}
                  >
                    <div className="row-name">City:</div>
                    <div className="row-field">
                      <ParentFormComponent
                        formClass="underline-form"
                        obj={obj}
                        name="city"
                        inPopup={inPopup}
                        placeholder="Sales Lake City"
                      />
                    </div>
                  </div>

                  <div
                    className={`row-container ${
                      obj?.getJson().state ? "" : "unfilled-container"
                    }`}
                  >
                    <div className="row-name">State:</div>
                    <div className="row-field">
                      <ParentFormComponent
                        formClass="underline-form"
                        obj={obj}
                        name="state"
                        inPopup={inPopup}
                        placeholder="State/Territory"
                      />
                    </div>
                  </div>

                  <div
                    className={`row-container ${
                      obj?.getJson().zip ? "" : "unfilled-container"
                    }`}
                  >
                    <div className="row-name">ZIPcode:</div>
                    <div className="row-field">
                      <ParentFormComponent
                        formClass="underline-form"
                        obj={obj}
                        name="zip"
                        inPopup={inPopup}
                        placeholder="ZIP"
                      />
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className="contact-contact-data">
              <div
                className={`row-container ${
                  obj?.getJson().source ? "" : "unfilled-container"
                }`}
              >
                <div className="row-name">Lead Source:</div>
                <div className="row-field">
                  <ParentFormComponent
                    formClass="underline-form"
                    obj={obj}
                    name="source"
                    inPopup={inPopup}
                    placeholder="unknown"
                  />
                </div>
              </div>
              <div className="row-container" title={"Comma separated"}>
                <div className="row-name" style={{ width: "fit-content" }}>
                  Tags:
                </div>
                <div className="row-field" title={"comma seperated"}>
                  <ParentFormComponent
                    formClass="underline-form"
                    obj={obj}
                    placeholder="ie. contacted, tag1, tag3"
                    name="tags"
                    inPopup={inPopup}
                  />
                </div>
              </div>

              <div
                className="row-container"
                style={{ flexDirection: "column", marginTop: "12px" }}
              >
                <div className="row-name" style={{ borderRight: "none" }}>
                  Notes
                </div>
                <div>
                  <ParentFormComponent
                    obj={obj}
                    type="quill"
                    name="notes"
                    inPopup={inPopup}
                  />
                </div>
              </div>

              {obj && obj?.getJson().date && (
                <>
                  <div
                    className="row-container"
                    style={{ flexDirection: "column", marginTop: "12px" }}
                  >
                    <div className="row-name" style={{ borderRight: "none" }}>
                      Contact Create Date
                    </div>
                    <div style={{ fontSize: "14px" }}>{createDate}</div>
                  </div>
                </>
              )}
            </div>


            <div
              //#region Buttons

              style={{
                paddingBottom: "20px",
                width: "100%", // Ensure container takes full width for flex justification
                display: "flex",

                justifyContent: "flex-end",
                alignContent: "flex-end",
                gap: "8px",
              }}
            >
              <div style={{marginRight:"0px"}}>
              {" "}
              {(this.propsState.currentContact?.getJson()?.autoAI && !this.propsState.popupSwitch?.includes("add")) ?
                (<div
                  onClick={() => {
                    this.propsState.currentContact.setCompState({ autoAI: false }, { run: true }, true);
                  }}
                  className="dark-button-1"
                  style={{
                    position: "relative",
                    width: "fit-content",
                  }}
                >
                  Turn off AI
                </div>) :
                (<div
                  onClick={() => {
                    this.propsState.currentContact.setCompState({ autoAI: true }, { run: true }, true);
                  }}
                  className="dark-button-1"
                  style={{
                    position: "relative",
                    width: "fit-content",
                  }}
                >
                  Turn on AI
                </div>)}
            </div>
              {!this.propsState?.currentContact?.getJson().finished && !this.propsState.popupSwitch.includes("add")?// Added condition to not show in add mode
                (
                  <div
                    onClick={() => {
                      this.propsState.currentContact?.setCompState(
                        { autoAI: false },
                        { run: true },
                        true
                      );


                      if(sequence) { // Check if sequence exists before updating
                         let finished = parseInt(sequence.getJson().finished) + 1;
                         sequence.setCompState({ finished: finished });
                         sequence.update();
                      }

                    }}
                    className="dark-button-1"
                  >
                    Turn off AI
                  </div>
                ) : (
                  <div
                    onClick={() => {
                      this.propsState.currentContact?.setCompState(
                        { autoAI: true },
                        { run: true },
                        true
                      );
                    }}
                    className="dark-button-1"
                  >
                    Turn on AI
                  </div>
                )}

              
              {!this.propsState.currentContact?.getJson().finished && (
                <>
                  {" "}
                  {!this.propsState.currentContact?.getJson().finished && (
                    <div
                      onClick={() => {
                        this.propsState.currentContact?.setCompState({
                          finished: true,
                        });
                        this.propsState.currentContact?.update();
                        let sequence = this.componentList.getComponent(
                          "sequence",
                          this.propsState.currentContact?.getJson().sequenceId
                        );
                        let finished =
                          parseInt(sequence?.getJson().finished) + 1;
                        sequence.setCompState({ finished: finished });
                        sequence.update();
                      }}
                      className="dark-button-1"
                      style={{
                        position: "relative",
                        width: "fit-content",
                        height: "fit-content",
                      }}
                    >
                      Remove From Sequence
                    </div>
                  )}
                  {button}
                </>
              )}

              {/*Container for the save button*/}
              {button}
            </div>

          </div> {/* Correctly closes the main content div with padding and scroller class */}
          </div>
        </>
    );
  }
}