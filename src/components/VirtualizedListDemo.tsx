import React, { Component, JSX, Profiler, ProfilerOnRenderCallback } from "react";
import { FixedSizeList as List, ListChildComponentProps } from "react-window";
import { Box, Typography } from "@mui/material";
import { withDataFetching } from "../hoc/withDataFetching";

interface Props {
  data: any;
  loading: boolean;
  error: string;
  rowRenderer: (props: ListChildComponentProps) => JSX.Element;
}

class VirtualizedListContent extends Component<Props, { profileStats: any }> {
  constructor(props: Props) {
    super(props);
    this.state = {
      profileStats: null
    };
  }

  handleProfilerRender: ProfilerOnRenderCallback = (id, phase, actualDuration, baseDuration) => {
    const currentStats = this.state.profileStats;
    const isSame =
      currentStats &&
      currentStats.actualDuration === actualDuration &&
      currentStats.baseDuration === baseDuration &&
      currentStats.phase === phase;

    if (!isSame) {
      this.setState({
        profileStats: { id, phase, actualDuration, baseDuration }
      });
    }
  };

  render() {
    const { data, loading, error, rowRenderer } = this.props;
    const { profileStats } = this.state;

    const largeList = data?.products
      ? Array.from({ length: 10000 }, (_, i) => ({
          ...data.products[i % data.products.length],
          id: i + 1,
          title: `${data.products[i % data.products.length].title} [${i + 1}]`
        }))
      : [];

    return (
      <Profiler id="VirtualizedListDemo" onRender={this.handleProfilerRender}>
          {loading && <Typography>Loading...</Typography>}
          {error && <Typography color="error">Error: {error}</Typography>}

          {profileStats && (
            <Box mb={2}>
              <Typography variant="subtitle1">Profiler Info:</Typography>
              <Typography>Phase: {profileStats.phase}</Typography>
              <Typography>
                Actual render time: {profileStats.actualDuration.toFixed(2)}ms
              </Typography>
              <Typography>
                Estimated without memoization: {profileStats.baseDuration.toFixed(2)}ms
              </Typography>
            </Box>
          )}

          {largeList.length > 0 && (
            <Box height={400}>
              <List
                height={400}
                width="100%"
                itemCount={largeList.length}
                itemSize={40}
                itemData={largeList}
              >
                {rowRenderer}
              </List>
            </Box>
          )}
      </Profiler>
    );
  }
}

const VirtualizedListWrapper = () => {
  const rowRenderer = React.useCallback(({ index, style, data }: ListChildComponentProps) => {
    const item = data[index];
    return (
      <Box
        style={{
          ...style,
          display: "flex",
          alignItems: "center",
          borderBottom: "1px solid #eee",
          padding: "0 16px",
          backgroundColor: index % 2 === 0 ? "#fafafa" : "#fff"
        }}
      >
        <Typography variant="body2">
          #{index + 1}: {item.title}
        </Typography>
      </Box>
    );
  }, []);

  const EnhancedComponent = withDataFetching(
    (props) => <VirtualizedListContent {...props} rowRenderer={rowRenderer} />, 
    "https://dummyjson.com/products?limit=100"
  );

  return <EnhancedComponent />;
};

export const VirtualizedListDemo = VirtualizedListWrapper;
