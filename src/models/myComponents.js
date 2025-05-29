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
        email: "",
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
    };
}

class Step extends ComponentBase {
    json = {
        ...this.json,
        type: 'step',
        delay: 0,
        messageId: ""
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
        timestamp: "",
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
        type:"research"
    }
}
class CalendarEvent extends ComponentBase{
    json={
        ...this.json,
        type:"calendarEvent",
        name: '', dayIndex: 0, startTime: '10:00', duration: 90, day:"Monday"
    }
}
class Task extends ComponentBase{
    json={
        ...this.json,
        type:"task",
        dueDate:"",
        completed:false,
        completeDate:"",
        name: ""
    }
}
class Homework extends ComponentBase{
    json={
        ...this.json,
        type:"homework",
        dueDate:"",
        completed:false,
        completeDate:"",
        content:"",
        name: ""
    }
}
class Goal extends Homework{
    json={
        ...this.json,
        type:"goal",
       
    }
}

class Session extends CalendarEvent{
    json={
        ...this.json,
        type:"session",
    }
}



export { User, Contact, Conversations, Template, Sequence, Step, TextMessage, Email, PotentialProspect, Research, CalendarEvent, Task, Homework, Goal,  Session};