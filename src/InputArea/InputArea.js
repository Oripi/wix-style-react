import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Exclamation from './Exclamation';
import WixComponent from '../BaseComponents/WixComponent';
import debounce from 'lodash/debounce';
import isNaN from 'lodash/isNaN';

import styles from './InputArea.scss';

/**
 * General inputArea container
 */
class InputArea extends WixComponent {
  constructor(props) {
    super(props);
    this._onKeyDown = this._onKeyDown.bind(this);
    this._onChange = this._onChange.bind(this);
    this._onInput = this._onInput.bind(this);
    this._onFocus = this._onFocus.bind(this);
    this._onBlur = this._onBlur.bind(this);
    this.focus = this.focus.bind(this);
    this.blur = this.blur.bind(this);
    this.select = this.select.bind(this);
    this._computedStyle = null;
  }

  state = {
    focus: false,
    counter: (this.props.value || this.props.defaultValue || '').length,
    computedRows: InputArea.MIN_ROWS,
  };

  // For autoGrow prop min rows is 2 so the textarea doesn't look like an input
  static MIN_ROWS = 2;

  componentDidMount() {
    super.componentDidMount();
    this.props.autoFocus && this._onFocus();
  }

  render() {
    const {
      autoFocus,
      defaultValue,
      disabled,
      error,
      forceFocus,
      forceHover,
      id,
      name,
      onKeyUp,
      placeholder,
      readOnly,
      tabIndex,
      rows,
      autoGrow,
      value,
      minHeight,
      maxHeight,
      maxLength,
      resizable,
      hasCounter,
      theme,
      errorMessage,
      tooltipPlacement,
      onTooltipShow,
    } = this.props;

    const inlineStyle = {};
    const rowsAttr = rows
      ? rows
      : autoGrow
      ? this.state.computedRows
      : undefined;
    const onInput = !rows && autoGrow ? this._onInput : undefined;

    if (minHeight) {
      inlineStyle.minHeight = minHeight;
    }

    if (maxHeight) {
      inlineStyle.maxHeight = maxHeight;
    }

    const classes = classNames({
      [styles.root]: true,
      [styles[`theme-${theme}`]]: true,
      [styles.hasError]: !!error,
      [styles.hasHover]: forceHover,
      [styles.hasFocus]: forceFocus || this.state.focus,
      [styles.resizable]: !!resizable,
      [styles.nonResizable]: !resizable || !!disabled,
      [styles.disabled]: !!disabled,
    });

    const ariaAttribute = {};
    Object.keys(this.props)
      .filter(key => key.startsWith('aria'))
      .map(
        key =>
          (ariaAttribute['aria-' + key.substr(4).toLowerCase()] = this.props[
            key
          ]),
      );

    return (
      <div className={styles.wrapper}>
        <div className={classes}>
          <textarea
            rows={rowsAttr}
            maxLength={maxLength}
            ref={ref => (this.textArea = ref)}
            className={styles.inputArea}
            id={id}
            name={name}
            style={inlineStyle}
            defaultValue={defaultValue}
            disabled={disabled}
            value={value}
            onFocus={this._onFocus}
            onBlur={this._onBlur}
            onKeyDown={this._onKeyDown}
            onChange={this._onChange}
            onInput={onInput}
            onDoubleClick={this._onDoubleClick}
            placeholder={placeholder}
            tabIndex={tabIndex}
            autoFocus={autoFocus}
            onKeyUp={onKeyUp}
            {...ariaAttribute}
            readOnly={readOnly}
          />
          {theme === 'material' && <div className={styles.bar} />}
          {hasCounter && maxLength && (
            <span className={styles.counter} data-hook="counter">
              {this.state.counter}/{maxLength}
            </span>
          )}
        </div>
        <div className={styles.error}>
          {error && !disabled && (
            <Exclamation
              errorMessage={errorMessage}
              tooltipPlacement={tooltipPlacement}
              onTooltipShow={onTooltipShow}
            />
          )}
        </div>
      </div>
    );
  }

  focus() {
    this.textArea && this.textArea.focus();
  }

  blur() {
    this.textArea && this.textArea.blur();
  }

  select() {
    this.textArea && this.textArea.select();
  }

  _onFocus(e) {
    this.setState({ focus: true });
    this.props.onFocus && this.props.onFocus(e);

    if (this.props.autoSelect) {
      // Set timeout is needed here since onFocus is called before react
      // gets the reference for the input (specifically when autoFocus
      // is on. So setTimeout ensures we have the ref.input needed in select)
      setTimeout(() => this.select(), 0);
    }
  }

  _onBlur(e) {
    this.setState({ focus: false });
    this.props.onBlur && this.props.onBlur(e);
  }

  _onKeyDown(e) {
    this.props.onKeyDown && this.props.onKeyDown(e);

    if (e.key === 'Enter') {
      this.props.onEnterPressed && this.props.onEnterPressed();
    } else if (e.key === 'Escape') {
      this.props.onEscapePressed && this.props.onEscapePressed();
    }
  }

  _onChange(e) {
    this.props.hasCounter && this.setState({ counter: e.target.value.length });
    this.props.onChange && this.props.onChange(e);
  }

  _onInput() {
    this.setState({ computedRows: 1 }, () => {
      const rowsCount = this._getRowsCount();
      const computedRows = Math.max(InputArea.MIN_ROWS, rowsCount);
      this.setState({
        computedRows,
      });
    });
  }

  _updateComputedStyle = debounce(
    () => {
      this._computedStyle = window.getComputedStyle(this.textArea);
    },
    500,
    { leading: true },
  );

  _getComputedStyle() {
    this._updateComputedStyle();
    return this._computedStyle;
  }

  _getRowsCount() {
    const computedStyle = this._getComputedStyle();
    const fontSize = parseInt(computedStyle.getPropertyValue('font-size'), 10);
    const lineHeight = parseInt(
      computedStyle.getPropertyValue('line-height'),
      10,
    );
    const lineHeightValue = isNaN(lineHeight)
      ? this._getDefaultLineHeight() * fontSize
      : lineHeight;
    return Math.floor(this.textArea.scrollHeight / lineHeightValue);
  }

  _getDefaultLineHeight() {
    if (!this._defaultLineHeight) {
      const { parentNode } = this.textArea;
      const computedStyles = this._getComputedStyle();
      const fontFamily = computedStyles.getPropertyValue('font-family');
      const fontSize = computedStyles.getPropertyValue('font-size');
      const tempElement = document.createElement('span');
      const defaultStyles =
        'position:absolute;display:inline;border:0;margin:0;padding:0;line-height:normal;';
      tempElement.setAttribute(
        'style',
        `${defaultStyles}font-family:${fontFamily};font-size:${fontSize};`,
      );
      tempElement.innerText = 'M';
      parentNode.appendChild(tempElement);
      this._defaultLineHeight =
        parseInt(tempElement.clientHeight, 10) / parseInt(fontSize, 10);
      tempElement.parentNode.removeChild(tempElement);
    }

    return this._defaultLineHeight;
  }
}

InputArea.displayName = 'InputArea';

InputArea.defaultProps = {
  theme: 'normal',
};

InputArea.propTypes = {
  ariaControls: PropTypes.string,
  ariaDescribedby: PropTypes.string,
  ariaLabel: PropTypes.string,

  /** Standard React Input autoFocus (focus the element on mount) */
  autoFocus: PropTypes.bool,

  /** Standard React Input autoSelect (select the entire text of the element on focus) */
  autoSelect: PropTypes.bool,
  dataHook: PropTypes.string,

  /** Default value for those who wants to use this component un-controlled */
  defaultValue: PropTypes.string,

  /** Disables the input */
  disabled: PropTypes.bool,

  /** Sets UI to erroneous */
  error: PropTypes.bool,

  /** The error message to display when hovering the error icon, if not given or empty there will be no tooltip */
  errorMessage: PropTypes.string,
  forceFocus: PropTypes.bool,
  forceHover: PropTypes.bool,

  /** When true a letters counter will appear */
  hasCounter: PropTypes.bool,
  id: PropTypes.string,

  /** Name Attribute */
  name: PropTypes.string,

  /** i.e. '12px' */
  maxHeight: PropTypes.string,

  /** Define max length allowed in the inputArea */
  maxLength: PropTypes.number,
  menuArrow: PropTypes.bool,

  /** i.e. '12px' */
  minHeight: PropTypes.string,

  /** onBlur callback */
  onBlur: PropTypes.func,

  /** onChange callback */
  onChange: PropTypes.func,
  onClear: PropTypes.func,
  onEnterPressed: PropTypes.func,
  onEscapePressed: PropTypes.func,

  /** onFocus callback */
  onFocus: PropTypes.func,
  onKeyDown: PropTypes.func,
  onKeyUp: PropTypes.func,

  /** onShow prop for the error tooltip */
  onTooltipShow: PropTypes.func,

  /** Placeholder to display */
  placeholder: PropTypes.string,

  /** Sets the input to readOnly */
  readOnly: PropTypes.bool,
  resizable: PropTypes.bool,

  /** Sets initial height according to the number of rows (chrome uses the rows for minHeight as well) */
  rows: PropTypes.number,

  /** Will cause the Input Area to grow and shrink according to user input */
  autoGrow: PropTypes.bool,

  style: PropTypes.oneOf(['normal', 'paneltitle', 'material', 'amaterial']),
  tabIndex: PropTypes.number,

  /** The theme of the input, can be one of `normal`, `paneltitle` */
  theme: PropTypes.oneOf(['normal', 'paneltitle', 'material', 'amaterial']),

  /** Placement of the error tooltip */
  tooltipPlacement: PropTypes.string,

  /** Inputs value */
  value: PropTypes.string,
};

export default InputArea;
