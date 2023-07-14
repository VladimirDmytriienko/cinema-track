import { Switch, Typography } from '@mui/material';
import { useState } from 'react';

const Toggle = ({ handleTimeChange }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleChange = () => {
    setIsChecked(!isChecked);
    handleTimeChange(isChecked ? 'day' :  'week');
  };

  return (
    <div className="toggle-container">
      <div>
        <Switch
          checked={isChecked}
          onChange={handleChange}
          color="default"
          className="toggle-switch"
        />
      </div>

      <Typography
        variant="body1"
        component="span"
        color="textPrimary"
        sx={{ color: '#fff' }} 
      >
       <h2>Trending: {isChecked ? 'Week' :  'Day'}</h2> 
      </Typography>
    </div>
  );
};

export default Toggle;
