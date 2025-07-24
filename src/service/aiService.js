class AIService {
 

    /**
     * A private helper method to handle API requests.
     */
     async _makeApiCall(body) {
        try {
            const response = await fetch("https://getemailfromai-7c5i3vsqma-uc.a.run.app", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || `Request failed with status ${response.status}`);
            }
            const result = await response.json();
            if (result.success) {
                return result.data;
            } else {
                throw new Error(result.error || "The API call was not successful.");
            }
        } catch (error) {
            console.error("Failed to fetch from AI service:", error);
            throw error;
        }
    }

    /**
     * REFACTORED: Generates any type of message using the AI service.
     * @param {object} user - The current user object.
     * @param {string} messageType - The type of message (e.g., "template", "proposal", "event").
     * @param {object} [options={}] - Optional parameters.
     * @param {string} [options.persona] - The persona to adopt.
     * @param {string} [options.details] - Additional one-off instructions.
     * @param {object} [options.conversationHistory] - History for replies or follow-ups.
     * @returns {Promise<string>} - The AI-generated message content.
     */
     async generateMessage(user, messageType, options = {}) {
        const payload = {
            companyID: user.getJson().companyId,
            emailType: messageType,
            currentAIOptions: {
                model: "gpt-4o-mini",
                temperature: 0.9,
            },
            // The new context object carries all dynamic data
            context: {
                persona: options.persona || "",
                details: options.details || "",
                conversationHistory: options.conversationHistory || {},
            }
        };
        return await this._makeApiCall(payload);
    }
    
    extractSubjectAndBody(emailText) {
        const subjectMatch = emailText.match(/^{{\s*([^}]+?)\s*}}/);
        let subject = '';
        let plainBody = '';
      
        if (subjectMatch) {
          subject = subjectMatch[1].trim();
          plainBody = emailText.slice(subjectMatch[0].length).trim();
        } else {
          plainBody = emailText.trim();
        }
      
        // Normalize newlines and convert to HTML
        const htmlBody = plainBody
          .split('\n\n') // Paragraphs
          .map(para => `<p>${para.replace(/\n/g, '<br>')}</p>`)
          .join('\n');
      
        return {
          subject,
          body: htmlBody // Use this for injecting into Quill
        };
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