import { BaseComponent, DelButton } from "flinntech";
import stripHTML from "../../service/heDecoderService";

export default class CustomMessageItem extends BaseComponent {
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


  render() {
    let str = this.props.obj.getJson().ownerMessage ? "outgoing" : "incoming";
    return (
      <div>
        {this.props.obj.getJson().suggestion ? (
          <div className="message-item outgoing">
            <div className="close-or-accept">
              <div className="accept-suggested-message hover-darken"
                onClick={async () => {
                  // const { originalMessageId, from, to, subject, text } = req.body;
                  let obj = this.props.obj;
                  obj.setCompState({suggestion:false, ownerMessage:true }, {run:true})

                  let body = {
                    originalMessageId:obj.getJson().originalMessageId ||"",
                    from: this.propsState.currentUser.getJson()._id,
                    to: this.propsState.currentConversation.getJson().contact,
                    subject: obj.getJson().subject,
                    text: obj.getJson().body,
                  };
                  let url = this.propsState.currentUser.getJson().gmailAuthenticated? "https://gmailapiemailhandler-7c5i3vsqma-uc.a.run.app" : "https://sendgridemailhandler-7c5i3vsqma-uc.a.run.app"


                  // Make the POST request
                  await fetch(
                    url,
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
                      console.log("Reply sent successfully in thread.", data);
                    })
                    .catch((error) => {
                      console.error("Error sending reply:", error);
                    });
                }}
              >
                <i className="fas fa-check" />
              </div>
              <DelButton
                obj={this.props.obj}
                formClass="none"
                content={<div  className="decline-suggested-message hover-darken">
                  <i className="fas fa-times" />
                </div>}
                
              />
              
            </div>

            <div className="message message-item-suggested">
              {this.state.plainText}
            </div>
          </div>
        ) : (
          <>
            {/* Timestamps */}
            {this.props.obj.getJson().timeStamp &&
            <div className="date-divider">
              <span className="timestamp">
                {this.props.obj.getJson().timeStamp}
              </span>
            </div>}
            <div className={"message-item " + str}>
              {/* Outgoing message (right-aligned, green bubble) */}
              <div className={"message " + str}>{this.state.plainText}</div>
            </div>
          </>
        )}

      </div>
    );
  }
}
