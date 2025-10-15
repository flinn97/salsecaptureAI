import React from 'react';
import { BaseComponent, DelButton, PopupButton } from 'flinntech';
import './Checkbox.css';
import { Link } from 'react-router-dom';

class AppointmentCustomItem extends BaseComponent {
  constructor(props) {
    super(props);
  }

  // helper to convert "HH:mm" → "h:mm AM/PM"
  formatTime24to12(time24) {
    if (!time24) return '';
    const [hourStr, minuteStr] = time24.split(':');
    let hour = parseInt(hourStr, 10);
    const minute = minuteStr.padStart(2, '0');
    const suffix = hour >= 12 ? 'PM' : 'AM';
    hour = hour % 12 === 0 ? 12 : hour % 12;
    return `${hour}:${minute} ${suffix}`;
  }

  render() {
    const { obj } = this.props;
    const calendarItem = obj.getJson() || {};

    // use our helper
    const displayTime = this.formatTime24to12(calendarItem.startTime);

    return (
      <div className="appointment" style={{position:"relative"}}>
        <div className="row row-space-between">
          <div className="appointment-left" >
            <div style={{position:"absolute", right:"7px", top:"0px"}}>
            {/*<DelButton formClass="none" content="x" obj={obj} />*/}
            </div>
            <div className="row">
            <PopupButton formClass="none" content={ <div className="row"><div className="appointment-right">
            <div className="appointment-date">{calendarItem.day}</div>
          </div>
            <div className="padding-0 appointment-time">
              {displayTime}
            </div></div>} popupSwitch="updateCalendarEvent" obj={obj} />

              <Link to={`../session/${this.componentList.getComponent("session", calendarItem._id, "eventId")?.getJson()._id}`} className="row row-left padding-0 ml-1">View</Link>

            </div>
          </div>
          
        </div>
      </div>
    );
  }
}

export default AppointmentCustomItem;
