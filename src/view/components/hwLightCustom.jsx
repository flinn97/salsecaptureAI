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
      <div className="appointment">
        <div className="row row-space-between">
          <div className="appointment-left">
            <DelButton content="x" obj={obj} />
            <PopupButton content={hw?.name} popupSwitch="updateHomework" obj={obj} />

          </div>
          
        </div>
      </div>
    );
  }
}

export default HwLightCustom;
