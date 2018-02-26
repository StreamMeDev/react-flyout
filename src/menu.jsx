'use strict'
const React = require('react')
const propTypes = require('prop-types')
const Flyout = require('./flyout')
const FlyoutToggle = require('./toggle')

module.exports = class FlyoutMenu extends React.Component {
  static propTypes = {
    open: propTypes.bool,
    renderWhenClosed: propTypes.bool,
    className: propTypes.string,
    children: propTypes.node,
    element: propTypes.string,
    toggle: propTypes.func,
    itemClassName: propTypes.string
  }

  static defaultProps = {
    className: 'flyout-menu',
    element: 'ol'
  }

  render () {
    return (
      <Flyout
        element={this.props.element}
        className={this.props.className}
        renderWhenClosed={this.props.renderWhenClosed}
        open={this.props.open}
        toggle={this.props.toggle}
      >
        {React.Children.map(this.props.children, (child) => {
          if (!child) {
            return false
          }
          // Just return toggle
          if (child.type === FlyoutToggle) {
            return child
          }
          return <li className={this.props.itemClassName} key={child.props.itemKey}>{child}</li>
        })}
      </Flyout>
    )
  }
}
