import React from "react";
import { Box, Typography, Paper, Button, TextField, Card, CardMedia, CardContent } from "@mui/material";
import { useFetchWithCache } from "../hooks/useFetchWithCache";

export const FetchWithCacheDemo = () => {
  const [url, setUrl] = React.useState("https://dummyjson.com/products/1");
  const [fetchUrl, setFetchUrl] = React.useState<string | null>(null);
  const { data, loading, error } = useFetchWithCache(fetchUrl || "");

  return (
    <Box mt={2} display="flex" flexDirection="column" gap={2}>
      <TextField
        label="API URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        fullWidth
      />

      <Button variant="contained" onClick={() => setFetchUrl(url)}>
        Fetch Data
      </Button>

      {loading && <Typography>Loading...</Typography>}
      {error && <Typography color="error">Error: {error}</Typography>}

      {data && data.images && (
        <Card sx={{ display: "flex", gap: 2, mt: 2 }}>
          <CardMedia
            component="img"
            sx={{ width: 160, objectFit: "cover" }}
            image={data.images[0] || ""}
            alt={data.title}
          />
          <CardContent>
            <Typography variant="h6">{data.title}</Typography>
            <Typography variant="subtitle1" color="primary">
              Price: ${data.price}
            </Typography>
          </CardContent>
        </Card>
      )}
    </Box>
  );
};