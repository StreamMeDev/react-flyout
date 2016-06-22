import React from 'react';
import ReactDom from 'react-dom';
import {FlyoutToggle} from './toggle';

export class Flyout extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			open: this.props.open || false
		};
		this.toggle = this.toggle.bind(this);
		this.closeOnExternalClick = this.closeOnExternalClick.bind(this);
		this.closeOnEscape = this.closeOnEscape.bind(this);
	}
	render () {
		/* eslint-disable */
		// disabled because happiness 6.x doesnt work correctly on tab indented jsx
		// @TODO fix happiness then remove
		return (
			<div className={'flyout-container ' + (this.state.open ? 'open ' : '') + (this.props.className || '')}>
				{React.Children.map(this.props.children, function (child) {
					if (!child || child.type !== FlyoutToggle) {
						return false;
					}
					// Add toggle method
					return React.cloneElement(child, {
						toggle: this.toggle
					});
				}, this)}
				{this.state.open || this.props.renderWhenClosed ? (
					React.DOM[this.props.element]({
						className: 'flyout',
						children: React.Children.map(this.props.children, function (child) {
							if (!child || child.type === FlyoutToggle) {
								return false;
							}
							return child;
						}, this)
					})
				) : false}
			</div>
		);
		/* eslint-enable */
	}

	componentWillReceiveProps (newProps) {
		this.setState({
			open: typeof newProps.open !== 'undefined' ? newProps.open : this.state.open
		});
	}

	componentWillUpdate (props, state) {
		if (this.state.open && !state.open) {
			// Closing
			this.unbindBlurEvents();
		} else if (!this.state.open && state.open) {
			// Opening
			this.bindBlurEvents();
		}
	}

	componentWillUnmount () {
		this.unbindBlurEvents();
	}

	bindBlurEvents () {
		document.body.addEventListener('click', this.closeOnExternalClick);
		window.addEventListener('keyup', this.closeOnEscape);
		if (this.props.closeOnBlur) {
			window.addEventListener('blur', this.closeOnExternalClick);
		}
	}

	unbindBlurEvents () {
		document.body.removeEventListener('click', this.closeOnExternalClick);
		window.removeEventListener('keyup', this.closeOnEscape);
		window.removeEventListener('blur', this.closeOnExternalClick);
	}

	closeOnExternalClick (e) {
		var container = ReactDom.findDOMNode(this);
		var el = e.target;

		// is the click inside the container?
		while (el && el !== document.body) {
			if (el === container) {
				return;
			}
			el = el.parentNode;
		}

		// It is an external click, so close menu
		this.setState({
			open: false
		});
		if (typeof this.props.onClose === 'function') {
			this.props.onClose();
		}
	}

	closeOnEscape (e) {
		if (e.which === 27) {
			e.preventDefault();
			this.setState({
				open: false
			});
			if (typeof this.props.onClose === 'function') {
				this.props.onClose();
			}
		}
	}

	toggle () {
		this.setState({
			open: !this.state.open
		});
	}
}

Flyout.propTypes = {
	closeOnBlur: React.PropTypes.bool,
	renderWhenClosed: React.PropTypes.bool,
	open: React.PropTypes.bool,
	element: React.PropTypes.string,
	onClose: React.PropTypes.func,
	className: React.PropTypes.string,
	children: React.PropTypes.node
};

Flyout.defaultProps = {
	closeOnBlur: true,
	renderWhenClosed: true,
	element: 'div'
};
