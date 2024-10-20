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
        borderColor: '#ff0000',
        height: 24,
        width: 24,
        marginLeft: -8,
        marginTop: -7,
        backgroundColor: '#47201a',
    },
}

interface ReverseSliderProps {
    value: number
    onChange: (value: number) => void
}

const ReverseSlider: React.FC<ReverseSliderProps> = ({ value, onChange }) => {
    // Transform the value from 0-30 to 30-0
    const handleSliderChange = (sliderValue: number | number[]) => {
        if (typeof sliderValue === 'number') {
            onChange(30 - sliderValue)
        }
    }

    return (
        <div className="w-full m-8 mb-2 flex">
            <Slider
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