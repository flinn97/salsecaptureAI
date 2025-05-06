/**
 * ContactsCard component. This component renders a card displaying a list of contacts.
 * It includes a header, a button to add a new contact, and a MapComponent to visualize contacts.
 */
import { MapComponent, } from "flinntech";
import { PopupButton } from "flinntech";
import { BaseComponent } from "flinntech";
import add from "../assets/add.png";
import CheckIt from "./components/check";
import ContactsCustomItem from "./components/contactsCustom";
import SCAIPopupButtonTest from "./components/debug/CustomPopupButton";
import EventCustomItem from "./components/eventCustomItem";
import TaskCustomItem from "./components/taskCustomItem";
import CsvUpload from "./csvUpload";
import './WeeklyCalendar.css';

// Helper function to get the start of the week (Monday) for a given date
const getStartOfWeek = (date) => {
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1); // Adjust when day is Sunday
    return new Date(date.setDate(diff));
};

// Helper function to get the dates for the week starting from a given date
const getWeekDays = (startOfWeek) => {
    const dates = [];
    for (let i = 0; i < 7; i++) {
        const date = new Date(startOfWeek);
        date.setDate(startOfWeek.getDate() + i);
        dates.push(date);
    }
    return dates;
};

// Helper function to format time (e.g., 10 AM, 1 PM)
const formatTime = (hour) => {
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const formattedHour = hour % 12 || 12; // 0 should be 12 AM/PM
    return `${formattedHour} ${ampm}`;
};



/**
 * ContactsCard class extends BaseComponent to create a contact management card.
 * @extends BaseComponent
 */
export default class ScheduleCard extends BaseComponent {
    /**
     * Constructor for the ContactsCard component.
     * Initializes component state and properties.
     * @param {Object} props - Properties passed to the component.
     */
    constructor(props) {
        super(props);
        const today = new Date();
        const startOfCurrentWeek = getStartOfWeek(today);

        this.state = {
            ...this.state,
            defaultClass: "fit",
            title: "Contacts",
            currentWeekStart: startOfCurrentWeek,
            // Placeholder events data - replace with your actual data fetching logic
            events: [

            ]
        };
    }
    handlePreviousWeek = () => {
        this.setState(prevState => {
            const previousWeek = new Date(prevState.currentWeekStart);
            previousWeek.setDate(previousWeek.getDate() - 7);
            return { currentWeekStart: previousWeek };
        });
    };

    handleNextWeek = () => {
        this.setState(prevState => {
            const nextWeek = new Date(prevState.currentWeekStart);
            nextWeek.setDate(nextWeek.getDate() + 7);
            return { currentWeekStart: nextWeek };
        });
    };

    filterFunc() {

        let filterText = this.propsState.tags?.split(',') || "";
        let contactList = this.componentList.getList("contact");
        let newList = []
        if (filterText) {
            for (let tag of filterText) {
                let list = contactList.filter(obj => obj.getJson().tags.includes(tag))
                newList = [...newList, ...list]
            }
        }
        else {
            newList = [...contactList];
        }

        this.dispatch({ selectedContacts: newList })

    }



    /**
     * Returns the inner content of the ContactsCard component.
     * @returns {JSX.Element} The inner content of the card.
     */
    getInnerContent() {

        const weekDays = getWeekDays(this.state.currentWeekStart);
        const timeSlots = Array.from({ length: 10 }, (_, i) => 10 + i); // 10 AM to 7 PM

        return (
            <div className="weekly-calendar">
                <div className="weekly-calendar__header">
                    <div className="weekly-calendar__title">Schedule</div>
                    <div className="weekly-calendar__nav">
                        <button onClick={this.handlePreviousWeek}>&lt;</button>
                        <button onClick={this.handleNextWeek}>&gt;</button>
                    </div>
                </div>
                <div className="weekly-calendar__grid">
                    <div className="weekly-calendar__time-axis">
                        {timeSlots.map(hour => (
                            <div key={hour} className="weekly-calendar__time-slot-label">
                                {formatTime(hour)}
                            </div>
                        ))}
                    </div>
                    <div className="weekly-calendar__days">
                        {weekDays.map((date, dayIndex) => (
                            <div key={date.toISOString()} className="weekly-calendar__day">
                                <div className="weekly-calendar__day-header">
                                    {date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                                </div>
                                <div className="weekly-calendar__events-container">
                                    {/* Render grid lines */}
                                    {timeSlots.slice(0, -1).map((_, i) => (
                                        <div key={`line-${dayIndex}-${i}`} className="weekly-calendar__hour-line"></div>
                                    ))}
                                    {/* Render events for this day */}
                                    <MapComponent
                                        name="calendarEvent"
                                        filterFunc={(obj) => {
                                            let event = obj.getJson();
                                            // Simple check based on day index for this example
                                            // In a real app, you'd compare event date with the current day's date
                                            const eventDate = new Date(this.state.currentWeekStart);
                                            eventDate.setDate(eventDate.getDate() + event.dayIndex);
                                            return eventDate.toDateString() === date.toDateString();
                                        }}
                                        cells={[{type:"custom", custom:EventCustomItem}]}
                                    />
                                    
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )
    }

    /**
     * Renders the ContactsCard component.
     * @returns {JSX.Element} The rendered component.
     */
    render() {
        return (
            <div className={this.props.pageClass || this.state.defaultClass}>
                {this.getInnerContent()}
            </div>
        );
    }
}