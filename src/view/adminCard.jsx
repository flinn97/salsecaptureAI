/**
 * Templates component. This component renders a view for displaying template items. 
 * It uses the MapComponent from the flinntech library to display the templates.
 */
import { MapComponent } from "flinntech";
import { BaseComponent } from "flinntech";
import { Link } from "react-router-dom";
import TemplateCustomItem from "./components/templateCustom";
import ClientCustom from "./components/clientCustom";
import TrainingCustom from "./components/trainingCustom";
import SCAIPopupButtonTest from "./components/debug/CustomPopupButton";

export default class AdminCard extends BaseComponent {
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
                    name="client"
                    cells={[
                        {type:"custom",
                        custom:ClientCustom
                        }
                      
                    ]}
                />

                ALL TRAINING DOCS
                <SCAIPopupButtonTest
                  wrapperclassName="none"
                  content={
                    <div

                      className="dark-button-1"
                      style={{
                        position: "relative",
                        width: "fit-content",
                      }}
                    >
                      Add Training
                    </div>
                  }
                  popupSwitch="addTraining"
                />
                <MapComponent
                    name="training"
                    cells={[
                        {type:"custom",
                        custom:TrainingCustom
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