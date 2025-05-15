/**
 * @class OemPopupContent
 * @extends {BaseComponent}
 * This component renders a popup for adding or editing OEM information.  It uses other components from 'flinntech' for form elements and buttons.
 */
import {
  DelButton,
  MapComponent,
  ParentFormComponent,
  RunButton,
  UpdateButton,
  UploadButton,
} from "flinntech";

import { BaseComponent } from "flinntech";
import SelectTemplate from "../components/templateCustomSelect";
import Templates from "../Templates";
export default class CreateStepPopup extends BaseComponent {
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
  /**
   * Renders the OemPopupContent component.
   * @returns {JSX.Element} The rendered component.
   */
  render() {
    // Determine the text for the heading based on whether an object is provided
    let text = this.props.obj ? "Edit" : "Add";
    // Set default button to RunButton
    let button = (
      <RunButton
        formClass={"dark-button-1"}
        content="Save"
        isPopup={true}
        callbackFunc={this.props.callbackFunc}
      />
    );
    //If an object is provided, change button to UpdateButton
    if (this.propsState.popupSwitch.includes("update")) {
      button = (
        <UpdateButton
          formClass={"dark-button-1"}
          obj={this.propsState.currentPopupComponent}
          content="Save"
          isPopup={true}
          callbackFunc={this.props.callbackFunc}
        />
      );
    }
    return (
      <div
        style={{ padding: "10px", paddingBottom: "100px" }}
        className={this.props.pageClass || this.state.defaultClass}
      >
        <div style={{ display: "flex", gap: "8px" }}>
          <div
            className="dark-button-1"
            style={{
              position: "relative",
              width: "fit-content",
            }}
          >
            Draft With AI
          </div>
          <div
            className="dark-button-1"
            style={{
              position: "relative",
              width: "fit-content",
            }}
            onClick={() => {
              this.setState({ selectTemplate: true });
            }}
          >
            Select Template
          </div>
        </div>
        {this.state.selectTemplate && (
          <MapComponent
            name="template"
            filterFunc={(obj) => {
              if (obj.getJson().content === undefined) {
                return false;
              }
              if (obj.getJson().content === "") {
                return false;
              }
              let retVal = false;
              if (!this.propsState.searchText) {
                retVal = true;
              }
              let filterText = this.propsState.searchText;

              if (
                obj
                  .getJson()
                  .content?.toLowerCase()
                  .includes(filterText?.toLowerCase())
              ) {
                retVal = true;
              }

              return retVal;
            }}
            cells={[{ type: "custom", custom: SelectTemplate }]}
          />
        )}
        <br />
        <div className="content-home-add">
          <div className="contact-contact-data">
            <div className="row row-container">
              <div className="row-name" style={{maxWidth:"fit-content"}}>Subject:</div>
              <div className="row-field">
                <ParentFormComponent
                  obj={this.propsState.currentPopupComponent}
                  name="subject"
                  formClass="underline-form"
                />
              </div>
            </div>
          </div>
          <div className="row">
            {/* <div>content</div> */}
            <ParentFormComponent
              type="quill"
              obj={this.propsState.currentPopupComponent}
              name="content"
              wrapperClass="contentWrapper"
            />
          </div>
          <div className="row">
            <div>{`Trigger this step in:`}</div>
            <ParentFormComponent
              obj={this.propsState.currentPopupComponent}
              name="nextSend"
              formClass="underline-form"
              wrapperStyle={{ 
                width: "10%", 
                marginRight: "8px", 
                borderBottom:"1px solid rgb(212, 212, 212)" }}
              //This needs to accept only numbers
              //TODO: Jared or Taylor
            />
            {` days`}
          </div>
          <div className="row">
            {this.propsState.popupSwitch.includes("update") && (
              <DelButton
                obj={this.propsState.currentPopupComponent}
                formClass="del-button-1"
                callbackFunc={() => {
                  this.dispatch({
                    popupSwitch: "",
                    currentPopupComponent: undefined,
                  });
                }}
              />
            )}

            <div
              className="col hover-basic"
              style={{ cursor: "pointer", width: "37px", height: "37px" }}
            >
              <UploadButton
                obj={this.propsState.currentPopupComponent}
                content={
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      borderRadius: "50%",
                      justifyContent: "center",
                      fontSize: "19px",
                      width: "37px",
                      height: "37px",
                      background: "#378c75",
                      color: "#ade0d3",
                    }}
                  >
                    <div className="icon-last">
                      <i className="fa-solid fa-plus"></i>
                    </div>
                  </div>
                }
              />
            </div>
            <div className="col">{button}</div>
          </div>
          <div></div>
          {/*<div className="popupButton" style={{width:"100%", display:"flex", justifyContent:"flex-end", alignContent:"flex-end"}}> /!*Container for the save button*!/*/}
          {/*  <div style={{paddingRight:"50px", paddingBottom:"20px"}}> /!*Container for button spacing*!/*/}
          {/*{button}</div> /!*Button to save changes*!/*/}
          {/*</div>*/}
        </div>
      </div>
    );
  }
}
