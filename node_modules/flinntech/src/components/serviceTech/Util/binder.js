/**
 * A utility class to automatically bind all methods of a class instance to itself.
 * This ensures that methods retain the correct `this` context when used as callbacks or in other scenarios.
 * 
 * Features:
 * - Allows specifying methods to exclude from binding.
 * - Provides functionality to modify the exclusion list dynamically.
 */
 class Binder {
    doNotInclude = ["render", "forceUpdate", "setState"]; // Default list of methods to exclude from binding.

    /**
     * Binds all methods of a given class instance to itself, except those in the exclusion list.
     * @param {object} comp - The class instance whose methods will be bound.
     */
    bind(comp) {
        let proto = Object.getPrototypeOf(comp); // Get the prototype of the instance.
        
        while (proto && proto !== Object.prototype) {
            // Get all method names of the current prototype.
            const methodNames = Object.getOwnPropertyNames(proto).filter(prop => {
                // Filter to include only functions and exclude constructors.
                return typeof proto[prop] === "function" && prop !== "constructor";
            });

            // Bind each method to the class instance, unless it's in the exclusion list.
            for (let methodName of methodNames) {
                if (!this.doNotInclude.includes(methodName)) {
                    comp[methodName] = comp[methodName]?.bind(comp);
                }
            }

            // Move up the prototype chain.
            proto = Object.getPrototypeOf(proto);
        }
    }

    /**
     * Sets a new list of methods to exclude from binding.
     * @param {Array<string>} list - Array of method names to exclude.
     */
    setDoNotIncludeList(list) {
        this.doNotInclude = list; // Replace the existing exclusion list with the provided list.
    }

    /**
     * Adds a method name to the exclusion list.
     * @param {string} str - Method name to add to the exclusion list.
     */
    leaveOut(str) {
        this.doNotInclude.push(str); // Append the method name to the exclusion list.
    }

    /**
     * Removes a method name from the exclusion list.
     * @param {string} str - Method name to remove from the exclusion list.
     */
    include(str) {
        // Filter out the method name from the exclusion list.
        this.doNotInclude = this.doNotInclude.filter(s => s !== str);
    }
}
let binder = new Binder();
export {binder, Binder}
