import css from './ImageGalleryItem.module.css'
import PropTypes from 'prop-types'

function ImageGalleryItem({ webformatURL, tags, onImgClick }) {
  return (
    <li className={css.ImageGalleryItem}>
      <img
        src={webformatURL}
        alt={tags}
        className={css.ImageGalleryItemImage}
        onClick={onImgClick}
      />
    </li>
  )
}

export default ImageGalleryItem

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  onImgClick: PropTypes.func.isRequired,
}
