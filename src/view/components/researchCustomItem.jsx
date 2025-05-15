import React from "react";
import { BaseComponent } from "flinntech";
import "./Checkbox.css";
import contactImg from "../../assets/contact.png"; // Keep if needed elsewhere, but avatar uses font-awesome now
import CheckIt from "./check";
import ContactsCustomItem from "./contactsCustom";

class ResearchCustomItem extends ContactsCustomItem {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
      count: 0,
    };
  }

  componentDidMount() {
    if (this.state.count <= 0) {
      const { app, obj } = this.props;
      let cList = app.state.componentList;
      let list = cList.getList(
        "potentialProspect",
        obj?.getJson()._id,
        "researchId"
      );
      let count = list.length;
      this.setState({
        count,
      });
    }
  }

  render() {
    const { obj, app } = this.props;
    // Assuming obj.getJson() is necessary and works
    let research = obj.getJson();
    let isActive = research.isActive;

    return (
      <div style={{ display: "flex", flexDirection: "column", }}>
        <div style={{padding:"20px" }}
          className={`contact-item ${isActive ? "contact-item-active" : ""}`}
        >
          {/*<img*/}
          {/* src={user.picURL !== "" ? user.picURL || contactImg : contactImg}*/}
          {/* alt="Avatar"*/}
          {/* className="contact-avatar"*/}
          {/*/>*/}

          {/* <div className="contact-avatar">
                        <i className="fa-solid fa-user"></i>
                    </div> */}
          <div className="contact-info">
            {/* Consider if this onClick logic is correct. It seems to open a popup for the *clicked* obj, not based on selection state. */}
            <div
              onClick={() => {
                // Assuming obj here refers to the current contact object being rendered
                this.dispatch({
                  currentPopupComponent: obj,
                  popupSwitch: "updateContact",
                });
              }}
              className="contact-name"
            >{`${research.name} `}</div>

            
              <div className="contact-desc">
                {`${this.state.count} Contact${this.state.count!==1?'s':''} Found`}
              </div>
            
          </div>
          <div
            className={`profile-status ${
              isActive ? "profile-status-active" : ""
            }`}
          >
            <i className="fa-solid fa-circle" />
            <span>{isActive ? "Active" : "Paused"}</span>
          </div>
        </div>
        <div
          // The 'active' class here might need dynamic logic if it depends on selection state
          className="contact-tag-container active"
        >
          {/* Use optional chaining and check if tags exist before splitting */}
          {this.getTagUI(research)}
        </div>
      </div>
    );
  }
}

export default ResearchCustomItem;
