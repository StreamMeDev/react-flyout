'use strict'
const React = require('react')
const propTypes = require('prop-types')

module.exports = class FlyoutToggle extends React.Component {
  static propTypes = {
    element: propTypes.string,
    className: propTypes.string,
    onClick: propTypes.func
  }

  static defaultProps = {
    className: 'flyout-toggle',
    element: 'button'
  }

  constructor (props) {
    super(props)
    this.onClick = this.onClick.bind(this)
  }

  render () {
    // don't pass unknown props to children: https://fb.me/react-unknown-prop
    const {element, ...rest} = this.props

    return React.DOM[this.props.element](Object.assign(rest, {
      onClick: this.onClick
    }))
  }

  onClick (e) {
    if (typeof this.props.onClick === 'function') {
      e.preventDefault()
      this.props.onClick(e)
    }
  }
}
