class AIService {
 

    /**
     * A private helper method to handle API requests to Firebase Functions.
     * @param {string} url - The function URL to call.
     * @param {object} body - The JSON body for the POST request.
     * @returns {Promise<object>} - The data from the AI's response.
     */
    async _makeApiCall(body) {
        try {
            const response = await fetch("https://getemailfromai-7c5i3vsqma-uc.a.run.app", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${userToken}` // Add Authorization header if your function is not public.
                },
                body: JSON.stringify(body),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error("API Error:", errorData.error);
                throw new Error(errorData.error || `Request failed with status ${response.status}`);
            }

            const result = await response.json();
        if (result.success) {
                return result.data; // Return the 'data' object from your function's response
            } else {
                throw new Error(result.error || "The API call was not successful.");
            }

        } catch (error) {
            console.error("Failed to fetch from AI service:", error);
            throw error; // Re-throw the error to be handled by the caller
        }
    }

    /**
     * Generates a new email template.
     * @param {object} user - The user object, must contain a 'companyID'.
     * @param {object} [options] - Optional AI parameters.
     * @param {string} [options.valuePropDoc] - A document or string describing the value proposition.
     * @returns {Promise<object>} - The AI-generated email content.
     */
    async getTemplate(user, options = {}) {


        const payload = {
            currentAIOptions: {
                model: "gpt-4o-mini",
                temperature: 0.9,
                ...options
            },
            companyID: user.getJson().companyId,
            emailType: "template",
           
        };

        return await this._makeApiCall(payload);
    }

    /**
     * Generates a follow-up email for a sequence.
     * @param {object} user - The user object, must contain a 'companyID'.
     * @param {string} lastEmail - The content of the last email sent in the sequence.
     * @param {object} [options] - Optional AI parameters.
     * @returns {Promise<object>} - The AI-generated follow-up email.
     */
    async getFollowUp(user, lastEmail, options = {}) {
      
        const payload = {
            currentAIOptions: {
                model: "gpt-4o-mini",
                temperature: 0.8,
                ...options
            },
            companyID: user.getJson().companyId,
            emailType: "sequence",
            conversationHistory: {
                lastSentEmail: lastEmail
            }
        };

        return await this._makeApiCall( payload);
    }
    
    // /**
    //  * Generates a reply to a prospect's email.
    //  * @param {object} user - The user object, must contain a 'companyID'.
    //  * @param {string} fullHistory - The full email thread history.
    //  * @param {string} lastProspectReply - The most recent message from the prospect.
    //  * @param {object} [options] - Optional AI parameters.
    //  * @returns {Promise<object>} - The AI-generated reply.
    //  */
    // getReply(user, fullHistory, lastProspectReply, options = {}) {
    //     if (!user || !user.companyID) {
    //         return Promise.reject(new Error("A user object with a companyID is required."));
    //     }
    //     if (!fullHistory || !lastProspectReply) {
    //         return Promise.reject(new Error("Both the full email history and the last prospect reply are required."));
    //     }

    //     const payload = {
    //         currentAIOptions: {
    //             model: "gpt-4o-mini",
    //             temperature: 0.7,
    //             ...options
    //         },
    //         companyID: user.companyID,
    //         emailType: "reply",
    //         AIType: "generateReply",
    //         conversationHistory: {
    //             fullHistory: fullHistory,
    //             lastProspectReply: lastProspectReply
    //         }
    //     };

    //     return this._makeApiCall(this.getEmailFunctionUrl, payload);
    // }

   
}

export default new AIService(); 