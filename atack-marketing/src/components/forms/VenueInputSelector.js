import React, {useState} from 'react';
import Select from "react-dropdown-select";

const  VenueInputSelector = (props) => {
  // Refactor later for reusability - labels and values
  const [venue, setVenue] = useState('')

  function isSetVenue(venue) {
      setVenue(venue)
      console.log(venue)
  }

  return (
    <Select
                create
                placeholder="Add a venue"
                onCreateNew={(item) => console.log('%c New item created ', item)}
                // onCreateNew will route to add venue page
				options={props.data.map(data => ({
					label: data.venueName,
					value: data.venueId
				}))}
				values={[]}
                onChange={(value) =>
                    isSetVenue(value)
                    //console.log(`%c > onChange  `, value)
				}
  			//onChange={(values) => this.onChange(values)} - pending function
			/>
  )
} 

VenueInputSelector.propTypes = {}

export default VenueInputSelector;