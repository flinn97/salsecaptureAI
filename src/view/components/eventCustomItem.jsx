import React from 'react';
import { BaseComponent } from 'flinntech';
import './Checkbox.css';
import contactImg from "../../assets/contact.png"; // Keep if needed elsewhere, but avatar uses font-awesome now
import CheckIt from './check';

// Helper function to calculate event position and height
// Assuming each hour slot is 60px height for simplicity
const calculateEventStyles = (startTime, durationMinutes) => {
    const [hour, minute] = startTime.split(':').map(Number);
    const totalMinutes = hour * 60 + minute;
    const minutesSinceStartOfDay = totalMinutes - (10 * 60); // Assuming the calendar starts at 10 AM

    const top = (minutesSinceStartOfDay / 60) * 60; // Convert minutes from 10 AM to pixels
    const height = (durationMinutes / 60) * 60; // Convert duration minutes to pixels

    return {
        top: `${top}px`,
        height: `${height}px`,
    };
};

class EventCustomItem extends BaseComponent {
    constructor(props) {
        super(props);
        // preserve any initial state from BaseComponent
        // No explicit state needed here if using propsState for selectedContacts
    }

   

    render() {
        const { obj } = this.props;
        // Assuming obj.getJson() is necessary and works
        let calendarItem = obj.getJson();

        const eventStyles = calculateEventStyles(calendarItem.startTime, calendarItem.duration);
        return (
            <div
                key={calendarItem._id}
                className="weekly-calendar__event"
                style={eventStyles}
            >
                <div className="weekly-calendar__event-name">{calendarItem.name}</div>
                {/* Add time/duration display if needed */}
            </div>
        );
    }
}

export default EventCustomItem;