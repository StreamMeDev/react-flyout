'use strict'
const React = require('react')
const propTypes = require('prop-types')
const reactDom = require('react-dom-factories')
const FlyoutToggle = require('./toggle')

module.exports = class Flyout extends React.Component {
  static displayName = 'Flyout'

  static propTypes = {
    open: propTypes.bool,
    renderWhenClosed: propTypes.bool,
    className: propTypes.string,
    children: propTypes.node,
    element: propTypes.string,
    toggle: propTypes.func
  }

  static defaultProps = {
    open: false,
    className: 'flyout',
    renderWhenClosed: true,
    element: 'div'
  }

  render () {
    const {children, open, ...props} = this.props
    return (
      <div className={props.className + (open ? ' open' : '')}>
        {React.Children.map(children, (child) => {
          return (!child || child.type !== FlyoutToggle) ? null : (
            // Add toggle method
            React.cloneElement(child, {
              onClick: child.props.onClick || this.props.toggle
            })
          )
        })}
        {(open || props.renderWhenClosed) && (
          reactDom[props.element]({
            className: 'flyout-content',
            children: React.Children.map(children, (child) => {
              return (!child || child.type === FlyoutToggle) ? null : child
            })
          })
        )}
      </div>
    )
  }
}
