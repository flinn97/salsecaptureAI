/**
 * Templates component. This component renders a view for displaying template items. 
 * It uses the MapComponent from the flinntech library to display the templates.
 */
import { MapComponent } from "flinntech";
import { BaseComponent } from "flinntech";
import { Link } from "react-router-dom";
import TemplateCustomItem from "./components/templateCustom";
import ClientCustom from "./components/clientCustom";
import AICustomItem from "./components/aiCustom";
import UserCustomItem from "./components/userCutomItem";

export default class UserList extends BaseComponent {
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
                <h4 style={{ marginBottom: "10px", font: "normal normal 900 16px/22px Satoshi" }}>Admin</h4>
                
                {/* MapComponent to display templates with links */}
                <MapComponent
                    name="user"
                    filter={{search:this.propsState.currentClient.getJson()._id, attribute:"clientId"}}
                    cells={[
                        {type:"custom",
                        custom:UserCustomItem,
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