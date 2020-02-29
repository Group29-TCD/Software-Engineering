import React, { Component } from 'react'
import GraphPage from './GraphPage'
import SimpleBarGraph from '../Components/SimpleBarGraph'
import { getMostActiveUsers } from '../Backend/APIWrapper'

export const MostActiveUsersGraphSettings = {
  getData: async function() {
    let data = await getMostActiveUsers()
    return data
  },
  refreshTime: 2000,
  refreshMethod: function() {
    this.loadData()
  },
  keys: ['recentactions'],
  index: 'name',
  xAxis: 'users',
  yAxis: 'recent actions',
  colors: 'set3',
}

class MostActiveUsers extends Component {
  constructor(props) {
    super(props)
    this.state = {
      history: this.props.history,
    }

    this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
  }

  render() {
    return (
      <GraphPage
        graph={
          <SimpleBarGraph
            fullGraph={true}
            settings={MostActiveUsersGraphSettings}
          />
        }
        name={'Most Active Users'}
      />
    )
  }
}

export default MostActiveUsers
