import css from './Button.module.css'
import PropTypes from 'prop-types'

function Button({ handleMoreBtnClick }) {
  return (
    <button
      type="submit"
      name="more"
      className={css.Button}
      onClick={handleMoreBtnClick}
    >
      Load more
    </button>
  )
}

export default Button

Button.propTypes = {
  handleMoreBtnClick: PropTypes.func.isRequired,
}
