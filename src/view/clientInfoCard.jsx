import { BaseComponent, ParentFormComponent } from "flinntech";

export default class ClientInfoCard extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
      name: "",
      phone: "",
      email: "",
      day: "",
      month: "",
      year: "",
    };
  }

  handleChange = (field) => (e) => {
    this.setState({ [field]: e.target.value });
  };

  handleSubmit = () => {
    let obj = this.propsState.currentContact;
    obj.setCompState({birth:`${this.state.month}/${this.state.day}/${this.state.year}`}, {run:true})
    // TODO: wire up your save or dispatch logic here
    this.dispatch({ clientRegisterState: "aboutYou" });
  };

  getInnerContent() {
    let obj = this.propsState.currentContact
    return (
      <div className="bio-container">
        <h1 className="bio-title">Biographical Info</h1>

        <ParentFormComponent obj={obj} name="firstName"  /> 
        <ParentFormComponent obj={obj} name="lastName" /> 

      

        <div className="bio-input-icon">
          <div className="row">
            <ParentFormComponent obj={obj} name="phone" />
          </div>

        </div>

        <div className="bio-input-icon">
          <div className="row">
          <ParentFormComponent obj={obj} name="email"/> 
          </div>
         
        </div>

        <div className="dob-container">
          <span className="icon"><i className="fa-solid fa-cake-candles"></i></span>
          <select
            className="dob-select"
            value={this.state.day}
            onChange={()=>{
            
              this.handleChange("day")
            }}
          >
            <option value="">Day</option>
            {Array.from({ length: 31 }, (_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
          <select
            className="dob-select"
            value={this.state.month}
            onChange={this.handleChange("month")}
          >
            <option value="">Month</option>
            {[
              "Jan",
              "Feb",
              "Mar",
              "Apr",
              "May",
              "Jun",
              "Jul",
              "Aug",
              "Sep",
              "Oct",
              "Nov",
              "Dec",
            ].map((m, i) => (
              <option key={i} value={i + 1}>
                {m}
              </option>
            ))}
          </select>
          <select
            className="dob-select"
            value={this.state.year}
            onChange={this.handleChange("year")}
          >
            <option value="">Year</option>
            {Array.from({ length: 100 }, (_, i) => {
              const y = new Date().getFullYear() - i;
              return (
                <option key={y} value={y}>
                  {y}
                </option>
              );
            })}
          </select>
        </div>

        <button className="submit-button" onClick={this.handleSubmit}>
          Submit
        </button>
      </div>
    );
  }

  render() {
    return (
      <div className={this.props.pageClass || this.state.defaultClass}>
        {this.getInnerContent()}
      </div>
    );
  }
}
