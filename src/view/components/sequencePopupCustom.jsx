import React from "react";
import { BaseComponent } from "flinntech";
import "./Checkbox.css";
import contactImg from "../../assets/contact.png";
import CheckIt from "./check";
import { Link } from "react-router-dom";
import { Timestamp } from "firebase/firestore";

class SequencePopupCustomItem extends BaseComponent {
  constructor(props) {
    super(props);
    // preserve any initial state from BaseComponent
  }

  render() {
    const { obj } = this.props;
    let sequence = obj.getJson();
    return (
      <div className="sequence sequence-custom">
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
          onClick={() => {
            let obj = this.props.obj;

            let contacts = this.propsState.selectedContacts;
            if (this.propsState.sequenceDataType === "research") {
              let newContact = [];
              for (let prospect of contacts) {
                newContact.push(
                  this.componentList.getComponent(
                    "contact",
                    prospect.getJson()._id,
                    "ogPPId"
                  )
                );
              }
            }

            let step1 = this.componentList.getList(
              "step",
              [obj.getJson()._id],
              ["sequenceId"]
            );
            step1 = step1.filter(
              (obj) => obj.getJson().content !== "" && obj.getJson().content
            )[0];
            if (contacts?.length > 0) {
              let delay = parseFloat(step1.getJson().nextSend);
              let nextSend = new Date(Date.now() + delay * 60 * 60 * 1000);
              nextSend = Timestamp.fromDate(nextSend);
              for (let c of contacts) {
                let oldSeq = this.componentList.getComponent(
                  "sequence",
                  c.getJson().sequenceId
                );
                let tags = c.getJson().finishedSequenceTags || "";
                if (!oldSeq) {
                  if (
                    !c
                      .getJson()
                      .finishedSequenceTags.includes(oldSeq.getJson().name)
                  ) {
                    let addTag =
                      tags.length === 0
                        ? oldSeq.getJson().name
                        : "," + oldSeq.getJson().name;
                    tags = addTag;
                  }
                }

                c.setCompState(
                  {
                    sequenceId: obj.getJson()._id,
                    finishedSequenceTags: tags,
                    finished: false,
                    emailNumber: 0,
                    nextSend: nextSend,
                  },
                  { run: true }
                );
              }
              this.dispatch({ popupSwitch: "", selectedContacts: [] });
            }
          }}
        >
          <div className="title-left">{sequence.name}</div>

          <div>
            <div id="arrow-icon-appear" className="send-seq-icon">
                <i class="fa-solid fa-right-long"></i>
            </div>
          </div>
        </div>
        {/* <div className="row row-space-around">
                <div className="col">
                    <div>Active</div>
                    <div>455</div>
                </div>
                <div className="col">
                    <div>Completed</div>
                    <div>650</div>
                </div>
                <div className="col">
                    <div>Opened</div>
                    <div>4%</div>
                </div>
                <div className="col">
                    <div>Reply</div>
                    <div>1%</div>
                </div>
                <div className="col">
                    <div>Bounce</div>
                    <div>7%</div>
                </div>
            </div> */}
      </div>
    );
  }
}

export default SequencePopupCustomItem;
