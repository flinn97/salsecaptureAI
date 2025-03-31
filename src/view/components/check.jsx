import { BaseComponent } from 'flinntech';
import './Checkbox.css';

class CheckIt extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
      checked: false,
    };


  }

  async handleToggle() {
    
    await this.setState(prevState => ({
      checked: !prevState.checked,
    }));
    if(this.state.checked){
      this.check();
    }
    else{
      this.uncheck();
    }
  }

  // Programmatically check the checkbox
  check() {
    this.setState({ checked: true });
    if(this.props.check){
      this.props.check();
    }
    else{
      this.props.cell.check(this.props.obj);

    }
  }

  // Programmatically uncheck the checkbox
  uncheck() {
    debugger
    this.setState({ checked: false });
    if(this.props.uncheck){
      this.props.uncheck();
    }
    else{
      this.props.cell.uncheck(this.props.obj);

    }

  }

  render() {
    const { checked } = this.state;
    return (
      <label className="checkbox-container">
        {this.props.label || ''}
        <input
          type="checkbox"
          checked={checked}
          onChange={this.handleToggle}
        />
        <span className="checkmark"></span>
      </label>
    );
  }
}

export default CheckIt;