import React from "react";
import { BaseComponent, urlService } from "flinntech";
import "./Checkbox.css";
import contactImg from "../../assets/contact.png";
import CheckIt from "./check";
import { Link } from "react-router-dom";
import stripHTML from "../../service/heDecoderService";

class AssignedProspectsCustom extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
      style: {
        width: "fit-content",
        font: "normal normal 900 10px / 14px Satoshi",
        padding: "6px 17px",
        letterSpacing: ".5px",
        color:"white",
        borderRadius:"53px",
        marginTop:"0px"
      },
      plainText: "", // Store the stripped text
    };
  }

  getText(obj) {
    let text = "Active";
    let textColor = "#9a9a9a";
    if (obj.getJson().finished) {
      text = "Finished";
      if (obj.getJson().bounced) {
        text = "Bounced";
        textColor = '#BE5858';
      }
      if (obj.getJson().replied) {
        text = "Replied";
        textColor = '#2374AB'
      }
    }

    let span = (
      <div
        className={"contact-tag-btn"}
        style={{ ...this.state.style, 
            background: textColor+" 0% 0% no-repeat",}}
      >
        {text}
      </div>
    );
    return span;
  }

  render() {
    let user = this.props.obj?.getJson();
    let infoPriority = user?.mobile ? user?.mobile : user?.email;
    let name =
      user.firstName || user.lastName
        ? `${user.firstName} ${user.lastName}`
        : infoPriority;
    let stageText = this.getText(this.props?.obj);

    return (
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div className="contact-info" style={{ flex: 2 }}>
          {/* Consider if this onClick logic is correct. It seems to open a popup for the *clicked* obj, not based on selection state. */}
          <div className="contact-name">{`${user.firstName} ${user.lastName}`}</div>
          <div className="contact-desc">
            {user?.company || user?.title || user?.email || user?.mobile || ""}
            <div>step: {parseInt(user.emailNumber)+1}</div>
          </div>
        </div>

        <div style={{ display: "flex", flex: 1, gap: "3px", justifyContent:"flex-end" }}>
          <div>{stageText}</div>

          {!this.props.obj.getJson().finished && (
            <div
              title="Remove from Sequence"
              onClick={() => {
                this.props.obj.setCompState({ finished: true });
                this.props.obj.update();
                let sequence = this.propsState.currentSequence;
                let finished = parseInt(sequence.getJson().finished) + 1;
                sequence.setCompState({ finished: finished });
                sequence.update();
              }}
              className="dark-button-1"
            >
              Remove
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default AssignedProspectsCustom;
