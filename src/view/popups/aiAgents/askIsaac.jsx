import React from "react";
import { BaseComponent } from "flinntech";
import { urlService } from "flinntech";

/**
 * AskIsaac chat-like component, tuned for phones.
 * - Mobile-first layout (safe-area insets, sticky composer/header)
 * - Big touch targets (min 44px height)
 * - Prevents iOS zoom by using 16px+ font in inputs
 * - Uses 100dvh/100svh fallbacks for on-screen keyboard behavior
 *
 * Props:
 * - endpointUrl (string, required): Firebase HTTPS function URL to POST the prompt to.
 * - conversationId (string, optional)
 * - initialMessages (array, optional): [{ role: 'user'|'assistant'|'system', text: string }]
 * - onError (fn, optional): (error) => void
 */
export default class AskIsaac extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
      defaultClass: "fit",
      currentConversation: props.conversationId || null,
      messages: Array.isArray(props.initialMessages) ? props.initialMessages : [],
      input: "",
      loading: false,
      error: null,
      isMobile: false,
      viewportH: typeof window !== 'undefined' ? window.innerHeight : 0,
    };

    this.messagesEndRef = React.createRef();
    this.scrollWrapRef = React.createRef();
  }

  componentDidMount() {
    this.detectMobile();
    this.scrollToBottom();
    window.addEventListener("resize", this.onResize, { passive: true });
    window.addEventListener("orientationchange", this.onResize, { passive: true });
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.onResize);
    window.removeEventListener("orientationchange", this.onResize);
  }

  onResize = () => {
    this.setState({
      isMobile: this.isNarrow(),
      viewportH: window.innerHeight,
    }, this.scrollToBottom);
  };

  isNarrow = () => {
    return typeof window !== 'undefined' ? window.matchMedia('(max-width: 768px)').matches : false;
  };

  detectMobile = () => {
    this.setState({ isMobile: this.isNarrow(), viewportH: window.innerHeight });
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.messages !== this.state.messages || prevState.loading !== this.state.loading) {
      this.scrollToBottom();
    }
  }

  scrollToBottom = () => {
    if (this.messagesEndRef.current) {
      this.messagesEndRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  };

  setInput = (e) => this.setState({ input: e.target.value });

  handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      this.sendMessage();
    }
  };

  handleComposerFocus = () => {
    // On mobile, ensure latest messages are visible when keyboard opens
    setTimeout(this.scrollToBottom, 50);
  };

  addMessage = (msg) => {
    this.setState((s) => ({ messages: [...s.messages, msg] }));
  };
  formatContactMessage = (contact) => {
    if (!contact) return "(No contact data)";
  
    const name = [contact.firstName, contact.lastName].filter(Boolean).join(" ");
    const title = contact.title || contact.jobTitle || "";
    const company = contact.company || contact?.raw?.company?.name || "";
    const email = contact.email || contact.raw?.email || "";
    const phone = contact.phone || contact.raw?.phone || "";
    const linkedIn = contact.raw?.company?.socialMediaUrls?.find(
      (s) => s.type?.toLowerCase().includes("linked")
    )?.url;
    const addrParts = [
      contact.raw?.street,
      contact.raw?.city,
      contact.raw?.state,
      contact.raw?.zipCode,
      contact.raw?.country,
    ].filter(Boolean);
    const address = addrParts.join(", ");
  
    let msg = `👤 ${name}`;
    if (title) msg += `\n📌 ${title}`;
    if (company) msg += `\n🏢 ${company}`;
    if (email) msg += `\n✉️ ${email}`;
    if (phone) msg += `\n📞 ${phone}`;
    if (linkedIn) msg += `\n🔗 ${linkedIn}`;
    if (address) msg += `\n📍 ${address}`;
  
    return msg;
  };

  sendMessage = async () => {
    debugger
    // Hard-coded prompt (instead of using this.state.input)
  
    
    // Clear composer & show loading
    // this.setState({ input: "", loading: true, error: null });
     const { input, currentConversation } = this.state;

    const prompt = (input || "").trim();
    if (!prompt) return;
 
    // Optimistically render user message
    this.addMessage({ role: "user", text: prompt, ts: Date.now() });
    let id = urlService.getIdFromURL();
    let research = this.componentList.getComponent('research', id);
    // Clear composer & show loading
    this.setState({ input: "", loading: true, error: null });
    let companyOwnerId = research.getJson().companyOwnerId;
    let owner = research.getJson().owner;

    try {
      const res = await fetch("https://runaskisaac-7c5i3vsqma-uc.a.run.app", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt,
          options: {
            owner: owner,
            companyOwnerId: companyOwnerId,
            newDataSrcs: ["zoomInfoSrc"],
            temperature: 0.1,
            webSearch: false,
            timeoutMs: 45000,
            // conversationId: this.state.currentConversation || undefined,
          },
        }),
      });
  
      const raw = await res.text();
      let payload = null;
      try {
        payload = raw ? JSON.parse(raw) : null;
      } catch (_) {}
  
      if (!res.ok) {
        const err = new Error(payload?.error || `HTTP ${res.status}`);
        throw err;
      }
  
      if (payload?.data && Array.isArray(payload.data)) {
        const safe = payload.data.map((c) => ({
          role: "assistant",
          text: this.formatContactMessage(c),
          ts: Date.now(),
        }));
        this.setState((s) => ({ messages: [...s.messages, ...safe] }));
        this.setState({ input: "", loading: false, error: null });

      }else if (typeof payload?.text === "string") {
        // this.addMessage({ role: "assistant", text: payload.text, ts: Date.now() });
        console.log("assistant text:", payload.text);
      } else {
        // this.addMessage({ role: "assistant", text: "(No response)", ts: Date.now() });
        console.log("(No response)");
      }
    } catch (error) {
      // this.setState({ error });
      // if (this.props.onError) this.props.onError(error);
      // this.addMessage({ role: "assistant", text: `Error: ${error.message}`, ts: Date.now() });
      console.error("Error:", error.message);
    } finally {
      // this.setState({ loading: false });
    }
  };
  

  // sendMessage = async () => {
  //   const { input, currentConversation } = this.state;

  //   const prompt = (input || "").trim();
  //   if (!prompt) return;
 
  //   // Optimistically render user message
  //   this.addMessage({ role: "user", text: prompt, ts: Date.now() });

  //   // Clear composer & show loading
  //   this.setState({ input: "", loading: true, error: null });
  //   const options = {
  //     ...(this.props.runOptions || {}),
  //     // carry-through if you still want to tag convo (backend currently ignores it)
  //     conversationId: currentConversation || conversationId || undefined,
  //   };
  //   try {
  //     const res = await fetch("https://runaskisaac-7c5i3vsqma-uc.a.run.app", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ prompt, options }),
  //     });

  //     const raw = await res.text();
  //     let payload = null;
  //     try { payload = raw ? JSON.parse(raw) : null; } catch (_) {}

  //     if (!res.ok) {
  //       const err = new Error(payload?.error || `HTTP ${res.status}`);
  //       throw err;
  //     }

  //     if (payload?.messages && Array.isArray(payload.messages)) {
  //       const safe = payload.messages
  //         .filter((m) => m && m.text)
  //         .map((m) => ({ role: m.role || "assistant", text: String(m.text), ts: Date.now() }));
  //       this.setState((s) => ({ messages: [...s.messages, ...safe] }));
  //     } else if (typeof payload?.text === "string") {
  //       this.addMessage({ role: "assistant", text: payload.text, ts: Date.now() });
  //     } else {
  //       this.addMessage({ role: "assistant", text: "(No response)", ts: Date.now() });
  //     }
  //   } catch (error) {
  //     this.setState({ error });
  //     if (this.props.onError) this.props.onError(error);
  //     this.addMessage({ role: "assistant", text: `Error: ${error.message}`, ts: Date.now() });
  //   } finally {
  //     this.setState({ loading: false });
  //   }
  // };

  renderBubble = (msg, idx) => {
    const isUser = msg.role === "user";
    const { isMobile } = this.state;

    const bubbleStyle = {
      maxWidth: isMobile ? "85vw" : "72ch",
      padding: "12px 14px",
      borderRadius: 16,
      lineHeight: 1.5,
      whiteSpace: "pre-wrap",
      wordBreak: "break-word",
      boxShadow: "0 1px 2px rgba(0,0,0,0.06)",
      background: isUser ? "#DCF2FF" : "#FFFFFF",
      border: isUser ? "1px solid #B6E4FF" : "1px solid #ECECEC",
      alignSelf: isUser ? "flex-end" : "flex-start",
      fontSize: 15,
    };

    const rowStyle = {
      display: "flex",
      justifyContent: isUser ? "flex-end" : "flex-start",
      padding: "6px 10px",
    };

    return (
      <div key={`${msg.ts || idx}-${idx}`} style={rowStyle}>
        <div style={bubbleStyle}>
          {msg.text}
        </div>
      </div>
    );
  };

  getInnerContent() {
    const { loading, input, messages, error, isMobile, viewportH } = this.state;

    // Mobile-first layout
    const container = {
      position: "relative",
      height: "80vh",//viewportH ? `${Math.max(220, viewportH)}px` : "80dvh",
      // minHeight: "100svh",
      display: "flex",
      flexDirection: "column",
      background: "#fafafa",
      border: "1px solid #eaeaea",
      borderRadius: 12,
      overflow: "hidden",
    };

    const header = {
      position: "sticky",
      top: 0,
      padding: "12px calc(12px + env(safe-area-inset-right)) 12px calc(12px + env(safe-area-inset-left))",
      borderBottom: "1px solid #eaeaea",
      fontSize: 15,
      fontWeight: 600,
      background: "#fff",
      zIndex: 2,
    };

    const messagesWrap = {
      flex: 1,
      overflowY: "auto",
      WebkitOverflowScrolling: "touch",
      padding: "10px 0",
      scrollBehavior: "smooth",
    };

    const composerWrap = {
      position: "sticky",
      bottom: 0,
      borderTop: "1px solid #eaeaea",
      background: "#fff",
      padding: "10px 10px calc(10px + env(safe-area-inset-bottom)) 10px",
      display: "flex",
      gap: 8,
      alignItems: "flex-end",
      zIndex: 3,
    };

    const textareaStyle = {
      flex: 1,
      minHeight: 48, // 44+ for touch targets
      maxHeight: isMobile ? "40vh" : 160,
      resize: "vertical",
      padding: "12px",
      borderRadius: 12,
      border: "1px solid #dcdcdc",
      outline: "none",
      fontSize: 16, // >=16px prevents iOS zoom
      lineHeight: 1.4,
    };

    const sendBtn = {
      padding: "12px 16px",
      minHeight: 48,
      minWidth: 56,
      borderRadius: 12,
      background: loading ? "#ddd" : "#0b69ff",
      color: "#fff",
      border: "none",
      cursor: loading ? "not-allowed" : "pointer",
      fontWeight: 700,
      fontSize: 15,
      touchAction: "manipulation",
    };

    const hint = {
      padding: "6px 12px calc(6px + env(safe-area-inset-bottom)) 12px",
      fontSize: 12,
      color: "#666",
    };

    return (
      <div style={container}>
        <div style={header}>AskIsaac</div>

        {/* Messages area ("white space up top") */}
        <div ref={this.scrollWrapRef} style={messagesWrap}>
          {messages.map(this.renderBubble)}

          {loading && (
            <div style={{ padding: "6px 10px", display: "flex" }}>
              <div
                style={{
                  fontSize: 14,
                  color: "#666",
                  padding: "10px 12px",
                  border: "1px solid #ececec",
                  background: "#fff",
                  borderRadius: 12,
                }}
              >
                Getting Your Data…
              </div>
            </div>
          )}

          <div ref={this.messagesEndRef} style={{ height: 1, scrollMarginBottom: 80 }} />
        </div>

        {error && (
          <div style={{ color: "#b00020", fontSize: 13, padding: "4px 12px" }}>
            {String(error.message || error)}
          </div>
        )}

        {/* Composer */}
        <div style={composerWrap}>
          <textarea
            value={input}
            onChange={this.setInput}
            onKeyDown={this.handleKeyDown}
            onFocus={this.handleComposerFocus}
            placeholder={loading ? "Waiting for response…" : "Send a message…"}
            style={textareaStyle}
            disabled={loading}
            rows={1}
            aria-label="Message AskIsaac"
          />
          <button
            type="button"
            onClick={this.sendMessage}
            disabled={loading}
            style={sendBtn}
            aria-label="Send message"
            title={loading ? "Please wait" : "Send (Enter)"}
          >
            {loading ? "…" : "Send"}
          </button>
        </div>

        <div style={hint}>Press Enter to send • Shift+Enter for a new line</div>
      </div>
    );
  }

  render() {
    return (
      <div className={this.props.pageClass || this.state.defaultClass}>
        {this.getInnerContent()}
      </div>
    );
  }
}
