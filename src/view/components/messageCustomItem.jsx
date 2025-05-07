import { BaseComponent } from "flinntech";
import stripHTML from "../../service/heDecoderService";

export default class CustomMessageItem extends BaseComponent{
    constructor(props) {
        super(props);
        this.state = {
          ...this.state,
          plainText: "", // Store the stripped text
        };
      }

    componentDidMount() {
        const body = this.props.obj?.getJson().body;
        const plainText = stripHTML(body);
        this.setState({ plainText });
      }

    componentDidUpdate(prevProps) {
        const currentBody = this.props.obj.getJson().body;
        const prevBody = prevProps.obj.getJson().body;
        if (currentBody !== prevBody) {
          const plainText = stripHTML(currentBody);
          this.setState({ plainText });
        }
    }

    render(){
        const stripHtml = this.props.obj.getJson().body.replace(/<[^>]+>/g, "");
        
        let str = this.props.obj.getJson().ownerMessage? "outgoing":"incoming"
        return(
            <div>
                {/* Timestamps */}
                <div className="date-divider">
                    <span className="timestamp">{this.props.obj.getJson().timeStamp}</span>
                </div>
            <div className={"message-item " + str}>

                {/* Outgoing message (right-aligned, green bubble) */}
                <div className={"message " + str}>
                {this.state.plainText}

                </div>
            </div>
            </div>
        )
    }
}