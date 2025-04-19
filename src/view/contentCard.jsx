/**
 * ContentCard component. This component renders a card that contains 
 * two sections: one for Sequences and one for Templates. 
 * It extends the BaseComponent class from 'flinntech'.
 */
import { Card } from "flinntech";
import { BaseComponent } from "flinntech";
import { Link } from "react-router-dom";
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
            <div className="mobile-container" style={{width:"80%", marginLeft:"300px"}}>
                <div className="top-nav-float">
                    <nav className="top-nav">
                        <div className="nav-left">
                            <div className="nav-icon">
                                <i className="fas fa-circle"></i>
                            </div>
                            <div className="title-name">Content</div>
                        </div>




                    </nav>


                    <div className="search-container">
                        <div className="search-bar">
                            <i className="fas fa-search search-icon"></i>
                            <input onChange={(e) => {
                                this.dispatch({ tags: e.target.value })
                            }}
                                className="search-input" placeholder="Search" />
                        </div>
                    </div>

                    <div className="filter">
                        <div className="row row-space-between">
                        <Link to="/sequence" className="btn-gray" >
                        New Sequence
                </Link>
                <Link to="/template" className="btn-gray" >
                    New Template
                </Link>
                            <div className="btn-gray">New AI</div>
                        </div>
                    </div>

                </div>
                {/* Left Card for Sequences */}
                {/*<div style={{ width: "45%", marginRight: "30px" }}>*/}
                <div>
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