import React, { useState } from 'react';
import Select from 'react-dropdown-select';

const InputSelector = (props) => {
	// Refactor later for reusability - labels and values
	return (
		<Select
			multi
			create
			onCreateNew={(item) => console.log('%c New item created ', item)}
			options={props.data.map((data) => ({
				label: data.eventName,
				value: data.eventId
			}))}
			values={[]}
			onChange={(value) => console.log(`%c > onChange  `, value)}
			//onChange={(values) => this.onChange(values)} - pending function
		/>
	);
};

InputSelector.propTypes = {};

export default InputSelector;
