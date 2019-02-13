import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import omit from 'omit';

import Input from '../Input/Input';
import styles from '../Input/Input.scss';
// import styles from './MaterialInput.scss';

class ThemedInput extends React.Component {
  // constructor() {
  //   super();
  //   this.state = {
  //     focus: false
  //   };
  // }

  render() {
    const {
      id,
      size,
      dataHook,
      title,
      rtl,
      disabled,
      status,
      statusMessage,
      forceHover,
      forceFocus,
      className,
      value,
      withSelection,
    } = this.props;

    const rejectedProps = ['prefix', 'className', 'error', 'errorMessage', 'roundInput', 'noLeftBorderRadius', 'noRightBorderRadius'];
    const wsrInputProps = Object.assign(omit(rejectedProps, this.props), {theme: 'amaterial', });

    const hasFocus = forceFocus || (this.wsrInput && this.wsrInput.state.focus);
    const hasValue = (value && value.length) || (this.wsrInput && this.wsrInput.input && !!this.wsrInput.input.value);
    const classes = {
      [styles.rtl]: !!rtl,
      [styles.disabled]: disabled,
      [styles.hasError]: status === Input.StatusError,
      [styles.hasHover]: forceHover,
      [styles.hasFocus]: hasFocus,
      [styles.hasValue]: hasValue,
    };

    return (
      <div
        className={classNames(
          classes,
          styles.root,
          styles[`theme-amaterial`],
          styles[`size-${size}${withSelection ? '-with-selection' : ''}`],
          className,
        )}
        data-hook={dataHook}
      >
        <label className={styles.materialTitle} htmlFor={id}>{title}</label>
        <Input {...wsrInputProps}
               ref={wsrInput => (this.wsrInput = wsrInput)}
        />
        <div className={`${styles.bar} ${styles.barBlue}`} />
        <div>{statusMessage}</div>
      </div>
    );
  }
}

ThemedInput.displayName = 'ThemedInput';

ThemedInput.defaultProps = {
  autoSelect: true,
  size: 'normal',
  statusMessage: '',
  helpMessage: '',
  textOverflow: 'clip',
  maxLength: 524288,
  withSelection: false,
  clearButton: false,
};

ThemedInput.propTypes = {
  ariaControls: PropTypes.string,
  ariaDescribedby: PropTypes.string,
  ariaLabel: PropTypes.string,

  /** Standard React Input autoFocus (focus the element on mount) */
  autoFocus: PropTypes.bool,

  /** Standard React Input autoSelect (select the entire text of the element on focus) */
  autoSelect: PropTypes.bool,

  /** Sets value of autocomplete attribute (consult the [HTML spec](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#attr-fe-autocomplete) for possible values  */
  autocomplete: PropTypes.string,

  /** Specifies a data-hook for tests */
  dataHook: PropTypes.string,

  /** Default value for those who wants to use this component un-controlled */
  defaultValue: PropTypes.string,

  /** when set to true this component is disabled */
  disabled: PropTypes.bool,

  /** Input status - use to display an status indication for the user. for example: 'error' or 'loading' */
  status: PropTypes.oneOf([Input.StatusError, Input.StatusLoading]),

  /** The status (error/loading) message to display when hovering the status icon, if not given or empty there will be no tooltip */
  statusMessage: PropTypes.node,

  forceFocus: PropTypes.bool,
  forceHover: PropTypes.bool,

  /** Adding a suffix help icon */
  help: PropTypes.bool,

  /** The help message to display when hovering the help icon, if not given or empty there will be no tooltip */
  helpMessage: PropTypes.node,
  id: PropTypes.string,

  /** Input max length */
  maxLength: PropTypes.number,

  /** Should the component include a menu arrow */
  menuArrow: PropTypes.bool,

  /** Displays clear button (X) on a non-empty input */
  clearButton: PropTypes.bool,

  /** A single CSS class name to be appended to the Input's wrapper element. */
  className: PropTypes.string,

  name: PropTypes.string,

  /** Standard input onBlur callback */
  onBlur: PropTypes.func,

  /** Standard input onChange callback */
  onChange: PropTypes.func,

  /** Displays clear button (X) on a non-empty input and calls callback with no arguments */
  onClear: PropTypes.func,
  onCompositionChange: PropTypes.func,

  /** Called when user presses -enter- */
  onEnterPressed: PropTypes.func,

  /** Called when user presses -escape- */
  onEscapePressed: PropTypes.func,

  /** Standard input onFocus callback */
  onFocus: PropTypes.func,

  /** Standard input onClick callback */
  onInputClicked: PropTypes.func,

  /** Standard input onKeyDown callback */
  onKeyDown: PropTypes.func,
  onKeyUp: PropTypes.func,

  /** called when user pastes text from clipboard (using mouse or keyboard shortcut) */
  onPaste: PropTypes.func,

  /** onShow prop for the error and help tooltips */
  onTooltipShow: PropTypes.func,

  /** Placeholder to display */
  placeholder: PropTypes.string,

  /** Component you want to show as the prefix of the input */
  prefix: PropTypes.node,

  /** Sets the input to readOnly */
  readOnly: PropTypes.bool,

  /** Flip the magnify glass image so it be more suitable to rtl */
  rtl: PropTypes.bool,

  /** Specifies the size of the input */
  size: PropTypes.oneOf(['small', 'normal', 'large']),

  /** Component you want to show as the suffix of the input */
  suffix: PropTypes.node,

  /** Standard component tabIndex */
  tabIndex: PropTypes.number,

  /** Text overflow behaviour */
  textOverflow: PropTypes.string,

  /** The material design style floating label for input */
  title: PropTypes.string,

  /** Placement of the error and help tooltips */
  tooltipPlacement: PropTypes.string,
  type: PropTypes.string,

  /** Inputs value */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  withSelection: PropTypes.bool,
  required: PropTypes.bool,
};

export default ThemedInput;
