import css from './Loader.module.css'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

function Spinner() {
  return (
    <Loader
      className={css.Loader}
      type="ThreeDots"
      color="#00BFFF"
      height={100}
      width={100}
      timeout={2000}
      visible={true}
    />
  )
}

export default Spinner
