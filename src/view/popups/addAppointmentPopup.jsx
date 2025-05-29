/**
 * @class OemPopupContent
 * @extends {BaseComponent}
 * This component renders a popup for adding or editing OEM information.  It uses other components from 'flinntech' for form elements and buttons.
 */
import { ParentFormComponent, RunButton, UpdateButton, UploadButton } from "flinntech";
import { BaseComponent } from "flinntech";

export default class AddCalendarPopup extends BaseComponent {
    /**
     * Constructor for the OemPopupContent component.
     * @param {object} props - The component's properties.
     */
    constructor(props) {
        super(props);
        this.state = {
            ...this.state,
            day: this.propsState.currentPopupComponent?.getJson().day,
            time: this.propsState.currentPopupComponent?.getJson().startTime,
            defaultClass: "fit scroller", //Sets a default class for styling
        }
    }

    /**
     * Renders the OemPopupContent component.
     * @returns {JSX.Element} The rendered component.
     */
    render() {
        // Shared styles for rows and labels
        const rowStyle = { display: 'flex', marginBottom: '20px', alignItems: 'center' };
        const labelStyle = { width: '30%', fontWeight: '600', fontSize: '14px' };
        const inputWrapperStyle = { width: '70%' };
        const inputStyle = {
            width: '100%',
            padding: '8px 12px',
            fontSize: '14px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            boxSizing: 'border-box'
        };
        // Determine screen-based overrides
        let isWideScreen = window.innerWidth > 600;
        if (this.propsState.popupSwitch?.includes("addCalendarEvent")) {
            isWideScreen = false
        }
        let obj = this.propsState.currentPopupComponent;

        const effectivePopupComponent = isWideScreen ? this.propsState.currentPopupComponent : this.propsState.currentPopupComponent;
        const inPopup = isWideScreen ? false : true;

        // Determine the text for the heading based on whether an object is provided
        let text = obj ? "Edit" : "Add"
        // Set default button to RunButton
        let button = <RunButton content="Save" isPopup={inPopup} callbackFunc={async ()=>{
            debugger
            let task = await this.operationsFactory.prepare({prepare:{type:'task', contactId:this.propsState.currentContact.getJson()._id, eventId:obj.getJson()._id, name:obj.getJson().name}});
            task = task[0]

            this.operationsFactory.prepare({prepare:{type:'session', contactId:this.propsState.currentContact.getJson()._id, eventId:obj.getJson()._id, taskId:task.getJson()._id}, run:true} )
        }} />
        //If an object is provided, change button to UpdateButton
        if (this.propsState.popupSwitch?.includes("updateCalendarEvent") || (window.innerWidth > 600 && !this.propsState.popupSwitch?.includes("addCalendarEvent"))) {

            button = <UpdateButton obj={effectivePopupComponent} content="Save" isPopup={inPopup} callbackFunc={this.props.callbackFunc} />
        }
        return (

            <div style={{ padding: "10px", paddingBottom: "100px", height: "100%" }} className={this.props.pageClass || this.state.defaultClass}>
                <h2>{text} Appointment</h2> {/*Heading for the popup*/}
                <div className="contact-Add-container">

                    <div className="row">
                        <div>Name</div>
                        <div style={{ width: "70%", marginLeft: "7px" }}> {/*Container for the title input*/}
                            <ParentFormComponent obj={obj} name="name" inPopup={inPopup} /> {/*Component for title input*/}

                        </div>
                    </div>

                    {/* Day of Week Row */}
                    <div className="row" style={rowStyle}>
                        <div style={labelStyle}>Day of Week</div>
                        <div style={inputWrapperStyle}>
                            <select
                                value={this.state.day || ''}
                                onChange={(e) => {
                                    debugger
                                    console.log(
                                        'Day of week changed to', e.target.value
                                    )
                                    let list = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday", ]
                                    this.setState({
                                        day:e.target.value
                                    })
                                    const dayIndex = list.findIndex(day => day ===e.target.value);
                                    obj.setCompState({ dayIndex: dayIndex, day:e.target.value })
                                    

                                }}
                                style={inputStyle}
                            >
                                <option value="">Select a day</option>
                                
                                <option value="Monday">Monday</option>
                                <option value="Tuesday">Tuesday</option>
                                <option value="Wednesday">Wednesday</option>
                                <option value="Thursday">Thursday</option>
                                <option value="Friday">Friday</option>
                                <option value="Saturday">Saturday</option>
                                <option value="Sunday">Sunday</option>
                            </select>
                        </div>
                    </div>



                    {/* Time of Day Row */}
                    <div className="row" style={rowStyle}>
                        <div style={labelStyle}>Time of Day</div>
                        <div style={inputWrapperStyle}>
                            <input
                                type="time"
                                value={this.state.time || ''}
                                onChange={(e) => {
                                    this.setState({ time: e.target.value })
                                    obj.setCompState({ startTime: e.target.value })
                                }
                                }
                                style={inputStyle}
                            />
                        </div>
                    </div>

                    {/* Duration Row */}
                    <div className="row" style={rowStyle}>
                        <div style={labelStyle}>Duration</div>
                        <div style={inputWrapperStyle}>
                            <ParentFormComponent name="duration" obj={obj} />
                        </div>
                    </div>











                    <div className="popupButton" style={{ width: "50%", display: "flex", justifyContent: "flex-end", alignContent: "flex-end" }}> {/*Container for the save button*/}
                        <div style={{ paddingRight: "50px", paddingBottom: "20px" }}> {/*Container for button spacing*/}
                            {button}</div> {/*Button to save changes*/}
                    </div>
                </div>



            </div>
        )
    }


}