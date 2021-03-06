import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import CreateBusiness from '../components/CreateBusiness'
import BusinessRend from '../components/BusinessRend'
import axios from 'axios'

const BusinessPortal = ({
  user,
  authenticated,
  setBusinesses,
  businesses,
  setBusinessName,
  setBusinessAddress,
  setBusinessCity,
  setBusinessState,
  setBusinessImage
}) => {
  let { ownerId } = useParams()
  let navigate = useNavigate()

  const getBusinesses = async () => {
    const response = await axios.get(
      `https://worktrack-backend.herokuapp.com/api/owners/${ownerId}/businesses`
    )
    setBusinesses(response.data)
  }
  useEffect(() => {
    getBusinesses()
  }, [])

  const showBusiness = (
    businessId,
    businessName,
    businessAddress,
    businessCity,
    businessState,
    businessImage
  ) => {
    setBusinessName(businessName)
    setBusinessAddress(businessAddress)
    setBusinessCity(businessCity)
    setBusinessState(businessState)
    setBusinessImage(businessImage)
    navigate(`/users/${ownerId}/businesses/${businessId}`)
  }
  return user && authenticated ? (
    <div className="business-portal-wrapper">
      <div className="business-portal-info-wrapper">
        <h1>Business Portal</h1>
      </div>
      <div className="business-map">
        {businesses.map((business) => (
          <BusinessRend
            key={business.id}
            businessName={business.businessName}
            businessAddress={business.businessAddress}
            businessCity={business.businessCity}
            businessState={business.businessState}
            businessImage={business.businessImage}
            id={business.id}
            showBusiness={showBusiness}
          />
        ))}
      </div>
      <h3>New Business & Log Creation Form:</h3>
      <div className="links">
        <CreateBusiness
          ownerId={ownerId}
          user={user}
          getBusinesses={getBusinesses}
        />
        <h4>
          *If creating a business, please first create the business and then
          create a log for your business.
        </h4>
      </div>
    </div>
  ) : (
    <div className="protected">
      <h3> Oops! You must be signed in to do that!</h3>
      <button onClick={() => navigate('/')}>Sign In</button>
    </div>
  )
}

export default BusinessPortal
