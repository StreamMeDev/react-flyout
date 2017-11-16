const React = require('react');
const PropTypes = require('prop-types');
const {Flyout} = require('./index');
const {FlyoutToggle} = require('./toggle');

module.exports = class FlyoutMenu extends React.Component {
	static propTypes = {
		closeOnBlur: PropTypes.bool,
		renderWhenClosed: PropTypes.bool,
		open: PropTypes.bool,
		onClose: PropTypes.func,
		className: PropTypes.string,
		children: PropTypes.node
	};
	
	render () {
		/* eslint-disable */
		// disabled because happiness 6.x doesnt work correctly on tab indented jsx
		// @TODO fix happiness then remove
		return (
			<Flyout
				element="ol"
				className={this.props.className}
				closeOnBlur={this.props.closeOnBlur}
				renderWhenClosed={this.props.renderWhenClosed}
				open={this.props.open}
				onClose={this.props.onClose}
			>
				{React.Children.map(this.props.children, function (child) {
					if (!child) {
						return false;
					}
					// Just return toggle
					if (child.type === FlyoutToggle) {
						return child;
					}
					return <li className="menu-item" key={child.props.itemKey}>{child}</li>;
				})}
			</Flyout>
		);
		/* eslint-enable */
	}
}