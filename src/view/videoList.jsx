/**
 * Sequences component. This component renders a card displaying a list of sequences.
 * It extends the BaseComponent class from 'flinntech'.
 */
import { BaseComponent } from "flinntech";
import { MapComponent } from "flinntech";
import VideoCustomItem from "./components/videoCustomItem";

export default class VideoList extends BaseComponent {
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
                <h4 style={{ marginBottom: "10px" }}>Videos</h4>
                {/* Link to navigate to the sequences page */}
                
                
                {/* MapComponent to display sequences with title and date */}
                <MapComponent
                    name="video"
                    mapContainerClass="video-grid"
                    cells={[
                        {type:"custom",

                        custom:VideoCustomItem
                        }

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