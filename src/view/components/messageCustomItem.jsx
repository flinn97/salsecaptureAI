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
              {this.props.obj.getJson().suggestion&& <div>this one is a suggestions<div onClick={()=>{
                 // const { originalMessageId, from, to, subject, text } = req.body;
                 debugger
                 let obj = this.props.obj;

                 let body = {
                  originalMessageId: obj.getJson().originalMessageId,
                  from: this.propsState.currentUser.getJson()._id,
                  to: this.propsState.currentConversation.getJson()
                    .contact,
                  subject: obj.getJson().subject,
                  text: obj.getJson().body,
                };
                // Make the POST request
                fetch(
                  "https://sendgridemailhandler-7c5i3vsqma-uc.a.run.app",
                  {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify(body),
                  }
                )
                  .then((response) => {
                    if (!response.ok) {
                      throw new Error(
                        `HTTP error! Status: ${response.status}`
                      );
                    }
                    return response.json();
                  })
                  .then((data) => {
                    console.log(
                      "Reply sent successfully in thread.",
                      data
                    );
                  })
                  .catch((error) => {
                    console.error("Error sending reply:", error);
                  });
              }}>send</div></div>}
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