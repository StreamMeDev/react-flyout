# React Flyout Component

[![js-happiness-style](https://img.shields.io/badge/code%20style-happiness-brightgreen.svg)](https://github.com/JedWatson/happiness)

An flyout component for React.

## Install

```
$ npm install --save @streammedev/flyout
```

## Usage

```javascript
var Flyout = require('@streammedev/flyout');
var FlyoutMenu = Flyout.FlyoutMenu;
var FlyoutToggle = Flyout.FlyoutToggle;

module.exports = React.createClass({
	propType: {
		originServers: React.PropTypes.array.isRequired,
		selectedOrigin: React.PropTypes.object.isRequired,
		changeOrigin: React.PropTypes.func.isRequired
	},
	render: function () {
		return (
			<FlyoutMenu className="origins">
				<FlyoutToggle className="origins-toggle">{this.props.selectedOrigin.broadcastUrl}</FlyoutToggle>
				{this.props.originServers.map(function (o) {
					var id = o.region + o.broadcastUrl;
					return (
						<div className="origin" key={id} itemKey={id} onClick={this.props.changeOrigin.bind(this, o)}>
							{o.region}
						</div>
					);
				}.bind(this))}
			</FlyoutMenu>
		);
	}
});
```

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
