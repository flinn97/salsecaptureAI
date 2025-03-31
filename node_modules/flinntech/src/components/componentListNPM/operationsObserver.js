import BaseObserver from "../templateTech/observers/baseObserver";

/**
 * A specialized observer class for handling operations.
 * Extends the functionality of the BaseObserver class to include clearing subscriptions and running observers with arguments.
 */
export default class OperationsObserver extends BaseObserver {
    /**
     * Clears the list of observer functions.
     */
    clear() {
        this.list = [];
    }

    /**
     * Clears all existing subscriptions and adds a new observer function.
     * @param {Function} observerFunction - The observer function to subscribe.
     */
    cleanSubscibe(observerFunction) {
        this.clear(); // Remove all previous observers.
        this.subscribe(observerFunction); // Add the new observer function.
    }

    /**
     * Executes all observer functions in the list with the provided arguments.
     * Clears the list of observers after execution.
     * @param {...any} args - Arguments to pass to each observer function.
     */
    run(...args) {
        for (let observerFunction of this.list) {
            if (observerFunction) {
                observerFunction(...args); // Execute the observer function with arguments.
            }
        }
        this.clear(); // Clear the list after execution.
    }
}