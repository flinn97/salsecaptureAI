/**
 * @class OemPopupContent
 * @extends {BaseComponent}
 * This component renders a popup for adding or editing OEM information.  It uses other components from 'flinntech' for form elements and buttons.
 */
import { Timestamp } from "firebase/firestore";
import {
  MapComponent,
  ParentFormComponent,
  RunButton,
  UpdateButton,
  UploadButton,
} from "flinntech";
import { BaseComponent } from "flinntech";
import SequencePopupCustomItem from "../components/sequencePopupCustom";

export default class AddToSequence extends BaseComponent {
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

  async componentDidMount() {
    if (this.propsState.currentUser.getJson().outreachio && this.componentList.getList("outreachUser")?.length===0) {
      let accessToken = this.propsState.currentUser.getJson().outreachAccessToken;
      let usersAndMailboxes = await fetch("https://getusersandmailboxes-7c5i3vsqma-uc.a.run.app", {
        headers: { Authorization: `Bearer ${accessToken}` }
      })
        .then(r => r.json())
        .then(async (data) => {
          debugger
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
          let componentsAdded = await this.componentList.addComponents(rawData, true);

          this.dispatch({ outreachUsers: componentsAdded })
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
              name: obj.attributes.name,
              outreachSequenceId: obj.attributes.id

            }
            return newO;
          });
          let componentsAdded = await this.componentList.addComponents(rawData, true);

          this.dispatch({ outreachSequences: componentsAdded })
        }

        );
    }
  }

  /**
   * Renders the OemPopupContent component.
   * @returns {JSX.Element} The rendered component.
   */
  render() {
    return (
      <div
        style={{
          padding: "20px",
          paddingBottom: "100px",
          position: "relative",
          paddingTop: "0px"
        }}
        className={this.props.pageClass || this.state.defaultClass}
      >
        <div
          style={{
            paddingTop: "20px",
            display: "flex",
            flexDirection: "column",
            position: "sticky",
            top: 0,
            zIndex: 20, background: "white",
          }}
        >
          <h2 >Add to Sequence</h2> {/*Heading for the popup*/}
          <div
            className="count-desc"
            style={{ position: "relative", margin: "10px" }}
          >
            Contacts: {this.propsState.selectedContacts?.length || "0"}{" "}
          </div>
        </div>

          {this.propsState.currentUser.getJson().outreachio?(<>
  
          Select Sequence
          <ParentFormComponent  handleChange={(e)=>{
            let sequenceId =e.target.value
            debugger
            let sequence = this.componentList.getComponent("sequence", sequenceId);
            this.dispatch({selectedSequence:sequence});
          }} 
          type ={"select"} 
          textOptions ={this.componentList.getList("sequence").map(s=>s.getJson().name)} 
          selectOptions={this.componentList.getList("sequence")}
          />
          Select User
          <ParentFormComponent  handleChange={(e)=>{
            debugger
            let userId=e.target.value
            let user = this.componentList.getComponent("outreachUser", userId);
            
            this.dispatch({selectedUser:user});
          }} type ={"select"} textOptions ={this.componentList.getList("outreachUser").map(s=>s.getJson().mailboxEmail)} selectOptions={this.componentList.getList("outreachUser")}/>

          
          <div onClick={async ()=>{
            debugger
              const { selectedContacts = [],selectedUser, selectedSequence, currentUser} = this.propsState;
              const userJson = selectedUser.getJson();
              const sequenceJson = selectedSequence.getJson();
              if (!Array.isArray(selectedContacts) || selectedContacts.length === 0) {
                console.error("No contacts selected to add.");
                return;
              }
              if (!userJson || !sequenceJson) {
                console.error("User or sequence not selected.");
                return;
              }
            
              // Build the payload for each contact
              const contactsPayload = selectedContacts.map(contact => ({
                firstName: contact.getJson().firstName,
                lastName:  contact.getJson().lastName,
                emails:    [ contact.getJson().email ],
                userId:    userJson._id,
                company:   contact.getJson().company,
                mailboxId: userJson.mailboxId
                // add any other required fields here
              }));
            
              const body = {
                contacts:   contactsPayload,
                sequenceId: sequenceJson._id
              };
            
              try {
                let accessToken = this.propsState.currentUser.getJson().outreachAccessToken;

                const response = await fetch(
                  "https://createcontactsandenroll-7c5i3vsqma-uc.a.run.app",
                  {
                    method:  "POST",
                    headers: {
                      "Content-Type":  "application/json",
                      "Authorization": `Bearer ${accessToken}`
                    },
                    body: JSON.stringify(body)
                  }
                );
            
                const result = await response.json();
                if (!response.ok) throw result;
                console.log("✅ Contacts created & enrolled:", result);
                this.dispatch({popupSwitch:""})
              } catch (err) {
                // alert("❌ Error adding to sequence: " + (err?.message || JSON.stringify(err)));
                console.error("❌ Error adding to sequence:", err);
              }
            }} className="floating-select-btn-text" style={{ color: "black" }}>
                    Add to Sequence
                  </div>
          </>):(
        <MapComponent
          name="sequence"
          cells={[{ type: "custom", custom: SequencePopupCustomItem }]}
        />
        )}

        {/* <MapComponent name="sequence" cells={[{type:"attribute", name:"name", itemClick:(obj)=>{
            debugger
            
            let contacts = this.propsState.selectedContacts;
            let step1 = this.componentList.getList("step", [obj.getJson()._id, 0], ["sequenceId", "step"])[0];
            if(contacts?.length>0){
              let delay = parseFloat(step1.getJson().nextSend)
              let nextSend = new Date(Date.now() + delay * 60 * 60 * 1000);
              nextSend = Timestamp.fromDate(nextSend)
              for(let c of contacts){
                c.setCompState({sequenceId:obj.getJson()._id, finished:false, emailNumber:0, nextSend: nextSend}, {run:true})
              }
            }
           }}]}/> */}
           
      </div>
    );
  }
}
