import React from 'react';
import { BaseComponent, MapComponent, UrlService, urlService } from 'flinntech';
import './Checkbox.css';
import contactImg from "../../assets/contact.png";
import CheckIt from './check';
import { Link } from 'react-router-dom';
import stripHTML from '../../service/heDecoderService';
import CsvUpload from '../csvUpload';
import Papa from 'papaparse';


class AICustomItem extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
    };
    this.handleFileUpload = this.handleFileUpload.bind(this);

  }

  componentDidUpdate(prevProps) {
    // update if MapComponent gave us a new obj
    const newId = this.props.obj.getJson()._id;
    if (newId !== this.researchId) {
      this.researchId = newId;
    }
  }
  handleFileUpload(e) {
    debugger
    const file = e.target.files[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,       // Treat the first row as header
      skipEmptyLines: true,
      complete: (results) => {
        console.log('Parsed CSV data:', results.data);
        this.handleCsvUpload(results.data)
      },
      error: (error) => {
        console.error('Error while parsing:', error);
      },
    });
  }

  async componentDidMount() {
    const body = this.props.obj?.getJson().content;
    const plainText = stripHTML(body);
    this.setState({ plainText });

    let { obj } = this.props;

    let csvs = await this.componentList.getComponentsFromBackend({ type: "csv", ids: obj.getJson()._id, filterKeys: "researchId", })
    this.setState({});


    
    

  }

  handleCsvUpload = async (data) => {
    debugger
    // always reads the latest this.researchId
    const csvs = await this.operationsFactory.prepare({
      prepare: { type: "csv", researchId: this.researchId }
    });
    const csv = csvs[0];
    const ownerId = urlService.getIdFromURL();
    let user = this.componentList.getComponent("user", ownerId, "_id");
    

    const payload = data.map(row => ({
      ...row,
      owner: ownerId,
      type: "potentialProspect",
      researchId: this.researchId,
      companyOwnerId: user.getJson().companyId,
      csvId: csv.getJson()._id
    }));

    let cp = await this.operationsFactory.prepare({ prepare: payload });
    this.operationsFactory.run();

    let research = this.componentList.getComponent("research", this.researchId, "_id");


    //If AUTO Research
    if(research?.getJson().autoSequence){

    
    debugger
    let user = this.componentList.getComponent("user", urlService.getIdFromURL(false), "_id");
    if(!user){
      await this.componentList.getComponentFromBackend({type: "user" });
      user = this.componentList.getComponent("user", urlService.getIdFromURL(false), "_id");

    }
    
    for(let p of cp){
      p.copy({type:"contact", ogPPId:p.getJson()._id, outreach:true, });
  }
            

            
              const body = {
                contacts:   payload,
                user: user.getJson(),
                research: research.getJson()
              };
            
              try {

                const response = await fetch(
                  "https://autosequence-7c5i3vsqma-uc.a.run.app",
                  {
                    method:  "POST",
                    headers: {
                      "Content-Type":  "application/json",
                    },
                    body: JSON.stringify(body)
                  }
                );
            
                const result = await response.json();
                if (!response.ok) throw result;
                console.log("✅ Contacts created & enrolled:", result);
              } catch (err) {
                // alert("❌ Error adding to sequence: " + (err?.message || JSON.stringify(err)));
                console.error("❌ Error adding to sequence:", err);
              }
            } 
  };



  render() {
    const { obj } = this.props;
    let research = obj.getJson();
    return (
      <div>
        <div className="sequence">
          <div className="title" style={{
            justifyContent: "space-between",
            padding: "2px"
          }}>
            <div
              style={{ color: "#262626", maxWidth: "50%", minWidth: "50%", }}
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
                {research.name}
              </span>
            </div>
          
            <div className="dark-button-1" style={{ position: 'relative', width: "fit-content" }}>

              <label htmlFor={`file-upload${this.props.obj.getJson()._id}`} className="">
                Upload
              </label>
              <input id={`file-upload${this.props.obj.getJson()._id}`} type="file" accept=".csv" onChange={
              
                this.handleFileUpload
                } />

            </div>
          </div>


        </div>
        <div>{research.AIPrompt} </div>
        <MapComponent name="csv" filter={{ search: research._id, attribute: "researchId" }} cells={[
          { type: "attribute", name: "_id" },
        ]} />

      </div>
    );
  }
}

export default AICustomItem;
