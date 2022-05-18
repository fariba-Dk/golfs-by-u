

export const getPostcode = async placeId => {
  try {
    const { lat, lng } = await getGooglePlaceById(placeId)
    return getPostcodeByLatLng(lat, lng)
  } catch (e) {
    console.error(e)
    return null
  }
}

export default function ShowPlacePostcode({ placeId }) {
  const [postcode, setPostcode] = useState(null)

  const handleClick = async e => {
    e.preventDefault()
    const postcode = await getPostcode(placeId)
    setPostcode(postcode)
  }

  return (
    <>
      <button onClick={handleClick}>Get postcode</button>
      <p>
        {postcode ? `The postcode is: ${postcode}` : "Sorry, no postcode found"}
      </p>
    </>
  )
}
