import React from "react";
import { Box, Typography, Button, TextField } from "@mui/material";

const compose = <T,>(...fns: ((arg: T) => T)[]) => (input: T): T =>
  fns.reduceRight((acc, fn) => fn(acc), input);

const double = (n: number) => n * 2;
const increment = (n: number) => n + 1;
const square = (n: number) => n * n;

export const FunctionCompositionDemo = () => {
  const [input, setInput] = React.useState<number>(1);
  const [result, setResult] = React.useState<number | null>(null);

  const composed = compose<number>(double, increment, square);

  const handleExecute = () => {
    const output = composed(input);
    setResult(output);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(1, Number(e.target.value));
    setInput(value);
    setResult(null);
  };

  return (
    <Box mt={2} display="flex" flexDirection="column" gap={2}>
        <TextField
            label="Input Value"
            type="number"
            value={input}
            onChange={handleInputChange}
            inputProps={{ min: 1 }}
        />

        <Button variant="contained" onClick={handleExecute}>
            Compose
        </Button>

        <Typography>
            <strong>Function:</strong> double(increment(square(x)))
        </Typography>
        <Typography>
            <strong>Input:</strong> {input}
        </Typography>
        {result !== null && (
            <Typography>
            <strong>Result:</strong> {result}
            </Typography>
        )}
    </Box>
  );
};
