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

  async componentDidMount(){
    let accessToken= this.propsState.currentUser.getJson().outreachAccessToken;
    let sequences = await fetch("https://getsequences-7c5i3vsqma-uc.a.run.app", {
  headers: { Authorization: `Bearer ${accessToken}` }
})
  .then(r => r.json())
  .then(data => console.log(data));
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
          paddingTop:"0px"
        }}
        className={this.props.pageClass || this.state.defaultClass}
      >
        <div
          style={{
            paddingTop:"20px",
            display: "flex",
            flexDirection: "column",
            position: "sticky",
            top: 0,
            zIndex:20, background:"white",
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

        
          <MapComponent
            name="sequence"
            cells={[{ type: "custom", custom: SequencePopupCustomItem }]}
          />
        
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
