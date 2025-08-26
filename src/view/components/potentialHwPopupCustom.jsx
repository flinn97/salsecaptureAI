import React from 'react';
import { BaseComponent, DelButton } from 'flinntech';
import './Checkbox.css';

class PotentialHwPopupCustom extends BaseComponent {
    constructor(props) {
        super(props);
        // preserve any initial state from BaseComponent
    }

    render() {
        const { obj } = this.props;
     
        return (
            <div
            onClick={()=>{
                this.dispatch({currentPotentialHw:obj})
            }}
       
      >
      {obj.getJson()._id}
      </div>
        );
    }
}

export default PotentialHwPopupCustom;
