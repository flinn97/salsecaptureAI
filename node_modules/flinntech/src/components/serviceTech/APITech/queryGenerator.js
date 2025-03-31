import {binder} from "../Util/binder";
import { collection, where, query, orderBy, limit, } from "firebase/firestore";
/**
 * A class to generate Firestore queries based on given parameters.
 * This class simplifies the creation of Firestore queries using `where`, `orderBy`, and `limit` clauses.
 */
 class QuearyGenerator {
    DB; // Firestore database reference
    url; // Base URL for Firestore collection paths
    path = []; // Default path for Firestore queries
    orderStr = "date"; // Default field for ordering queries

    /**
     * Constructor for the QuearyGenerator class.
     * @param {object} db - Firestore database reference.
     * @param {string} url - Base URL for Firestore paths.
     */
    constructor(db, url) {
        binder.bind(this); // Binds methods to the class instance
        this.setDB(db); // Sets the Firestore database
        this.setUrl(url); // Sets the base URL
        // Initializes the default Firestore path
        this.path = [this.DB, this.url + "users", this.url + "APP", "components"];
    }

    /**
     * Sets the Firestore database reference.
     * @param {object} db - Firestore database reference.
     */
    setDB(db) {
        this.DB = db;
    }

    /**
     * Sets the base URL for Firestore collection paths.
     * @param {string} url - Base URL for Firestore paths.
     */
    setUrl(url) {
        this.url = url;
    }

    /**
     * Sets a custom Firestore path for queries.
     * @param {array} p - Firestore path as an array of strings.
     */
    setPath(p) {
        this.path = p;
    }

    /**
     * Sets the default field to order queries by.
     * @param {string} s - Field name for ordering queries.
     */
    setOrderStr(s) {
        this.orderStr = s;
    }

    /**
     * Generates a Firestore query based on input parameters.
     * @param {object} queryJson - JSON object defining query parameters.
     *   - `where`: Array of conditions, each containing `attribute`, `type`, and `val`.
     *   - `order`: Field to order by (default is "date").
     *   - `limit`: Maximum number of documents to retrieve.
     * @param {array} path - Firestore path as an array (optional, defaults to class's path).
     * @param {string|undefined} owner - Filters queries by owner field if provided.
     * @returns {object} - Firestore query reference.
     */
    async generateQueary(queryJson, path, owner) {
        // Maps where conditions into Firestore `where` clauses
        let whereMap = queryJson.where
            .map((obj) => {
                if (obj.attribute !== undefined) {
                    // Creates a Firestore `where` clause
                    return where(obj.attribute, obj.type || "==", obj.val);
                }
            })
            .filter((obj) => obj !== undefined); // Filters out undefined conditions

        // Adds an owner filter if provided
        if (owner) {
            whereMap.push(where("owner", "==", owner));
        }

        // Sets the query path or defaults to the class's path
        path = path || this.path;

        // Constructs the query parameters array
        let queryParams = [...whereMap];

        // Adds an `orderBy` clause if specified or defaults to the orderStr
        let order = queryJson.order || this.orderStr;
        if (order !== "noOrder" && order !== undefined) {
            queryParams.push(orderBy(order));
        }

        // Adds a `limit` clause if provided in the queryJson
        if (queryJson.limit) {
            queryParams.push(limit(queryJson.limit));
        }

        // Creates and returns the Firestore query
        let queryRef = query(collection(...path), ...queryParams);
        return queryRef;
    }
}

export { QuearyGenerator };
