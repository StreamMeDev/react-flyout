import React from 'react';
import {Flyout} from './index';
import {FlyoutToggle} from './toggle';

export class FlyoutMenu extends React.Component {
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

FlyoutMenu.propTypes = {
	closeOnBlur: React.PropTypes.bool,
	renderWhenClosed: React.PropTypes.bool,
	open: React.PropTypes.bool,
	onClose: React.PropTypes.func,
	className: React.PropTypes.string,
	children: React.PropTypes.node
};
