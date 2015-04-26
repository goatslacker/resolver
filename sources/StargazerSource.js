import alt from '../alt'
import source from '../source'

const StargazerStore = alt.stores.StargazerStore

export default {
  data: {
    users(props) {
      const url = `https://api.github.com/repos/${props.user}/${props.repo}/stargazers`
      return source({ url }).then(response => response.data)
    },
  },
}
