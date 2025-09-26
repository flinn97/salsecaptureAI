/**
 * @class AddAgentBaseClass
 * @extends {BaseComponent}
 *
 * A sectionized base popup for creating/editing AI research agents.
 * - Each visible area is returned by its own helper method.
 * - Training uploads are driven by this.state.trainingDocTypes.
 * - Advanced options are collapsed by default and include the “mode”, source,
 *   CSV uploads, all search query fields, visibility, owner selector, delete, etc.
 * - getExtraContent() and getExtraAdvancedContent() are extension hooks for subclasses.
 */
 import { DelButton, ParentFormComponent, RunButton, UpdateButton } from "flinntech";
 import { BaseComponent } from "flinntech";
 import CsvUpload from "../../csvUpload";
 import PdfTextUpload from "../../textUploader";
 import Robot1 from "../../../assets/bots/robots/robot1.png"

 // You said the image is in your assets folder; allow override via props.
 const DEFAULT_AGENT_IMG = "/assets/ai-agent.png";

 import AddAgentBaseClass from "./addAgentBaseClass";
 
 export default class BusinessCardAgent extends AddAgentBaseClass {
    getAdvancedPanel(obj) {
        if (!this.state.showAdvanced) return null;
    
        const ownerOptions =
          (this.componentList.getList("owner") || this.componentList.getList("user") || [])
            .map((u) => u.getJson?.().email || u.getJson?.().name || u.email || u.name)
            .filter(Boolean);
    
        return (
          <div style={{ padding: 12, background: "white", border: "1px solid #e5e7eb", borderRadius: 12, marginTop: 10 }}>
         
          
            {/* 2. Source */}
            <div className="row-container" style={{ flexDirection: "column", marginTop: 10 }}>
              <div className="row-name">Source</div>
              <div className="row-field" style={{ width: "100%" }}>
               {obj.getJson().newDataSrcs}
                {/* <ParentFormComponent
                  obj={obj}
                  placeholder="What Sources?"
                  name="displayDataSrc"
                  type="select"
                  inPopup={true}
                  selectOptions={["existing", "newData", "both"]}
                  handleChange={(e) => {
                    let src = e.target.value;
                    if (src === "both") src = ["existing", "newData"];
                    else src = [src];
                    this.propsState.currentPopupComponent.setCompState({
                      getDataFrom: src,
                      displayDataSrc: e.target.value,
                    });
                  }}
                /> */}
              </div>
            </div>
    
    
        
            {/* 5. Visibility */}
            <div className="row-container" style={{ flexDirection: "column", marginTop: 14 }}>
              <div className="row-name">Visibility</div>
              <div className="row-field" style={{ width: "100%" }}>
                {/* <ParentFormComponent
                  obj={obj}
                  name="visibility"
                  type="select"
                  inPopup={true}
                  selectOptions={["Private", "Company", "Public"]}
                /> */}
              </div>
            </div>
    
            {/* 6. Delete in edit mode */}
            {this.propsState.currentPopupComponent.getJson().date && (
              <div style={{ marginTop: 12 }}>
                <DelButton
                  obj={this.propsState.currentPopupComponent}
                  isPopup={true}
                  inPopup={true}
                  callbackFunc={() => {
                    this.dispatch({ currentPopupComponent: undefined, popupSwitch: "" });
                  }}
                  formClass="dark-button-1"
                  content={"Delete"}
                />
              </div>
            )}
    
            {this.getTrainingUploadsSection(obj)}
   

          </div>
        );
      }
 /* ===================
    * ===== Render ======
    * ===================
    */
 render() {
    const obj = this.propsState.currentPopupComponent;
    const isEdit = !!this.propsState.currentPopupComponent.getJson().date;

    const actionButton = isEdit ? (
      <UpdateButton
        formClass="dark-button-1"
        obj={this.propsState.currentPopupComponent}
        content="Save"
        isPopup={true}
        callbackFunc={this.props.callbackFunc}
      />
    ) : (
      <RunButton formClass="dark-button-1" content="Save" isPopup={true} callbackFunc={this.props.callbackFunc} />
    );

  

    return (
      <div style={{ padding: "10px", paddingBottom: "100px", height: "100%" }} className={this.props.pageClass || this.state.defaultClass}>
        

        {/* 2. Prompt (front & center) */}
        {this.getPromptSection(obj)}


        {/* 3. Actions */}
        {this.getActionsSection(obj)}

       

        {/* Advanced options */}
        {this.getAdvancedToggle()}
        {this.getAdvancedPanel(obj)}

        {/* Floating footer buttons */}
        <div
          style={{
            height: "fit-content",
            display: "flex",
            justifyContent: "flex-end",
            position: "absolute",
            bottom: 20,
            right: 20,
            borderRadius: "12px",
            gap: 8,
          }}
        >
          {actionButton}
        </div>
      </div>
    );
  }

 }
 
