/**
 * Conversations component. This component renders the main view for conversations,
 * displaying a list of conversation cards. It extends the GetAllComponents class from 'flinntech'.
 */
import { Card } from "flinntech";
import ConversationCard from "./ConversationCard"; // Custom component for individual conversation cards
import { GetAllComponents } from "flinntech";
import "./conversations.css";

export default class Conversations extends GetAllComponents {
    /**
     * Constructor for the Conversations component.
     * @param {object} props - Properties passed to the component.
     */
    constructor(props) {
        super(props);
        this.state = {
            ...this.state,
            defaultClass: "fit",
            owner: this.app.state.currentUser.getJson()._id
        };
    }

    /**
     * Lifecycle method that runs after the component is mounted.
     * Fetches conversation data from the backend.
     */
    async componentDidMount() {
        await this.dispatch({ currentTopic: undefined, currentSubTopic: undefined, currentComponent: undefined });
        this.getComponentsFromBackend();
        this.getInboxForUser();
    }

    getInboxForUser() {
        const user = this.propsState.currentUser;

        // 1) Compute “after” and “before” dates
        const now = new Date();
        const lastCheck = user.getJson().lastInboxCheck
            ? new Date(user.getJson().lastInboxCheck)
            : new Date(0);

        const formatGmailDate = date => {
            const Y = date.getFullYear();
            const M = String(date.getMonth() + 1).padStart(2, '0');
            const D = String(date.getDate()).padStart(2, '0');
            return `${Y}/${M}/${D}`;
        };

        const body = {
            userId: user.getJson()._id,
            after: formatGmailDate(lastCheck),
            before: formatGmailDate(now),
            maxResults: 50
        };

        fetch(
            "https://gmailinboxcheck-7c5i3vsqma-uc.a.run.app",
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            }
        )
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(async (json) => {
                let messages = json.batchMessages;
                /**
     * Sorts an array of email objects by thread recency, then by message date within threads.
     * Sort order is latest to earliest.
     * The input array is sorted in place.
     *
     * @param {Array<Object>} emails - An array of email objects. Each object should have
     * a 'threadId' (string) and a 'date' (string) property.
     */
                function sortEmailsByDateAndThread(emails) {
                    if (!Array.isArray(emails)) {
                        console.error("Input must be an array.");
                        return;
                    }

                    // 1. Pre-calculate the latest date for each thread
                    const latestThreadDateMap = new Map(); // Using Map for potentially better performance with non-string keys if needed, and cleaner API

                    emails.forEach(email => {
                        if (!email || typeof email.date !== 'string' || typeof email.threadId === 'undefined') {
                            console.warn("Skipping email with missing date or threadId:", email);
                            return;
                        }
                        try {
                            const emailDate = new Date(email.date);
                            if (isNaN(emailDate.getTime())) { // Check for invalid date
                                console.warn("Invalid date string encountered:", email.date, "for email:", email.id);
                                return;
                            }

                            const currentLatest = latestThreadDateMap.get(email.threadId);
                            if (!currentLatest || emailDate > currentLatest) {
                                latestThreadDateMap.set(email.threadId, emailDate);
                            }
                        } catch (e) {
                            console.warn("Error parsing date string:", email.date, "for email:", email.id, e);
                        }
                    });

                    // 2. Sort the emails array
                    emails.sort((a, b) => {
                        let dateA, dateB;
                        let latestDateInThreadA, latestDateInThreadB;

                        try {
                            dateA = new Date(a.date);
                            dateB = new Date(b.date);
                            if (isNaN(dateA.getTime()) || isNaN(dateB.getTime())) {
                                // Handle invalid dates during sort comparison if not caught earlier
                                // Or decide on a default behavior, e.g., push invalid dates to end
                                if (isNaN(dateA.getTime()) && !isNaN(dateB.getTime())) return 1; // a is invalid, b is valid, b comes first
                                if (!isNaN(dateA.getTime()) && isNaN(dateB.getTime())) return -1; // a is valid, b is invalid, a comes first
                                return 0; // both invalid or no preference
                            }
                        } catch (e) {
                            // Fallback for any parsing errors during sort, though pre-check should minimize this
                            return 0;
                        }


                        latestDateInThreadA = latestThreadDateMap.get(a.threadId);
                        latestDateInThreadB = latestThreadDateMap.get(b.threadId);

                        // If one thread has a known latest date and the other doesn't (due to invalid dates in that thread)
                        if (latestDateInThreadA && !latestDateInThreadB) return -1; // Thread A comes first
                        if (!latestDateInThreadA && latestDateInThreadB) return 1;  // Thread B comes first
                        if (!latestDateInThreadA && !latestDateInThreadB) { // Neither thread has a valid latest date, sort by individual message if possible
                            return dateB - dateA; // latest message first
                        }


                        // Compare based on the latest date of their respective threads
                        // Sorts threads by their latest message, descending (newer threads first)
                        if (latestDateInThreadA.getTime() !== latestDateInThreadB.getTime()) {
                            return latestDateInThreadB - latestDateInThreadA;
                        }

                        // If threads are the same (or have the same latest message time),
                        // sort by individual message date, descending (newer messages first)
                        return dateB - dateA;
                    });
                }
                console.log("Fetched messages:", messages);

                sortEmailsByDateAndThread(messages);
                console.log("sorted", messages)
                function extractEmailFromField(fromField) {
                    if (typeof fromField !== 'string') {
                        return null;
                    }

                    // 1. Try to extract email from "Name <email@example.com>" format
                    const angleBracketEmailRegex = /<([^>]+)>/;
                    const angleBracketMatch = fromField.match(angleBracketEmailRegex);

                    if (angleBracketMatch && angleBracketMatch[1]) {
                        // The email is the content of the first capturing group
                        return angleBracketMatch[1];
                    }

                    // 2. If not found, check if the entire fromField itself is a valid email address
                    // This is a basic email validation regex.
                    const basicEmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (basicEmailRegex.test(fromField)) {
                        return fromField;
                    }

                    // 3. If no email is found with the above patterns
                    return null;
                }
                let check = messages.filter((m)=>{
                    return (m.from.includes('taylor'))
                })
                console.log(check)
                messages = messages.filter((m) => {
                    const currentUserId = this.propsState.currentUser.getJson()._id;
                    const fromField = m.from;
                    const toField = m.to;
                    const recipientEmail = extractEmailFromField(toField);
                    const senderEmail = extractEmailFromField(fromField);

                
                    // Rule 1: I sent the email, and the recipient is in my contacts.
                    if (senderEmail === currentUserId) {
                        // If the email is also to myself, filter it out.
                        // Rule 1 is about "person who received the email" implying someone else.
                        if (recipientEmail === currentUserId) {
                            return false;
                        }
                
                        // If we can't extract the recipient's email, we can't check if they're a contact.
                        if (!recipientEmail) {
                            return false;
                        }
                
                        const recipientContact = this.componentList.getComponent("contact", recipientEmail, "email");
                        // Keep if the recipient is a contact, otherwise filter out.
                        return recipientContact !== undefined;
                    }
                
                    // Rule 2: Someone from my contacts sent something to me.
                    if (recipientEmail === currentUserId) {
                        // The case where fromField === currentUserId (email to myself) is already handled above.
                        // So, here, fromField is implicitly not currentUserId.
                
                        // If we can't extract the sender's email, we can't check if they're a contact.
                        if (!senderEmail) {
                            return false;
                        }
                
                        const senderContact = this.componentList.getComponent("contact", senderEmail, "email");
                        // Keep if the sender is a contact, otherwise filter out.
                        return senderContact !== undefined;
                    }
                
                    // If the message is not from or to the current user, filter it out.
                    return false;
                });
                console.log("filtered", messages);




                // 4) Update the user’s lastInboxCheck to now
                // (Adapt this to however you persist the user)
                // this.propsState.currentUser.setCompState({
                //   lastInboxCheck: now.toISOString()
                // }, {run:true});
            })
            .catch(error => {
                console.error("Error fetching inbox:", error);
            });
    }
    componentWillUnmount() {
        this.operationsFactory.clear();
        this.dispatch({ currentComponent: undefined })
    }


    /**
     * Renders the Conversations component.
     * @returns {JSX.Element} The rendered component.
     */
    render() {
        return (
            <div className={this.props.pageClass || this.state.defaultClass} style={{ padding: "20px" }}>
                {/* Container for the conversations card */}
                <div className="fit">
                    {this.state.getComponentsFromBackend &&
                        <Card theme="defaultCard" content={<ConversationCard />} />
                    }
                </div>
            </div>
        );
    }
}