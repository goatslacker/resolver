import React from 'react'

const STAT = {
  READY: 0,
  DONE: 1,
  LOADING: 2,
  FAILED: 3
}

function data(config) {
  return function (Component) {
    return React.createClass({
      displayName: Component.displayName,

      getInitialState() {
        return {
          status: STAT.READY,
          error: null,
          values: {}
        }
      },

      componentWillReceiveProps(nextProps) {
        const areEqual = Object.keys(nextProps).reduce((equals, prop) => {
          return equals && nextProps[prop] === this.props[prop]
        }, true)

        if (!areEqual) {
          this.resetState()
          this.resolveState(nextProps)
        }
      },

      componentWillMount() {
        this.resolveState(this.props)
      },

      resetState() {
        this.setState(this.getInitialState())
      },

      resolveState(props) {
        this.setState({ status: STAT.LOADING })

        const values = {}

        const promises = Object.keys(config.data).map((key) => {
          return new Promise((resolve, reject) => {
            const callback = (err, value) => err ? reject(err) : resolve(value)
            const value = config.data[key](props, callback)

            if (value && value.then && typeof value.then === 'function') {
              return value.then(resolve).catch(reject)
            }
          }).then(data => values[key] = data)
        })

        Promise.all(promises).then(
          () => { this.setState({ values: values, status: STAT.DONE }) },
          (error) => { this.setState({ error, status: STAT.FAILED }) },
        )
      },

      renderIfValid(val) {
        return React.isValidElement(val)
          ? val
          : <Component {...val} />
      },

      render() {
        const { status } = this.state

        switch (status) {
          case STAT.READY:
            return null
          case STAT.DONE:
            return <Component {...this.state.values} />
          case STAT.LOADING:
            return config.loading
              ? this.renderIfValid(config.loading(this.props))
              : null
          case STAT.FAILED:
            return config.failed
              ? this.renderIfValid(config.failed(this.state.error))
              : null
        }
      }
    })
  }
}

export default data
