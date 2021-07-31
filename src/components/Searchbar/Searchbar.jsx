import css from './Searchbar.module.css'
import PropTypes from 'prop-types'

function Searchbar({ onSubmit }) {
  const handleSearch = (e) => {
    e.preventDefault()
    onSubmit(e.target.elements.[1].value)
  }

  return (
    <header className={css.Searchbar}>
      <form className={css.SearchForm} onSubmit={handleSearch}>
        <button type="submit" className={css.SearchFormButton}>
          <span className={css.SearchFormButtonLabel}>Search</span>
        </button>

        <input
          className={css.SearchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  )
}

export default Searchbar

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
}