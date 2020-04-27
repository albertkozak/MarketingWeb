import React, {useState} from 'react';
import Select from "react-dropdown-select";
import InputSelector from '../components/forms/InputSelector'

const Export = (props) => {
	const {events, setEvents} = useState([]);

	// Add GET Request Here
	const dummyData = [
		{
				eventId: 1,
				eventName: "7-11 Unite",
				eventStartDateTime: "April 20th 1pm"
		},
		{
				eventId: 2,
				eventName: "Same Same But Different",
				eventStartDateTime: "May 5th 2pm"
		},
		{
				eventId: 3,
				eventName: "Egg & Rice Bowl",
				eventStartDateTime: "April 28th 12pm"
		},

		// Needs To Assign Values (To State) For Events
		function onChange(values) {
			console.log(values)
		}
]
	return (
		<div className="container">
			<h1>Export Page</h1>
			<div className="input-selector">
			<InputSelector data={dummyData} label={dummyData.eventName} value={dummyData.eventId}/>
			</div>
		</div>
	);
};

export default Export;
