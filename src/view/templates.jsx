/**
 * Templates component. This component renders a view for displaying template items. 
 * It uses the MapComponent from the flinntech library to display the templates.
 */
import { MapComponent } from "flinntech";
import { BaseComponent } from "flinntech";
import { Link } from "react-router-dom";
import TemplateCustomItem from "./components/templateCustom";

export default class Templates extends BaseComponent {
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

    /**
     * Returns the inner content of the Templates component.
     * @returns {JSX.Element} The rendered content of the component.
     */
    getInnerContent() {
        return (
            <>
                <h4 style={{ marginBottom: "10px", font: "normal normal 900 16px/22px Satoshi" }}>Templates</h4>
                
                {/* MapComponent to display templates with links */}
                <MapComponent
                    name="template"
                    filterFunc={(obj)=>{
                        if(obj.getJson().content===undefined){
                            return false
                        }
                        if(obj.getJson().content===""){
                            return false
                        }
                        let retVal = false;
                        if (!this.propsState.searchText) {
                          retVal = true;
                        }
                        let filterText = this.propsState.searchText;
          
                        if (
                          obj
                            .getJson()
                            .content?.toLowerCase()
                            .includes(filterText?.toLowerCase())
                        ) {
                          retVal = true;
                        }
          
          
                        return retVal;
                    }}
                    cells={[
                        {type:"custom",
                        custom:TemplateCustomItem
                        }
                      
                    ]}
                />
                
                
            </>
        );
    }

    /**
     * Renders the Templates component.
     * @returns {JSX.Element} The rendered component.
     */
    render() {
        return (
            <div className={this.props.pageClass || this.state.defaultClass}>
                {this.getInnerContent()}
            </div>
        );
    }
}