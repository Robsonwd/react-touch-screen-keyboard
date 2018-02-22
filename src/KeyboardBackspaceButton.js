import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class KeyboardBackspaceButton extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isPressed: false,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentWillUnmount() {
    this.onMouseOut();
  }

  onMouseDown = () => {
    this.clearTimeout();
    this.longPressTimeout = setTimeout(this.longPressStart, this.props.startTimeout);
  };

  onMouseOut = () => {
    this.clearTimeout();
    if (this.isCurrentlyPressed()) {
      this.setState({
        isPressed: false,
      });
    }
  };

  clearTimeout = () => {
    clearTimeout(this.longPressTimeout);
    clearInterval(this.pressInterval);
    this.longPressTimeout = undefined;
    this.pressInterval = undefined;
  }

  isCurrentlyPressed = () => this.state.isPressed;

  longPressStart = () => {
    this.props.longPressStart();

    if (!this.props.finite) {
      this.props.pressCallback();
      this.pressInterval = setInterval(this.props.pressCallback, this.props.pressCallbackTimeout);
    } else if (this.props.finite) {
      this.pressInterval = setTimeout(this.longPressEnd, this.props.pressCallbackTimeout);
    }

    this.setState({
      isPressed: true,
    });
  };

  longPressEnd = () => {
    this.onMouseOut();
    this.props.longPressEnd();
  };

  handleClick() {
    if (typeof (this.props.onClick) !== 'undefined') {
      this.props.onClick(this.props.value);
    }
  }

  render() {
    return (
      <button
        type="button"
        tabIndex="-1"
        className={`${'keyboard-button '}${this.props.classes}`}
        onMouseOut={this.onMouseOut}
        onMouseDown={this.onMouseDown}
        onMouseUp={this.onMouseOut}
        onTouchStart={this.longPressStart}
        onTouchEnd={this.longPressEnd}
        onClick={this.handleClick}
      >
        {this.props.value}
      </button>);
  }
}

KeyboardBackspaceButton.defaultProps = {
  startTimeout: 300,
  longPressStart: () => {},
  longPressEnd: () => {},
  pressCallbackTimeout: 300,
  pressCallback: undefined,
  finite: true,
  className: '',
};

KeyboardBackspaceButton.propTypes = {
  onClick: PropTypes.func,
  startTimeout: PropTypes.number,
  longPressStart: PropTypes.func,
  longPressEnd: PropTypes.func,
  pressCallbackTimeout: PropTypes.number,
  pressCallback: PropTypes.func,
  finite: PropTypes.bool,
  className: PropTypes.string,
};
