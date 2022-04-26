import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";

import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from '@reach/combobox';



const PlacesAutocomplete = () =>{
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete( {
    requestOptions: {
      /* Define search scope here */
    },
    debounce: 300,
  } );

  const renderSuggestions = () =>
    data.map( ( suggestion ) => {
      const {
        place_id,
        structured_formatting: { main_text, secondary_text },
      } = suggestion;

      const handleInput = ( e ) => {
        // Update the keyword of the input element
        setValue( e.target.value );
      };

      const handleSelect =
        ( { description } ) =>
          () => {
            // When user selects a place, we can replace the keyword without request data from API
            // by setting the second parameter to "false"
            setValue( description, false );
            clearSuggestions();

            // Get latitude and longitude via utility functions
            getGeocode( { address: description } )
              .then( ( results ) => getLatLng( results[ 0 ] ) )
              .then( ( { lat, lng } ) => {
                console.log( "📍 Coordinates: ", { lat, lng } );
              } )
              .catch( ( error ) => {
                console.log( "😱 Error: ", error );
              } );
          };


      return (
        <div ref={ ref }>
          <input
            value={ value }
            onChange={ handleInput }
            disabled={ !ready }
            placeholder="Where are you going?"
          />
          {/* We can use the "status" to decide whether we should display the dropdown or not */ }
          { status === "OK" && <ul>{ renderSuggestions() }</ul> }
          <Combobox onSelect={ handleSelect } aria-labelledby="demo">
            <ComboboxInput value={ value } onChange={ handleInput } disabled={ !ready } />
            <ComboboxPopover>
              <ComboboxList>
                { status === "OK" &&
                  data.map( ( { place_id, description } ) => (
                    <ComboboxOption key={ place_id } value={ description } />
                  ) ) }
              </ComboboxList>
            </ComboboxPopover>
          </Combobox>

        </div>
      );
    }
    )
}

export default PlacesAutocomplete;
