import { BaseComponent } from "flinntech";

export default class CustomMessageItem extends BaseComponent{

    render(){
        
        let str = this.props.obj.getJson().ownerMessage? "outgoing":"incoming"
        return(
            <>
            {/* Timestamps */}
        <div className="timestamp">{this.props.obj.getJson().timeStamp}</div>
        {/* Outgoing message (right-aligned, green bubble) */}
        <div className={"message " + str}>
          {this.props.obj.getJson().body}
        </div>
            </>
        )
    }
}