import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import css from './Modal.module.css'

export default function Modal({ onClose, children }) {
  const modalRoot = document.querySelector('#modal-root')

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Escape') {
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [onClose])

  const handleBackdropClick = (event) => {
    if (event.currentTarget === event.target) {
      onClose()
    }
  }

  return createPortal(
    <div className={css.Overlay} onClick={handleBackdropClick}>
      <div>{children}</div>
    </div>,

    modalRoot,
  )
}

// const modalRoot = document.querySelector('#modal-root')

// export default class Modal extends Component {
//   componentDidMount() {
//     window.addEventListener('keydown', this.handleKeyDown)
//   }

//   componentWillUnmount() {
//     window.removeEventListener('keydown', this.handleKeyDown)
//   }

//   handleKeyDown = (e) => {
//     if (e.code === 'Escape') {
//       this.props.onClose()
//     }
//   }

//   handleBackdropClick = (event) => {
//     if (event.currentTarget === event.target) {
//       this.props.onClose()
//     }
//   }

//   render() {
//     return createPortal(
//       <div className={css.Overlay} onClick={this.handleBackdropClick}>
//         <div>{this.props.children}</div>
//       </div>,

//       modalRoot,
//     )
//   }
// }
