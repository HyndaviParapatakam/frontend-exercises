import React, { useState } from "react";
import { useRateLimiter } from "../hooks/useRateLimiter";
import { Button, Typography, Box, TextField } from "@mui/material";

export const RateLimiterDemo = () => {
  const [limit, setLimit] = useState(3);
  const schedule = useRateLimiter(limit);
  const [count, setCount] = useState(0);

  const handleClick = async () => {
    await schedule(() => {
      setCount(prev => prev + 1);
      console.log("Executed at", new Date().toISOString());
    }, 500);
  };

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <TextField
        label="Rate Limit (N per second)"
        type="number"
        value={limit}
        onChange={e => setLimit(Number(e.target.value) || 1)}
      />
      <Button variant="contained" color="primary" onClick={handleClick}>
        Schedule Task
      </Button>
      <Typography>Executed count: {count}</Typography>
    </Box>
  );
};
