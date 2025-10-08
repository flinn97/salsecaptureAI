import React from 'react';
import { BaseComponent, DelButton, PopupButton } from 'flinntech';
import './Checkbox.css';

class HwLightCustom extends BaseComponent {
  constructor(props) {
    super(props);
  }



  render() {
    const { obj } = this.props;
    const hw = obj.getJson() || {};


    return (
      <div className="appointment" style={{position:"relative"}}>
        <div className="row row-space-between">
          <div className="appointment-left" >

            <div style={{position:"absolute", right:"7px", top:"0px"}}>
            <DelButton content="x" obj={obj} />
            </div>
            <PopupButton content={hw?.name} popupSwitch="updateHomework" obj={obj} />

          </div>
          
        </div>
      </div>
    );
  }
}

export default HwLightCustom;
