import React from 'react'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'

const sliderStyles = {
    rail: {
        backgroundColor: '#e44f26',
        height: 10,
        borderRadius: 5,
    },
    track: {
        backgroundColor: 'darkblue',
        height: 10,
    },
    handle: {
        borderColor: '#f0966a',
        height: 24,
        width: 24,
        marginLeft: -8,
        marginTop: -7,
        backgroundColor: '#7892be',
    },
}

// @ts-ignore
const ReverseSlider = ({ value, onChange }) => {
    // Transform the value from 0-30 to 30-0
    const handleSliderChange = (sliderValue: number) => {
        onChange(30 - sliderValue)
    }

    return (
        <div className="w-fill m-30 mb-2 ml-10 flex">
            <Slider
                range
                min={0}
                max={30}
                value={30 - value} // Transform to match slider's position
                onChange={handleSliderChange}
                onChangeComplete={() => onChange(value)} // Ensure state is updated on interaction end

                styles={sliderStyles}
            />
        </div>
    )
}

export default ReverseSlider
