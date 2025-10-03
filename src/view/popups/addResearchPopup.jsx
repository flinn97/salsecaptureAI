/**
 * @class ResearchPopup
 * @extends {BaseComponent}
 * Two-stage flow:
 *  - Stage 1: Choose Type (five agent tiles)
 *  - Stage 2: Original form (what you already had)
 */
import Robot1 from "../../assets/bots/robots/robot1.png"
import Robot2 from "../../assets/bots/robots/robot2.png"
import Robot3 from "../../assets/bots/robots/robot3.png"
import Robot4 from "../../assets/bots/robots/robot4.png"
import Robot5 from "../../assets/bots/robots/robot5.png"
import AddAgentBaseClass from "./aiAgents/addAgentBaseClass.jsx"
import './addResearchPopup.scss';

 import { DelButton, ParentFormComponent, RunButton, UpdateButton } from "flinntech";
 import { BaseComponent } from "flinntech";
import BusinessCardAgent from "./aiAgents/businessCardAgent"
import AskIsaacCreate from "./aiAgents/askIsaacCreate"
 
 export default class ResearchPopup extends BaseComponent {
   constructor(props) {
     super(props);
     const obj = this.propsState?.currentPopupComponent;
 
     // If it's a brand new item (no date set) AND no prior agentType, start on the chooser
     const startOnChooser =
       obj && !obj.getJson().date && !obj.getJson().agentType ? "choose" : "form";
 
     this.state = {
       ...this.state,
       defaultClass: "fit scroller",
       stage: startOnChooser, // "choose" | "form"
       showUpload: undefined,
     };
   }
 
   async componentDidMount() {
    // Keep any minimal bootstrapping here; wrapper handles the rest.
    const obj = this.propsState.currentPopupComponent;
    if (obj && this.propsState?.currentUser) {
      obj.setCompState({
        companyOwnerId: this.propsState.currentUser.getJson().companyId,
      });
    }
  }
 
   // ---- Choose-Type UI helpers ----
 
   getTypeOptions() {
     // Image paths are placeholders; assume you have them in your assets pipeline
     return [
       {
         key: "newData",
         title: "New Data Scout",
         desc: "Find new prospects from external sources",
         img: Robot1,
       },
       {
         key: "existing",
         title: "Existing CRM Miner",
         desc: "Surface existing contacts from your CRM",
         img: Robot2,
       },
       {
         key: "businessCard",
         title: "Business Card Analyzer",
         desc: "Extract contact info from business cards",
         img: Robot3,
       },
       {
         key: "askAlan",
         title: "Ask Alan (Research Chat)",
         desc: "Chat to identify sales opportunities",
         img: Robot4,
       },
       {
         key: "askIsaac",
         title: "Ask Isaac (Analytics Chat)",
         desc: "Reporting & analytics insights via chat",
         img: Robot5,
       },
     ];
   }
 
   handleSelectType = (key) => {
     const obj = this.propsState.currentPopupComponent;
     const updates = { agentType: key };
 
     // Seed sensible defaults that match your form’s “Source” select
     if (key === "existing") {
       updates.getDataFrom = ["existing"];
       updates.displayDataSrc = "existing";
       updates.newDataSrcs= this.propsState.currentUser.getJson().newDataSrcs;
       updates.existingSrcs= this.propsState.currentUser.getJson().existingSrcs;
       updates.actionOnFind ={
        enpoint: "https://sequencecontacts-7c5i3vsqma-uc.a.run.app",
            technology: [...this.propsState.currentUser.getJson()?.actionItems?.Sequence?.technology]
       }

     } else if (key === "newData") {
       updates.getDataFrom = ["newData"];
       updates.displayDataSrc = "newData";
       updates.newDataSrcs= this.propsState.currentUser.getJson().newDataSrcs;
       updates.existingSrcs= this.propsState.currentUser.getJson().existingSrcs;
       let technology =this.propsState.currentUser.getJson()?.actionItems?.Sequence?.technology||[]
       updates.actionOnFind ={
        enpoint: "https://sequencecontacts-7c5i3vsqma-uc.a.run.app",
            technology: [...technology]
       }

     } else if (key === "businessCard") {
       // Business cards produce NEW contacts; we’ll nudge to image upload later
       updates.getDataFrom = ["newData"];
       updates.displayDataSrc = "newData";
       updates.active = false;
       updates.existingSrcs= this.propsState.currentUser.getJson().existingSrcs;
       updates.actionOnFind ={
        enpoint: "https://sequencecontacts-7c5i3vsqma-uc.a.run.app",
            technology: [...this.propsState.currentUser.getJson().actionItems.Sequence.technology]
       }
       updates.researchType="businessCard";
       // Optional: flip the uploader after the form mounts
       this.setState({ showUpload: "image" });
     } else if (key === "askAlan") {
       updates.chatMode = "alan";
       updates.newDataSrcs= this.propsState.currentUser.getJson().newDataSrcs;
       updates.existingSrcs= this.propsState.currentUser.getJson().existingSrcs;


     } else if (key === "askIsaac") {
       updates.chatMode = "isaac";
       updates.newDataSrcs= this.propsState.currentUser.getJson().newDataSrcs;
       updates.existingSrcs= this.propsState.currentUser.getJson().existingSrcs;
       updates.getDataFrom = ["newData"];
       updates.displayDataSrc = "newData";
       updates.active = false;

     }
 
     obj.setCompState(updates);
     this.setState({ stage: "form", agentType: key});
   };
 
  // ----- Stage 1: chooser -----
  renderChooseType() {
    const tiles = this.getTypeOptions();

    return (
      <div style={{ padding: 10, userSelect: 'none'}} className={this.props.pageClass || this.state.defaultClass}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2 style={{ margin: 0 }}>Choose an AI agent type</h2>
        </div>

        <div
          style={{
            marginTop: 16,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 16,
          }}
        >
          {tiles.map((t) => (
            <button
              key={t.key}
              onClick={() => this.handleSelectType(t.key)}
              className={`agent-tile`}
            >
              <img
                src={t.img}
                draggable="false"
                className={`agent-${t.key}`}
                alt=""
                style={{ width: 84, height: 84, objectFit: "contain", marginBottom: 12 }}
              />
              <div style={{ fontWeight: 600 }}>{t.title}</div>
              <div style={{ fontSize: 13, color: "#4b5563", marginTop: 6 }}>{t.desc}</div>
            </button>
          ))}
        </div>

        <div style={{ marginTop: 20, display: "flex", justifyContent: "flex-end" }}>
          {/* <div
            className="dark-button-1"
            style={{ padding: "10px 16px", borderRadius: 10 }}
            onClick={() => this.setState({ stage: "form" })}
            aria-label="Skip and go to form"
          >
            Next
          </div> */}
        </div>
      </div>
    );
  }

  // ----- Stage 2: wrapper -----
  renderWrapper() {
    const obj = this.propsState.currentPopupComponent;
    const agentType = obj?.getJson()?.agentType;
    const types = {
      newData: (
        <AddAgentBaseClass
          {...this.props}
          agentType="newData"
          showUploadDefault={this.state.showUpload}
          onBack={() => this.setState({ stage: "choose" })}
        />
      ),
      existing: (
        <AddAgentBaseClass
          {...this.props}
          agentType="existing"
          showUploadDefault={this.state.showUpload}
          onBack={() => this.setState({ stage: "choose" })}
        />
      ),
      businessCard: (
        <BusinessCardAgent
          {...this.props}
          agentType="businessCard"
          showUploadDefault={this.state.showUpload}
          onBack={() => this.setState({ stage: "choose" })}
        />
      ),
      askAlan: (
        <AddAgentBaseClass
          {...this.props}
          agentType="askAlan"
          showUploadDefault={this.state.showUpload}
          onBack={() => this.setState({ stage: "choose" })}
        />
      ),
      askIsaac: (
        <AskIsaacCreate
          {...this.props}
          agentType="askIsaac"
          showUploadDefault={this.state.showUpload}
          onBack={() => this.setState({ stage: "choose" })}
        />
      ),
    };
  

    return (
      <div className={this.props.pageClass || this.state.defaultClass} style={{ height: "100%" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px" }}>
        <div
          onClick={() => this.setState({ stage: "choose" })}
          className="light-button-1"
          style={{ padding: "8px 12px", borderRadius: 10 }}
          aria-label="Back to choose type"
        >
          Back
        </div>
        <h2 style={{ margin: 0 }}>Configure Agent</h2>
      </div>

      {/* Render the correct type */}
      {types[agentType] || (
        <div style={{ padding: 20 }}>
          <p>No agent type selected.</p>
        </div>
      )}
    </div>
    );
  }

  // ----- Root render -----
  render() {
    return this.state.stage === "choose" ? this.renderChooseType() : this.renderWrapper();
  }
}