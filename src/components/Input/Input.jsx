import React from 'react';
import PropTypes from 'prop-types';

const Input = ({
  label,
  type,
  state,
  onChange,
  placeholder,
  required = true,
}) => (
  <>
    <label className="form__label" htmlFor={label}>
      {label}
      <input
        className={`form__input ${type}`}
        id={label}
        type={type}
        value={state}
        onChange={onChange}
        placeholder={placeholder}
        required={required} />
    </label>
  </>
);

export default Input;

Input.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  state: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  required: PropTypes.bool.isRequired,
};
