/**
 * SequencePage component. This component displays the details of a specific sequence 
 * and a list of steps associated with it. It extends GetComponentsFromUrl to handle 
 * fetching the sequence based on the URL parameters.
 */
 import { GetComponentsFromUrl, UploadButton, PopupButton } from "flinntech";
 import { MapComponent } from "flinntech";
 import { ParentFormComponent, RunButton } from "flinntech";
 import { Card } from "flinntech";
 import { Timestamp } from "firebase/firestore";
 import Dropdown from "./components/dropdown";
 import StepCustomItem from "./components/stepCustom";
import AssignedProspectsCustom from "./components/assignedProspectsCustom";
 
 export default class SequencePage extends GetComponentsFromUrl {
    constructor(props){
        super(props);
        this.state={
            ...this.state,
            spState:"sequenceSteps"
            
        }
    }
     /**
      * Fetches the necessary components from the backend based on the URL
      * and prepares a new Step object if no ID is provided.
      */
 
     async componentDidMount() {
 
 
         let sequence;
         await this.getComponentsFromBackend();
         sequence = this.comp
 
         if (!sequence) {
             sequence = await this.operationsFactory.prepare({ prepare: { type: "sequence" }, clean: true })
             sequence = sequence[0]
         }
         else {
            //  await this.componentList.getComponentsFromBackend({ type: "step", ids: sequence.getJson()._id, filterKeys: "sequenceId" });
         }
 
         await this.dispatch({ currentSequence: sequence });
         this.componentList.sortSelectedList("step", "order");
        //  this.createStep(sequence);
 
     }
     componentWillUnmount(){
        this.operationsFactory.clear();
     }
 
     async createStep(sequence) {
         let list = this.componentList.getList("step", sequence ? sequence.getJson()._id : this.propsState.currentSequence.getJson()._id, "sequenceId");
 
         // If no ID in the URL, prepare a new Step objectx
         const newStep = await this.operationsFactory.prepare({
             prepare: { type: "step", sequenceId: sequence ? sequence.getJson()._id : this.propsState.currentSequence.getJson()._id, step: list.length }
         });
         this.dispatch({ currentStep: newStep.length === 2 ? newStep[1] : newStep[0] }); // Dispatch the currentStep as the new step
     }
      getStepJson() {
        
        let list = this.componentList.getList("step", this.propsState.currentSequence?.getJson()._id, "sequenceId");

        // If no ID in the URL, prepare a new Step objectx
        let newStep ={ type: "step", sequenceId: this.propsState.currentSequence?.getJson()._id, step: list.length }
        return newStep
    }
 
     /**
      * Returns the inner content of the SequencePage component.
      * @returns {JSX.Element} The rendered content of the sequence page.
      */
     getInnerContent() {
         // Compute timestamps based on the current time
         // const now = Timestamp.now();
         // const fiveMinutesFromNow = Timestamp.fromDate(
         //     new Date(Date.now() + 5 * 60 * 1000)
         // );
         // const tenMinutesFromNow = Timestamp.fromDate(
         //     new Date(Date.now() + 10 * 60 * 1000)
         // );
 
 
         const selectOptions = [{ value: 0, label: "now" }, { label: "5 m", value: 5 / 60 }, { value: 10 / 60, label: "10 m" }];
 
         return (
             <div className="fit">
                 <div className="mobile-container">
                     <div className="title-bar">
                         <div className="title-left">
                             <div className="title-icon">
                                 <i className="fas fa-angle-left"></i>
                             </div>
                             {this.propsState.currentSequence?.getJson().name==="" ||this.state.edit?(<div className="name-a-sequence">
                             <ParentFormComponent obj={this.propsState.currentSequence} name="name"/>
                             
                             <RunButton callbackFunc={()=>{
                                this.setState({edit:false})
                                this.propsState.currentSequence.update();
                                }} content="save" className={"dark-button-1"}/>
                             </div>):(<><div className="title-name">{this.propsState.currentSequence?.getJson().name}
                             <span onClick={()=>{
                                this.setState({edit:true})}}><span className="name-a-sequence-edit-btn">Edit</span></span>
                             </div></>)}
                             
                         </div>
                         <div className="title-right">
                             <div className="title-icon">
                                 <i className="fas fa-circle"></i>
                             </div>
                             <div className="title-name">Active</div>
                         </div>
                     </div>
 
          
 
                     <div className="switch-tab">
                         <div className="row row-space-around">
                             <div onClick={()=>{this.setState({spState:"assignedProspects"})}} 
                             className={this.state.spState==="sequenceSteps"?"switch-tab-btn":"switch-tab-btn active"}>
                                 Assigned
                                 <br />
                                 Prospects
                             </div>
                             <div onClick={()=>{this.setState({spState:"sequenceSteps"})}} 
                             className={this.state.spState==="assignedProspects"?"switch-tab-btn":"switch-tab-btn active"}>
                                 Sequence
                                 <br />
                                 Steps
                             </div>
                         </div>
                     </div>
                        {this.state.spState==="sequenceSteps"?(
                     <div className="icon-list">
                     <MapComponent
                     name="step"
                     mapSectionClass="none"
                     mapContainerClass = "none"
                     filter={{ search: this.propsState.currentSequence?.getJson()._id, attribute: "sequenceId" }}
                     filterFunc={(obj)=>{
                         if(obj.getJson().content===undefined){
                             return false
                         }
                         if(obj.getJson().content===""){
                             return false
                         }
                         return true
                     }}
                     cells={[
                         { type: "custom", custom: StepCustomItem, wrapperClass:"none" },
 
                     ]}
                 /> 
                 <PopupButton
                                 formClass="svg-last"
                                //  wrapperClass="icon-row"
                                 newProp="asdf"
                                 obj={
                                    this.getStepJson()
                                 }
                                 content={<>
                                     <svg width="50" height="50" xmlns="http://www.w3.org/2000/svg">
                                     <path
                                         d="M25,0 Q25,25 50,25 H50"
                                         fill="none"
                                         stroke="var(--app-green)"
                                         strokeWidth="3"
                                         strokeLinecap="round"
                                     />
                                 </svg>
                                 <div className="icon-last">
                                     <i className="fa-solid fa-plus"></i>
                                 </div>
                                 </>}
                                 popupSwitch="addStep"
                             />
 
 
                         <div className="icon-row">
                             <div className="svg-last">
                                 
                             </div>
                         </div>
                     </div>
                     ):(
                        <MapComponent
                     name="contact"
                     mapSectionClass="none"
                     mapContainerClass = "none"
                     filter={{ search: this.propsState.currentSequence?.getJson()._id, attribute: "sequenceId" }}
                     
                     cells={[
                         { type: "custom", custom: AssignedProspectsCustom, wrapperClass:"none" },
 
                     ]}
                 /> 
                     )}

                 </div>
                 {/* <h4 style={{ marginBottom: "10px" }}>Steps for Sequence</h4>
                 Name:
                 {this.propsState.currentSequence && (
                     <ParentFormComponent
                         obj={this.propsState.currentSequence}
                         name="name"
                     />
                 )}
 
                 <MapComponent
                     name="step"
                     filter={{ search: this.propsState.currentSequence?.getJson()._id, attribute: "sequenceId" }}
                     cells={[
                         { type: "attribute", name: "subject" },
                         { type: "attribute", name: "content" }
                         // { type: "custom", custom: StepComponent}
                     ]}
                 /> */}
 
 
                 {/* If there is a currentStep, show the form to edit it */}
                 
 
 
                 {/* If there is a currentStep, show a RunButton to clear it */}
             
                 {/* If there is a currentStep, show a RunButton to clear it */}
                 {/* {this.propsState.currentSequence && (
                     <RunButton
                         content="Save Sequence"
                     />
                 )} */}
             </div>
         );
     }
     /**
      * Renders the Sequences component.
      * @returns {JSX.Element} The rendered component.
      */
     render() {
         return (
             <div className={[this.props.pageClass || this.state.defaultClass, "sequence-margin"].join(" ")}>
                 {this.getInnerContent()}
             </div>
         );
     }
 }
