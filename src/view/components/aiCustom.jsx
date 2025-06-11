import React from 'react';
import { BaseComponent, MapComponent, urlService } from 'flinntech';
import './Checkbox.css';
import contactImg from "../../assets/contact.png";
import CheckIt from './check';
import { Link } from 'react-router-dom';
import stripHTML from '../../service/heDecoderService';
import CsvUpload from '../csvUpload';

class AICustomItem extends BaseComponent {
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
        let research = obj.getJson();
        return (
            <div>
            <div className="sequence">
            <div className="title"  style={{
                justifyContent:"space-between",
                padding:"2px"}}> 
                <div 
                style={{ color: "#262626", maxWidth: "50%", minWidth:"50%", }}
                  className="title-left">
                    <span
                style={{
                width:"100%",
                display: "inline-block",
                overflow: "hidden",
                lineBreak:"anywhere",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                }}
                    >
                    {research.name}
                </span>
                </div>
                <CsvUpload
                callBack={async (data) => {
                    debugger
                    let id = urlService.getIdFromURL()
                    let csv = await this.operationsFactory.prepare({prepare:{type:"csv", researchId:research._id}})
                    csv = csv[0]

                  data = data.data.map((obj, i) => {
                    obj.owner = id;
                    obj.type = "potentialProspect";
                    obj.researchId = research._id
                    obj.csvId = csv.getJson()._id
                    return obj;
                  });
                  
                  
                  await this.operationsFactory.prepare({ prepare: data });

                  this.operationsFactory.run();
                }}
              />
    </div>
                 
    
            </div>
            <MapComponent name="csv" filter={{search:research._id, attribute:"researchId"}} cells={[
                {type:"attribute", name:"_id"},
            ]}/>
           
        </div>
        );
    }
}

export default AICustomItem;
