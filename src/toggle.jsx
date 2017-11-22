const React = require('react');
const PropTypes = require('prop-types');

module.exports = class FlyoutToggle extends React.Component {
	static propTypes = {
		element: PropTypes.string,
		toggle: PropTypes.func,
		shouldOpen: PropTypes.bool,
		className: PropTypes.string,
		onClick: PropTypes.func
	};

	static defaultProps = {
		element: 'button'
	};

	constructor (props) {
		super(props);
		this.onClick = this.onClick.bind(this);
	}

	render () {
		// don't pass unknown props to children: https://fb.me/react-unknown-prop
		const { element, toggle, ...rest } = this.props; // eslint-disable-line

		return React.createElement(
			element,
			Object.assign({}, rest, {
				className: 'flyout-toggle ' + this.props.className,
				onClick: this.onClick
			})
		);
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
};
