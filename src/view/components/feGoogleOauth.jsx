import { BaseComponent } from 'flinntech';
import React, { Component } from 'react';
import goog from '../../assets/logo_google_g.png';
// Optional: Create a CSS file for styling and import it
// import './GmailAuthButton.css';

// Define the component, accepting necessary configuration as props
class GmailAuthButton extends BaseComponent {
    constructor(props) {
        super(props);
        // Initialize the component's state
        this.state = {
            statusMessage: '',
        };
        // No need to bind handleAuthClick if using arrow function property syntax (recommended)
    }

    /**
     * Sign in the user upon button click by redirecting to Google's auth URL.
     * Google will then redirect the user back to the REDIRECT_URI (your function).
     * Using arrow function property syntax binds 'this' correctly.
     */
    handleAuthClick = () => {
        this.setState({ statusMessage: 'Redirecting to Google...' });
        //local
        // const CLIENT_ID = '786362911238-iiljh2nv259i5kbb0f27qa8no5sb09is.apps.googleusercontent.com'; // Replace with your actual Client ID
        //production
        const CLIENT_ID =  '786362911238-7q3lb2icdev4ives0ho4loi21n1r1t1g.apps.googleusercontent.com'
        // Authorization scopes required by the API.
        // Added 'email', 'openid', 'profile' to get user info including email.
        const SCOPES = 'https://www.googleapis.com/auth/gmail.send https://www.googleapis.com/auth/gmail.modify https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile openid';

        // TODO(developer): Replace with the FULL URL of your deployed Firebase Function's callback endpoint.

        // This MUST exactly match the Redirect URI configured in your Google Cloud Console OAuth 2.0 Client ID settings.
        const REDIRECT_URI = 'https://scaiuserauthentication-7c5i3vsqma-uc.a.run.app/oauth2callback'; // Replace with your deployed function URL + /oauth2callback


        const authUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth');
        authUrl.searchParams.set('client_id', CLIENT_ID);
        authUrl.searchParams.set('redirect_uri', REDIRECT_URI);
        authUrl.searchParams.set('response_type', 'code');
        authUrl.searchParams.set('scope', SCOPES);
        authUrl.searchParams.set('access_type', 'offline'); // Request a refresh token
        authUrl.searchParams.set('prompt', 'consent'); // Ensure consent screen is shown
        // Get your user ID and the current URL (correcting propsState assumption)
        // Assuming currentUser is a prop:
        const userId = this.propsState.currentUser.getJson()._id;
        // Assuming currentUser is in state:
        // const userId = this.state.currentUser.getJson()._id;

        const postAuthRedirectUrl = window.location.href; // Or window.location.origin + '/some-path'

        // Create a JavaScript object with the data
        const statePayload = {
            userId: userId, // Use the variable holding your user ID
            postAuthRedirect: postAuthRedirectUrl // Use the variable holding the URL
        };

        // Convert the object to a JSON string
        const stateJsonString = JSON.stringify(statePayload);

        // Set the state parameter in the URL
        authUrl.searchParams.set('state', stateJsonString);


        // Optional (for future use to link token to a specific user in callback):
        // You would typically add a 'state' parameter here containing a user identifier
        // from your application (e.g., Firebase Auth UID).
        // authUrl.searchParams.set('state', 'YOUR_USER_ID_OR_SESSION_INFO');


        // Redirect the user's browser
        window.location.href = authUrl.toString();

        // Note: The state update above will likely not be visible as the page
        // navigates immediately. The final result will be the content sent
        // back by your Firebase Function after the redirect.
    };

    // The render method returns the JSX for the component
    render() {
        const { statusMessage } = this.state;

        return (
            <div className="gmail-auth-container">
                <h1 style={{fontSize:"22px"}}>Gmail API Authorization</h1>
                <p style={{fontSize:"16px"}}>Click the button below to authorize your Google account for use with the Firebase Function.</p>
                <p style={{fontSize:"14px"}}>- This process will redirect you to Google for authorization and then back to your function, which will save your token to Firestore, linked by your email address.</p>

                <button 
                className="auth-button dark-button-1" 
                style={{fontSize:"14px", background:"#333333"}}
                onClick={this.handleAuthClick}>
                    <img src={goog} style={{width:"30px"}}/>
                    <div>Authorize with Google</div>
                </button>

                {/* This div will show status messages from the component itself */}
                {statusMessage && <div className="status-message">{statusMessage}</div>}
            </div>
        );
    }
}

export default GmailAuthButton;