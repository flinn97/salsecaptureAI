import React, { Component } from 'react';
import PropTypes from 'prop-types'; // Recommended for prop validation

class GmailAuthButton extends Component {
  // Using class property syntax for handleAuthClick automatically binds 'this'
  handleAuthClick = () => {
    // Access props using this.props
    const { clientId, scopes, redirectUri } = this.props;

    const authUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth');
    authUrl.searchParams.set('client_id', clientId);
    authUrl.searchParams.set('redirect_uri', redirectUri);
    authUrl.searchParams.set('response_type', 'code');
    authUrl.searchParams.set('scope', scopes); // Requesting the 'send' scope
    authUrl.searchParams.set('access_type', 'offline'); // Still request refresh token
    authUrl.searchParams.set('prompt', 'consent'); // Useful for development/testing

    // Perform the redirect
    window.location.href = authUrl.toString();

    // Note: The original <pre id="content"> element is part of the static
    // HTML you provided. In this server-side flow, the content after auth
    // success is rendered by the Firebase Function's callback response,
    // not updated by this component's JavaScript. So, the pre tag below
    // is essentially just structural, not functionally updated by this component.
  };

  render() {
    // The button's visibility is managed by React rendering, not direct DOM manipulation style
    // In this simple component, the button is always rendered.
    return (
      <div>
        <p>Gmail API Quickstart (Firebase Function Auth - Send Email)</p>

        {/* Attach the handleAuthClick method to the onClick event */}
        <button
          id="authorize_button" // ID kept for structural similarity, not needed for React logic
          onClick={this.handleAuthClick}
        >
          Authorize with Google to Send Email
        </button>

        {/* The pre tag from the original example - won't be updated by this component */}
        {/* <pre id="content" style={{ whiteSpace: 'pre-wrap' }}></pre> */}
        {/* You could conditionally render status messages here if needed, but for this flow, */}
        {/* the post-auth status is handled by the function's response page. */}
      </div>
    );
  }
}

// Define prop types for better code clarity and validation
GmailAuthButton.propTypes = {
  clientId: PropTypes.string.isRequired,
  scopes: PropTypes.string.isRequired,
  redirectUri: PropTypes.string.isRequired,
  // You could add prop types for access_type, prompt, etc., if you make them configurable
};

// Optional: Define default props if you want default values
// GmailAuthButton.defaultProps = {
//     scopes: 'https://www.googleapis.com/auth/gmail.send',
//     accessType: 'offline',
//     prompt: 'consent',
// };

export default GmailAuthButton;
// import React from 'react';

// const CLIENT_ID = '786362911238-45gjj64ihi6mlp7aoo90uam6pcadncfc.apps.googleusercontent.com';
// const API_KEY = 'AIzaSyDEwyA5RKYTzPr8JRfu3SWdjpte_kKtdEI';
// const DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest';
// const SCOPES = 'https://www.googleapis.com/auth/gmail.send';

// export default class GmailConnect extends React.Component {
//   state = {
//     gapiInited: false,
//     gisInited: false,
//     isSignedIn: false,
//     to: '',
//     subject: '',
//     body: '',
//     sending: false,
//     sendResult: null,
//   };

//   componentDidMount() {
//     // Load gapi script
//     const script1 = document.createElement('script');
//     script1.src = 'https://apis.google.com/js/api.js';
//     script1.async = true;
//     script1.defer = true;
//     script1.onload = this.handleGapiLoad;
//     document.body.appendChild(script1);

//     // Load GIS script
//     const script2 = document.createElement('script');
//     script2.src = 'https://accounts.google.com/gsi/client';
//     script2.async = true;
//     script2.defer = true;
//     script2.onload = this.handleGisLoad;
//     document.body.appendChild(script2);
//   }

//   handleGapiLoad = () => {
//     window.gapi.load('client', this.initializeGapiClient);
//   };

//   initializeGapiClient = async () => {
//     await window.gapi.client.init({
//       apiKey: API_KEY,
//       discoveryDocs: [DISCOVERY_DOC],
//     });
//     this.setState({ gapiInited: true }, this.maybeEnableButtons);
//   };

//   handleGisLoad = () => {
//     this.tokenClient = window.google.accounts.oauth2.initTokenClient({
//       client_id: CLIENT_ID,
//       scope: SCOPES,
//       callback: this.handleTokenResponse,
//     });
//     this.setState({ gisInited: true }, this.maybeEnableButtons);
//   };

//   maybeEnableButtons = () => {
//     const { gapiInited, gisInited } = this.state;
//     if (gapiInited && gisInited) {
//       this.setState({});
//     }
//   };

//   handleAuthClick = () => {
//     if (!window.gapi.client.getToken()) {
//       this.tokenClient.requestAccessToken({ prompt: 'consent' });
//     } else {
//       this.tokenClient.requestAccessToken({ prompt: '' });
//     }
//   };

//   handleTokenResponse = (resp) => {
//     if (resp.error) {
//       console.error(resp);
//       return;
//     }
//     this.setState({ isSignedIn: true });
//   };

//   handleSignoutClick = () => {
//     const token = window.gapi.client.getToken();
//     if (token) {
//       window.google.accounts.oauth2.revoke(token.access_token);
//       window.gapi.client.setToken('');
//       this.setState({ isSignedIn: false, sendResult: null });
//     }
//   };

//   handleChange = (e) => {
//     this.setState({ [e.target.name]: e.target.value });
//   };

//   sendEmail = async () => {
//     const { to, subject, body } = this.state;
//     this.setState({ sending: true, sendResult: null });
//     // Create RFC2822 raw message
//     const raw =
//       `To: ${to}\r\n` +
//       `Subject: ${subject}\r\n` +
//       `Content-Type: text/plain; charset=UTF-8\r\n\r\n` +
//       `${body}`;
//     const encoded = btoa(raw)
//       .replace(/\+/g, '-')
//       .replace(/\//g, '_')
//       .replace(/=+$/, '');

//     try {
//       const res = await window.gapi.client.gmail.users.messages.send({
//         userId: 'me',
//         resource: { raw: encoded },
//       });
//       this.setState({ sendResult: `Message sent (ID: ${res.result.id})` });
//     } catch (err) {
//       console.error(err);
//       this.setState({ sendResult: `Error: ${err.message}` });
//     } finally {
//       this.setState({ sending: false });
//     }
//   };

//   render() {
//     const {
//       gapiInited,
//       gisInited,
//       isSignedIn,
//       to,
//       subject,
//       body,
//       sending,
//       sendResult,
//     } = this.state;

//     if (!gapiInited || !gisInited) {
//       return <div>Loading Google APIs…</div>;
//     }

//     return (
//       <div style={{ padding: 16, fontFamily: 'sans-serif' }}>
//         <button onClick={this.handleAuthClick}>
//           {isSignedIn ? 'Refresh Token' : 'Authorize'}
//         </button>
//         {isSignedIn && (
//           <button onClick={this.handleSignoutClick} style={{ marginLeft: 8 }}>
//             Sign Out
//           </button>
//         )}

//         {isSignedIn && (
//           <div style={{ marginTop: 24, maxWidth: 400 }}>
//             <h3>Send Email</h3>
//             <div>
//               <input
//                 type="email"
//                 name="to"
//                 placeholder="Recipient email"
//                 value={to}
//                 onChange={this.handleChange}
//                 style={{ width: '100%', marginBottom: 8 }}
//               />
//               <input
//                 type="text"
//                 name="subject"
//                 placeholder="Subject"
//                 value={subject}
//                 onChange={this.handleChange}
//                 style={{ width: '100%', marginBottom: 8 }}
//               />
//               <textarea
//                 name="body"
//                 placeholder="Message body"
//                 value={body}
//                 onChange={this.handleChange}
//                 rows={6}
//                 style={{ width: '100%', marginBottom: 8 }}
//               />
//               <button onClick={this.sendEmail} disabled={sending}>
//                 {sending ? 'Sending…' : 'Send Email'}
//               </button>
//               {sendResult && <div style={{ marginTop: 12 }}>{sendResult}</div>}
//             </div>
//           </div>
//         )}
//       </div>
//     );
//   }
// }
