import { BaseButton, PopupButton } from "flinntech";
export default class SCAIPopupButtonTest extends BaseButton{
    
    /**
     *Ok so this is just a temp fix. Somthing is up with the library.
     */
    async buttonClickFunc(){
        debugger
            
            let obj = this.obj;
            let type = obj.type;
            
            if(this.props.popupSwitch.includes("add")){
                obj= obj[0]?obj[0]:{type:this.getFactoryTypeString(this.props.popupSwitch.slice(3))}
                obj = {prepare:{...obj}, amount:this.props.amount, clean:this.props.clean};
                obj = await this.operationsFactory.prepare(obj);
                if(obj.length===1){
                    obj= obj[0];
                    type = obj.getJson().type
                }

            }
            if(Array.isArray(obj) && obj.length===1){
                obj = obj[0];
            }


            let currentItem = this.props.setCurrnetItem&&{["current"+this.getCapitalFirstLetter(type)]: obj}
            
            let dispatchObj = {popupSwitch:this.props.popupSwitch, currentPopupComponent:obj, ...currentItem}
            await this.dispatch({...dispatchObj})
        
        
    }

    
    

}