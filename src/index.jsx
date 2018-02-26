'use strict'
const React = require('react')
const ReactDOM = require('react-dom')
const propTypes = require('prop-types')
const Flyout = require('./flyout')
const FlyoutMenu = require('./menu')

module.exports = class FlyoutContainer extends React.Component {
  static displayName = 'FlyoutContainer'

  static propTypes = {
    closeOnWindowBlur: propTypes.bool,
    closeOnExternalClick: propTypes.bool,
    closeOnEscape: propTypes.bool,
    initialOpen: propTypes.bool,
    renderWhenClosed: propTypes.bool,
    className: propTypes.string,
    children: propTypes.node,
    element: propTypes.string,
    menu: propTypes.bool
  }

  static defaultProps = {
    closeOnWindowBlur: false,
    closeOnExternalClick: false,
    closeOnEscape: true
  }

  constructor (props) {
    super(props)
    this.state = {
      open: this.props.initialOpen || false
    }
    this.flyoutRef = this.flyoutRef.bind(this)
    this.toggle = this.toggle.bind(this)
    this.close = this.close.bind(this)
    this.closeOnExternalClick = this.closeOnExternalClick.bind(this)
    this.closeOnEscape = this.closeOnEscape.bind(this)
  }

  render () {
    var Component = this.props.menu ? FlyoutMenu : Flyout
    return (
      <Component
        ref={this.flyoutRef}
        toggle={this.toggle}
        element={this.props.element}
        className={this.props.className}
        renderWhenClosed={this.props.renderWhenClosed}
        open={this.state.open}
      >
        {this.props.children}
      </Component>
    )
  }

  componentDidMount () {
    if (this.state.open) {
      this.bindBlurEvents()
    }
  }

  componentWillUnmount () {
    this.unbindBlurEvents()
  }

  componentWillUpdate (props, state) {
    if (this.state.open && !state.open) {
      this.unbindBlurEvents()
    } else if (!this.state.open && state.open) {
      this.bindBlurEvents()
    }
  }

  flyoutRef (ref) {
    this.flyout = ref
  }

  toggle () {
    this.setState({
      open: !this.state.open
    })
  }

  bindBlurEvents () {
    if (this.props.closeOnExternalClick) {
      document.body.addEventListener('click', this.closeOnExternalClick)
    }
    if (this.props.closeOnEscape) {
      window.addEventListener('keyup', this.closeOnEscape)
    }
    if (this.props.closeOnWindowBlur) {
      window.addEventListener('blur', this.close)
    }
  }

  unbindBlurEvents () {
    document.body.removeEventListener('click', this.closeOnExternalClick)
    window.removeEventListener('keyup', this.closeOnEscape)
    window.removeEventListener('blur', this.close)
  }

  closeOnExternalClick (e) {
    var container = ReactDOM.findDOMNode(this.flyout)
    var el = e.target

    // is the click inside the container?
    while (el && el !== document.body) {
      if (el === container) {
        return
      }
      el = el.parentNode
    }

    // It is an external click, so close flyout
    this.close()
  }

  closeOnEscape (e) {
    if (e.which !== 27) {
      return
    }
    this.close()
  }

  close (e) {
    this.unbindBlurEvents()
    this.setState({
      open: false
    })
  }
}
