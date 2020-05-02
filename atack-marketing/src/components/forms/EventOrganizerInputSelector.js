import React, {useState} from 'react';
import Select from "react-dropdown-select";

const EventOrganizerInputSelector = (props) => {
	const [eventOrganizers, setEventOrganizers] = useState([]);
	const eos = props.data;

	function isSetEventOrganizers(value) {
		setEventOrganizers(value)
		console.log(eventOrganizers)
		//props.parentCallback(value)
	}

	const options = eos.map((eo) => ({
		value: eo,
		label: eo.email
	}))

  return (
    <Select
				multi
				//create
				placeholder="Add event organizer(s)"
				// options={props.data.map(data => ({
				// 	label: data.userEmail,
				// 	value: data.userId
				// }))}
				options={options}
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