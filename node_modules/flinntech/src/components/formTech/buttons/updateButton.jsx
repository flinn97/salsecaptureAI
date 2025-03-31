import BaseButton from "./baseButton";

export default class UpdateButton extends BaseButton{
   

    /**
     * obj update itself with the update params
     */
    buttonClickFunc(){
        
        for(let obj of this.obj){
            obj.update(this.props.updateParams);
        }
        if(this.props.isPopup){
            this.dispatch({popupSwitch:"", currentPopupComponent:undefined})
         }
    }

   

}

