import React, {useState} from 'react';
import Select from "react-dropdown-select";

const EventOrganizerInputSelector = (props) => {
	const [eventOrganizers, setEventOrganizers] = useState([]);

	function isSetEventOrganizers(value) {
		setEventOrganizers(value)
		console.log(eventOrganizers)
	}

  return (
    <Select
				multi
				//create
				placeholder="Add event organizer(s)"
                onCreateNew={(item) => console.log('%c New item created ', item)}
                // onCreateNew will route to add event organizer page
				options={props.data.map(data => ({
					label: data.userEmail,
					value: data.userId
				}))}
				values={[]}
				onChange={(value) =>
					isSetEventOrganizers(value)
					//console.log(`%c > onChange  `, value)
				}
			/>
  )
} 

EventOrganizerInputSelector.propTypes = {}

export default EventOrganizerInputSelector;