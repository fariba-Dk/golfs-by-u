import React from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";

export default function AutoComplete({ onPlaceChanged, onLoad }){
  const [address, setAddress] = React.useState("");
  const [coordinates, setCoordinates] = React.useState({
    lat: null,
    lng: null
  });

  const handleSelect = async value => {
    try {
      const results = await geocodeByAddress( value );
      const latLng = await getLatLng( results[ 0 ] );
      setAddress( value );
      setCoordinates( latLng );
      onPlaceChanged( latLng );
    } catch ( err ) {
      console.log(err)
    }
  };

  return (
    <div className="search">
      <PlacesAutocomplete
        value={address}
        onChange={setAddress}
        onSelect={handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>

            <input styles={{}} {...getInputProps({ placeholder: "Search..." })} />

            <div>
              {loading ? <div>...loading</div> : null}

              {suggestions.map(suggestion => {
                const style = {
                  backgroundColor: suggestion.active ? "orange" : "#197019"
                };

                return (
                  <div {...getSuggestionItemProps(suggestion, { style })}>
                    {suggestion.description}
                  </div>

                );
              } ) }
              <h6>Latitude: { coordinates.lat } {"   "}Longitude: { coordinates.lng }</h6>

            </div>
          </div>
        )}
      </PlacesAutocomplete>
    </div>
  );
}
