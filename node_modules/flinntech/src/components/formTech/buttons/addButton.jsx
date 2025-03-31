import BaseButton from "./baseButton";

export default class AddButton extends BaseButton{
   

    /**
     * Use component list to add the component directrly
     */
    buttonClickFunc(){
        let json = this.props.add;
        this.componentList.addComponents(json);

    }

   

}

