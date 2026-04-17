import { Spinner } from "react-bootstrap"

const Loader = ({ text = 'Loading...' }) => {
  return (
    <Spinner animation="border" role="status">
      <span className="visually-hidden">{text}</span>
    </Spinner>
  )
}

export default Loader