/**
 * Sequences component. This component renders a card displaying a list of sequences.
 * It extends the BaseComponent class from 'flinntech'.
 */
import { Card } from "flinntech";
import { BaseComponent } from "flinntech";
import { Link } from "react-router-dom";
import { MapComponent } from "flinntech";
import SequenceCustomItem from "./components/sequenceCustom";

export default class Sequences extends BaseComponent {
    /**
     * Constructs the Sequences component.
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
     * Returns the inner content of the Sequences component.
     * @returns {JSX.Element} The rendered content of the sequences.
     */
    getInnerContent() {
        return (
            <div className="fit">
                <h4 style={{ marginBottom: "10px" }}>Sequences</h4>
                {/* Link to navigate to the sequences page */}
                
                
                {/* MapComponent to display sequences with title and date */}
                <MapComponent
                    name="sequence"
                    cells={[
                        {type:"custom",
                        custom:SequenceCustomItem
                        }
                        // {
                        //     type: "attribute",
                        //     name: "name",
                        //     hasLink: true, // Enables link functionality
                        //     linkClick: (obj) => {
                        //         const id = obj.getJson()._id; // Get the sequence ID
                        //         this.dispatch({ popupSwitch: "", currentPopupComponent: undefined });
                        //         window.location.href = `/sequence/${id}`; // Redirect to the specific sequence page
                        //     }
                        // },
                        // {
                        //     type: "attribute",
                        //     name: "date", // Display the date of the sequence
                        // }
                    ]}
                />
            </div>
        );
    }

    /**
     * Renders the Sequences component.
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