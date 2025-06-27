/**
 * @class ContactPopup
 * @extends {BaseComponent}
 * This component renders a popup for adding or editing Contact information with simplified fields.
 * It uses components from 'flinntech' for form elements and buttons.
 */
import { ParentFormComponent, RunButton, UpdateButton } from "flinntech";
import { BaseComponent } from "flinntech";

export default class ResearchPopup extends BaseComponent {
  /**
   * Constructor for the ContactPopup component.
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
   * Renders the ContactPopup component.
   * @returns {JSX.Element} The rendered component.
   */
  render() {
    // The object containing the data for the form, either for adding or editing
    const obj = this.props.obj;

    // Determine the text for the heading based on whether an object is provided
    let text = obj ? "Edit" : "Add";

    // Set default button to RunButton for adding, UpdateButton for editing
    let button = obj ? (
      <UpdateButton
        formClass="dark-button-1"
        obj={obj}
        content="Save"
        isPopup={true}
        callbackFunc={this.props.callbackFunc}
      />
    ) : (
      <RunButton
        formClass="dark-button-1"
        content="Save"
        isPopup={true}
        callbackFunc={this.props.callbackFunc}
      />
    );

    return (
      <div
        style={{ padding: "1px", paddingBottom: "100px", height: "100%" }}
        className={this.props.pageClass || this.state.defaultClass}
      >
        <h2>{text} Research Prompt</h2> {/*Heading for the popup*/}
        <div
          className="contact-contact-data"
          style={{
            padding: "10px",
            background: "rgb(245, 244, 244)",
            borderRadius: "12px",
          }}
        >
          <div className="row-container" style={{ flexDirection: "column" }}>
            <div className="row-name">Profile Name:</div>
            <div className="row-field" style={{ width: "100%" }}>
              {" "}
              {/*Container for the name input*/}
              <ParentFormComponent
                obj={obj}
                placeholder="ie: Daily Research"
                // formClass="underline-form"
                name="name"
                inPopup={true}
              />{" "}
              {/*Component for name input*/}
            </div>
          </div>
          <div className="row-container" style={{ flexDirection: "column" }}>
            <div className="row-name">Search Frequency:</div>
            <div className="row-field" style={{ width: "100%" }}>
              {" "}
              {/*Container for the name input*/}
              <ParentFormComponent
                obj={obj}
                placeholder="How often do you want new research results?"
                // formClass="underline-form"
                name="searchFrequency"
                inputType="select"
                inPopup={true}
                selectOptions={["Daily", "Weekly", "Monthly"]}
              />{" "}
              {/*Component for name input*/}
            </div>
          </div>

          <div className="row-container" style={{ flexDirection: "column" }}>
            <div className="row-name">Description:</div>
            <div className="row-field" style={{ width: "100%" }}>
              {" "}
              {/*Container for the AI Prompt input*/}
              <ParentFormComponent
                obj={obj}
                placeholder={`Describe your target prospect. “I.e. Research VP of Sales at Tech Companies with less than 100M in sales”`}
                // formClass="underline-form"
                name="AIPrompt"
                // type="quill"
                inPopup={true}
              />{" "}
              {/*Component for AI Prompt input (using Quill editor)*/}
            </div>
          </div>

          <div className="row-container" style={{ flexDirection: "column" }}>
            <div className="row-name">Keywords:</div>
            <div className="row-field" style={{ width: "100%" }}>
              {" "}
              {/*Container for the AI Prompt input*/}
              <ParentFormComponent
                obj={obj}
                placeholder={`Which keywords are in the title of the prospects you are seeking?`}
                // formClass="underline-form"
                name="keywords"
                // type="quill"
                inPopup={true}
              />{" "}
              {/*Component for AI Prompt input (using Quill editor)*/}
            </div>
          </div>

          <div className="row-container" style={{ flexDirection: "column" }}>
            <div className="row-name">Company Size by Revenue:</div>
            <div className="row-field" style={{ width: "100%" }}>
              {" "}
              {/*Container for the AI Prompt input*/}
              <ParentFormComponent
                obj={obj}
                name="companySizebyRevenue"
                inPopup={true}
              />{" "}
              {/*Component for AI Prompt input (using Quill editor)*/}
            </div>
          </div>

          <div className="row-container" style={{ flexDirection: "column" }}>
            <div className="row-name">Company Size by # of Employees:</div>
            <div className="row-field" style={{ width: "100%" }}>
              {" "}
              {/*Container for the AI Prompt input*/}
              <ParentFormComponent
                obj={obj}
                name="companySizebyEmployees"
                inPopup={true}
              />{" "}
              {/*Component for AI Prompt input (using Quill editor)*/}
            </div>
          </div>

          <div className="row-container" style={{ flexDirection: "column" }}>
            <div className="row-name">Geographic Location:</div>
            <div className="row-field" style={{ width: "100%" }}>
              {" "}
              {/*Container for the AI Prompt input*/}
              <ParentFormComponent
                obj={obj}
                name="location"
                inPopup={true}
              />{" "}
              {/*Component for AI Prompt input (using Quill editor)*/}
            </div>
          </div>

          <div className="row-container" style={{ flexDirection: "column" }}>
            <div className="row-name">Decision Making Level:</div>
            <div className="row-field" style={{ width: "100%" }}>
              {" "}
              {/*Container for the AI Prompt input*/}
              <ParentFormComponent
                obj={obj}
                placeholder={`Any, Non-Manager, Manager, Director, VP, C-Level`}
                name="contactLevel"
                inPopup={true}
                inputType="select"
                selectOptions={[
                  "Any",
                  "Non-Manager",
                  "Director",
                  "VP",
                  "C-Level",
                ]}
              />{" "}
              {/*Component for AI Prompt input (using Quill editor)*/}
            </div>
          </div>

          <div className="row-container" style={{ flexDirection: "column" }}>
            <div className="row-name">Department:</div>
            <div className="row-field" style={{ width: "100%" }}>
              {" "}
              {/*Container for the AI Prompt input*/}
              <ParentFormComponent
                obj={obj}
                placeholder={"i.e. IT, HR, Sales, Marketing etc."}
                name="department"
                inPopup={true}
              />{" "}
              {/*Component for AI Prompt input (using Quill editor)*/}
            </div>
          </div>

          <div className="row-container" style={{ flexDirection: "column" }}>
            <div className="row-name">Disqualifiers:</div>
            <div className="row-field" style={{ width: "100%" }}>
              {" "}
              {/*Container for the AI Prompt input*/}
              <ParentFormComponent
                obj={obj}
                placeholder={
                  "Describe any characteristics, titles, or companies, that you specifically do not want included in the data results. "
                }
                name="disqualifiers"
                inPopup={true}
              />{" "}
              {/*Component for AI Prompt input (using Quill editor)*/}
            </div>
          </div>

          <div
            style={{
              background: "white",
              height: "fit-content",
              display: "flex",
              justifyContent: "flex-end",
              alignSelf: "flex-end",
              position: "absolute",
              bottom: 20,
              right: 20,
              borderRadius:"12px"
            }}
          >
            {" "}
            {/*Container for the save button*/}
            <div>
              {" "}
              {/*Container for button spacing*/}
              {button}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
