/**
 * @class OemPopupContent
 * @extends {BaseComponent}
 * This component renders a popup for adding or editing OEM information.  It uses other components from 'flinntech' for form elements and buttons.
 */
import {
  ParentFormComponent,
  RunButton,
  UpdateButton,
  UploadButton,
} from "flinntech";
import { BaseComponent } from "flinntech";
import email from "../../assets/email_24dp_05050.svg";
import phone from "../../assets/phone.svg";
import PdfTextUpload from "../textUploader";

export default class AddTrainingPopup extends BaseComponent {
  types = {
    dataTraining: "profile",
    dataPreference: "training",
    chatbot: "content",
    valueProp: "valueProposition",
    genTraining: "content",
    companyVetting: "training",
    rules: "rules",
    other: "training"


  }
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
    let obj = this.propsState.currentPopupComponent

    let button = (
      <RunButton
        formClass="dark-button-1"
        content="Save"
        isPopup={true}

      />
    );

    return (
      <>
        <h2 style={{ position: "sticky", top: 0, padding: "2%", width: "80%" }}>
          Add Training Doc
        </h2>
        

        <div className="contact-Add-container">
          <div className="contact-contact-data">
            <div
              className={`row-container ${obj?.getJson().owner ? "" : "unfilled-container"
                }`}
            >
              <div className="row-name">Owner</div>
              <div className="row-field">
                <ParentFormComponent
                  obj={obj}
                  formClass="underline-form"
                  name="owner"
                  placeholder="owner"
                  inPopup={true}
                />
              </div>
            </div>
            {/* Training Type */}
            <div className={`row-container ${obj?.getJson().trainingType ? "" : "unfilled-container"}`}>
              <div className="row-name">Training Type</div>
              <div className="row-field">
                <ParentFormComponent
                  obj={obj}
                  formClass="underline-form"
                  name="trainingType"
                  placeholder="e.g., valueProp, content, training"
                  inPopup={true}
                  callbackFunc={(objs) => {
                    
                    let obj = objs[0];
                    this.setState({trainingType:obj.getJson().trainingType})
                    // post-change side effects
                  }}
                />
              </div>
            </div>

          
               {/* email type */}
               <div className={`row-container ${obj?.getJson().prompt ? "" : "unfilled-container"}`}>
              <div className="row-name">Email Type (only if its a type for messaging)</div>
              <div className="row-field">
                <ParentFormComponent
                  obj={obj}
                  formClass="underline-form"
                  name="emailType"
                  placeholder="Template training in general for messaging"
                  inPopup={true}
                />
              </div>
            </div>

            {/* Prompt */}
            <div className={`row-container ${obj?.getJson().prompt ? "" : "unfilled-container"}`}>
              <div className="row-name">Prompt (only if its a type for messaging)</div>
              <div className="row-field">
                <ParentFormComponent
                  obj={obj}
                  formClass="underline-form"
                  name="prompt"
                  placeholder="Optional: override prompt for this training doc"
                  inPopup={true}
                />
              </div>
            </div>

            <PdfTextUpload
                    callBack={async ({ data }) => {
                        debugger
                        const fieldByType = { pdf: "fullText", text: "text" };
                        const field = fieldByType[data.type];
                        let contentType = this.types[this.state.trainingType]
                        if(this.state.trainingType==="rules"){
                            contentType = this.types.rules
                
                        }
                        if(!contentType){
                            contentType = this.types.other
                        }
                        await obj.setCompState({ [contentType]: data[field] });
                        this.dispatch({uploadText: data[field]})
                        this.setState({
                          content: data[field]
                        })
                       

                    }}
                />
                Training Content:
                {this.state.content}
          </div>
        </div>
        <div
          //#region Buttons

          style={{
            paddingBottom: "20px",
            width: "100%", // Ensure container takes full width for flex justification
            display: "flex",

            justifyContent: "flex-end",
            alignContent: "flex-end",
            gap: "8px",
          }}
        >


          {/*Container for the save button*/}
          {button}
        </div>



      </>
    );
  }
}