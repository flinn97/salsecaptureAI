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
        recipient: "taylormdavidson@gmail.com",
        senderName: "John Doe",
        timeStamp: "Today 2:15 pm",
        recentMessage:"Hey, how's it going?",
        owner:"alan@salescapture.com"
    },
    {
        type:"conversation",
        _id:"1234",
        recipient: "taylormdavidson@gmail.com",
        senderName: "Jane Doe",
        timeStamp: "Today 2:15 pm",
        recentMessage:"Hey, how's it going?",
        owner:"alan@salescapture.com"
    },
    {
        type:"conversation",
        _id:"1235",
        recipient: "taylormdavidson@gmail.com",
        senderName: "Taylor Davidson",
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
        },
        {
            type:"task",
            name:"my task",
            dueDate:"April 25, 2025",
            _id:"task1",
            
        },
        { _id: 1, name: 'Jodie Soultfair', dayIndex: 0, startTime: '10:00', duration: 90, type:"calendarEvent" }, // Monday 10:00 - 11:30
                { _id: 2, name: 'Cameron Bates', dayIndex: 0, startTime: '11:30', duration: 45, type:"calendarEvent" }, // Monday 11:30 - 12:15
                { _id: 3, name: 'Tyler Sinclair', dayIndex: 3, startTime: '13:00', duration: 60, type:"calendarEvent" }, // Thursday 1:00 - 2:00
                { _id: 4, name: 'Stephanie Moore', dayIndex: 5, startTime: '14:30', duration: 60, type:"calendarEvent" }, // Saturday 2:30 - 3:30
                { _id: 5, name: 'Kevin Landry', dayIndex: 4, startTime: '17:00', duration: 60,type:"calendarEvent" }, // Friday 5:00 - 6:00
]

export {data}