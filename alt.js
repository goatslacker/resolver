import Alt from 'alt'
import chromeDebug from 'alt/utils/chromeDebug'
import cache from './cache'

const alt = new Alt()
chromeDebug(alt)

const StargazerActions = alt.generateActions('load', 'fire')

window.StargazerActions = StargazerActions
alt.actions.StargazerActions = StargazerActions

@cache()
class Store {
  static displayName = 'StargazerStore'

  constructor() {
    this.users = []

    this.bindListeners({
      load: StargazerActions.load,
      fire: StargazerActions.fire,
    })
  }

//  @invalidateCache
  fire() {
    console.log('Woot')
    this.invalidateCache()
  }

  load({ users }) {
    this.setState({ users })
  }
}

const StargazerStore = alt.createStore(Store, 'StargazerStore')

StargazerStore.listen(function (state) {
  console.log('CHANGED', state)
})

export default alt
