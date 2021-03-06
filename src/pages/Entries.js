import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import EntryInfo from '../components/EntryInfo'
import CreateEntry from '../components/CreateEntry'

const Entries = ({
  logId,
  startDate,
  endDate,
  employees,
  showLastMonth,
  showYesterday,
  showLastWeek,
  showCustomDateSearch,
  setEntry
}) => {
  const [entries, setEntries] = useState([])
  const [totalHoursWorked, setTotalHoursWorked] = useState()
  const [formValue, setFormValue] = useState({})
  const { searchStartDate, searchEndDate } = formValue
  let navigate = useNavigate()

  const getEntriesByDateRange = async () => {
    const response = await axios.get(
      `https://worktrack-backend.herokuapp.com/api/Entries/${logId}/date-range-search/?startDate=${startDate}&endDate=${endDate}`
    )
    setEntries(response.data.entries)
    setTotalHoursWorked(response.data.sum)
  }
  useEffect(() => {
    getEntriesByDateRange()
  }, [startDate, endDate, employees])

  const createNewEntry = async (data) => {
    await axios.post(
      `https://worktrack-backend.herokuapp.com/api/entries/${logId}`,
      data
    )
    getEntriesByDateRange()
  }

  const updateEntry = (entryId, entry) => {
    setEntry(entry)
    navigate(`/update-entry-page/${entryId}`)
  }

  const deleteEntry = async (entryId) => {
    await axios.delete(
      `https://worktrack-backend.herokuapp.com/api/entries/${entryId}`
    )
    getEntriesByDateRange()
  }

  const handleChange = (event) => {
    setFormValue({
      ...formValue,
      [event.target.name]: event.target.value
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    showCustomDateSearch(formValue.searchStartDate, formValue.searchEndDate)
  }
  return entries != '' ? (
    <div className="log-wrapper">
      <div className="create-entry">
        <CreateEntry
          logId={logId}
          createNewEntry={createNewEntry}
          employees={employees}
        />
      </div>
      <div className="quick-view-buttons">
        <div className="preset-searches">
          <button className="last-month" onClick={() => showLastMonth()}>
            Last 30 Days
          </button>
          <button className="last-week" onClick={() => showLastWeek()}>
            Last 7 Days
          </button>
          <button className="yesterday" onClick={() => showYesterday()}>
            Yesterday
          </button>
        </div>
        <div className="custom-date-search">
          <form className="date-range-search-form" onSubmit={handleSubmit}>
            <label>Start Date:</label>
            <input
              className="start-date-range-search"
              type="date"
              name="searchStartDate"
              value={searchStartDate}
              onChange={handleChange}
            />
            <label>End Date:</label>
            <input
              className="end-date-range-search"
              type="date"
              name="searchEndDate"
              value={searchEndDate}
              onChange={handleChange}
            />
            <button className="search-entries-button" type="submit">
              Search Entries
            </button>
          </form>
        </div>
      </div>
      <div className="total-hours-worked">
        Total hours worked this period: {totalHoursWorked}
      </div>
      <div className="entries-list">
        {entries.map((entry) => (
          <EntryInfo
            key={entry.id}
            date={entry.date}
            hours={entry.employeeHours}
            employee={entry.employeeId}
            employeeList={employees}
            updateEntry={updateEntry}
            deleteEntry={deleteEntry}
            entryId={entry.id}
          />
        ))}
      </div>
    </div>
  ) : (
    <div className="empty-entries-wrapper">
      <div className="empty-entries">
        {employees.length > 0 ? (
          <div className="create-entry">
            <CreateEntry
              logId={logId}
              createNewEntry={createNewEntry}
              employees={employees}
            />
          </div>
        ) : (
          <div></div>
        )}
        <p>You don't have any entries yet.</p>
        <p>
          If this is your first time here, get started by clicking "Create
          Jobs".
        </p>
        <p>
          Once you have all of your positions set up, "Create Employees" is your
          next stop.
        </p>
        <p>That's it! Start tracking those hours.</p>
      </div>
    </div>
  )
}

export default Entries
