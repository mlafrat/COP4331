import React, { useState } from 'react';
import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';

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
                        style={{ cursor: 'pointer' }}
                    >
            {fill ? <StarIcon /> : <StarOutlineIcon />}
          </span>
                );
            })}
        </>
    );
}

export default StarRating;
