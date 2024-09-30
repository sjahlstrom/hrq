
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import React from 'react'

interface CreateSliderProps {
   value: number
   onChange: (value: number | number[]) => void
}

const sliderStyles = {
   rail: {
      backgroundColor: 'green',
      height: 10,
      borderRadius: 5,
   },
   track: {
      backgroundColor: 'darkblue',
      height: 10,
   },
   handle: {
      borderColor: 'orchid',
      height: 24,
      width: 24,
      marginLeft: -8,
      marginTop: -7,
      backgroundColor: 'blue',
   },
}

const ForwardSlider: React.FC<CreateSliderProps> = ({
   value,
   onChange,
}) => {

   return (
      <div className="w-fill m-30 mb-2 ml-10 flex">
         <Slider
            range
            min={0}
            max={30}
            value={value}
            onChange={onChange}
            onChangeComplete={() => onChange(value)} // Ensure state is updated on interaction end
            styles={sliderStyles}
         />
      </div>
   )
}

export default ForwardSlider
