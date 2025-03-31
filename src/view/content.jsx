/**
 * Content component. This component renders a large card displaying content. 
 * It extends the GetAllComponents class from 'flinntech'.
 */
import { Card } from "flinntech";
import { GetAllComponents } from "flinntech";
import ContentCard from "./ContentCard";

export default class Content extends GetAllComponents {
    /**
     * Constructor for the Content component.
     * @param {object} props - Properties passed to the component.
     */
    constructor(props) {
        super(props);
        this.state = {
            ...this.state,
            defaultClass: "fit",
            owner:this.propsState.currentUser.getJson()._id
        };
    }

    /**
     * Lifecycle method that runs after the component is mounted.
     * Fetches components data from the backend.
     */
    async componentDidMount() {
        this.getComponentsFromBackend();
    }

    /**
     * Renders the Content component.
     * @returns {JSX.Element} The rendered component.
     */
    render() {
        return (
            <div className={this.props.pageClass || this.state.defaultClass} style={{ marginLeft: window.innerWidth < 1000 ? "5px" : "50px" }}>
                {this.state.gotComponents && (
                    <div className="fit">
                        <Card theme="defaultCard" content={<ContentCard />} />
                    </div>
                )}
            </div>
        );
    }
}