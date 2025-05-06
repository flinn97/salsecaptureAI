import { BaseComponent } from 'flinntech';
import './Checkbox.css';

class CheckIt extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
      checked: false,
      activeBool: false,
    };


  }

  componentDidMount(){
    
    this.checkIfActive();
  }
  async componentDidUpdate(props, state){
    
    let obj = this.props.obj;
    if(obj){
      
      if(this.propsState[this.props.checkKey]?.includes(obj) && this.state.activeBool===false){
        
        this.setState({ checked: true, activeBool:true });
      }
      else if(!this.propsState[this.props.checkKey]?.includes(obj) && this.state.activeBool===true){
        this.setState({checked:false, activeBool:false})
      }
      
      
    }
    
  }

  checkIfActive(){
    let obj = this.props.obj;
    if(obj){
      if(this.propsState[this.props.checkKey]?.includes(obj)){
        this.setState({ checked: true });
      }
    }
  }

  async handleToggle() {
    
    await this.setState(prevState => ({
      checked: !prevState.checked,
    }));
    if(this.state.checked){
      this.check(this.props.obj);
    }
    else{
      this.uncheck(this.props.obj);
    }
  }

  // Programmatically check the checkbox
  check(obj) {
    this.setState({ checked: true });
    if(this.props.check){
      this.props.check(obj);
    }
    else{
      this.props.cell.check(this.props.obj);

    }
  }

  // Programmatically uncheck the checkbox
  uncheck(obj) {
    
    this.setState({ checked: false });
    if(this.props.uncheck){
      this.props.uncheck(obj);
    }
    else{
      this.props.cell.uncheck(this.props.obj);

    }

  }

  render() {
    const { checked } = this.state;
    return (
      <label className={this.props.class||"checkbox-container"}>
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