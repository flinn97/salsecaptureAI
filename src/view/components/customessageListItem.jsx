import { BaseComponent } from "flinntech";
import { Timestamp } from "firebase/firestore";

export default class CustomMessageListItem extends BaseComponent{

    getTimeStampStr() {
        let timeValue;
        try {
            // Use optional chaining (?.) for safer access
            timeValue = this.props.obj?.getJson()?.timeStamp;
        } catch (error) {
            console.error("Error accessing timestamp property:", error);
            return "Invalid Date"; // Or handle as needed
        }


        // Check if timeValue exists and is a Firebase Timestamp
        // The check depends on the imported Timestamp class (modular vs. namespaced)
        if (timeValue && timeValue instanceof Timestamp) {
            try {
                // Convert Firebase Timestamp to JavaScript Date object
                const dateObject = timeValue.toDate();

                // Format the Date object into a readable string.
                // Choose the format that best suits your needs:
                // return dateObject.toLocaleString(); // Locale-specific date & time (e.g., "4/22/2025, 8:45:47 AM")
                // return dateObject.toLocaleDateString(); // Locale-specific date (e.g., "4/22/2025")
                // return dateObject.toLocaleTimeString(); // Locale-specific time (e.g., "8:45:47 AM")
                // return dateObject.toDateString(); // Just the date (e.g., "Tue Apr 22 2025")
                // return dateObject.toISOString(); // Standard ISO format

                // Using toLocaleString as a common default:
                return dateObject.toLocaleDateString();

            } catch (error) {
                console.error("Error converting Firebase Timestamp to Date:", error);
                return "Invalid Date"; // Fallback string in case of conversion error
            }
        } else if (timeValue) {
            // If timeValue exists but is not a Timestamp, maybe it's already a string or number?
            // Return it as a string as a fallback. You might want different handling here.
            console.warn("Received timeValue is not a Firebase Timestamp:", timeValue);
            return String(timeValue);
        } else {
            // If timeValue is null, undefined, or doesn't exist
            return ""; // Return an empty string or placeholder for missing timestamps
        }
    }
    render(){
        return(
            <>
            <div className="message-header">
            <span className="sender">{this.props.obj.getJson().contactName}</span>
            <span className="date">{this.getTimeStampStr()}</span>
          </div>
          <div className="snippet">{this.props.obj.getJson().recentMessage}</div>
          </>
        )
    }
}