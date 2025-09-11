import React from 'react';
import { BaseComponent } from 'flinntech';
import './Checkbox.css';
import PdfTextUpload from '../textUploader';

class TrainingCustom extends BaseComponent {
    types={
        dataTraining: "profile",
        dataPreference: "training",
        chatbot: "content",
        valueProp: "valueProposition",
        genTraining: "content",
        companyVetting: "training",
        rules: "rules",
        other:"training"



    }
    constructor(props) {
        super(props);
        this.state = {
            ...this.state,
        };
    }



    render() {
        const { obj } = this.props;
        let training = obj.getJson();
        let contentType = this.types[training.trainingType]
        if(training.trainingType==="rules"){
            contentType = this.types.rules

        }
        if(!contentType){
            contentType = this.types.other
        }
      
        return (
            <div className="sequence">
                <div>owner: {training.owner}</div>
                <div>type: {training.trainingType}</div>
                <div>id/name: {training._id}</div>
                <div>Messaging Type {training.emailType}</div>

                <div>Training: {training[contentType]}</div>
                <PdfTextUpload
                    callBack={async ({ data }) => {
                        debugger
                        const fieldByType = { pdf: "fullText", text: "text" };
                        const field = fieldByType[data.type];
                        let contentType = this.types[training.trainingType]
                        if(training.trainingType==="rules"){
                            contentType = this.types.rules
                
                        }
                        if(!contentType){
                            contentType = this.types.other
                        }
                        await obj.setCompState({ [contentType]: data[field] });

                        this.dispatch({ uploadText: data });

                        // If update is a function, call it:
                        obj.update?.();
                    }}
                />
            </div>
        );
    }
}

export default TrainingCustom;
