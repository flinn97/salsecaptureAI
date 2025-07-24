/**
 * Templates component. This component renders a view for displaying template items. 
 * It uses the MapComponent from the flinntech library to display the templates.
 */
import { MapComponent, urlService } from "flinntech";
import { BaseComponent } from "flinntech";
import { Link } from "react-router-dom";
import TemplateCustomItem from "./components/templateCustom";
import ClientCustom from "./components/clientCustom";
import AICustomItem from "./components/aiCustom";

export default class AIPromptCard extends BaseComponent {
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

      
    async componentDidMount(){
        
        let user = await this.componentList.getComponentFromBackend({type:"user"});

    }

    /**
     * Returns the inner content of the Templates component.
     * @returns {JSX.Element} The rendered content of the component.
     */
    getInnerContent() {
        let id = urlService.getIdFromURL()
        return (
            <>
                <h4 style={{ marginBottom: "10px", font: "normal normal 900 16px/22px Satoshi" }}>Admin</h4>
                
                {/* MapComponent to display templates with links */}
                <MapComponent
                    name="research"
                    filter={{search:id, attribute:"owner"}}
                    cells={[
                        {type:"custom",
                        custom:AICustomItem
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