import React, {useState} from 'react';
import Select from "react-dropdown-select";

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

		// NEEDS TO ASSIGN VALUES (TO STATE) FOR EVENTS
		function onChange(values) {
			console.log(values)
		}
]
	return (
		<div className="container">
			<h1>Export Page - Pending</h1>
			<Select
				multi
				create
				onCreateNew={(item) => console.log('%c New item created ', item)}
				options={dummyData.map(event => ({
					label: event.eventName,
					value: event.eventId
				}))}
				values={[]}
				onChange={(value) =>
					console.log(`%c > onChange  `, value)
				}
  			//onChange={(values) => this.onChange(values)}
			/>
		</div>
	);
};

Export.propTypes = {}

export default Export;
