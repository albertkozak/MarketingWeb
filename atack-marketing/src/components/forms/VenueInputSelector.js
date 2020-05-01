import React, { useState } from 'react';
import Select from 'react-dropdown-select';
import { useHistory } from 'react-router-dom';
import VenueItem from '../venue/VenueItem'

const VenueInputSelector = (props) => {
	// Refactor later for reusability - labels and values
	const [ venue, setVenue ] = useState('');
	const venues = props.data

	const history = useHistory();

	function isSetVenue(venue) {
		setVenue(venue);
		console.log(venue)
		console.log(venue.venueName);
		props.parentCallback(venue)
	}

	function addVenue(venueName) {
		history.push('/addvenue', venueName.value);
		console.log(venueName.value);
	}

	// const options = [
	// 	props.data.map((data) => ({
	// 		venueId: data.venueId,
	// 		venueName: data.venueName,
	// 		website: data.website,
	// 	}))
	// ]

	return (
		<Select
			create
			placeholder="Add a venue"
			onCreateNew={(item) => addVenue(item)}
			searchable
			searchBy="label"
			// options={options => ({
			// 	value: options.venueId
			// })}
			options={venues.map((venue) => ({
				label: venue.venueName,
				value: venue.venueId
			}))}
			// labelField={options.venueName}
			// valueField={options.venueId}
			values={[]}
			onChange={(value) => isSetVenue(value)
			}
		/>
	);
};

VenueInputSelector.propTypes = {};

export default VenueInputSelector;
