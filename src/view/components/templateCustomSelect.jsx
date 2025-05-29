import React from 'react';
import { BaseComponent } from 'flinntech';
import './Checkbox.css';
import stripHTML from '../../service/heDecoderService';

class TemplateCustomSelect extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            ...this.state,
            plainText: "", // Store the stripped text
        };
    }

    componentDidMount() {
        const body = this.props.obj?.getJson().content;
        const plainText = stripHTML(body);
        this.setState({ plainText });
    }

    componentDidUpdate(prevProps) {
        const currentBody = this.props.obj?.getJson().content;
        const prevBody = this.props.obj?.getJson().content;
        if (currentBody !== prevBody) {
            const plainText = stripHTML(currentBody);
            this.setState({ plainText });
        }
    }

    render() {
        const { obj } = this.props;
        let template = obj.getJson();
        return (
            <div className="sequence">
                <div className="title" style={{
                    justifyContent: "space-between",
                    padding: "2px"
                }}>
                    
                    <div
                        style={{ color: "#262626", maxWidth: "50%", minWidth: "50%", }}
                        onClick={() => {
                            let changeItem = this.props.changeItem || "currentPopupComponent";
                            let changeAttribute = this.props.changeAttribute || "content";
                            this.propsState[changeItem].setCompState({ [changeAttribute]: template.content });
                            this.dispatch({update:this.propsState[changeItem]})
                        }} className="title-left">
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
                            {this.state.plainText}
                        </span>
                    </div>



                </div>
           
            </div>
        );
    }
}

export default TemplateCustomSelect;
