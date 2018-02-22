'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var KeyboardBackspaceButton = function (_React$Component) {
  _inherits(KeyboardBackspaceButton, _React$Component);

  function KeyboardBackspaceButton(props) {
    _classCallCheck(this, KeyboardBackspaceButton);

    var _this = _possibleConstructorReturn(this, (KeyboardBackspaceButton.__proto__ || Object.getPrototypeOf(KeyboardBackspaceButton)).call(this, props));

    _this.onMouseDown = function () {
      _this.clearTimeout();
      _this.longPressTimeout = setTimeout(_this.longPressStart, _this.props.startTimeout);
    };

    _this.onMouseOut = function () {
      _this.clearTimeout();
      if (_this.isCurrentlyPressed()) {
        _this.setState({
          isPressed: false
        });
      }
    };

    _this.clearTimeout = function () {
      clearTimeout(_this.longPressTimeout);
      clearInterval(_this.pressInterval);
      _this.longPressTimeout = undefined;
      _this.pressInterval = undefined;
    };

    _this.isCurrentlyPressed = function () {
      return _this.state.isPressed;
    };

    _this.longPressStart = function () {
      _this.props.longPressStart();

      if (!_this.props.finite) {
        _this.props.pressCallback();
        _this.pressInterval = setInterval(_this.props.pressCallback, _this.props.pressCallbackTimeout);
      } else if (_this.props.finite) {
        _this.pressInterval = setTimeout(_this.longPressEnd, _this.props.pressCallbackTimeout);
      }

      _this.setState({
        isPressed: true
      });
    };

    _this.longPressEnd = function () {
      _this.onMouseOut();
      _this.props.longPressEnd();
    };

    _this.state = {
      isPressed: false
    };
    _this.handleClick = _this.handleClick.bind(_this);
    return _this;
  }

  _createClass(KeyboardBackspaceButton, [{
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.onMouseOut();
    }
  }, {
    key: 'handleClick',
    value: function handleClick() {
      if (typeof this.props.onClick !== 'undefined') {
        this.props.onClick(this.props.value);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'button',
        {
          type: 'button',
          tabIndex: '-1',
          className: 'keyboard-button ' + this.props.classes,
          onMouseOut: this.onMouseOut,
          onMouseDown: this.onMouseDown,
          onMouseUp: this.onMouseOut,
          onTouchStart: this.longPressStart,
          onTouchEnd: this.longPressEnd,
          onClick: this.handleClick
        },
        this.props.value
      );
    }
  }]);

  return KeyboardBackspaceButton;
}(_react2.default.Component);

exports.default = KeyboardBackspaceButton;


KeyboardBackspaceButton.defaultProps = {
  startTimeout: 300,
  longPressStart: function longPressStart() {},
  longPressEnd: function longPressEnd() {},
  pressCallbackTimeout: 300,
  pressCallback: undefined,
  finite: true,
  className: ''
};

KeyboardBackspaceButton.propTypes = {
  onClick: _propTypes2.default.func,
  startTimeout: _propTypes2.default.number,
  longPressStart: _propTypes2.default.func,
  longPressEnd: _propTypes2.default.func,
  pressCallbackTimeout: _propTypes2.default.number,
  pressCallback: _propTypes2.default.func,
  finite: _propTypes2.default.bool,
  className: _propTypes2.default.string
};
module.exports = exports['default'];