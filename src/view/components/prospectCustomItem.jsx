import React from "react";
import { BaseComponent } from "flinntech";
import "./Checkbox.css";
import contactImg from "../../assets/contact.png"; // Keep if needed elsewhere, but avatar uses font-awesome now
import CheckIt from "./check";

class ProspectCustomItem extends BaseComponent {
  constructor(props) {
    super(props);
    // preserve any initial state from BaseComponent
    // No explicit state needed here if using propsState for selectedContacts
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

  async componentDidMount(){
    const { obj } = this.props;
    let update = false;
    if(Object.prototype.toString.call(obj.getJson().mobile) === "[object Object]" && obj.getJson().raw.phone_numbers?.[0]&&obj.getJson().mobile!==obj.getJson().raw?.raw_number){
      await obj.setCompState({mobile:obj.getJson().mobile.raw_number})
      update = true;
    }
    if(obj.getJson().raw?.city&&obj.getJson().city!==obj.getJson().raw?.city){
      await obj.setCompState({city:obj.getJson().raw?.city})
      update = true;

    }
    if(obj.getJson().raw?.state &&obj.getJson().state!==obj.getJson().raw?.state){
      await obj.setCompState({state:obj.getJson().raw?.state})      
      update = true;


    }
    if(update){
      await obj.update();
      this.dispatch();
    }
   


  }

  render() {
    const { obj } = this.props;
    // Assuming obj.getJson() is necessary and works
    let user = obj.getJson();
    const cons = this.props.app.state.selectedContacts
            ? [...this.props.app.state.selectedContacts]
            : [];
        let selected = cons.includes(obj);

    return (
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div 
          className="contact-item hover-darken" 
          style={{ background: selected ? "#2374ab10" : "white", position:"relative", paddingLeft:"5px"  }}>
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

          <div className="contact-avatar">
            <i className="fa-solid fa-user"></i>
          </div>
          <div className="contact-info">
            {/* Consider if this onClick logic is correct. It seems to open a popup for the *clicked* obj, not based on selection state. */}
            <div
              onClick={() => {
                
                  if (window.innerWidth > 600) {
                    this.dispatch({ currentContact: obj });
                  } else {
                    this.dispatch({
                      currentContact:obj,
                      currentPopupComponent: obj,
                      popupSwitch: "viewPotentialProspect",
                    });
                  }
                
              
              }}
              className="contact-name"
            >{`${user.firstName} ${user.lastName}`}</div>
            <div className="contact-desc">{user.company}</div>
          </div>
          <div  style={{ cursor: "pointer", width:"fit-content", }}>
            <div
             
              className="contact-icon"
            >
              <i className="fa-solid fa-message" />
            </div>
          </div>
        </div>
        <div
          // The 'active' class here might need dynamic logic if it depends on selection state
          className="contact-tag-container active"
        >
          {/* Use optional chaining and check if tags exist before splitting */}
          {user.tags?.split(",").map((text, index) => (
            // Add a key prop when mapping lists for performance and stability
            <button key={index} className="contact-tag-btn">
              {text}
            </button>
          ))}
        </div>
      </div>
    );
  }
}

export default ProspectCustomItem;
