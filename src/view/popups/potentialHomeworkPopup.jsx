/**
 * @class OemPopupContent
 * @extends {BaseComponent}
 * This component renders a popup for adding or editing OEM information.  It uses other components from 'flinntech' for form elements and buttons.
 */
import { MapComponent, ParentFormComponent, RunButton, UpdateButton, UploadButton } from "flinntech";
import { BaseComponent } from "flinntech";
import PotentialHwPopupCustom from "../components/potentialHwPopupCustom";

export default class PotentialHomeworkPopup extends BaseComponent {
    /**
     * Constructor for the OemPopupContent component.
     * @param {object} props - The component's properties.
     */
    constructor(props) {
        super(props);
        this.state = {
            ...this.state,
            defaultClass: "fit scroller", //Sets a default class for styling
        }
    }

    async componentDidMount(){
        
        let currentSession = this.propsState.currentSession
        await this.componentList.getComponentsFromBackend({type:"potentialHomework", ids:currentSession.getJson()._id, fliterKeys:"sessionId"});
        this.setState({start:true})
    }
    /**
     * Renders the OemPopupContent component.
     * @returns {JSX.Element} The rendered component.
     */
    render() {
       
        return (

            <div style={{ padding: "10px", paddingBottom: "100px", height: "100%" }} className={this.props.pageClass || this.state.defaultClass}>
                <h2>Potentail Homework From AI</h2> {/*Heading for the popup*/}
              {this.state.start&&
              <div><MapComponent name="potentialHomework" filter={{search: this.propsState.currentSession.getJson()._id, attribute:"sessionId"}} cells={[{type:"custom", custom:PotentialHwPopupCustom}]}/></div>
              }
              {this.propsState.currentPotentialHw&&<div>
                <ParentFormComponent
                type="quill"
                obj={this.propsState.currentPotentialHw}
                name="hwText"
                wrapperClass="contentWrapper"
              />  
              <div onClick={()=>{
                this.propsState.currentPotentialHw.copy({type:"homework", name:this.propsState.currentPotentialHw.getJson().hwText})
              }}>Create Homework</div>             
                </div>}
            



            </div>
        )
    }


}