/**
 * @class OemPopupContent
 * @extends {BaseComponent}
 * This component renders a popup for adding or editing OEM information.  It uses other components from 'flinntech' for form elements and buttons.
 */
import { DelButton, MapComponent, ParentFormComponent, PopupButton, RunButton, UpdateButton, UploadButton } from "flinntech";
import { BaseComponent } from "flinntech";
import AppointmentCustomItem from "./components/appointmentCustomItem";
import GoalLightCustom from "./components/goalLightCustom";
import HwLightCustom from "./components/hwLightCustom";

export default class ContactProfileDetailCard extends BaseComponent {
    /**
     * Constructor for the OemPopupContent component.
     * @param {object} props - The component's properties.
     */
    constructor(props) {
        super(props);
        this.state = {
            ...this.state,
            defaultClass: "fit scroller", //Sets a default class for styling
        }
    }
    /**
     * Renders the OemPopupContent component.
     * @returns {JSX.Element} The rendered component.
     */
    render() {
        // Determine screen-based overrides
        let isWideScreen = window.innerWidth > 600;
        if (this.propsState.popupSwitch?.includes("addContact")) {
            isWideScreen = false
        }
        let obj = isWideScreen ? this.propsState.currentContact : this.props.obj;

        const effectivePopupComponent = isWideScreen ? this.propsState.currentContact : this.propsState.currentPopupComponent;
        const inPopup = isWideScreen ? false : true;

        // Determine the text for the heading based on whether an object is provided
        let text = obj ? "Edit" : "Add"
        // Set default button to RunButton
        let button = <RunButton content="Save" isPopup={inPopup} callbackFunc={this.props.callbackFunc} />
        //If an object is provided, change button to UpdateButton
        if (this.propsState.popupSwitch?.includes("updateContact") || (window.innerWidth > 600 && !this.propsState.popupSwitch?.includes("addContact"))) {

            button = <UpdateButton obj={effectivePopupComponent} content="Save" isPopup={inPopup} callbackFunc={this.props.callbackFunc} />
        }
        return (

            <div style={{ padding: "10px", paddingBottom: "100px", height: "100%" }} className={this.props.pageClass || this.state.defaultClass}>

                <div>
                    <div className="div client-profile-dash">

                        <div className="row row-align-start row-justify-left">
                            <div className="col-left profile-detail-left-col">

                                <div className="row client-profile">
                                    <div className="client-avatar">
                                        <i className="fa-solid fa-user"></i>
                                    </div>
                                    <div className="client-info">
                                        <div className="client-name">{this.propsState.currentContact?.getJson().firstName} {this.propsState?.currentContact?.getJson().lastName}</div>
                                        <PopupButton obj={this.propsState.currentContact} content={<div className="client-desc">Edit Profile</div>} popupSwitch="updateContact" />
                                        <div onClick={async ()=>{
                                            let obj = this.propsState.currentContact

                                            // In whatever place you set up your email object:
                                            let subject = "Welcome to Viridian! Claim Your New Account";
                                            let link = `https://viridian-3afda.web.app/clientregister/${obj.getJson()._id}`;

                                            // And for the body:
                                            let text = `
                         Hi ${obj.getJson().firstName},
                         
                         Congratulations! You've been successfully added to Viridian.
                         
                         To get started, please click the link below to claim and activate your account:
                         
                         ${link}
                         
                         If you have any questions or need help, just reply to this email and we'll be happy to assist.
                         
                         Welcome aboard!
                         
                         Best regards,
                         Viridian 
                         `;


                                            //  this.prepNewMessage();

                                            // const { originalMessageId, from, to, subject, text } = req.body;
                                            let body = {
                                                from: this.propsState.currentUser.getJson()._id,
                                                to: obj.getJson().email,
                                                subject: subject,
                                                text: text,
                                            };
                                            let url = "https://gmailapiemailhandler-dleyjvnyfa-uc.a.run.app"

                                            // Make the POST request
                                            await fetch(url, {
                                                method: "POST",
                                                headers: {
                                                    "Content-Type": "application/json",
                                                },
                                                body: JSON.stringify(body),
                                            })
                                                .then((response) => {
                                                    if (!response.ok) {
                                                        throw new Error(`HTTP error! Status: ${response.status}`);
                                                    }
                                                    return response.json();
                                                })
                                                .then((data) => {
                                                    console.log("Reply sent successfully in thread.", data);
                                                })
                                                .catch((error) => {
                                                    console.error("Error sending reply:", error);
                                                });
                                        }}>
                                            Send Login
                                        </div>
                                    </div>
                                </div>
                                <div className="row row-left padding-0 client-contact-div" style={{ position: "relative" }}>
                                    <div className="client-contact col col-left padding-0">
                                        <div className="client-contact-phone row">
                                            <div><i className="fa-solid fa-phone"></i></div>
                                            <div>{this.propsState.currentContact?.getJson().phone}</div>
                                        </div>
                                        <div className="client-contact-email row">
                                            <div><i className="fa-solid fa-envelope"></i></div>
                                            <div>{this.propsState.currentContact?.getJson().email}</div>
                                        </div>
                                    </div>
                                    <div className="contact-profile-delete-btn" style={{ position: "absolute", right: "0px", bottom: "0px" }}>
                                        <DelButton content="delete" obj={this.propsState.currentContact} callbackFunc={() => { this.dispatch({ currentContact: undefined }) }} />
                                    </div>

                                </div>
                                <hr/>
                            <div className="row row-align-start row-justify-left">
                                <div className="col client-appointments">
                                    <div className="appointment-title">Appointment History</div>
                                    <PopupButton wrapperStyle={{ width: "200px" }} formClass="dark-green-button" content={"+ Appointment"} popupSwitch="addCalendarEvent" obj={{ type: "calendarEvent", contactId: this.propsState.currentContact.getJson()._id, name: this.propsState.currentContact.getJson().firstName + " " + this.propsState.currentContact.getJson().lastName }} />
                                    <div className="row appointment-upcoming">
                                        <svg viewBox="0 0 100 10" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
                                            <line x1="0" y1="5" x2="100" y2="5" stroke="currentColor" stroke-width="1" />
                                        </svg>
                                        <div className="appointment-upcoming-text">Appointments</div>
                                        <svg viewBox="0 0 100 10" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
                                            <line x1="0" y1="5" x2="100" y2="5" stroke="currentColor" stroke-width="1" />
                                        </svg>
                                    </div>

                                    <MapComponent name="calendarEvent" cells={[{ type: "custom", custom: AppointmentCustomItem }]} filter={{ search: this.propsState.currentContact.getJson()._id, attribute: "contactId" }} />



                                </div>
                            </div>
                        </div>
                            <div className="col-left profile-detail-right-col">
                                <div className="col-left client-second-col">
                                    <PopupButton wrapperStyle={{ width: "200px" }} formClass="dark-green-button" content="addHomework" obj={{ type: "homework", contactId: this.propsState.currentContact.getJson()._id }} popupSwitch="addHomework" />

                                    <div className="client-homework">
                                        {/*<MapComponent className={"client-homework"}...*/}
                                        <MapComponent className={"client-homework"} name="homework" cells={[{ type: "custom", custom: HwLightCustom }]} filter={{ search: this.propsState.currentContact.getJson()._id, attribute: "contactId" }} />
                                    </div>
                                    <PopupButton wrapperStyle={{ width: "200px" }} formClass="dark-green-button" content="addGoal" obj={{ type: "goal", contactId: this.propsState.currentContact.getJson()._id }} popupSwitch="addGoal" />
                                    <div className="client-goal">
                                    <MapComponent name="goal" cells={[{ type: "custom", custom: GoalLightCustom }]} filter={{ search: this.propsState.currentContact.getJson()._id, attribute: "contactId" }} />
                                    </div>

                                    {/* <div className="col col-left client-notes">
                         <div className="client-note-title">Homework and Go</div>
                         <div className="client-note-detail">These are short, famous texts in English from classic
                             sources like the Bible or Shakespeare. Some texts have word definitions and explanations to
                             help you. Some of these texts are written in an old style of English. Try to understand
                             them, because the English that we speak today is based on what our great, great, great,
                             great grandparents spoke before! Of course, not all these texts were originally written in
                             English. The Bible, for example, is a translation. But they are all well known in English
                             today, and many of them express beautiful thoughts.
                         </div>
                     </div> */}
                                    <div className="row client-modules">
                                        <div className="col">Billing History</div>
                                        <div className="col"></div>
                                        <div className="col"></div>
                                    </div>
                                    <div className="row client-form-responses">
                                        <div className="client-form-responses-cell"></div>
                                    </div>
                                </div></div>
                        </div>

                    </div>
                </div>



            </div>
        )
    }


}