
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import React from 'react'

interface CreateSliderProps {
   value: number
   onChange: (value: number | number[]) => void
}

const sliderStyles = {
   rail: {
      backgroundColor: 'darkblue',
      height: 10,
      borderRadius: 5,
   },
   track: {
      backgroundColor: 'shadow-blue',
      height: 10,
   },
   handle: {
      borderColor: 'yellow',
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
            step={1}
            min={1}
            max={30}
            value={value}
            onChange={onChange}
            styles={sliderStyles}
         />
      </div>
   )
}

export default ForwardSlider
