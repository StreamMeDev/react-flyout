'use strict'
const React = require('react')
const propTypes = require('prop-types')
const Flyout = require('./index')
const FlyoutToggle = require('./toggle')

module.exports = class FlyoutMenu extends React.Component {
  static propTypes = {
    renderWhenClosed: propTypes.bool,
    open: propTypes.bool,
    className: propTypes.string,
    itemClassName: propTypes.string,
    children: propTypes.node,
    element: propTypes.string
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
