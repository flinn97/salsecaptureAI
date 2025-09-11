import { BaseClass } from "flinntech";

class ComponentBase extends BaseClass {
    constructor(opps) {
        super(opps);
    }
    json = {
        ...this.json,
        type: "",
        name: "",
        owner: "",
        picURL: "",
    };
}

class User extends ComponentBase {
    json = {
        ...this.json,
        type: 'user',
    };
}

class Contact extends ComponentBase {
    json = {
        ...this.json,
        type: 'contact',
        phone: "",
        autoAI: true, 
        email: "",
        title:"",
        company:"",
        mobile:"",
        firstName:"",
        lastName:"",
        address:"",
        city:"",
        state:"",
        zip:"",
        source:"",
        finishedSequenceTags:"",
        tags:"",
        conversationIds: [],
        
    };
}

class Conversations extends ComponentBase {
    json = {
        ...this.json,
        type: 'conversation',
        contactIds: [],
    };
}

class Template extends ComponentBase {
    json = {
        ...this.json,
        type: 'template',
        content: "",
    };
}

class Sequence extends ComponentBase {
    json = {
        ...this.json,
        type: 'sequence',
        steps: [],
        finished:0,
        replyRate: 0,
        limit:"20"
    };
}

class Step extends ComponentBase {
    json = {
        ...this.json,
        type: 'step',
        delay: 0,
        messageId: "",
    };
}

class BaseMessenger extends ComponentBase {
    json = {
        ...this.json,
        conversationIds: [],
        ownerMessage:false
    };
}

class TextMessage extends BaseMessenger {
    json = {
        ...this.json,
        type: 'textMessage',
        content: "",
        timestamp: "",
    };
}

class Email extends BaseMessenger {
    json = {
        ...this.json,
        type: 'email',
        subject: "",
        body: "",
        timeStamp: "",
    };
}

class PotentialProspect extends ComponentBase {
    json = {
        ...this.json,
        type: 'potentialProspect',
        phone: "",
        email: "",
        researchId:"",
        conversationIds: [],
        
    };
}

class Research extends ComponentBase {
    json={ 
        ...this.json,
        type:"research",
        searchFrequency:"",
        AIPrompt:"",
        active:true,
        skipCompanySearch: false,
        hasPeopleCsv: false,
        hasCompanyCsv: false,
        
        
    }
}

class Client extends ComponentBase{
    json={
        ...this.json,
        type:"client",
        name:"",
        email: "",
        researchId:"",
        conversationIds: [],
    }
}

class AIPrompt extends ComponentBase{
    json={
        ...this.json,
        type:"AIPrompt"
    }
}
class AISettings extends ComponentBase {
    json={ 
        ...this.json,
        type:"aiSettings",
        autoAI:"",
        
    }
}
class Todo extends ComponentBase{
    json={
        ...this.json,
        type:"todo",
        attribute1:"Create Authenticated User",
        attribute2:"Create User Data",
        attribute3:"Create Limiter",
        attribute4:"Set Up Google Auth",
        attribute5:"Setting Obj",
        attribute6:"Firebase AI Training",
        complete1:false,
        complete2:false,
        complete3:false,
        complete4:false,
        complete5:false,
        complete6:false,
        clientId:""
    }
}
class Limit extends ComponentBase{
    json={
        ...this.json,
        type:"limit",
        limit:500
    }
}
class CsvUpload extends ComponentBase{
    json={
        ...this.json,
        type:"csv",
    }

}
class Open extends ComponentBase{
    json ={
        ...this.json,
        type:"open"
    }
}

class OutreachUser extends ComponentBase{
    json={
        ...this.json,
        type:"outreachUser",
        mailboxId: "",
        mailboxEmail: ""

    }
}


class PeopleToResearch extends Contact{
    json ={
        ...this.json,
        type:"peopleToResearch"
    }
}


class CompaniesToResearch extends Contact{
    json ={
        ...this.json,
        type:"companiesToResearch"
    }
}

class Training extends ComponentBase{
    json={
        ...this.json,
        type:'training'
    }
}




export { User, Contact, Conversations, Template, Sequence, Step, TextMessage, Email, PotentialProspect, Research, Client, AIPrompt, AISettings, Todo , Limit, CsvUpload, Open, OutreachUser,PeopleToResearch,CompaniesToResearch, Training };
