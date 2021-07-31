import '../App/App.css'
import { useState, useEffect, useRef } from 'react'
import Searchbar from '../Searchbar/Searchbar'
import { fetchImages } from '../../services/fetchImages'
import ImageGallery from '../ImageGallery/ImageGallery'
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem'
import Button from '../Button/Button'
import scrollTo from '../../services/scrollTo.js'
import Spinner from '../Loader/Loader'
import Modal from '../Modal/Modal'

export default function App() {
  const styles = {
    img: {
      maxWidth: 'calc(100vw - 48px)',
      maxHeight: 'calc(100vh - 24px)',
    },
  }

  const [searchQuery, setSearchQuery] = useState(null)
  const [queryStatus, setQueryStatus] = useState('idle')
  const [images, setImages] = useState([])
  const [currentPage, setCurrentPage] = useState(null)
  const [selectedImageSrc, setSelectedImageSrc] = useState(null)
  const [selectedImageTags, setSelectedImageTags] = useState(null)
  const [modalOpened, setModalOpened] = useState(false)

  const handleSubmit = (searchQuery) => {
    setSearchQuery(searchQuery)
    setCurrentPage(1)
  }

  const isFirstRender = useRef(true)

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }

    try {
      setQueryStatus('pending')

      const images = fetchImages(searchQuery, currentPage)
        .then((result) => result)
        .catch((error) => console.log(error))

      setQueryStatus('resolved')

      setImages((prevState) => [...prevState, ...images])

      scrollTo()
    } catch (error) {
      setQueryStatus('rejected')
    }
  }, [currentPage, searchQuery])

  //   async function componentDidUpdate(_, prevState) {
  //     const { searchQuery, currentPage } = this.state

  // const shouldFetch =
  //   (prevState.searchQuery !== searchQuery && searchQuery !== '') ||
  //   prevState.currentPage !== currentPage

  //     if (shouldFetch) {
  //       try {
  //         this.setState({ queryStatus: 'pending' })

  //         const images = await fetchImages(searchQuery, currentPage)

  //         this.setState((prevState) => ({
  //           queryStatus: 'resolved',
  //           images: [...prevState.images, ...images],
  //         }))

  //         scrollTo()
  //       } catch (error) {
  //         this.setState({ reqStatus: 'rejected' })
  //       }
  //     }
  //   }

  const handleMoreBtnClick = (e) => {
    e.preventDefault()

    setCurrentPage((prevState) => prevState.currentPage + 1)
  }

  const handleImgClick = (largeImageURL, tags) => {
    setSelectedImageSrc(largeImageURL)
    setSelectedImageTags(tags)
    setModalOpened(true)
  }

  const closeModal = () => {
    setModalOpened(false)
  }
  return (
    <>
      <Searchbar onSubmit={handleSubmit} />

      <ImageGallery>
        {images.map(({ id, webformatURL, tags, largeImageURL }) => (
          <ImageGalleryItem
            key={id}
            webformatURL={webformatURL}
            tags={tags}
            onImgClick={() => handleImgClick(largeImageURL, tags)}
          />
        ))}
      </ImageGallery>

      {queryStatus === 'resolved' && (
        <Button handleMoreBtnClick={handleMoreBtnClick} />
      )}

      {queryStatus === 'pending' && <Spinner />}

      {modalOpened && (
        <Modal onClose={closeModal}>
          <img
            style={styles.img}
            src={selectedImageSrc}
            alt={selectedImageTags}
          />
        </Modal>
      )}
    </>
  )
}

// export default class App extends Component {
//   state = {
//     searchQuery: null,
//     queryStatus: 'idle',
//     images: [],
//     currentPage: null,
//     selectedImageSrc: null,
//     selectedImageTags: null,
//     modalOpened: false,
//   }

//   styles = {
//     img: {
//       maxWidth: 'calc(100vw - 48px)',
//       maxHeight: 'calc(100vh - 24px)',
//     },
//   }

//   handleSubmit = (searchQuery) => {
//     this.setState({ searchQuery, currentPage: 1 })
//   }

//   async componentDidUpdate(_, prevState) {
//     const { searchQuery, currentPage } = this.state

//     const shouldFetch =
//       (prevState.searchQuery !== searchQuery && searchQuery !== '') ||
//       prevState.currentPage !== currentPage

//     if (shouldFetch) {
//       try {
//         this.setState({ queryStatus: 'pending' })

//         const images = await fetchImages(searchQuery, currentPage)

//         this.setState((prevState) => ({
//           queryStatus: 'resolved',
//           images: [...prevState.images, ...images],
//         }))

//         scrollTo()
//       } catch (error) {
//         this.setState({ reqStatus: 'rejected' })
//       }
//     }
//   }

//   handleMoreBtnClick = (e) => {
//     e.preventDefault()

//     this.setState((prevState) => ({
//       currentPage: prevState.currentPage + 1,
//     }))
//   }

//   handleImgClick = (largeImageURL, tags) => {
//     this.setState({
//       selectedImageSrc: largeImageURL,
//       selectedImageTags: tags,
//       modalOpened: true,
//     })
//   }

//   closeModal = () => {
//     this.setState({ modalOpened: false })
//   }

//   render() {
//     const {
//       images,
//       queryStatus,
//       selectedImageSrc,
//       selectedImageTags,
//       modalOpened,
//     } = this.state

//     return (
//       <>
//         <Searchbar onSubmit={this.handleSubmit} />

//         <ImageGallery>
//           {images.map(({ id, webformatURL, tags, largeImageURL }) => (
//             <ImageGalleryItem
//               key={id}
//               webformatURL={webformatURL}
//               tags={tags}
//               onImgClick={() => this.handleImgClick(largeImageURL, tags)}
//             />
//           ))}
//         </ImageGallery>

//         {queryStatus === 'resolved' && (
//           <Button handleMoreBtnClick={this.handleMoreBtnClick} />
//         )}

//         {queryStatus === 'pending' && <Spinner />}

//         {modalOpened && (
//           <Modal onClose={this.closeModal}>
//             <img
//               style={this.styles.img}
//               src={selectedImageSrc}
//               alt={selectedImageTags}
//             />
//           </Modal>
//         )}
//       </>
//     )
//   }
// }
