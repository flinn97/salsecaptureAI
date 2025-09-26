/**
 * @class ContactPopup
 * @extends {BaseComponent}
 * This component renders a popup for adding or editing Contact information with simplified fields.
 * It uses components from 'flinntech' for form elements and buttons.
 */
import { DelButton, ParentFormComponent, RunButton, UpdateButton } from "flinntech";
import { BaseComponent } from "flinntech";
import CsvUpload from "../csvUpload";

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
  async componentDidMount() {
  

    if (this.propsState.currentUser.getJson().outreachio && this.componentList.getList("outreachUser")?.length===0) {
      let accessToken = this.propsState.currentUser.getJson().outreachAccessToken;
      let usersAndMailboxes = await fetch("https://getusersandmailboxes-7c5i3vsqma-uc.a.run.app", {
        headers: { Authorization: `Bearer ${accessToken}` }
      })
        .then(r => r.json())
        .then(async (data) => {
          
          console.log(data)
          let userData = data.users;
          let mailboxeData = data.mailboxes;
          let rawData = userData.map(obj => {
            let mailbox = mailboxeData.find((m)=>{return m.attributes.email===obj.attributes.email})
            let newO = {
              _id:obj.id.toString(),
              type: "outreachUser",
              mailboxId: mailbox.id,
              type:"outreachUser",
              mailboxEmail: mailbox.attributes.email,
            }
            return newO;
          });
          let factory = this.propsState.componentListInterface.getFactory();
          let list = this.componentList.getList("outreachUser");
          
          let newList = [...list]
          for(let obj of rawData){
            let item = await factory.getComponent(obj);
            newList = [...newList, item]
          }
          let outreachUserList = newList
          this.componentList.setSelectedList("outreachUser", outreachUserList)
          this.dispatch({ outreachUsers: outreachUserList })

        });
      let sequences = await fetch("https://getsequences-7c5i3vsqma-uc.a.run.app", {
        headers: { Authorization: `Bearer ${accessToken}` }
      })
        .then(r => r.json())
        .then(async (data) => {
          console.log(data)
          let rawData = data.data.map(obj => {
            let newO = {
              type: "sequence",
              _id: obj.id.toString(),
              outreach: true,
              outreach: "true",
              name: obj.attributes.name,
              outreachSequenceId: obj.attributes.id

            }
            return newO;
          });
          debugger
          let factory = this.propsState.componentListInterface.getFactory();
          let list = this.componentList.getList("sequence").filter(obj=>obj.getJson().outreach===undefined)
          
          let newList = [...list]
          for(let obj of rawData){
            let item = await factory.getComponent(obj);
            newList = [...newList, item]
          }
          let seqList = newList
          this.componentList.setSelectedList("sequence", seqList)


          this.dispatch({ outreachSequences: seqList })
        }

        );
    }
    const obj = this.propsState.currentPopupComponent;
    obj.setCompState({companyOwnerId: this.propsState.currentUser.getJson().companyId})

  }


  /**
   * Renders the ContactPopup component.
   * @returns {JSX.Element} The rendered component.
   */
  render() {
    // The object containing the data for the form, either for adding or editing
    const obj = this.propsState.currentPopupComponent;

    // Determine the text for the heading based on whether an object is provided
    let text = this.propsState.currentPopupComponent.getJson().date ? "Edit" : "Add";

    // Set default button to RunButton for adding, UpdateButton for editing
    let button = this.propsState.currentPopupComponent.getJson().date ? (
      <UpdateButton
        formClass="dark-button-1"
        obj={this.propsState.currentPopupComponent}
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
        style={{ padding: "10px", paddingBottom: "100px", height: "100%" }}
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
                type="select"
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
            <div className="row-name">Source:</div>
            <div className="row-field" style={{ width: "100%" }}>
              {" "}
              {/*Container for the AI Prompt input*/}
              <ParentFormComponent obj={obj}
              placeholder="What Sources?" 
              name="displayDataSrc" 
              type ="select"
              inPopup={true}
              selectOptions={['existing', 'newData', 'both']}
              handleChange={(e)=>{
                
            let src =e.target.value

            if(src==="both"){
              src= ['existing', 'newData'];
            }
            else{
              src = [src]
            }
            this.propsState.currentPopupComponent.setCompState({getDataFrom:src, displayDataSrc:e.target.value})
          }}  
          //  textOptions ={["Existing ie, current crm, ourtreach.io salesforce etc", "New ie, zoom info, success ai, apollo", "Both"]} 
          />
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
                type="select"
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
            <div className="row-name">Industry:</div>
            <div className="row-field" style={{ width: "100%" }}>
              {" "}
              {/*Container for the AI Prompt input*/}
              <ParentFormComponent
                obj={obj}
                placeholder={"i.e. Technology, software, SAAS"}
                name="industry"
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
          {this.propsState.currentUser.getJson().outreachio &&<>
          <div className="row-container" style={{ flexDirection: "column" }}>
            <div className="row-name">Select Sequence:</div>
            <div className="row-field" style={{ width: "100%" }}>

          <ParentFormComponent  
                      name='sequenceDisplay'

          handleChange={(e)=>{
            debugger
            let val = e.target.value;
            let seq = this.componentList.getComponent("sequence", val, 'name')
            obj.setCompState({outreachSequenceId: seq.getJson()._id, sequenceDisplay:e.target.value})
            this.dispatch({})
          }}
          obj={obj}
          type ={"select"}
          selectOptions={this.componentList.getList("sequence").map(s=>s.getJson().name)}
          />
           </div>
          </div>
          
          <div className="row-container" style={{ flexDirection: "column" }}>
            <div className="row-name">Select User:</div>
            <div className="row-field" style={{ width: "100%" }}>
          <ParentFormComponent obj={obj} type ={"select"} 
          name="outreachUserDisplay"
          handleChange={(e)=>{
            debugger
            let val = e.target.value;
            let user = this.componentList.getComponent("outreachUser", val, 'mailboxEmail')
            obj.setCompState({outreachUserId: user.getJson()._id, outreachUserDisplay:e.target.value})
            this.dispatch({})

          }}
          selectOptions={this.componentList.getList("outreachUser").map(s=>s.getJson().mailboxEmail)}/>
 </div>
          </div>
          <div className="row-container" style={{ flexDirection: "column" }}>
            <div className="row-name">Automatic:</div>
            <div className="row-field" style={{ width: "100%" }}>
          <ParentFormComponent obj={obj} type ={"select"} 
           handleChange={(e)=>{
            
            let val = e.target.value;
            let bool = val==="Yes"?true:false;
            obj.setCompState({autoSequence:bool, autoSequenceDisplay:e.target.value})
          }}

          name="autoSequenceDisplay"
          // textOptions ={["Yes", "No"]} 
          selectOptions={["Yes", "No"]}/>
 </div>
          </div>
          </>}

          <div
            style={{
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
           { this.propsState.currentPopupComponent.getJson().date &&
             <DelButton
                obj={this.propsState.currentPopupComponent}
                isPopup={true}
                inPopup={true}
                callbackFunc={()=>{this.dispatch({currentPopupComponent:undefined, popupSwitch:""})}}

                formClass="dark-button-1"
                content={"Delete"}
                
              />}
            {" "}
            {/*Container for the save button*/}
            <div>
              {" "}
              {/*Container for button spacing*/}
              {button}
            </div>
          </div>
        </div>
            <div onClick={()=>{this.setState({showUpload:"people"})}}>people upload</div>
            {this.state.showUpload ==="people"&&
        <CsvUpload
                  callBack={async (data) => {
                    debugger
                    let oldContacts = await this.componentList.getComponentsFromBackend({type:"peopleToResearch", ids:this.propsState.currentPopupComponent.getJson()._id, filterKeys:"researchId"})
                    for(let c of oldContacts){
                      await c.del();
                    }
                    data = data.data.map((obj, i) => {
                      obj.owner = this.propsState.currentUser.getJson()._id;
                      obj.type = "peopleToResearch";
                      obj.companyOwnerId = this.propsState.currentUser.getJson().companyId;
                      obj.researchId = this.propsState.currentPopupComponent.getJson()._id
                      return obj;
                    });
                    this.dispatch({
                      uploadPeopleResearchData: data,
                    });
                    await this.operationsFactory.prepare({ prepare: data });
                    await this.propsState.currentPopupComponent.setCompState({hasPeopleCsv:true, hasCompanyCsv:false});
                    await this.propsState.currentPopupComponent.update();
                    this.operationsFactory.addToComponentList();

                  }}
                
                />}
                            <div onClick={()=>{this.setState({showUpload:"company"})}}>company upload</div>
                            {this.state.showUpload ==="company"&&
                 <CsvUpload
                  callBack={async (data) => {
                    debugger
                    let oldCompanies = await this.componentList.getComponentsFromBackend({type:"companiesToResearch", ids:this.propsState.currentPopupComponent.getJson()._id, filterKeys:"researchId"})
                    for(let c of oldCompanies){
                      await c.del();
                    }
                    data = data.data.map((obj, i) => {
                      obj.owner = this.propsState.currentUser.getJson()._id;
                      obj.type = "companiesToResearch";
                      obj.companyOwnerId = this.propsState.currentUser.getJson().companyId;
                      obj.researchId = this.propsState.currentPopupComponent.getJson()._id

                      return obj;
                    });
                    this.dispatch({
                      uploadCompanyResearchData: data,
                    });
                    await this.operationsFactory.prepare({ prepare: data });
                    await this.propsState.currentPopupComponent.setCompState({hasCompanyCsv:true, hasPeopleCsv:false});
                    await this.propsState.currentPopupComponent.update();
                    this.operationsFactory.addToComponentList();


                  }}
                />}
                <div onClick={()=>{this.setState({showUpload:"image"})}}>Upload Image for research</div>
      </div>
    );
  }
}
