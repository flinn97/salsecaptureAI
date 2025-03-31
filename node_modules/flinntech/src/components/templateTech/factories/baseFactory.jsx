/**
 * Base factory for all factories 
 */
class BaseFactory{
    factory={};
    /**
     * 
     * @param {} type 
     * @returns send back the type from the factory
     */
    getComponent(type){
        return this.factory[type];

    }
    /**
     * allow registration of new types
     * @param {*} type 
     * @param {*} str 
     */
    registerComponent(type, str){
        this.factory[type]=str
    }
}
export default BaseFactory