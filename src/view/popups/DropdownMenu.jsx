import React from "react";
import { MoreHorizontal } from "lucide-react";
import { BaseComponent, DelButton, PopupButton } from "flinntech";

export default class DropdownMenu extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
    this.dropdownRef = React.createRef();

    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.handleAction = this.handleAction.bind(this);
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  handleClickOutside(event) {
    if (this.dropdownRef.current && !this.dropdownRef.current.contains(event.target)) {
      this.setState({ isOpen: false });
    }
  }

  handleAction(action) {
    console.log(`${action} clicked`);
    this.setState({ isOpen: false });
  }

  render() {
    const { isOpen } = this.state;

    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="relative" style={{ width: "150px" }} ref={this.dropdownRef}>
          <div
            onClick={() => this.setState({ isOpen: !isOpen })}
            className="p-2 rounded-lg hover:bg-gray-200 transition-colors"
            aria-label="More options"
          >
            <MoreHorizontal className="w-6 h-6 text-gray-700" />
          </div>

          {isOpen && (
            <div className="col col-left absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden z-10">
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
                                        <div className="contact-profile-delete-btn" style={{ position: "absolute", right: "0px", bottom: "0px" }}>
                                        <DelButton content="delete" obj={this.propsState.currentContact} callbackFunc={() => { this.dispatch({ currentContact: undefined }) }} />
                                    </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}
