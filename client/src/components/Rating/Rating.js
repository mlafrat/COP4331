import React from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import MicrowaveIcon from '@mui/icons-material/Microwave';
import TextField from '@mui/material/TextField';

function Ratings() {
  const [value, setValue] = React.useState(2);

  return (
    <Box
      sx={{
        '& > legend': { mt: 2 },
      }}
    >
    <div>
      <Typography component="legend">1 Star = Terrible, 5 Stars = Knightrolicious</Typography>
      <Rating
        name="star-rating"
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        icon={<MicrowaveIcon fontSize="inherit" />}
        emptyIcon={<MicrowaveIcon fontSize="inherit" />}
      />
    </div>
     <TextField
        id="my-review"
        label="Update Review"
        multiline
        fullWidth
        rows={4}
        placeholder="Update your review here (maybe we have this filled in already?"
    />
    </Box>
  );
}

export default Ratings;