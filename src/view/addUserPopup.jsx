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
                <ParentFormComponent obj={this.propsState.currentPopupComponent} name="_id"  inPopup={true}/>
                <ParentFormComponent obj={this.propsState.currentPopupComponent} name="email"  inPopup={true}/>
                <ParentFormComponent obj={this.propsState.currentPopupComponent} name="collection"  inPopup={true}/>
                <ParentFormComponent obj={this.propsState.currentPopupComponent} name="owner" inPopup={true}/>
             
                
                <RunButton  content="save" callbackFunc={async()=>{
                    debugger
                    let user = this.propsState.currentPopupComponent
                    await user.setCompState({clientId:this.propsState.currentClient.getJson()._id}, {run:true})
                    await this.operationsFactory.prepare({prepare:[{type:"aiSettings", owner:user.getJson()._id},{type:"limit", owner:user.getJson()._id}]})
                    this.operationsFactory.run()
                    this.dispatch({currentPopupComponent:undefined, popupSwitch:""})
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