/**
 * @class OemPopupContent
 * @extends {BaseComponent}
 * This component renders a popup for adding or editing OEM information.  It uses other components from 'flinntech' for form elements and buttons.
 */
import { ParentFormComponent, RunButton, UpdateButton, UploadButton } from "flinntech";
import { BaseComponent } from "flinntech";

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
        let button = <RunButton content="Save" isPopup={false} callbackFunc={async (ob) => {
            let obj = this.propsState.currentPopupComponent
            debugger
            // In whatever place you set up your email object:
            let subject = "Welcome to Viridian! Claim Your New Account";
            let link = `http://localhost:5173/clientregister/${obj.getJson()._id}`;
            debugger
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

debugger
            //  this.prepNewMessage();

            // const { originalMessageId, from, to, subject, text } = req.body;
            let body = {
                from: this.propsState.currentUser.getJson()._id,
                to: obj.getJson().email,
                subject: subject,
                text: text,
            };
            let url = "https://gmailapiemailhandler-7c5i3vsqma-uc.a.run.app"

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
                this.dispatch({popupSwitch:"", currentPopupComponent:undefined})
        }} />
        //If an object is provided, change button to UpdateButton
        if (this.propsState.popupSwitch?.includes("updateContact") || (window.innerWidth > 600 && !this.propsState.popupSwitch?.includes("addContact"))) {

            button = <UpdateButton obj={effectivePopupComponent} content="Save" isPopup={inPopup} callbackFunc={this.props.callbackFunc} />
        }
        return (

            <div style={{ padding: "10px", paddingBottom: "100px", height: "100%" }} className={this.props.pageClass || this.state.defaultClass}>
                <h2>{text} Contact</h2> {/*Heading for the popup*/}
                <div className="contact-Add-container">

                    <div className="row">
                        <div>First Name</div>
                        <div style={{ width: "70%", marginLeft: "7px" }}> {/*Container for the title input*/}
                            <ParentFormComponent obj={obj} name="firstName" inPopup={inPopup} /> {/*Component for title input*/}

                        </div>
                    </div>



                    <div className="row">
                        <div>Last Name</div>
                        <div style={{ width: "70%", marginLeft: "7px" }}> {/*Container for the title input*/}
                            <ParentFormComponent obj={obj} name="lastName" inPopup={inPopup} /> {/*Component for title input*/}

                        </div>
                    </div>



                    <div className="row">
                        <div>Email</div>
                        <div style={{ width: "70%", marginLeft: "7px" }}> {/*Container for the title input*/}
                            <ParentFormComponent obj={obj} name="email" inPopup={inPopup} /> {/*Component for title input*/}
                        </div>
                    </div>
                    <div className="row">
                        <div>Phone</div>
                        <div style={{ width: "70%", marginLeft: "7px" }}> {/*Container for the title input*/}
                            <ParentFormComponent obj={obj} name="phone" inPopup={inPopup} /> {/*Component for title input*/}
                        </div>
                    </div>





                    <div className="row">
                        <div>Address</div>
                        <div style={{ width: "70%", marginLeft: "7px" }}> {/*Container for the title input*/}
                            <ParentFormComponent obj={obj} name="address" inPopup={inPopup} /> {/*Component for title input*/}
                        </div>
                    </div>
                    <div className="row">
                        <div>Birth</div>
                        <div style={{ width: "70%", marginLeft: "7px" }}> {/*Container for the title input*/}
                            <ParentFormComponent obj={obj} name="birth" inPopup={inPopup} /> {/*Component for title input*/}
                        </div>
                    </div>






                    <div className="popupButton" style={{ width: "100%", display: "flex", justifyContent: "flex-end", alignContent: "flex-end" }}> {/*Container for the save button*/}
                        <div style={{ paddingRight: "50px", paddingBottom: "20px" }}> {/*Container for button spacing*/}
                            {button}</div> {/*Button to save changes*/}
                    </div>
                </div>



            </div>
        )
    }


}