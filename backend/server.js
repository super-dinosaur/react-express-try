const express = require("express");
const { exec } = require("child_process");
const path = require("path");
const cors = require("cors");

const app = express();

// 添加这些调试信息
console.log("Starting server...");

app.use(
  cors({
    origin: "http://localhost:3000",
  }),
);

app.use(express.json());

// 测试路由
app.get("/", (req, res) => {
  res.json({ message: "Server is working!" });
});

app.get("/api/health", (req, res) => {
  console.log("Health check requested");
  res.json({ message: "Backend server is running!" });
});

app.post("/api/execute-script", (req, res) => {
  const scriptPath = path.join(__dirname, "scripts", "demo-script.sh");

  console.log("User clicked button - executing shell script...");

  exec(`bash ${scriptPath}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing script: ${error}`);
      return res.status(500).json({
        success: false,
        error: error.message,
      });
    }

    if (stderr) {
      console.error(`Script stderr: ${stderr}`);
    }

    console.log(`Script output: ${stdout}`);

    res.json({
      success: true,
      output: stdout,
      message: "Shell script executed successfully!",
      timestamp: new Date().toISOString(),
    });
  });
});

const PORT = process.env.PORT || 5002;

// 添加错误处理
const server = app.listen(PORT, () => {
  console.log(`🚀 Express server running on http://localhost:${PORT}`);
  console.log(
    `📁 Script location: ${path.join(__dirname, "scripts", "demo-script.sh")}`,
  );
  console.log("Server is ready to accept requests...");
});

// 防止服务器意外退出
server.on("error", (err) => {
  console.error("Server error:", err);
});

process.on("SIGTERM", () => {
  console.log("SIGTERM received, shutting down gracefully");
  server.close(() => {
    console.log("Process terminated");
  });
});

module.exports = app;
