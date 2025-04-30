import React, { useEffect, useRef, useState } from 'react';

const GmailConnectButton = () => {
    // State to track connection status
    const [isConnected, setIsConnected] = useState(false);
    // Ref for the Google Identity Services client
    const clientRef = useRef(null);

    // Function to handle the authorization response from Google
    const handleAuthCodeResponse = (response) => {
        if (response.code) {
            const authCode = response.code;
            console.log('Received authorization code:', authCode);

            // Send the code to your Firebase Function backend
            sendCodeToBackend(authCode);

        } else {
            // Handle errors or user denying permission
            console.error('Authorization failed or denied:', response);
            alert('Failed to connect Gmail. Please try again.');
        }
    };

    // Function to send the authorization code to your backend Firebase Function

    const sendCodeToBackend = (code) => {
        // Replace with the actual URL of your deployed Firebase Function http://localhost:3001/auth/google/callback
        // You might need to get this URL from the Firebase console or CLI after deployment https://exchangeauthcode-7c5i3vsqma-uc.a.run.app
        const firebaseFunctionUrl = 'http://localhost:3000/google'; // e.g., https://YOUR_REGION-YOUR_PROJECT_ID.cloudfunctions.net/exchangeAuthCode

        fetch(firebaseFunctionUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ code: code }),
        })
        .then(response => {
            if (!response.ok) {
                // Handle HTTP errors
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Backend response after token exchange:', data);
            if (data.success) {
                setIsConnected(true);
                alert('Gmail connected successfully!');
                // You might want to store some state locally or in context
                // to reflect the connection status across your app
            } else {
                alert(`Failed to connect Gmail: ${data.error}`);
            }
        })
        .catch((error) => {
            console.error('Error sending code to backend:', error);
            alert('Failed to complete connection. Please try again.');
            setIsConnected(false); // Ensure button is re-enabled visually if needed
        });
    };

    // useEffect hook to initialize the Google Identity Services client
    useEffect(() => {
        // Load the Google Identity Services script
        const script = document.createElement('script');
        script.src = 'https://accounts.google.com/gsi/client';
        script.async = true;
        script.defer = true;
        document.body.appendChild(script);

        script.onload = () => {
            // Initialize the Google Identity Services OAuth client once the script is loaded
            clientRef.current = google.accounts.oauth2.initCodeClient({
                client_id: '592520451667-0sphkcuj07fg9scli2p8u78bjs1uk86k.apps.googleusercontent.com', // Replace with your Google Cloud Client ID
                scope: 'https://www.googleapis.com/auth/gmail.modify', // Your requested scopes
                redirect_uri: 'http://localhost:3000/google', // This MUST match one of your Authorized Redirect URIs in Google Cloud Console http://localhost:3001/auth/google/callback https://exchangeauthcode-7c5i3vsqma-uc.a.run.app
                callback: handleAuthCodeResponse, // The function to call after the user completes the flow 
                // Optional: Set the flow to 'auth-code' explicitly (it's the default for initCodeClient)
                // flow: 'auth-code'
            });

            console.log('Google Identity Services client initialized.');
             // You might want to check if the user is already connected here
             // This would involve an API call to your backend
             // If connected, set setIsConnected(true);
        };

        // Cleanup script on component unmount
        return () => {
            document.body.removeChild(script);
        };
    }, []); // Empty dependency array means this runs once on mount

    // Function to trigger the OAuth flow when the button is clicked
    const handleConnectClick = () => {
        if (clientRef.current) {
            clientRef.current.requestCode(); // Initiates the redirect to Google's authorization server
        } else {
            console.error('Google Identity Services client not initialized.');
            alert('Google services are not ready. Please try again in a moment.');
        }
    };

    return (
        <div style={{
            padding: '1.5rem', // p-6
            maxWidth: '24rem', // max-w-sm
            margin: '0 auto', // mx-auto
            backgroundColor: '#fff', // bg-white
            borderRadius: '0.5rem', // rounded-xl
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // shadow-md
            display: 'flex', // space-y-4 (requires flex or grid for gap, simulating with margin)
            flexDirection: 'column',
            gap: '1rem' // space-y-4
        }}>
            <h2 style={{
                fontSize: '1.25rem', // text-xl
                fontWeight: 'bold', // font-bold
                textAlign: 'center', // text-center
                marginBottom: '1rem' // Add margin bottom since gap is on the container
            }}>
                Gmail Integration
            </h2>
            {!isConnected ? (
                <button
                    onClick={handleConnectClick}
                    disabled={!clientRef.current} // Disable button until GIS client is loaded
                    style={{
                        width: '100%', // w-full
                        backgroundColor: '#3b82f6', // bg-blue-500
                        color: '#fff', // text-white
                        fontWeight: 'bold', // font-bold
                        paddingTop: '0.5rem', // py-2
                        paddingBottom: '0.5rem', // py-2
                        paddingLeft: '1rem', // px-4
                        paddingRight: '1rem', // px-4
                        borderRadius: '0.25rem', // rounded
                        border: 'none', // Remove default button border
                        cursor: clientRef.current ? 'pointer' : 'not-allowed', // cursor based on disabled state
                        opacity: clientRef.current ? 1 : 0.5, // opacity based on disabled state
                        transition: 'background-color 0.2s ease-in-out', // hover:bg-blue-700 transition
                    }}
                    // Add hover effect via JS or a CSS-in-JS library if needed,
                    // inline styles don't support pseudo-classes like :hover directly
                >
                    {clientRef.current ? 'Connect Gmail' : 'Loading...'}
                </button>
            ) : (
                <p style={{
                    color: '#10b981', // text-green-600
                    textAlign: 'center', // text-center
                    fontWeight: 'semibold', // font-semibold
                    marginBottom: '1rem' // Add margin bottom
                }}>
                    Gmail Connected!
                </p>
            )}
             <p style={{
                fontSize: '0.875rem', // text-sm
                color: '#6b7280', // text-gray-500
                textAlign: 'center', // text-center
            }}>
                Connect your Gmail account to send emails directly through our platform.
            </p>
        </div>
    );
};

export default GmailConnectButton;