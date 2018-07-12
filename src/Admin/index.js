import React, { Component } from 'react';
import FootballDataCompetitionList from '../components/Admin/FootballDataCompetitionList';
import FootballDataCompetition from '../components/Admin/FootballDataCompetition';
import FootballDataMatchList from '../components/Admin/FootballDataMatchList';

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
      competitionId: parseInt(event.target.dataset.competitionid, 10),
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
        <br />
        <FootballDataCompetitionList
          plan={this.state.plan}
          getCompetitionId={this.getCompetitionId}
        />
        {this.state.competitionId !== null && (
          <React.Fragment>
            <FootballDataCompetition id={this.state.competitionId} />
            <FootballDataMatchList competitionId={this.state.competitionId} />
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

export default Home;
