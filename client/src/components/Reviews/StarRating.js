import React, { useState } from 'react';
import MicrowaveIcon from '@mui/icons-material/Microwave';
import MicrowaveOutlinedIcon from '@mui/icons-material/MicrowaveOutlined';


function StarRating({ onRate, rating }) {
    const [hoverRating, setHoverRating] = useState(0);

    const handleMouseEnter = (starRating) => {
        setHoverRating(starRating);
    };

    const handleMouseLeave = () => {
        setHoverRating(0);
    };

    return (
        <>
            {[1, 2, 3, 4, 5].map((star) => {
                const fill = star <= (hoverRating || rating);
                return (
                    <span
                        key={star}
                        onMouseEnter={() => handleMouseEnter(star)}
                        onMouseLeave={handleMouseLeave}
                        onClick={() => onRate(star)}
                        style={{ cursor: 'pointer', color: 'goldenrod',}}
                    >
            {fill ? <MicrowaveIcon /> : <MicrowaveOutlinedIcon />}
          </span>
                );
            })}
        </>
    );
}

export default StarRating;
