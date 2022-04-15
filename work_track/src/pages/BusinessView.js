import { Link } from 'react-router-dom'

const BusinessView = (props) => {
  return (
    <div>
      <h1>Business Homepage</h1>
      <div>
        <Link to="/createemployee">Create Employee</Link>
      </div>
    </div>
  )
}

export default BusinessView
