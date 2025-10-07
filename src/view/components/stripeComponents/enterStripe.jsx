// src/EnterStripe.jsx
import StripeProvider from "./stripe/StripeProvider.jsx";
import CoachOnboardingForm from "./components/CoachOnboardingForm.jsx";
import ClientCheckout from "./components/ClientCheckout.jsx";
import CoachBusinessProfileCard from "./components/CoachBusinessProfileCard.jsx";
import CoachVerificationPanel from "./components/CoachVerificationPanel.jsx"; // <-- import
import { BaseComponent } from "flinntech";

export default class EnterStripe extends BaseComponent {

    constructor(props) {
        super(props);
        this.state = {
            ...this.state,
            coachUid:this.propsState.currentUser?.getJson().stripeId 

        }
    }
    async componentDidMount() {
        debugger
        if(this.propsState.currentUser?.getJson().role !== "client"){
            if(!this.state.coachUid){
                const coachUid = this.buildId("viridianUser");
                await this.propsState.currentUser.setCompState({stripeId:coachUid});
                await this.propsState.currentUser.update();
                this.setState({coachUid:coachUid })
    
            }
        }
        else{
            let coach = this.componentList.getComponent("user", this.propsState.currentUser?.getJson().coachId, "_id");
            if(coach.getJson().stripeId){
                this.setState({coachUid:coach.getJson().stripeId })

            }


        }
       


    }
    buildId(prefix = "") {
        return (
          prefix +
          Date.now().toString(36) +
          Math.random().toString(36).slice(2, 8)
        );
      }

    render() {
        
        const customerId = this.props.customerId || null;

        const containerStyle = {
            padding: 24,
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 32
        };
        return (
            <div style={{ marginLeft: "250px" }}>
                <StripeProvider>
                    {this.state.coachUid&&
                    <div style={containerStyle}>
                        {/* LEFT: all coach setup + verification */}
                        {this.propsState.currentUser?.getJson().role !== "client" ? (
                            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                                <CoachOnboardingForm coachUid={this.state.coachUid} />
                                <CoachBusinessProfileCard coachUid={this.state.coachUid} />
                                <CoachVerificationPanel coachUid={this.state.coachUid} />   {/* ← ADD HERE */}
                            </div>
                        ) : (
                            <>
                                {/* RIGHT: client pay test form */}
                                <ClientCheckout coachUid={this.state.coachUid} customerId={customerId} /></>
                        )}
                    </div>}
                </StripeProvider>
            </div>
        );
    }

}




/**
 * TODO:
 * FE
 * test everything live
 * 
 * later
 * make it actually env
 * LIVE SECRETS AND WEBHOOKS
 * firebase rules for stripe and cors policies. 
 */