import React from 'react';
import { BaseComponent, DelButton, PopupButton } from 'flinntech';
import './Checkbox.css';

class GoalLightCustom extends BaseComponent {
  constructor(props) {
    super(props);
  }



  render() {
    const { obj } = this.props;
    const goal = obj.getJson() || {};


    return (
      <div className="appointment">
        <div className="row row-space-between">
          <div className="appointment-left">
            <DelButton content="x" obj={obj} />
            <PopupButton content={goal?.name} popupSwitch="updateGoal" obj={obj} />

          </div>
          
        </div>
      </div>
    );
  }
}

export default GoalLightCustom;
