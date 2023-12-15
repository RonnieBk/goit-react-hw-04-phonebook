import css from './Filter.module.css';
import PropTypes from 'prop-types';

export const Filter = ({ onChange }) => {
  return (
    <div>
      <label className={css.label} htmlFor="filter">
        Find contacts by name
      </label>
      <input
        className={css.input}
        type="text"
        id="filter"
        name="filter"
        onChange={onChange}
      />
    </div>
  );
};

Filter.propTypes = {
  onChange: PropTypes.func.isRequired,
};
