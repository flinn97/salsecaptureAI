let data = [
    {
        type:"email",
        body: "Hey John, just wanted to follow up on our conversation yesterday. Do you think the software is a good fit for your team? I'm happy to set up another demo or go over pricing options",
        conversationId: '123',
        _id:"email1",
        owner: "alan@salescapture.ai",
        timeStamp: "Yesterday 10:14 AM",
        subject: "hi",
        ownerMessage:true,
    },
   //John emails
    {
        type:"email",
        body: "Hey John, just wanted to follow up on our conversation yesterday. Do you think the software is a good fit for your team? I'm happy to set up another demo or go over pricing options",
        conversationId: '123',
        _id:"email1",
        owner: "alan@salescapture.ai",
        timeStamp: "Yesterday 10:14 AM",
        subject: "hi",
        ownerMessage:true,
    },
    {
        type:"email",
        body: "Can you get me a price estimate that I can bring back to my team?",
        conversationId: '123',
        _id:"email2",
        owner: "alan@salescapture.ai",
        subject: "hi",
        timeStamp: "Today 9:14 AM",
        ownerMessage:false,
    },
    //Jane emails
    {
        type:"email",
        body: "Hi Jane, AI can find the contacts you need to reach out to TODAY. Let me know if you can connect today.",
        conversationId: '1234',
        _id:"email3",
        owner: "alan@salescapture.ai",
        timeStamp: "Yesterday 10:14 AM",
        subject: "hi",
        ownerMessage:true,
    },
    {
        type:"email",
        body: "Sure I have time arround 3pm tomorrow afternoon",
        conversationId: '1234',
        _id:"email4",
        owner: "alan@salescapture.ai",
        subject: "hi",
        timeStamp: "Today 9:14 AM",
        ownerMessage:false,
    },
    //Taylor emails
    {
        type:"email",
        body: "Hey Taylor Just let me know if it would be good to meet today or not.",
        conversationId: '1235',
        _id:"email5",
        owner: "alan@salescapture.ai",
        timeStamp: "Yesterday 10:14 AM",
        subject: "hi",
        ownerMessage:true,
    },
    {
        type:"email",
        body: "No I can't to this week.",
        conversationId: '1235',
        _id:"email6",
        owner: "alan@salescapture.ai",
        subject: "hi",
        timeStamp: "Today 9:14 AM",
        ownerMessage:false,
    },

    {
        type:"conversation",
        _id:"123",
        contact: "taylormdavidson@gmail.com",
        contactName: "John Doe",
        timeStamp: "Today 2:15 pm",
        recentMessage:"Hey, how's it going?",
        owner:"alan@salescapture.com"
    },
    {
        type:"conversation",
        _id:"1234",
        contact: "taylormdavidson@gmail.com",
        contactName: "Jane Doe",
        timeStamp: "Today 2:15 pm",
        recentMessage:"Hey, how's it going?",
        owner:"alan@salescapture.com"
    },
    {
        type:"conversation",
        _id:"1235",
        contact: "taylormdavidson@gmail.com",
        contactName: "Taylor Davidson",
        timeStamp: "Today 2:15 pm",
        recentMessage:"Can you get me a price estimate that I can bring back to my team?",
        owner:"alan@salescapture.com"
    },
    {
        type:"contact",
        _id: "contact1",
        name:"Taylor Davidson",
        email:"taylormdavidson@gmail.com",
        owner:"alan@salescapture.com "

    },
    {
    type:"potentialProspect",
    _id: "prospect1",
    firstName:"Taylor Davidson",
    email:"taylormdavidson@gmail.com",
    owner:"alan@salescapture.com ",
    researchId:"research1",
    },
    {
        type:"research",
        _id: "research1",
        name:"research1",
        owner:"alan@salescapture.com "
        }
]

export {data}