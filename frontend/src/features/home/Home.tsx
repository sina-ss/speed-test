import React, { useState } from "react";
import { Button, Typography, CircularProgress, Box } from "@mui/material";
import SpeedTestButton from "./SpeedTestButton";

interface SpeedTestProps {}

const SpeedMetrics: React.FC<{
  ping: number;
  download: number;
  upload: number;
}> = ({ ping, download, upload }) => {
  return (
    <Box
      display="flex"
      flexDirection="row"
      justifyContent="space-around"
      width="100%"
    >
      <Box>
        <Typography variant="h5">Ping</Typography>
        <Typography variant="h6">{ping} ms</Typography>
      </Box>
      <Box>
        <Typography variant="h5">Download</Typography>
        <Typography variant="h6">{download.toFixed(2)} Mbps</Typography>
      </Box>
      <Box>
        <Typography variant="h5">Upload</Typography>
        <Typography variant="h6">{upload.toFixed(2)} Mbps</Typography>
      </Box>
    </Box>
  );
};

const SpeedIndicator: React.FC<{ speed: number }> = ({ speed }) => {
  const normalizedSpeed = speed / 10; // Assuming 100Mbps is the max value and represents 100%.

  return (
    <Box position="relative" width="200px" height="100px">
      <CircularProgress
        variant="determinate"
        value={normalizedSpeed * 100}
        size="200px"
        thickness={2}
        sx={{
          color: "#f44", // You can adjust the color
          transform: "rotate(-120deg)",
          position: "absolute",
          bottom: 0,
          left: 0,
          circle: {
            clipPath: "polygon(50% 50%, 100% 50%, 100% 100%, 0% 100%)", // Use clipPath to create the semi-circle effect
          },
        }}
      />
      <Typography
        variant="h6"
        component="div"
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        {speed.toFixed(2)} Mbps
      </Typography>
    </Box>
  );
};

const Home: React.FC<SpeedTestProps> = () => {
  const [downloadSpeed, setDownloadSpeed] = useState<number | null>(null);
  const [uploadSpeed, setUploadSpeed] = useState<number | null>(null);
  const [ping, setPing] = useState<number | null>(null);
  const [status, setStatus] = useState<string>("idle"); // could use "idle" | "downloading" | "uploading" | "pinging"
  const [error, setError] = useState<string | null>(null);
  const [isTesting, setIsTesting] = useState(false);
  const [testCompleted, setTestCompleted] = useState(false);

  const startDownloadTest = async () => {
    try {
      setStatus("downloading");

      let receivedBytes = 0;
      const startTime = Date.now();
      let lastUpdateTime = startTime;

      const response = await fetch("http://localhost:3000/download");
      const reader = response.body!.getReader();

      const measureSpeed = async () => {
        const { value, done } = await reader.read();

        if (done) {
          setStatus("idle");
          return;
        }

        const currentTime = Date.now();
        const deltaTime = (currentTime - lastUpdateTime) / 1000;
        receivedBytes += value.length;

        const speed = (value.length * 8) / (deltaTime * 1024 * 1024); // in Mbps for the last second

        setDownloadSpeed(speed);
        lastUpdateTime = currentTime;

        setTimeout(measureSpeed, 1000); // Update every second
      };

      measureSpeed();
    } catch (error) {
      console.error("Error during download:", error);
      setError("Download test failed. Please try again.");
    } finally {
      setStatus("idle");
    }
  };

  const startUploadTest = async () => {
    setStatus("uploading");

    // Create a dummy payload of 10MB.
    const payload = new ArrayBuffer(10 * 1024 * 1024); // 10MB

    const startTime = Date.now();

    try {
      await fetch("http://localhost:3000/upload", {
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
      setError("Upload test failed. Please try again.");
    } finally {
      setStatus("idle");
    }
  };

  const measurePing = async () => {
    setStatus("pinging");
    const startTime = Date.now();
    try {
      await fetch("http://localhost:3000/ping");
      const endTime = Date.now();
      setPing(endTime - startTime);
    } catch (error) {
      console.error("Error measuring ping:", error);
      setError("Failed to measure ping. Please try again.");
    }
    setStatus("idle");
  };

  const startAllTests = async () => {
    setIsTesting(true);
    await measurePing();
    await startDownloadTest();
    await startUploadTest();
    setIsTesting(false);
    setTestCompleted(true); // set the testCompleted to true once all tests are finished
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      bgcolor="background.default" // Adjust the background color
      sx={{ padding: "20px" }}
    >
      <Typography variant="h3" gutterBottom>
        Speed Test
      </Typography>

      {error && (
        <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
          color="error.main"
          my={2}
        >
          <Typography variant="body1">{error}</Typography>
          {/* Optionally, add a Retry button next to the error message */}
          <Button variant="text" color="error" onClick={startAllTests}>
            Retry
          </Button>
        </Box>
      )}

      {(status === "downloading" ||
        status === "uploading" ||
        status === "pinging") && (
        <Box my={4}>
          <CircularProgress color="primary" size={60} />
        </Box>
      )}

      {!isTesting && status === "idle" && !testCompleted && (
        <SpeedTestButton startAllTests={startAllTests} />
      )}

      {isTesting &&
        ping !== null &&
        downloadSpeed !== null &&
        uploadSpeed !== null && (
          <>
            <SpeedMetrics
              ping={ping}
              download={downloadSpeed}
              upload={uploadSpeed}
            />
            <SpeedIndicator speed={downloadSpeed} />
          </>
        )}
    </Box>
  );
};

export default Home;
