import { BaseComponent } from "flinntech";

export default class CustomMessageItem extends BaseComponent{

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
                    {stripHtml}

                </div>
            </div>
            </div>
        )
    }
}