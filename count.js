import React from 'react'
import data from './data'
import assign from 'object-assign'
import StargazerSource from './sources/StargazerSource'

@data(assign({
  loading(props) {
    return { users: [] }
  },

  failed(error) {
    return { users: [] }
  }
}, StargazerSource))
export default class Count extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return <div>How many people? {this.props.users.length}</div>
  }
}
