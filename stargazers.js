import React from 'react'
import data from './data'

import assign from 'object-assign'
import StargazerSource from './sources/StargazerSource'

@data(assign({
  loading(props) {
    return <div>Loading...</div>
  },

  failed(error) {
    return <div>{error.stack || error.statusText || error}</div>
  }
}, StargazerSource))
export default class Stargazers extends React.Component {
  static displayName = 'Stargazers'

  static propTypes = {
    users: React.PropTypes.array.isRequired
  }

  render() {
    return (
      <section>
        <div className="card">
          <div className="card-content">
            <span className="card-title deep-purple-text">Stargazers</span>
            <p>
              These are all of the cool people who"ve starred this project!
            </p>
          </div>
        </div>

        {this.renderUsers(this.props.users)}
      </section>
    )
  }

  renderUser(user) {
    return (
      <div key={user.id} style={{ display: 'inline-block' }}>
        <img src={user.avatar_url} alt="" width={32} height={32} />
        <br />
        {user.login}
      </div>
    )
  }

  renderUsers(users) {
    return (
      <div>
        {users.map(user => (
          <div key={user.id}>
            {this.renderUser(user)}
          </div>
        ))}
      </div>
    )
  }
}
