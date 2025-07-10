import React from "react";
import { BaseComponent } from "flinntech";
import "./Checkbox.css";
import contactImg from "../../assets/contact.png"; // Keep if needed elsewhere, but avatar uses font-awesome now
import CheckIt from "./check";
import SCAIPopupButtonTest from "./debug/CustomPopupButton";

class ContactsCustomItem extends BaseComponent {
  constructor(props) {
    super(props);
  }

  // Use arrow function for auto-binding 'this'
  handleCheckContact = (obj) => {
    // Ensure we get the latest state within the handler
    // Although BaseComponent's dispatch might handle this, accessing state inside the handler
    // defined as a class method is safer.
    //for some reason propsState didn't update in this component though it did for all the other components
    let contacts = this.props.app.state.selectedContacts
      ? [...this.props.app.state.selectedContacts]
      : [];

    // Add the object if it's not already there (filter below handles removal, but prevent duplicates)
    if (!contacts.includes(obj)) {
      contacts.push(obj);
    }
    //same here something seems up with this component making it use a completely seperate dispatch.
    this.dispatch({ selectedContacts: contacts });
  };

  getTagUI(user) {
    return (
      <div
        // The 'active' class here might need dynamic logic if it depends on selection state
        className="contact-tag-container active"
      >
        {/* Use optional chaining and check if tags exist before splitting */}
        {user.tags
          ?.split(",")
          .filter((text) => text !== "")
          .map((text, index) => (
            // Add a key prop when mapping lists for performance and stability
            <button key={index} className="contact-tag-btn">
              {text}
            </button>
          ))}
        {user.finishedSequenceTags?.length > 0 && (
          <>
            {user.finishedSequenceTags?.split(",").map((text, index) => (
              // Add a key prop when mapping lists for performance and stability
              <>
                {text.length > 0 && (
                  <button
                    key={index}
                    className="contact-tag-btn finished-sequence-tags"
                  >
                    {text}
                  </button>
                )}
              </>
            ))}
          </>
        )}
        {user.sequenceId && (
          <>
            {user.finishedSequenceTags.includes(
              this.componentList
                .getComponent("sequence", user.sequenceId)
                ?.getJson().name
            ) && user.finished ? (
              <></>
            ) : (
              <>
                {this.componentList
                  .getComponent("sequence", user.sequenceId)
                  ?.getJson().name.length > 0 && (
                  <button
                    className={
                      `contact-tag-btn ${user.finished ?'finished-sequence-tags':'unfinished-sequence-tags'
                      }`}
                  >
                    {
                      this.componentList
                        .getComponent("sequence", user.sequenceId)
                        ?.getJson().name
                    }
                  </button>
                )}
              </>
            )}
            {user.replied && (
              <button
                className="contact-tag-btn unfinished-sequence-tags"
              >
                Replied
              </button>
            )}
          </>
        )}
      </div>
    );
  }

  // Use arrow function for auto-binding 'this'
  handleUncheckContact = (obj) => {
    // Ensure we get the latest state within the handler
    let contacts = this.props.app.state.selectedContacts
      ? [...this.props.app.state.selectedContacts]
      : [];

    // Filter out the object
    contacts = contacts.filter((contact) => contact !== obj);

    this.dispatch({ selectedContacts: contacts });
  };

  render() {
    const { obj } = this.props;
    // Assuming obj.getJson() is necessary and works
    let user = obj.getJson();
    const cons = this.props.app.state.selectedContacts
      ? [...this.props.app.state.selectedContacts]
      : [];
    let selected = cons.includes(obj);

    return (
      <div style={{ display: "flex", flexDirection: "column",}}>
        <div
          className="contact-item hover-darken"
          style={{
            background: selected ? "#2374ab10" : "white",
            position: "relative",
            paddingLeft: "5px",
          }}
        >
          <CheckIt
            checkKey="selectedContacts"
            obj={obj}
            // Pass references to the class methods
            check={this.handleCheckContact}
            uncheck={this.handleUncheckContact}
          />
          {/*<img*/}
          {/* src={user.picURL !== "" ? user.picURL || contactImg : contactImg}*/}
          {/* alt="头像"*/}
          {/* className="contact-avatar"*/}
          {/*/>*/}

          <div
            className="contact-info-expanded"
            style={{ cursor: "pointer", display: "flex", width: "100%" }}
            onClick={() => {
              if (window.innerWidth > 600) {
                this.dispatch({ currentContact: obj });
              } else {
                this.dispatch({
                  currentPopupComponent: obj,
                  popupSwitch: "updateContact",
                });
              }
            }}
          >
            <div className="contact-avatar">
              <i className="fa-solid fa-user"></i>
            </div>
            <div className="contact-info">
              {/* Consider if this onClick logic is correct. It seems to open a popup for the *clicked* obj, not based on selection state. */}
              <div className="contact-name">{`${user.firstName} ${user.lastName}`}</div>
              <div className="contact-desc">
                {user?.company ||
                  user?.title ||
                  user?.email ||
                  user?.mobile ||
                  ""}
              </div>
            </div>
          </div>
          <SCAIPopupButtonTest
            formClass="hover-basic"
            wrapperClass="icon-row"
            newProp="asdf"
            content={
              <div
                style={{ width: "fit-content" }}
                onClick={async () => {
                  ;
                  await this.operationsFactory.clear();
                  let contact = obj;
                  let conversation = this.componentList.getComponent(
                    "conversation",
                    contact.getJson().email,
                    "contact"
                  );
                  if (!conversation) {
                    await this.componentList.addComponents({
                      type: "conversation",
                      contact: contact.getJson().email,
                      contactName: `${contact.getJson().firstName} ${
                        contact.getJson().lastName
                      }`,
                      conversationOwner:
                        this.propsState.currentUser.getJson()._id,
                      ownerName: `${
                        this.propsState.currentUser.getJson().firstName
                      } ${this.propsState.currentUser.getJson().lastName}`,
                    });
                    conversation = this.componentList.getComponent(
                      "conversation",
                      contact.getJson().email,
                      "contact"
                    );
                  }
                  
                  let dm = { type: "email" };
                  dm = { prepare: { ...dm }, clean: true };
                  dm = await this.operationsFactory.prepare(dm);

                  if (Array.isArray(dm) && dm.length === 1) {
                    dm = dm[0];
                  }
                  let dispatchObj = {
                    popupSwitch: "addEmail",
                    currentPopupComponent: dm,
                  };
                  await this.dispatch({
                    ...dispatchObj,
                    currentConversation: conversation,
                    currentContact: contact,
                  });
                }}
                //   onClick={()=>{
                //     let conversation = this.componentList.getComponent("conversations", user.getJson().email, "recipient");
                //     let newEmail = this.operationsFactory.prepare();

                //   }}
                // TODO: Taylor? this needs to open up messaging to that contact

                className="contact-icon"
              >
                <i
                  className="fa-solid fa-message"
                  // onClick={()=>{
                  // let conversation = this.componentList.getComponent("conversation", user._id, "contact");
                  // if(!conversation){
                  //     let convoJson = {
                  //         type: "conversation",
                  //         ownerName: this.propsState.currentUser.getJson()._id,
                  //         conversationOwner: this.propsState.currentUser.getJson()._id,
                  //         contact:user._id,
                  //         contactName: user.firstName + " "+ user.lastName,
                  //     }
                  //     conversation = this.operationsFactory.prepare({prepare:convoJson, clean:true, run:true});
                  //     conversation = conversation[0];
                  //     this.dispatch({currentConversation:conversation, newConvo:true})
                  //navigate

                  // }
                  // }}
                />
              </div>
            }
          />
        </div>
        {this.getTagUI(user)}
        {/* {this.state.redirect&& <RedirectMessage/>} */}
      </div>
    );
  }
}

// function RedirectMessage() {
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Navigate to home ('/') when this component is mounted
//     navigate('/conversation');
//   }, [navigate]);

//   // Optionally, render nothing or a loading indicator
//   return null;
// }

export default ContactsCustomItem;
