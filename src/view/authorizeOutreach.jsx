import { BaseComponent } from "flinntech";

export default class AuthorizeOutreachCard extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
      defaultClass: "fit",
      loading: false,
      error: null,
    };
  }

  componentDidMount() {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    if (code && !this.state.hasExchanged) {
      this.setState({ hasExchanged: true });
      setTimeout(() => {
        this.exchangeCodeForTokens(code);
      }, 100);
    }
  }

  expectedState = "xyz123"; // same as you sent in the authorize URL

  async exchangeCodeForTokens(code) {
    this.setState({ loading: true, error: null });

    let body = {
      code: code,
      user: this.propsState.currentUser.getJson(),
    };
    console.log(body);
    let json = await JSON.stringify(body);
    try {
      // 3. Call your own backend endpoint to swap the code for tokens
      //    (You shouldn't embed client_secret in the browser!)
      const resp = await fetch("https://exchangecode-7c5i3vsqma-uc.a.run.app", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: json,
      });
      if (!resp.ok) throw new Error(`HTTP ${resp.status}`);

      const { access_token, refresh_token, expires_in } = await resp.json();
      console.log(access_token);

      // 4. Persist into your aiSettings component
      const user = this.propsState.currentUser;
      await user.setCompState(
        {
          outreachAccessToken: access_token,
          outreachRefreshToken: refresh_token,
          outreachTokenExpiresAt: Date.now() + expires_in * 1000,
        },
        { run: true },
        true
      );

      // 5. Optionally, remove code from URL (to clean up)
      window.history.replaceState({}, "", window.location.pathname);
    } catch (err) {
      console.error(err);
      this.setState({ error: err.message });
    } finally {
      this.setState({ loading: false });
    }
  }

  getInnerContent() {
    const { loading, error } = this.state;
    return (
      <div
        id="outreachSettings"
        style={{
          width: "fit-content",
          height: "fit-content",
          minWidth: "400px",
          padding: "12px",
          borderRadius: "8px",
          border: "1px solid #d1d1d1",
        }}
      >
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div
           className="contact-avatar"
            style={{ maxWidth: "25px", maxHeight: "25px", background:"#323232" }}
          >
            <i class="fa-solid fa-envelope"></i>
          </div>
          <h1>Outreach Settings</h1>
        </div>
        <p style={{ color: "#333333", margin: "12px 0px 12px 0px" }}>
          Integrate with Outreach for sales engagement
        </p>

        {loading && <p>Linking your Outreach account…</p>}
        {error && <p style={{ color: "red" }}>Error: {error}</p>}

        {!loading && !error && (
          <div
            className="blue-button-1"
            onClick={() => {
              // Kick off the OAuth flow
              window.location.href =
                "https://accounts.outreach.io/oauth/authorize" +
                `?client_id=${"FVmbvVzJuXA7v1QqONeErtezeL-Rth2L6.UWzJW8IeZL"}` +
                `&redirect_uri=${encodeURIComponent(
                  "https://app.salescapture.ai/settings"
                )}` +
                "&response_type=code" +
                "&scope=sequences.read%20sequenceStates.write%20users.all%20mailboxes.all%20prospects.all" +
                "&state=xyz123";
            }}
          >
            Connect Outreach
          </div>
        )}
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
