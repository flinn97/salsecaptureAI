import React from 'react';
import { BaseComponent, DelButton } from 'flinntech';
import './Checkbox.css';
import contactImg from "../../assets/contact.png";
import CheckIt from './check';
import { Link } from 'react-router-dom';

class SequenceCustomItem extends BaseComponent {
    constructor(props) {
        super(props);
        // preserve any initial state from BaseComponent
    }


    render() {
        const { obj } = this.props;
        let sequence = obj.getJson();
        return (
            <div className="sequence">
                <div className="title"
                    style={{
                        justifyContent: "space-between",
                        padding: "2px"
                    }}>
                    <Link to={"/sequence/" + sequence._id}
                        style={{ color: "#262626", maxWidth: "50%", minWidth: "50%", }}
                        onClick={() => { this.dispatch({ popupSwitch: "", currentPopupComponent: undefined }) }}
                        className="title-left">
                        <span
                            style={{
                                width: "100%",
                                display: "inline-block",
                                overflow: "hidden",
                                lineBreak: "anywhere",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                            }}
                        >
                            {sequence.name}
                        </span>
                    </Link>

                    <Link to={"/sequence/" + sequence._id}
                        style={{ marginRight: "0px" }}
                        onClick={() => { this.dispatch({ popupSwitch: "", currentPopupComponent: undefined }) }}
                        className="title-right">
                        View Details
                    </Link>

                </div>
                <div className="row row-space-around" style={{ fontSize: "14px" }}>
                    <div className="col">
                        <div>Active</div>
                        <div>{this.componentList.getList("contact", sequence._id, "sequenceId")?.filter(contact => contact.getJson().finished === false)?.length || `0`}</div>
                    </div>
                    <div className="col">
                        <div>Completed</div>
                        <div>{sequence?.finished || `0`}</div>
                    </div>
                    <div className="col">
                        <div>Opened</div>
                        <div>{sequence?.openedRate ? `${sequence?.openedRate}%` : `N/A`}</div>
                    </div>
                    <div className="col">
                        <div>Reply</div>
                        <div>
                            {sequence?.replyRate != null
                                ? `${(sequence.replyRate * 100).toFixed(1)}%`
                                : 'N/A'}
                        </div>                </div>
                    <div className="col">
                        <div>Bounce</div>
                        <div>{sequence?.bounceRate ? `${sequence?.bounceRate}%` : `N/A`}</div>
                    </div>
                </div>
                {/* <div className="del-icon">
                    <i className="fa-solid fa-trash"></i>
                    <DelButton obj={obj} />
                </div> */}
            </div>
        );
    }
}

export default SequenceCustomItem;
