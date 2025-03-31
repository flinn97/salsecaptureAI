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

export { User, Contact, Conversations, Template, Sequence, Step, TextMessage, Email };