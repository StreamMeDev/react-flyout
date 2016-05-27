import React from 'react';

export class FlyoutToggle extends React.Component {
	constructor (props) {
		super(props);
		this.onClick = this.onClick.bind(this);
	}

	render () {
		return React.DOM[this.props.element](Object.assign({}, this.props, {
			className: 'flyout-toggle ' + this.props.className,
			onClick: this.onClick
		}));
	}

	onClick (e) {
		// Allow overriding of full on click behavior
		if (typeof this.props.onClick === 'function') {
			this.props.onClick(e);
		} else {
			e.preventDefault();
		}

		// Normal behavior is to toggle open the flyout
		if (typeof this.props.toggle === 'function') {
			this.props.toggle();
		}
	}
}

FlyoutToggle.propTypes = {
	element: React.PropTypes.string,
	toggle: React.PropTypes.func,
	shouldOpen: React.PropTypes.bool,
	className: React.PropTypes.string,
	onClick: React.PropTypes.func
};

FlyoutToggle.defaultProps = {
	element: 'button'
};
