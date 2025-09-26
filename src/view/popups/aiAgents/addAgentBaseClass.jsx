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
 
 export default class AddAgentBaseClass extends BaseComponent {
   constructor(props) {
     super(props);
     this.state = {
       ...this.state,
       defaultClass: "fit scroller",
       showAdvanced: false,
       showPasteByType: {},        // { [trainingType]: boolean }
       trainingType: "other",      // used by PdfTextUpload callback
       trainingDocTypes: [
         // customize per child or via parent setState
         "dataTraining",        // general profile/training about target data
         "dataPreference",      // vetting/scoring rules and preferences
         "genTraining",         // general generation training (copy tone, etc.)
         "valueProp",           // your value proposition doc
         "companyVetting",      // company-level vetting rules
         "rules",               // strict rules / guardrails
       ],
       agentName: "",            // when set, header uses this instead of obj.name
       agentImageSrc: this.props.agentImageSrc || DEFAULT_AGENT_IMG,
     };
 
     // Maps a training "type" to the field on the agent doc where we store text.
     // (Matches your example.)
     this.types = {
       dataTraining: "profile",
       dataPreference: "training",
       chatbot: "content",
       valueProp: "valueProposition",
       genTraining: "content",
       companyVetting: "training",
       rules: "rules",
       other: "training",
     };
 
     // Optional friendly labels & help text for each training type
     this.trainingLabels = {
       dataTraining: { label: "Query Training", hint: "Background & examples to guide the agent’s research queries." },
       dataPreference: { label: "Scoring / Vetting", hint: "Scoring criteria, disqualifiers, & ideal prospect preferences." },
       genTraining: { label: "Generation Style", hint: "Tone/voice guidance used when writing outputs." },
       valueProp: { label: "Value Proposition", hint: "Company/product value props and benefits." },
       companyVetting: { label: "Company Vetting", hint: "Company-level filters (size, revenue, tech stack, etc.)." },
       rules: { label: "Rules", hint: "Hard rules the agent must follow." },
       other: { label: "Other Training", hint: "Any additional guidance." },
     };
   }
 
   async componentDidMount() {
     // Outreach bootstrapping (kept from your code)
     if (this.propsState.currentUser.getJson().outreachio && this.componentList.getList("outreachUser")?.length === 0) {
       let accessToken = this.propsState.currentUser.getJson().outreachAccessToken;
 
       await fetch("https://getusersandmailboxes-7c5i3vsqma-uc.a.run.app", {
         headers: { Authorization: `Bearer ${accessToken}` },
       })
         .then((r) => r.json())
         .then(async (data) => {
           let userData = data.users;
           let mailboxeData = data.mailboxes;
           let rawData = userData.map((obj) => {
             let mailbox = mailboxeData.find((m) => m.attributes.email === obj.attributes.email);
             return {
               _id: obj.id.toString(),
               type: "outreachUser",
               mailboxId: mailbox?.id,
               mailboxEmail: mailbox?.attributes?.email,
             };
           });
 
           let factory = this.propsState.componentListInterface.getFactory();
           let list = this.componentList.getList("outreachUser");
           let newList = [...list];
 
           for (let obj of rawData) {
             let item = await factory.getComponent(obj);
             newList = [...newList, item];
           }
           this.componentList.setSelectedList("outreachUser", newList);
           this.dispatch({ outreachUsers: newList });
         });
 
       await fetch("https://getsequences-7c5i3vsqma-uc.a.run.app", {
         headers: { Authorization: `Bearer ${accessToken}` },
       })
         .then((r) => r.json())
         .then(async (data) => {
           let rawData = data.data.map((obj) => ({
             type: "sequence",
             _id: obj.id.toString(),
             outreach: true,
             name: obj.attributes.name,
             outreachSequenceId: obj.attributes.id,
           }));
 
           let factory = this.propsState.componentListInterface.getFactory();
           let list = this.componentList.getList("sequence").filter((o) => o.getJson().outreach === undefined);
           let newList = [...list];
 
           for (let obj of rawData) {
             let item = await factory.getComponent(obj);
             newList = [...newList, item];
           }
 
           this.componentList.setSelectedList("sequence", newList);
           this.dispatch({ outreachSequences: newList });
         });
     }
 
     // default owner wiring
     const obj = this.propsState.currentPopupComponent;
     obj.setCompState({ companyOwnerId: this.propsState.currentUser.getJson().companyId });
   }
 
   /* ===========================
    * ===== Section helpers =====
    * ===========================
    */
 
   getHeaderSection(obj) {
     const nameToShow = this.state.agentName || obj.getJson().name || "";
     return (
       <div style={{ display: "flex", alignItems: "flex-start", gap: 24, marginBottom: 18 }}>
         <div style={{ flex: 1 }}>
           <div style={{ color: "#94a3b8", fontSize: 12, marginBottom: 6 }}>Configure Options › {nameToShow || "Configure AI agent"}</div>
           <h2 style={{ margin: 0, fontSize: 28, lineHeight: "32px" }}>
             Configure the AI agent{ nameToShow ? `: ${nameToShow}` : "" }
           </h2>
 
           <div style={{ marginTop: 12 }}>
             <div className="row-name" style={{ marginBottom: 6 }}>Agent name</div>
             <ParentFormComponent
               obj={obj}
               placeholder="E.g., Daily Research"
               name="name"
               inPopup={true}
             />
           </div>
         </div>
 
         <img
           src={Robot1}
           alt="Agent"
           style={{ width: 140, height: 140, objectFit: "contain" }}
         />
       </div>
     );
   }
 
   getPromptSection(obj) {
     return (
       <div style={{ padding: 12, background: "rgb(245,244,244)", borderRadius: 12, marginBottom: 16 }}>
         <div className="row-container" style={{ flexDirection: "column" }}>
           <div className="row-name">Prompt</div>
           <div className="row-field" style={{ width: "100%" }}>
             <ParentFormComponent
               obj={obj}
               placeholder={`Describe your target prospect. “E.g., Research VP of Sales at tech companies under $100M revenue.”`}
               name="AIPrompt"
               inPopup={true}
             />
           </div>
         </div>
       </div>
     );
   }
 
   getActionsSection(obj) {
     const hasOutreach = !!this.propsState.currentUser.getJson().outreachio;
     const seqOptions = this.componentList.getList("sequence").map((s) => s.getJson().name);
     const userOptions = this.componentList.getList("outreachUser").map((u) => u.getJson().mailboxEmail);
 
     return (
       <div style={{ padding: 12, background: "white", border: "1px solid #e5e7eb", borderRadius: 12, marginBottom: 18 }}>
         <div className="row-container" style={{ flexDirection: "column" }}>
           <div className="row-name">Action when data is found</div>
           <div className="row-field" style={{ width: "100%" }}>
             <ParentFormComponent
               obj={obj}
               name="actionOnFindDisplay"
               type="select"
               inPopup={true}
               handleChange={(e)=>{
                debugger
                let val = e.target.value;
                let o = this.propsState.currentUser.getJson().actionItems[val];
                obj.setCompState({actionOnFind: o, actionOnFindDisplay:val})
                this.dispatch({})
              }}
              selectOptions={this.propsState.currentUser.getJson().actionItems?[
                ...Object.keys(this.propsState.currentUser.getJson().actionItems)
                  .sort((a, b) => {
                    const aHas = a.includes("Sequence");
                    const bHas = b.includes("Sequence");
              
                    if (aHas && !bHas) return -1; // a goes first
                    if (!aHas && bHas) return 1;  // b goes first
                    return a.localeCompare(b);    // otherwise alphabetical
                  })
              ]:["Sequence"]}
             />
           </div>
         </div>
 
         {hasOutreach && (
           <>
             <div className="row-container" style={{ flexDirection: "column", marginTop: 12 }}>
               <div className="row-name">Outreach sequence</div>
               <div className="row-field" style={{ width: "100%" }}>
                 <ParentFormComponent
                   name="sequenceDisplay"
                   obj={obj}
                   type="select"
                   selectOptions={seqOptions}
                   handleChange={(e) => {
                     const val = e.target.value;
                     const seq = this.componentList.getComponent("sequence", val, "name");
                     obj.setCompState({ outreachSequenceId: seq?.getJson()._id, sequenceDisplay: val });
                     this.dispatch({});
                   }}
                 />
               </div>
             </div>
 
             <div className="row-container" style={{ flexDirection: "column", marginTop: 12 }}>
               <div className="row-name">Send as user</div>
               <div className="row-field" style={{ width: "100%" }}>
                 <ParentFormComponent
                   name="outreachUserDisplay"
                   obj={obj}
                   type="select"
                   selectOptions={userOptions}
                   handleChange={(e) => {
                     const val = e.target.value;
                     const user = this.componentList.getComponent("outreachUser", val, "mailboxEmail");
                     obj.setCompState({ outreachUserId: user?.getJson()._id, outreachUserDisplay: val });
                     this.dispatch({});
                   }}
                 />
               </div>
             </div>
 
             <div className="row-container" style={{ flexDirection: "column", marginTop: 12 }}>
               <div className="row-name">Auto-add to sequence</div>
               <div className="row-field" style={{ width: "100%" }}>
                 <ParentFormComponent
                   obj={obj}
                   type="select"
                   name="autoSequenceDisplay"
                   selectOptions={["Yes", "No"]}
                   handleChange={(e) => {
                     const bool = e.target.value === "Yes";
                     obj.setCompState({ autoSequence: bool, autoSequenceDisplay: e.target.value });
                   }}
                 />
               </div>
             </div>
           </>
         )}
       </div>
     );
   }
 
   /* ==== Training uploads (dynamic by trainingDocTypes) ==== */
   getTrainingUploadsSection(obj) {
     const typesToShow = Array.isArray(this.state.trainingDocTypes) && this.state.trainingDocTypes.length
       ? this.state.trainingDocTypes
       : ["other"];
 
     return (
       <div style={{ marginTop: 8 }}>
         <h3 style={{ marginBottom: 8 }}>Training uploads</h3>
         <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 12 }}>
           {typesToShow.map((t) => this.getSingleTrainingUpload(obj, t))}
         </div>
       </div>
     );
   }
 
   getSingleTrainingUpload(obj, trainingType) {
     const label = this.trainingLabels[trainingType]?.label || trainingType;
     const hint = this.trainingLabels[trainingType]?.hint || "";
     const showPaste = !!this.state.showPasteByType?.[trainingType];
 
     return (
       <div key={trainingType} style={{ padding: 12, background: "#f9fafb", borderRadius: 12, border: "1px solid #e5e7eb" }}>
         <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 12 }}>
           <div>
             <div style={{ fontWeight: 600 }}>{label}</div>
             {hint && <div style={{ color: "#6b7280", fontSize: 12 }}>{hint}</div>}
           </div>
           <div style={{ display: "flex", gap: 8 }}>
             <button
               className="dark-button-1"
               onClick={() =>
                 this.setState((s) => ({
                   trainingType,
                   showPasteByType: { ...s.showPasteByType, [trainingType]: false },
                 }))
               }
             >
               Upload file
             </button>
             <button
               className="dark-button-1"
               onClick={() =>
                 this.setState((s) => ({
                   trainingType,
                   showPasteByType: { ...s.showPasteByType, [trainingType]: !s.showPasteByType?.[trainingType] },
                 }))
               }
             >
               {showPaste ? "Hide paste" : "Paste text"}
             </button>
           </div>
         </div>
 
         {/* File uploader */}
         {!showPaste && (
           <div style={{ marginTop: 10 }}>
             <PdfTextUpload
               callBack={async ({ data }) => {
                let contentType = this.types[trainingType];
                if (trainingType === "rules") contentType = this.types.rules;
                const fieldByType = { pdf: "fullText", text: "text" };
                const field = fieldByType[data.type];

                this.operationsFactory.prepare({prepare:{type:"training", [contentType]: data[field], trainingType:trainingType, _id:obj.getJson()._id+trainingType, companyOwnerId:this.propsState.currentUser.getJson().companyId}});
                this.obj.setCompState({[this.researchTrainingkey[trainingType]]:obj.getJson()._id+trainingType})
              
                 if (!contentType) contentType = this.types.other;
                 this.dispatch({ uploadText: data[field] });
                 this.setState({ content: data[field] });
               }}
             />
           </div>
         )}
 
         {/* Paste text area */}
         {showPaste && (
           <div style={{ marginTop: 10 }}>
             <textarea
               placeholder="Paste training text here…"
               style={{ width: "100%", minHeight: 140, padding: 8, borderRadius: 8, border: "1px solid #d1d5db" }}
               onBlur={async (e) => {
                 let contentType = this.types[trainingType] || this.types.other;
                 await obj.setCompState({ [contentType]: e.target.value });
                 this.dispatch({ uploadText: e.target.value });
               }}
             />
             <div style={{ color: "#6b7280", fontSize: 12, marginTop: 6 }}>Blur the field to save.</div>
           </div>
         )}
       </div>
     );
   }
   // Add inside AddAgentBaseClass (e.g., below getPromptSection)
getCadenceAndLimitSection(obj) {
  return (
    <div style={{ padding: 12, background: "white", border: "1px solid #e5e7eb", borderRadius: 12, marginTop: 8, marginBottom: 16 }}>
      {/* Cadence: Daily or Weekly */}
      <div className="row-container" style={{ flexDirection: "column" }}>
        <div className="row-name">Cadence</div>
        <div className="row-field" style={{ width: "100%" }}>
          <ParentFormComponent
            obj={obj}
            name="searchFrequency"        // reuse existing field name
            type="select"
            inPopup={true}
            selectOptions={["Daily", "Weekly"]}
          />
         
        </div>
      </div>

      {/* Limit count */}
      <div className="row-container" style={{ flexDirection: "column", marginTop: 10 }}>
        <div className="row-name">Result limit</div>
        <div className="row-field" style={{ width: "100%" }}>
          <ParentFormComponent
            obj={obj}
            name="dayLimit"            // new numeric field (use any name you prefer)
            inPopup={true}
            placeholder="e.g., 50"
          />
        </div>
      </div>
      <div className="row-container" style={{ flexDirection: "column", marginTop: 10 }}>
        <div className="row-name">Vetting Threshold</div>
        <div className="row-field" style={{ width: "100%" }}>
          <ParentFormComponent
            obj={obj}
            name="vettingThreshold"            // new numeric field (use any name you prefer)
            inPopup={true}
            placeholder="a number between 1-100"
          />
        </div>
      </div>
      <div className="row-container" style={{ flexDirection: "column", marginTop: 10 }}>
        <div className="row-name">Other Titles</div>
        <div className="row-field" style={{ width: "100%" }}>
          <ParentFormComponent
            obj={obj}
            name="otherTitles"            // new numeric field (use any name you prefer)
            inPopup={true}
            placeholder="Titles not included in your prompt but still ok."
          />
        </div>
      </div>
    </div>
  );
}

 
   /* ===== Advanced Options ===== */
   getAdvancedToggle() {
     return (
       <div style={{ marginTop: 14, marginBottom: 8 }}>
         <div
           className="dark-button-1"
           onClick={() => this.setState((s) => ({ showAdvanced: !s.showAdvanced }))}
         >
           {this.state.showAdvanced ? "Hide advanced options" : "Show advanced options"}
         </div>
       </div>
     );
   }
 
   getAdvancedPanel(obj) {
     if (!this.state.showAdvanced) return null;
 
     const ownerOptions =
       (this.componentList.getList("owner") || this.componentList.getList("user") || [])
         .map((u) => u.getJson?.().email || u.getJson?.().name || u.email || u.name)
         .filter(Boolean);
 
     return (
       <div style={{ padding: 12, background: "white", border: "1px solid #e5e7eb", borderRadius: 12, marginTop: 10 }}>
         {/* 1. Mode */}
         <div className="row-container" style={{ flexDirection: "column" }}>
           <div className="row-name">Mode</div>
           <div className="row-field" style={{ width: "100%" }}>
             <ParentFormComponent
               obj={obj}
               name="mode"
               type="select"
               inPopup={true}
               selectOptions={["Manual", "Auto"]}
             />
           </div>
         </div>
         <div className="row-container" style={{ flexDirection: "column" }}>
           <div className="row-name">Active</div>
           <div className="row-field" style={{ width: "100%" }}>
           <div onClick={()=>{
            
              obj.setCompState({active: !obj.getJson().active})
              this.setState();
              
            }}>{obj?.getJson().active?"Pause":"activate"}</div>
           </div>
         </div>
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
 
         {/* 3. CSV uploads */}
         <div style={{ marginTop: 14, paddingTop: 10, borderTop: "1px dashed #e5e7eb" }}>
           <div style={{ fontWeight: 600, marginBottom: 8 }}>CSV uploads</div>
 
           <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
             {/* People */}
             <div style={{ flex: 1, minWidth: 280 }}>
               <div onClick={() => this.setState({ showUpload: "people" })} style={{ fontWeight: 600, marginBottom: 6 }}>
                 People CSV
               </div>
               {this.state.showUpload === "people" && (
                 <CsvUpload
                   callBack={async (data) => {
                     let oldContacts = await this.componentList.getComponentsFromBackend({
                       type: "peopleToResearch",
                       ids: this.propsState.currentPopupComponent.getJson()._id,
                       filterKeys: "researchId",
                     });
                     for (let c of oldContacts) await c.del();
 
                     data = data.data.map((obj) => ({
                       ...obj,
                       owner: this.propsState.currentUser.getJson()._id,
                       type: "peopleToResearch",
                       companyOwnerId: this.propsState.currentUser.getJson().companyId,
                       researchId: this.propsState.currentPopupComponent.getJson()._id,
                     }));
 
                     this.dispatch({ uploadPeopleResearchData: data });
                     await this.operationsFactory.prepare({ prepare: data });
                     await this.propsState.currentPopupComponent.setCompState({ hasPeopleCsv: true, hasCompanyCsv: false });
                     await this.propsState.currentPopupComponent.update();
                     this.operationsFactory.addToComponentList();
                   }}
                 />
               )}
             </div>
 
             {/* Company */}
             <div style={{ flex: 1, minWidth: 280 }}>
               <div onClick={() => this.setState({ showUpload: "company" })} style={{ fontWeight: 600, marginBottom: 6 }}>
                 Company CSV
               </div>
               {this.state.showUpload === "company" && (
                 <CsvUpload
                   callBack={async (data) => {
                     let oldCompanies = await this.componentList.getComponentsFromBackend({
                       type: "companiesToResearch",
                       ids: this.propsState.currentPopupComponent.getJson()._id,
                       filterKeys: "researchId",
                     });
                     for (let c of oldCompanies) await c.del();
 
                     data = data.data.map((obj) => ({
                       ...obj,
                       owner: this.propsState.currentUser.getJson()._id,
                       type: "companiesToResearch",
                       companyOwnerId: this.propsState.currentUser.getJson().companyId,
                       researchId: this.propsState.currentPopupComponent.getJson()._id,
                     }));
 
                     this.dispatch({ uploadCompanyResearchData: data });
                     await this.operationsFactory.prepare({ prepare: data });
                     await this.propsState.currentPopupComponent.setCompState({ hasCompanyCsv: true, hasPeopleCsv: false });
                     await this.propsState.currentPopupComponent.update();
                     this.operationsFactory.addToComponentList();
                   }}
                 />
               )}
             </div>
           </div>
         </div>
 
         {/* 4. Search query fields */}
         <div style={{ marginTop: 14, paddingTop: 10, borderTop: "1px dashed #e5e7eb" }}>
           <div style={{ fontWeight: 600, marginBottom: 8 }}>Search criteria</div>
 
           {this.getSearchFieldsGroup(obj)}
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
             
        
 
         {/* 7. Owner selector */}
         <div className="row-container" style={{ flexDirection: "column", marginTop: 14 }}>
           <div className="row-name">Owner</div>
           <div className="row-field" style={{ width: "100%" }}>
             {/* <ParentFormComponent
               obj={obj}
               name="companyOwnerId"
               type={ownerOptions.length ? "select" : "text"}
               inPopup={true}
               selectOptions={ownerOptions.length ? ownerOptions : undefined}
               placeholder={!ownerOptions.length ? "Owner ID / Email" : undefined}
             /> */}
           </div>
         </div>
 
         {/* 8. Second opinion prompt */}
         <div className="row-container" style={{ flexDirection: "column", marginTop: 14 }}>
           <div className="row-name">Second-opinion prompt (optional)</div>
           <div className="row-field" style={{ width: "100%" }}>
             <ParentFormComponent
               obj={obj}
               placeholder="A refining prompt for a second model pass."
               name="secondOpinionPrompt"
               inPopup={true}
             />
           </div>
         </div>
         {this.getTrainingUploadsSection(obj)}

 
         {/* 9. Child hook */}
         {this.getExtraAdvancedContent?.(obj)}
       </div>
     );
   }
 
   getSearchFieldsGroup(obj) {
     return (
       <>
         <div className="row-container" style={{ flexDirection: "column" }}>
           <div className="row-name">Keywords</div>
           <div className="row-field" style={{ width: "100%" }}>
             <ParentFormComponent obj={obj} name="keywords" inPopup={true} placeholder="Keywords in target titles" />
           </div>
         </div>
 
         <div className="row-container" style={{ flexDirection: "column" }}>
           <div className="row-name">Company Size by Revenue</div>
           <div className="row-field" style={{ width: "100%" }}>
             <ParentFormComponent obj={obj} name="companySizebyRevenue" inPopup={true} />
           </div>
         </div>
 
         <div className="row-container" style={{ flexDirection: "column" }}>
           <div className="row-name">Company Size by # of Employees</div>
           <div className="row-field" style={{ width: "100%" }}>
             <ParentFormComponent obj={obj} name="companySizebyEmployees" inPopup={true} />
           </div>
         </div>
 
         <div className="row-container" style={{ flexDirection: "column" }}>
           <div className="row-name">Geographic Location</div>
           <div className="row-field" style={{ width: "100%" }}>
             <ParentFormComponent obj={obj} name="location" inPopup={true} />
           </div>
         </div>
 
         <div className="row-container" style={{ flexDirection: "column" }}>
           <div className="row-name">Decision Making Level</div>
           <div className="row-field" style={{ width: "100%" }}>
             <ParentFormComponent
               obj={obj}
               name="contactLevel"
               type="select"
               inPopup={true}
               placeholder="Any, Non-Manager, Director, VP, C-Level"
               selectOptions={["Any", "Non-Manager", "Director", "VP", "C-Level"]}
             />
           </div>
         </div>
 
         <div className="row-container" style={{ flexDirection: "column" }}>
           <div className="row-name">Department</div>
           <div className="row-field" style={{ width: "100%" }}>
             <ParentFormComponent obj={obj} name="department" inPopup={true} placeholder="e.g., IT, HR, Sales, Marketing" />
           </div>
         </div>
 
         <div className="row-container" style={{ flexDirection: "column" }}>
           <div className="row-name">Industry</div>
           <div className="row-field" style={{ width: "100%" }}>
             <ParentFormComponent obj={obj} name="industry" inPopup={true} placeholder="e.g., Technology, Software, SaaS" />
           </div>
         </div>
 
         <div className="row-container" style={{ flexDirection: "column" }}>
           <div className="row-name">Disqualifiers</div>
           <div className="row-field" style={{ width: "100%" }}>
             <ParentFormComponent
               obj={obj}
               name="disqualifiers"
               inPopup={true}
               placeholder="Describe titles/companies you do NOT want included."
             />
           </div>
         </div>
       </>
     );
   }
 
   /* ===== Child hook sections ===== */
   getExtraContent(/* obj */) {
     return null; // children can override
   }
 
   getExtraAdvancedContent(/* obj */) {
     return null; // children can override
   }
 
   /* ===================
    * ===== Render ======
    * ===================
    */
   render() {
    const footerStyle = {
      display: "flex",
      alignItems: "center",        // <-- vertically center children
      gap: 8,
      position: "absolute",
      bottom: 20,
      right: 20,
      borderRadius: "12px",
    };
    
    const btnWrap = {
      display: "flex",
      alignItems: "center",
      height: 36,                  // <-- unify button box height
    };
    
    const btnStyle = {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      lineHeight: 1,               // <-- kill baseline drift
      height: "100%",
      padding: "8px 14px",
    };
     const obj = this.propsState.currentPopupComponent;
     const isEdit = !!this.propsState.currentPopupComponent.getJson().date;
 
     const actionButton = isEdit ? (
      
      <div style={footerStyle}>
  <div style={btnWrap}>
  <DelButton
      formClass="danger-button-1 dark-button-1"
      style={btnStyle}
      obj={this.propsState.currentPopupComponent}
      content="Delete"
      isPopup={true}
      inPopup={true}
      callbackFunc={() => this.dispatch({ currentPopupComponent: undefined, popupSwitch: "" })}
    />
  
  </div>
  <div style={btnWrap}>
  <UpdateButton
      formClass="dark-button-1"
      style={btnStyle}
      obj={this.propsState.currentPopupComponent}
      content="Save"
      isPopup={true}
      callbackFunc={this.props.callbackFunc}
    />
  </div>
</div>
     ) : (
       <RunButton formClass="dark-button-1" content="Save" isPopup={true} callbackFunc={this.props.callbackFunc} />
     );
 
     return (
       <div style={{ padding: "10px", paddingBottom: "100px", height: "100%" }} className={this.props.pageClass || this.state.defaultClass}>
         {/* 1. Header / Name */}
         {this.getHeaderSection(obj)}
 
         {/* 2. Prompt (front & center) */}
         {this.getPromptSection(obj)}

         {/* NEW: cadence + limit just after prompt */}
{this.getCadenceAndLimitSection(obj)}
 
         {/* 3. Actions */}
         {this.getActionsSection(obj)}
 
         {/* 4/5/6. Training uploads (dynamic) + paste button per type */}
 
         {/* 7. Child hook for extra content at the end of the main flow */}
         {this.getExtraContent(obj)}
 
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
 