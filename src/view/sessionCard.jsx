/**
 * @class OemPopupContent
 * @extends {BaseComponent}
 * This component renders a popup for adding or editing OEM information.  It uses other components from 'flinntech' for form elements and buttons.
 */
import {
  DelButton,
  ParentFormComponent,
  RunButton,
  UpdateButton,
  UploadButton,
} from "flinntech";
import { BaseComponent } from "flinntech";

export default class SessionCard extends BaseComponent {

  /**
   * Constructor for the OemPopupContent component.
   * @param {object} props - The component's properties.
   */
  constructor(props) {
    super(props);
    this.projectName="Homework"
    this.state = {
      ...this.state,
      defaultClass: "fit scroller", //Sets a default class for styling
    };
  }
  getSessionIdFromPath() {
    const path = window.location.pathname;          // e.g. "/session/rt606052125"
    const match = path.match(/^\/session\/([^/]+)/);
    return match ? match[1] : null;                 // "rt606052125" or null
  }
  componentDidMount(){
    let id = this.getSessionIdFromPath();
    let session = this.componentList.getComponent("session", id);
    this.dispatch({currentSession:session})
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
   
    return (
      <div
        style={{ padding: "10px", paddingBottom: "100px" }}
        className={this.props.pageClass || this.state.defaultClass}
      >
        <br />
        {this.propsState.currentSession&&<>
        <div className="content-home-add">
          <div>Session</div>
          <div className="row">
            <div>Name: </div>

            <ParentFormComponent
              obj={this.propsState.currentSession}
              name="name"
              wrapperClass="underline-form"
            />
          </div>
          <div className="row">
            {/* <div>content</div> */}
            <ParentFormComponent
              type="quill"
              obj={this.propsState.currentSession}
              name="content"
              wrapperClass="contentWrapper"
            />
          </div>
 
          <div className="row">
            {/* {this.propsState.popupSwitch.includes("update") && (
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
            )} */}

            <div
              className="col hover-basic"
              style={{ cursor: "pointer", width: "37px", height: "37px" }}
            >
              {/* <UploadButton
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
              /> */}
            </div>
            <div className="col">{button}</div>
          </div>
          <div></div>
          {/*<div className="popupButton" style={{width:"100%", display:"flex", justifyContent:"flex-end", alignContent:"flex-end"}}> /!*Container for the save button*!/*/}
          {/*  <div style={{paddingRight:"50px", paddingBottom:"20px"}}> /!*Container for button spacing*!/*/}
          {/*{button}</div> /!*Button to save changes*!/*/}
          {/*</div>*/}
        </div>
        </>}
      </div>
    );
  }
}
