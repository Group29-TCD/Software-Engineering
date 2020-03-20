import React, { Component } from 'react'
import TitleContainer from '../Components/TitleContainer'

import 'bootstrap/dist/css/bootstrap.min.css'
import Navbar from '../Components/Navbar'
import HomeNavContainer from '../Components/HomeNavContainer'
import HomeStatsContainer from '../Components/HomeStats'

class HomePage extends Component {
  constructor(props) {
    super(props)

    this.state = { history: this.props.history }
  }

  render() {
    return (
      <div className="HomePage">
        <Navbar history={this.state.history} />
        <div className="row margin-right: -15px margin-left: -15px">
           <TitleContainer
             title="Wikidata Live"
             subtitle="A web app to visualise recent changes to Wikidata in quasi real time."
           ></TitleContainer>
           <HomeNavContainer
             btnImage="W"
             btnTitle="Wikidata Feed"
             btnText="Wikidata"
             btnLink="/feed"
           ></HomeNavContainer>
           <HomeNavContainer
             btnImage="M"
             btnTitle="Graph Data"
             btnText="Graphs"
             btnLink="/page"
           ></HomeNavContainer>
           <HomeNavContainer
             btnImage="👤"
             btnTitle="User Data"
             btnText="Users"
             btnLink="/"
           ></HomeNavContainer>
        </div>
        <HomeStatsContainer />
      </div>
    )
  }
}

export default HomePage
