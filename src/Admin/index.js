import React, { Component } from 'react';
import CompetitionList from '../components/Admin/FootballDataCompetitionList';
import Competition from '../components/Admin/FootballDataCompetition';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = { plan: 'TIER_ONE', competitionId: null };

    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.getCompetitionId = this.getCompetitionId.bind(this);
  }

  handleSelectChange(event) {
    this.setState({ plan: event.target.value });
  }

  getCompetitionId(event) {
    this.setState({
      competitionId: parseInt(event.target.dataset.competitionid),
    });
  }

  render() {
    return (
      <React.Fragment>
        <select
          id="ddlPlan"
          onChange={this.handleSelectChange}
          value={this.state.plan}
        >
          <option value="TIER_ONE">Tier One</option>
          <option value="TIER_TWO">Tier Two</option>
          <option value="TIER_THREE">Tier Three</option>
          <option value="TIER_FOUR">Tier Four</option>
        </select>
        <CompetitionList
          plan={this.state.plan}
          getCompetitionId={this.getCompetitionId}
        />
        {this.state.competitionId !== null && (
          <Competition id={this.state.competitionId} />
        )}
      </React.Fragment>
    );
  }
}

export default Home;
