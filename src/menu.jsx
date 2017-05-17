import React from 'react';
import reactCompat from '@streammedev/react-compat';
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
	closeOnBlur: reactCompat.PropTypes.bool,
	renderWhenClosed: reactCompat.PropTypes.bool,
	open: reactCompat.PropTypes.bool,
	onClose: reactCompat.PropTypes.func,
	className: reactCompat.PropTypes.string,
	children: reactCompat.PropTypes.node
};
