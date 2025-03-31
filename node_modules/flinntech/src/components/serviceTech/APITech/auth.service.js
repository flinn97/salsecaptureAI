// Importing Firebase modules for storage and authentication
import { 
    ref, uploadBytes, getDownloadURL, deleteObject 
} from "firebase/storage";

import { 
    doc, getDocs, collection, getDoc, updateDoc, addDoc, writeBatch, where, query, setDoc, deleteDoc, 
    onSnapshot, QuerySnapshot, Timestamp, serverTimestamp, orderBy, limit, getCountFromServer 
} from "firebase/firestore";

import { 
    createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword, onAuthStateChanged, 
    getAuth, sendPasswordResetEmail, updateEmail, deleteUser, updatePassword 
} from "firebase/auth";

import { QuearyGenerator } from "./queryGenerator.js"; // Custom query generator utility
import {binder} from "../Util/binder.js"; // Utility for binding 'this' context
import BaseObserver from "../../templateTech/observers/baseObserver.jsx"; // Base class for observer pattern

/**
 * Auth class handles user authentication, Firestore database interactions, 
 * Firebase storage operations, and observer subscriptions.
 */
class Auth {
    // Class variables
    urlEndpoint = ""; // Base URL for API endpoints
    dispatch; // Dispatch function for state management
    componentList; // List of components related to the app
    userStr = "flinnappsUser"; // Key for storing user info in localStorage
    QuearyGenerator; // Instance of the QueryGenerator class
    DB; // Firestore database instance
    storage; // Firebase storage instance
    auth; // Firebase auth instance
    userEmail; // Logged-in user's email
    path = []; // Default path for database operations
    postObserver = new BaseObserver(); // Observer for post operations
    dispatchObserver = new BaseObserver(); // Observer for dispatch events
    readObserver = new BaseObserver(); // Observer for read operations

    /**
     * Constructor initializes the Auth class with necessary services.
     * @param {string} endpoint - API endpoint base URL.
     * @param {object} db - Firestore database instance.
     * @param {object} storage - Firebase storage instance.
     * @param {object} auth - Firebase authentication instance.
     * @param {function} dispatch - State dispatch function.
     */
    constructor(endpoint, db, storage, auth, dispatch) {
        binder.bind(this); // Binds methods to the current class instance
        this.urlEndpoint = endpoint;
        this.DB = db;
        this.storage = storage;
        this.auth = auth;
        this.dispatch = dispatch;
        // Default path for database operations
        this.path = [this.DB, `${this.urlEndpoint}users`, `${this.urlEndpoint}APP`, "components"];
        // Initializing the QueryGenerator with the database and URL endpoint
        this.QuearyGenerator = new QuearyGenerator(this.DB, this.urlEndpoint);
    }

    // --- Setters for various services and configurations ---
    setAuth(a) {
        this.auth = a;
    }

    /**
     * set the storage for uploading pictures
     * @param {*} s 
     */
    setStorage(s) {
        this.storage = s;
    }

    /**
     * set the path for which the query uses to grab the data
     * @param {*} p 
     */
    setPath(p) {
        this.path = p;
    }

    /**
     * set the database and let the query generator know about it.
     * Mostly firebase but can be other db
     * @param {*} db 
     */
    setDB(db) {
        this.DB = db;
        this.QuearyGenerator.setDB(db); // Update the QueryGenerator with the new DB
    }

    /**
     * allow auth to send ui callbacks
     * @param {*} d 
     */
    setDispatch(d) {
        this.dispatch = d;
    }

    /**
     * Allow auth to make changes to front end model
     * @param {*} l 
     */
    setComponentList(l) {
        this.componentList = l;
    }

    /**
     * set up the user
     * @param {} s 
     */
    setUserStr(s) {
        this.userStr = s;
        this.QuearyGenerator.setUrl(s); // Update the QueryGenerator with the new URL
    }

    // --- Observer methods for managing subscriptions ---
    /**
     * 
     * @returns the observer to make observations on post req
     */
    getPostObserver() {
        return this.postObserver;
    }

    /**
     * set the observer to be able to subscribe to posts
     * @param {*} o 
     */
    setPostObserver(o) {
        this.postObserver = o;
    }

    /**
     * Subscribe to the post res
     * @param {*} f 
     */
    subscribeToPostObserver(f) {
        this.postObserver.subscribe(f); // Subscribe to post observer
    }

    /**
     * 
     * @returns observer for all get
     */
    getReadObserver() {
        return this.readObserver;
    }

    /**
     * set an observer for observations on getting data
     * @param {*} o 
     */
    setReadObserver(o) {
        this.readObserver = o;
    }

    /**
     * Subscribe to updates on getting data
     * @param {} f 
     */
    subscribeToReadObserver(f) {
        this.readObserver.subscribe(f); // Subscribe to read observer
    }
    /**
     * 
     * @returns the path the a given database 
     */
    getPath() {
        return this.path;
    }

    /**
     * 
     * @returns observer for observations on backend -> ui changes
     */
    getDispatchObserver() {
        return this.dispatchObserver;
    }

    /**
     * Create the observer for observations on backend ui
     * @param { } o 
     */
    setDispatchObserver(o) {
        this.dispatchObserver = o;
    }

    /**
     * subscribe to ui changes from the backend
     * @param {*} f 
     */
    subscribeToDispatchObserver(f) {
        this.dispatchObserver.subscribe(f); // Subscribe to dispatch observer
    }

    // --- Getter for the QueryGenerator ---
    getQueryGenerator() {
        return this.QuearyGenerator;
    }

    /**
     * Seet the query generator to generate queries
     * @param {*} qg 
     */
    setQueryGenerator(qg) {
        this.QuearyGenerator = qg;
    }

    // --- Authentication Methods ---
    /**
     * Login method authenticates a user with email and password.
     * @param {string} email - User's email.
     * @param {string} password - User's password.
     * @returns {object} - Authenticated user object or error object.
     */
    async login(email, password) {
        let user;
        let e;

        // Firebase sign-in method
        await signInWithEmailAndPassword(this.auth, email, password)
            .then((userCredential) => {
                user = userCredential.user; // User successfully signed in
            })
            .catch((error) => {
                // Handle login errors
                const errorMessage = error.message;
                let newString = errorMessage.slice(9, errorMessage.length - 1); // Strip extraneous text
                e = { error: newString };
                console.log(e);
            });

        if (user) {
            let saveUser = user;
            this.dispatch({ login: true }); // Dispatch login event
            await localStorage.setItem(this.userStr, JSON.stringify(saveUser)); // Save user info in localStorage
            if (this.componentList !== undefined && this.dispatch !== undefined) {
                user = await this.getuser(email); // Fetch additional user info
            }
        } else {
            user = e; // Return error if login failed
        }

        return user;
    }

        /**
     * Registers a new user with email and password and optionally caches user data.
     * @param {string} email - User's email address.
     * @param {string} password - User's password.
     * @param {boolean} addToCache - Whether to add the user data to cache.
     * @returns {object} - The created user object or an error object.
     */
         async register(email, password, addToCache) {
            let user;
            await createUserWithEmailAndPassword(this.auth, email, password).then((userCredential) => {
                user = userCredential.user;
            }).catch((error) => {
                // Extracts and formats the error message
                const errorCode = error.code;
                let errorMessage = error.message;
                let eL = errorMessage.length - 1;
                let newString = errorMessage.slice(9, eL);
    
                user = { error: newString };
            });
            if (!user.error) {
                this.userEmail = user.email; // Store user email in the instance
                localStorage.setItem(this.userStr, JSON.stringify(user)); // Cache user data
            }
            return user;
        }
    
        /**
         * Logs out the current user and clears all local storage data.
         */
        async logout() {
            await localStorage.clear(); // Clear all local storage
            localStorage.setItem(this.userStr, undefined); // Set user key to undefined
            let logouser;
            await onAuthStateChanged(this.auth, (user) => {
                if (user) {
                    logouser = user.uid; // Capture user ID if still signed in
                }
            });
            if (logouser) {
                await signOut(this.auth); // Sign out from Firebase Auth
            }
            await localStorage.setItem(this.userStr, null); // Ensure user key is null
            window.location.href = "/"; // Redirect to homepage
        }
    
        /**
         * Sends a password reset email to the provided email address.
         * @param {string} email - User's email address.
         */
        sendForgotPasswordChange(email) {
            const auth = getAuth();
            sendPasswordResetEmail(auth, email)
                .then(() => {
                    // Password reset email sent
                })
                .catch((error) => {
                    // Log any errors that occur during the process
                    const errorCode = error.code;
                    const errorMessage = error.message;
                });
        }
    
        /**
         * Checks if a user is logged in and clears data if not.
         * @returns {Promise<object>} - A promise resolving to the logged-in user or rejecting if not.
         */
        async checkIfLoggedIn() {
            return new Promise((resolve, reject) => {
                onAuthStateChanged(this.auth, async (user) => {
                    if (user) {
                        resolve(user); // Resolve with the logged-in user
                    } else {
                        // Clear local storage and sign out if no user is logged in
                        await localStorage.setItem(this.userStr, null);
                        await localStorage.clear();
                        localStorage.setItem(this.userStr, undefined);
                        let logotUser;
                        await onAuthStateChanged(this.auth, (user) => {
                            if (user) {
                                logotUser = user.uid;
                            }
                        });
                        if (logotUser) {
                            await signOut(this.auth);
                        }
                        await window.location.reload(); // Reload the page to update state
                    }
                });
            });
        }
    
        /**
         * Retrieves the current user from local storage.
         * @returns {object} - The current user object from local storage.
         */
        async getCurrentUser() {
            let item = await localStorage.getItem(this.userStr);
            item = await JSON.parse(item);
            return item;
        }
    
        /**
         * Sets the current user in local storage.
         * @param {object} student - The user object to store.
         */
        async setCurrentUser(student) {
            await localStorage.setItem(this.userStr, JSON.stringify(student));
        }
    
        /**
         * Logs in a user using their email and password.
         * @param {string} email - User's email address.
         * @param {string} password - User's password.
         */
        async loginToDel(email, password) {
            await signInWithEmailAndPassword(this.auth, email, password)
                .then((userCredential) => {
                    // Successfully signed in
                })
                .catch((error) => {
                    // Handle any errors during login
                    const errorCode = error.code;
                    const errorMessage = error.message;
                });
        }
    
        /**
         * Deletes the currently authenticated user account.
         */
        async delAccount() {
            const auth = getAuth();
            const user = auth.currentUser;
    
            await deleteUser(user).then(() => {
                // User deleted successfully
            }).catch((error) => {
                // Handle errors during deletion
            });
        }
    
        /**
         * Sends a notification using the given body and URL.
         * @param {object} body - The notification payload.
         * @param {string} url - The API endpoint to send the notification to.
         */
        async notify(body, url) {
            fetch(url, {
                method: 'POST',
                mode: 'no-cors',
                body: JSON.stringify(body),
                headers: {
                    'Conent-Type': 'application/json' // Note: Typo in 'Content-Type'
                }
            });
        }
    
        /**
         * Updates the password of the currently authenticated user.
         * @param {string} password - The new password to set.
         * @returns {boolean} - Returns true on successful update.
         */
        async changePassword(password) {
            const auth = getAuth();
            const user = auth.currentUser;
            const newPassword = password;
    
            await updatePassword(user, newPassword).then(() => {
                // Password updated successfully
            }).catch((error) => {
                // Handle errors during password update
            });
            return true;
        }
    
        /**
         * Fetches a snapshot of data from Firebase Firestore.
         * @param {object} queryJson - The query parameters.
         * @param {string} path - The Firestore path.
         * @param {boolean} owner - Whether to include owner filtering.
         * @returns {array} - The raw data from the query snapshot.
         */
        async firebaseGetterSnapshot(queryJson, path, owner) {
            owner = owner === true ? this.userEmail : undefined;
            let components = await this.QuearyGenerator.generateQueary(queryJson, path, owner);
    
            let rawData = [];
            let comps1 = await onSnapshot(components, async (querySnapshot) => {
                rawData = await this.getRawData(querySnapshot); // Extract raw data
            });
            return rawData;
        }



    //Value = value pair (key value) example: string such as "1231454891"
    //ComponentList = adding to the componentList
    //Attribute = attribute pair always a string "campaignID" or "_id"
    //Type = OPTIONAL this RETURNS the getList, string "monster",
    async firebaseGetter(queryJson, path, owner) {
        owner = owner===true?this.userEmail:undefined
        let components = await this.QuearyGenerator.generateQueary(queryJson, path, owner)
        let comps = await getDocs(components);
        return await this.getRawData(comps)

    }

      /**
     * Processes raw data from a snapshot, adds components, and triggers observers.
     * @param {object} dataSnapShot - Firestore data snapshot.
     * @returns {array} - Array of processed components.
     */
       async getRawData(dataSnapShot) {
        let rawData1 = [];
        for (const key in dataSnapShot.docs) {
            // Extracts data from each document in the snapshot
            let data = dataSnapShot.docs[key].data();
            rawData1.push(data);
        }
        // Adds components to the component list
        let componentsAdded = await this.componentList.addComponents(rawData1, true);
        
        // Dispatches an action if a dispatch function exists
        if (this.dispatch) {
            await this.dispatch({ snapShot: { dataRetrieved: componentsAdded } });
        }
        // Runs read observer on the added components
        this.readObserver.run(componentsAdded);
        return componentsAdded;
    }

    /**
     * Retrieves a count of documents from a Firestore query.
     * @param {object} queryJson - Query parameters.
     * @param {string} path - Firestore path.
     * @param {boolean} owner - Whether to include owner filtering.
     * @returns {number} - The count of documents.
     */
    async getCount(queryJson, path, owner) {
        owner = owner === true ? this.userEmail : undefined;
        let countQuery = await this.QuearyGenerator.generateQueary(queryJson, path, owner);
        let count = await getCountFromServer(countQuery);
        return count.data().count;
    }

    /**
     * Retrieves user data by email and sets it in the state.
     * @param {string} email - User's email address.
     * @returns {object} - The user object.
     */
    async getuser(email) {
        this.userEmail = email; // Sets the user email
        let user = await this.componentList.getComponentFromBackend({ type: "user", ids: email });
        if (user) {
            // Dispatches the current user state
            this.dispatch({ currentUser: user, email: email, gotUser: true });
        }
        return user;
    }

    /**
     * Retrieves all data based on a query and path.
     * @param {object} queryJson - Query parameters.
     * @param {string} path - Firestore path (default to "users").
     */
    async GetAllData(queryJson, path) {
        path = path || [this.db, this.urlEndpoint + "users"];
        this.firebaseGetter(queryJson, path);
    }

    /**
     * Uploads a file to Firebase Storage.
     * @param {File} file - File object to upload.
     * @param {string} name - File name in storage.
     */
    async uploadPics(file, name) {
        const storageRef = ref(this.storage, name);
        await uploadBytes(storageRef, file).then((snapshot) => {
            console.log('Uploaded a file!');
        });
    }

    /**
     * Downloads a file from Firebase Storage and returns its URL.
     * @param {string} newName - File name in storage.
     * @returns {string} - Download URL of the file.
     */
    async downloadPics(newName) {
        let src;
        await getDownloadURL(ref(this.storage, newName)).then((url) => {
            src = url; // Sets the file URL
        });
        return src;
    }

    /**
     * Deletes a file from Firebase Storage.
     * @param {string} newName - File name in storage.
     */
    deletePics(newName) {
        const delRef = ref(this.storage, newName); // Creates a reference to the file
        deleteObject(delRef).then(() => {
            // File deleted successfully
        }).catch((error) => {
            // Logs any errors that occur during deletion
        });
    }

    /**
     * Prepares an array of objects for operations by converting them to JSON.
     * @param {array|object} arr - Array or single object to prepare.
     * @returns {array} - Prepared array of JSON objects.
     */
    prep(arr) {
        arr = Array.isArray(arr) ? arr : [arr]; // Ensures input is an array
        arr = arr.map((obj) => {
            let json = obj;
            if (obj.getJson) {
                json = obj.getJson(); // Converts object to JSON
            }
            return json;
        });
        // Filters out undefined objects
        arr = arr.filter(obj => obj !== undefined);
        return arr;
    }

    /**
     * Adds an array of components to Firestore and updates state.
     * @param {array} arr - Array of components to add.
     * @param {string} path - Firestore path.
     * @param {string} dispatchKey - Key for dispatch action.
     * @param {string} timeKey - Key for timestamp.
     * @returns {array} - Array of added components.
     */
    async add(arr, path, dispatchKey, timeKey) {
        arr = await arr.map((obj) => {
            if (obj.getJson().owner === "" || obj.getJson().owner === undefined) {
                obj.setCompState({ owner: this.userEmail }); // Sets owner if not defined
            }
            return obj;
        });
        return await this.operate(arr, setDoc, path, dispatchKey || "added", timeKey || "date");
    }

    /**
     * Updates an array of components in Firestore.
     * @param {array} arr - Array of components to update.
     * @param {string} path - Firestore path.
     * @param {string} timeKey - Key for timestamp.
     * @param {string} dispatchKey - Key for dispatch action.
     * @returns {array} - Array of updated components.
     */
    async update(arr, path, timeKey, dispatchKey) {
        return await this.operate(arr, updateDoc, path, dispatchKey || "updated", timeKey || "lastUpdated");
    }

    /**
     * Deletes an array of components from Firestore.
     * @param {array} arr - Array of components to delete.
     * @param {string} path - Firestore path.
     * @param {string} dispatchKey - Key for dispatch action.
     * @returns {array} - Array of deleted components.
     */
    async del(arr, path, dispatchKey) {
        return await this.operate(arr, deleteDoc, path, dispatchKey || "deleted");
    }

    /**
     * Executes Firestore operations (add, update, delete) on an array of components.
     * @param {array} arr - Array of components to operate on.
     * @param {function} operation - Firestore operation (setDoc, updateDoc, deleteDoc).
     * @param {string} path - Firestore path.
     * @param {string} dispatchKey - Key for dispatch action.
     * @param {string} timeKey - Key for timestamp.
     * @returns {array} - Array of components after operation.
     */
    async operate(arr, operation, path, dispatchKey, timeKey) {
        try {
            arr = await this.prep(arr); // Prepares the components
            path = path || this.path; // Sets default path if not provided
            for (let component of arr) {
                if (timeKey) {
                    component[timeKey] = await serverTimestamp(); // Adds timestamp
                }
                await this.postObserver.run([component]); // Runs post-operation observer
                let params = [doc(...path, component._id)];
                if (operation !== deleteDoc) {
                    params.push(component); // Includes component data if not deleting
                }
                await operation(...params);
            }
            if (this.dispatch) {
                this.dispatch({ [dispatchKey]: arr, dispatchComplete: true }); // Dispatches action
            }
            this.dispatchObserver.run([{ [dispatchKey]: arr }]); // Runs dispatch observer

            return arr;
        } catch (e) {
            console.log(e); // Logs error
            console.error(arr, "something went wrong with this operation");
        }
    }
}

export default Auth;
/**
 * TODO: setup login and reg with google
 */