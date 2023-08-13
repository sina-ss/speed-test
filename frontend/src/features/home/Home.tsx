import React, { useState } from "react";
import { Button, Typography, CircularProgress, Box } from "@mui/material";

type TestStatus = "idle" | "downloading" | "uploading" | "pinging";

const Home: React.FC = () => {
  const [downloadSpeed, setDownloadSpeed] = useState<number | null>(null);
  const [uploadSpeed, setUploadSpeed] = useState<number | null>(null);
  const [ping, setPing] = useState<number | null>(null);
  const [status, setStatus] = useState<TestStatus>("idle");

  const startDownloadTest = async () => {
    setStatus("downloading");
    const startTime = Date.now();

    // Make the request to download data.
    const response = await fetch("http://localhost:3001/download");
    await response.text();

    const endTime = Date.now();
    const timeTaken = (endTime - startTime) / 1000; // seconds
    const speed = (10 * 8) / timeTaken; // 10MB data in Mbps

    setDownloadSpeed(speed);
    setStatus("idle");
  };

  const startUploadTest = async () => {
    setStatus("uploading");

    // Create a dummy payload of 10MB.
    const payload = new ArrayBuffer(10 * 1024 * 1024); // 10MB in bytes

    const startTime = Date.now();

    // Upload the dummy payload to the server.
    try {
      await fetch("http://localhost:3001/upload", {
        method: "POST",
        body: payload,
        headers: {
          "Content-Type": "application/octet-stream",
        },
      });

      const endTime = Date.now();
      const timeTaken = (endTime - startTime) / 1000; // seconds
      const speed = (10 * 8) / timeTaken; // Convert 10MB data to Mbps

      setUploadSpeed(speed);
    } catch (error) {
      console.error("Error during upload:", error);
      // Handle error, show user feedback, etc.
    } finally {
      setStatus("idle");
    }
  };

  const measurePing = async () => {
    const startTime = Date.now();

    try {
      await fetch("http://localhost:3001/api/ping");
      const endTime = Date.now();

      const pingValue = endTime - startTime;
      setPing(pingValue);
    } catch (error) {
      console.error("Error measuring ping:", error);
      // Handle error, show user feedback, etc.
    }
  };
  const startAllTests = async () => {
    await measurePing();
    await startDownloadTest();
    await startUploadTest();
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      style={{ padding: "20px" }}
    >
      <Typography variant="h4" gutterBottom>
        SpeedTest Clone
      </Typography>

      {(status === "downloading" ||
        status === "uploading" ||
        status === "pinging") && (
        <Box my={4}>
          <CircularProgress />
        </Box>
      )}

      {status === "idle" && (
        <Button
          variant="contained"
          size="large"
          onClick={startAllTests}
          style={{ margin: "20px 0" }}
        >
          Start Test
        </Button>
      )}

      {ping && <Typography variant="h6">Ping: {ping} ms</Typography>}
      {downloadSpeed && (
        <Typography variant="h3" gutterBottom>
          {downloadSpeed.toFixed(2)} Mbps
        </Typography>
      )}
      {uploadSpeed && (
        <Typography variant="h6">
          Upload: {uploadSpeed.toFixed(2)} Mbps
        </Typography>
      )}
    </Box>
  );
};

export default Home;