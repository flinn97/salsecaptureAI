
/**
 * allows for registries to have some basic funcitons
 * not really being used at the moment
 */
class BaseRegistry{

    registry={};
    getRegistry(){
        return this.registry
    }
    addToRegistry(type, item){
        this.registry[type]=item;
    }
    getItemFromRegistry(type){
        return this.registry[type];
    }
}
export default BaseRegistry