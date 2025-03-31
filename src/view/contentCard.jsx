/**
 * ContentCard component. This component renders a card that contains 
 * two sections: one for Sequences and one for Templates. 
 * It extends the BaseComponent class from 'flinntech'.
 */
import { Card } from "flinntech";
import { BaseComponent } from "flinntech";
import Sequences from "./Sequences"; // Custom component for Sequences
import Templates from "./Templates"; // Custom component for Templates

export default class ContentCard extends BaseComponent {
    /**
     * Constructs the ContentCard component.
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
     * Returns the inner content of the ContentCard component.
     * @returns {JSX.Element} The rendered content of the card.
     */
    getInnerContent() {
        return (
            <div className="layoutRow" style={{ marginTop: "20px", marginLeft:"200px" }}>
                {/* Left Card for Sequences */}
                <div style={{ width: "45%", marginRight: "30px" }}>
                    <Card theme="defaultCard" content={<Sequences />} />
                </div>
                
                {/* Right Card for Templates */}
                <div style={{ width: "45%" }}>
                    <Card theme="defaultCard" content={<Templates />} />
                </div>
            </div>
        );
    }

    /**
     * Renders the ContentCard component.
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