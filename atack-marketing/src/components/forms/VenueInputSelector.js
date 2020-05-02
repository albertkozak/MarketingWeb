import React, { useState } from 'react';
import Select from 'react-dropdown-select';
import { useHistory } from 'react-router-dom';
import VenueItem from '../venue/VenueItem'

const VenueInputSelector = (props) => {
	// Refactor later for reusability - labels and values
	const [ venueSelected, setVenue ] = useState('');
	const [inputValue, setInputValue] = useState([])
	const venues = props.data

	const history = useHistory();

	function isSetVenue(venue) {
		let venueString = JSON.stringify(venue, true, 2);
		setVenue(venue);
		console.log(venue)
		console.log(venueString);
		//console.log(venueString.label);
		props.parentCallback(venue)
	}

	function addVenue(venueName) {
		history.push('/addvenue', venueName.value);
		console.log(venueName.value);
	}



	const options = venues.map((venue) => ({
			value: venue,
			label: venue.venueName,
		}))

	// const options = venues.map((venue) => (
	// 	<option key={venue.venueId}>{venue.ame}</option>
	// 	))

	// const change = (event) => {
	// 	setInputValue(event.target.value)
	// }
	

	return (
		<Select
			create
			placeholder="Add a venue"
			onCreateNew={(item) => addVenue(item)}
			searchable
			searchBy="label"
			name="venueId"
			options={options}
			// options={venues.map((venue) => (
			// {
			// 	value: venue,
			// 	label: venue.venueName
			// }
			// ))}
			values={[]}
			onChange={(venue) => isSetVenue(venue)
			}
		/>
	);
};

VenueInputSelector.propTypes = {};

export default VenueInputSelector;
