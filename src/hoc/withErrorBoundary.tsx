import React, { Component, ComponentType } from "react";
import { Box, Typography, Button } from "@mui/material";

export function withErrorBoundary<P>(WrappedComponent: ComponentType<P>) {
  return class ErrorBoundaryWrapper extends Component<P, { hasError: boolean }> {
    constructor(props: P) {
      super(props);
      this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
      return { hasError: true };
    }

    componentDidCatch(error: any, errorInfo: any) {
      console.error("Error caught in ErrorBoundary:", error, errorInfo);
    }

    handleRetry = () => {
      this.setState({ hasError: false });
    };

    render() {
      if (this.state.hasError) {
        return (
          <Box p={3} textAlign="center" bgcolor="#fff3f3" borderRadius={2} boxShadow={1}>
            <Typography variant="h6" color="error">
              Something went wrong.
            </Typography>
            <Typography variant="body2" color="textSecondary" mt={1}>
              Please try again.
            </Typography>
            <Button
              onClick={this.handleRetry}
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
            >
              Retry
            </Button>
          </Box>
        );
      }

      return <WrappedComponent {...this.props} />;
    }
  };
}
