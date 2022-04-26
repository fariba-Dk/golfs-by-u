import usePlacesAutocomplete from "use-places-autocomplete";
import {Search} from './Search'

export default function PlacesAutocomplete() {
  function Locate( { panTo } ) {
    return (
      <button
        className="locate"
        onClick={ () => {
          navigator.geolocation.getCurrentPosition(
            ( position ) => {
              panTo( {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              } );
            },
            () => null
          );
        } }
      >
        <img src="/compass.svg" alt="compass" />
      </button>
    )
  }
}
