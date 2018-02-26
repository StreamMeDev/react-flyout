# React Flyout Component

[![NPM Version](https://img.shields.io/npm/v/@streammedev/flyout.svg)](https://npmjs.org/package/@streammedev/flyout)
[![NPM Downloads](https://img.shields.io/npm/dm/@streammedev/flyout.svg)](https://npmjs.org/package/@streammedev/flyout)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

An flyout component for React.

## Install

```
$ npm install --save @streammedev/flyout
```

## Usage

```javascript
var Flyout = require('@streammedev/flyout')
var FlyoutToggle = Flyout.FlyoutToggle

module.exports = React.createClass({
  displayName: 'OriginMenu',
  propType: {
    originServers: React.PropTypes.array.isRequired,
    selectedOrigin: React.PropTypes.object.isRequired,
    changeOrigin: React.PropTypes.func.isRequired
  },
  render: function () {
    return (
      <Flyout menu className="origins">
        <FlyoutToggle className="origins-toggle">{this.props.selectedOrigin.broadcastUrl}</FlyoutToggle>
        {this.props.originServers.map(function (o) {
          var id = o.region + o.broadcastUrl
          return <div className="origin" key={id} itemKey={id} onClick={this.props.changeOrigin.bind(this, o)}>{o.region}</div>
        }.bind(this))}
      </FlyoutMenu>
    )
  }
})
```

### Options/Props

```javascript
{
  closeOnWindowBlur: propTypes.bool, // Close flyout on window blur event, default: false
  closeOnExternalClick: propTypes.bool, // Close flyout when a user clicks somewhere else on the page, default: false
  closeOnEscape: propTypes.bool, // close flyout on escape key, default: true
  initialOpen: propTypes.bool, // The inital open state, default: false
  renderWhenClosed: propTypes.bool, // Render the flyout and use css to hide it, default: false
  className: propTypes.string,  // Class name override, default: 'flyout'
  children: propTypes.node, // Nest children to display in the flyout
  element: propTypes.string, // The dom node type to use 'div'
  menu: propTypes.bool // Render as a menu, wraps items in li tags and element defaults to 'ol'
}
```

### Smart vs. Dumb Components

The main export from this package is a "smart" or "managed" component.  It manages it's state internally, only loading initial state
from outside.  If you need to directly manage the state yourself, you can use the "dumb" or "stateless" components.  They are exported
by name as `Flyout`, `FlyoutMenu` and `FlyoutToggle`.  If you need to do more complicated things, like ensuring only one of two adjacent
flyouts are open at a time, then you should use these and implement your own logic for state management.  Use the code found in `src/index.jsx`
for reference on how to implement the options and state.


## Development

This package follows semver, when you wish to publish a version run the proper npm command.  For example, if we made a bug fix you can do this:

```
$ npm version patch
$ git push
$ npm publish
```

Here are the other types of version bumps:

- Major (`npm version major`): This is for breaking changes. Anytime a method is changed or the functionality is modified this bump should be made.
- Minor (`npm version minor`): This is for features additions. When a new method is added which doesn't affect the behavior of existing features, this bump should be made.
- Patch (`npm version patch`): This is for bug fixes. Only bump this if it is safe for production code to update wihout being QA'd.  (AKA, almost never)

For each of these you can run a 'pre' version by prepending to the command, ex `npm version preminor`.

All feature development should be done on a branch off `master`.  When a feature is complete and the pull request approved, publish a 'pre' version of the package for testing across environments.  To install that 'pre' version of the package do the following, where the verison number contains the correct 'pre' version:

```
$ npm install --save @streammedev/flyout@1.0.0-0
```

Running the tests:

```
$ npm install && npm test
```
