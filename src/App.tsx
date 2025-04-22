import React from "react";
import { RateLimiterDemo } from "./components/RateLimiterDemo";
import { RequiredKeysDemo } from "./components/RequiredKeysDemo";
import { FunctionCompositionDemo } from "./components/FunctionCompositionDemo";
import { FetchWithCacheDemo } from "./components/FetchWithCacheDemo";
import { VirtualizedListDemo } from "./components/VirtualizedListDemo";
import { withErrorBoundary } from "./hoc/withErrorBoundary"
import { Box, Container, Typography, Paper } from "@mui/material";
import { BrowserRouter } from "react-router-dom";

const ExercisesApp = () => {
  const VirtualizedListWithBoundary = withErrorBoundary(VirtualizedListDemo);
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Frontend Coding Exercises
      </Typography>

      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          1.1 Async Programming & Event Loop
        </Typography>
        <RateLimiterDemo />
      </Paper>

      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          1.2 RequiredKeys Utility Type
        </Typography>
        <RequiredKeysDemo />
      </Paper>

      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          1.3 Function Composition & Closures 
        </Typography>
        <FunctionCompositionDemo />
      </Paper>

      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          3.2 Custom Hooks & useMemo/useCallback
        </Typography>
        <FetchWithCacheDemo />
      </Paper>

      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
        3.2 Performance Optimization & Virtualized Lists
        </Typography>
        <VirtualizedListWithBoundary />
      
      </Paper>

      {/* More exercises can go here */}
    </Container>
  // <div><h3>Remote App Loaded (Test OK)</h3></div>
  );
}

export default ExercisesApp;