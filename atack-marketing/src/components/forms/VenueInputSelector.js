import React, { useState } from 'react';
import Select from 'react-dropdown-select';
import { useHistory } from 'react-router-dom';

const VenueInputSelector = (props) => {
	// Refactor later for reusability - labels and values
	const [ venue, setVenue ] = useState('');

	const history = useHistory();

	function isSetVenue(value) {
		setVenue(value);
		console.log(venue);
	}

	function addVenue(venueName) {
		history.push('/addvenue', venueName.value);
		console.log(venueName.value);
	}

	return (
		<Select
			create
			placeholder="Add a venue"
			onCreateNew={(item) => addVenue(item)}
			// onCreateNew will route to add venue page
			options={props.data.map((data) => ({
				label: data.venueName,
				value: data.venueId
			}))}
			values={[]}
			onChange={(value) => isSetVenue(value)
			//console.log(`%c > onChange  `, value)
			}
			//onChange={(values) => this.onChange(values)} - pending function
		/>
	);
};

VenueInputSelector.propTypes = {};

export default VenueInputSelector;
