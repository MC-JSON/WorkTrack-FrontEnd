import axios from 'axios'
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

//built for edits
const UpdateEmployee = ({ employee, jobs, user, businessId }) => {
  let { employeeId } = useParams()
  let navigate = useNavigate()

  const [formValue, setFormValue] = useState({
    employeeName: employee.employeeName,
    jobId: employee.jobId
  })

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormValue({
      ...formValue,
      [name]: value
    })
  }

  // handles update submit and navigates back
  const handleSubmit = async (e) => {
    e.preventDefault()
    await axios.put(
      `https://worktrack-backend.herokuapp.com/api/employees/${employeeId}`,
      formValue
    )
    navigate(`/users/${user.id}/businesses/${businessId}`)
  }

  // handles delete submit and navigates back
  const handleSubmit2 = async (e) => {
    e.preventDefault()
    await axios.delete(`https://worktrack-backend.herokuapp.com/api/employees/${employeeId}`)
    navigate('/')
  }

  return (
    <div className="forms-wrapper">
      <h1>Update Employee</h1>
      <div className="forms">
        <form onSubmit={handleSubmit}>
          <select
            className="create-form-select"
            name="jobId"
            onChange={handleChange}
          >
            {jobs.map((job) => (
              <option className="option1" value={job.id}>
                {job.jobTitle}
              </option>
            ))}
          </select>
          <input
            className="form"
            type="text"
            name="employeeName"
            placeholder="Name"
            value={employee.employeeName}
            onChange={handleChange}
          />
          <br />
          <button type="submit">Update</button>
          <button onClick={handleSubmit2}>Delete</button>
        </form>
      </div>
    </div>
  )
}

export default UpdateEmployee
