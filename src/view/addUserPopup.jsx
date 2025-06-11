/**
 * Templates component. This component renders a view for displaying template items. 
 * It uses the MapComponent from the flinntech library to display the templates.
 */
import { MapComponent, ParentFormComponent, RunButton } from "flinntech";
import { BaseComponent } from "flinntech";
import { Link } from "react-router-dom";
import TemplateCustomItem from "./components/templateCustom";
import ClientCustom from "./components/clientCustom";

export default class AddUserPopup extends BaseComponent {
    /**
     * Constructs the Templates component.
     * @param {object} props - The component's properties.
     */
    constructor(props) {
        super(props);
        this.state = {
            ...this.state,
            defaultClass: "fit",
        };
    }

    getInnerContent() {
        return (
            <>
                <ParentFormComponent name="_id" label="id:" inPopup={true}/>
                <ParentFormComponent name="email" label="email:" inPopup={true}/>
                <ParentFormComponent name="collection" label="collection:" inPopup={true}/>
                <ParentFormComponent name="owner" label="owner:" inPopup={true}/>
             
                
                <RunButton isPopup={true} content="save" callbackFunc={()=>{
                    let user = this.propsState.popupComponent
                    this.operationsFactory.prepare({prepare:[{type:"aiSettings", owner:user.getJson()._id},{type:"limit", owner:user.getJson()._id}]})
                    }}/>
            </>
        );
    }

    render() {
        return (
            <div className={this.props.pageClass || this.state.defaultClass}>
                {this.getInnerContent()}
            </div>
        );
    }
}