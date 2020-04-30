import React from 'react'
 
const Switch = ({isOn, handleToggle}) => {
    return (
        <div className='switchContainer'>
            <label className="switch">
            <input type="checkbox" value={isOn} onChange={handleToggle} />
            <div className="slider"></div>
            </label>
        </div>
    )
}

export default Switch