import React from 'react'

import alt from './alt'
import AltContainer from 'alt/components/AltContainer'
import Stargazers from './stargazers'
import Count from './count'

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      user: 'goatslacker',
      repo: 'alt'
    }
  }

  doChange() {
    const user = this.refs.user.getDOMNode().value
    const repo = this.refs.repo.getDOMNode().value

    this.setState({ user, repo })
  }

  render() {
    return (
      <div>
        <label>
          User
          <input type="text" ref="user" defaultValue={this.state.user} />
        </label>
        <label>
          Repo
          <input type="text" ref="repo" defaultValue={this.state.repo} />
        </label>
        <button onClick={this.doChange.bind(this)}>Go</button>
        <Count user={this.state.user} repo={this.state.repo} />
        <Stargazers user={this.state.user} repo={this.state.repo} />
      </div>
    )
  }
}

React.render(<App />, document.body)
