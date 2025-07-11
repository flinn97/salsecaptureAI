import React from "react";
import { BaseComponent, Card } from "flinntech";
import "./contacts.css";
import ClientRegisterCard from "./registerClientCard";
import StartQuestionsCard from "./startQuestionsCard";
import ClientInfoCard from "./clientInfoCard";
import AboutYouCard from "./aboutYouCard";

// import StartQuestionsCard from "./StartQuestionsCard"; // uncomment & adjust path if you have this

export default class ClientRegister extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
      defaultClass: "fit task-container-div",
    };
  }

  render() {
    // Map your possible states to components here
    const cards = {
      default: ClientRegisterCard,
      startQuestions: StartQuestionsCard,
      clientInfo: ClientInfoCard,
      aboutYou: AboutYouCard,
     




    };

    // Pick the right component (fallback to default)
    const type = this.propsState.clientRegisterState || "default";
    const SelectedCard = cards[type] || cards.default;

    return (
      <div
        style={{ marginLeft: "250px" }}
        className={this.props.pageClass || this.state.defaultClass}
      >
        <Card theme="NoBorder" type="fit" content={<SelectedCard />} />
      </div>
    );
  }
}
