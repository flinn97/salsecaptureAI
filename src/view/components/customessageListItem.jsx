import { BaseComponent } from "flinntech";

export default class CustomMessageListItem extends BaseComponent{
    render(){
        return(
            <><div className="message-header">
            <span className="sender">{this.props.obj.getJson().senderName}</span>
            <span className="date">{this.props.obj.getJson().timeStamp}</span>
          </div>
          <div className="snippet">{this.props.obj.getJson().recentMessage}</div></>
        )
    }
}