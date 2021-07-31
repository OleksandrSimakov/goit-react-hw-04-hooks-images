import css from './ImageGallery.module.css'
import PropTypes from 'prop-types'

function ImageGallery({ children }) {
  return <ul className={css.ImageGallery}>{children}</ul>
}

export default ImageGallery

ImageGallery.propTypes = {
  children: PropTypes.node.isRequired,
}
