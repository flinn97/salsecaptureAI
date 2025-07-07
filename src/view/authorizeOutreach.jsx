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
      this.exchangeCodeForTokens(code);
    }
  }

  expectedState = "xyz123"; // same as you sent in the authorize URL

  async exchangeCodeForTokens(code) {
    console.log(code)
    this.setState({ loading: true, error: null });
    try {
      // 3. Call your own backend endpoint to swap the code for tokens
      //    (You shouldn't embed client_secret in the browser!)
      const resp = await fetch("https://exchangecode-7c5i3vsqma-uc.a.run.app", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });
      if (!resp.ok) throw new Error(`HTTP ${resp.status}`);


      const { access_token, refresh_token, expires_in } = await resp.json();
      console.log(access_token)

      // 4. Persist into your aiSettings component
      const user = this.propsState.currentUser;
      await user.setCompState({
        outreachAccessToken:  access_token,
        outreachRefreshToken: refresh_token,
        outreachTokenExpiresAt:
          Date.now() + expires_in * 1000,
      },
      { run: true }, true);

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
      <div style={{ padding: "20px" }}>
        <h1>Outreach Settings</h1>

        {loading && <p>Linking your Outreach account…</p>}
        {error   && <p style={{ color: "red" }}>Error: {error}</p>}

        {!loading && !error && (
          <div className="dark-button-1"
               onClick={() => {
                 // Kick off the OAuth flow
                 window.location.href =
                   "https://accounts.outreach.io/oauth/authorize" +
                   `?client_id=${"FVmbvVzJuXA7v1QqONeErtezeL-Rth2L6.UWzJW8IeZL"}` +
                   `&redirect_uri=${encodeURIComponent("https://app.salescapture.ai/settings")}` +
                   "&response_type=code" +
                   "&scope=sequences.read%20prospects.write%20sequenceStates.write" +
                   "&state=xyz123"
               }}>
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
