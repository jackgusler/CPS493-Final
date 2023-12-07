const path = require("path");
const express = require("express");
require("dotenv").config();
const workoutController = require("./controllers/workouts");
const userController = require("./controllers/users");
const postController = require("./controllers/posts");
const {
  parseAuthorizationToken,
  requireUser,
} = require("./middleware/authorization");
const app = express();

const PORT = process.env.PORT ?? 3000;

app
  .use("/", express.static(path.join(__dirname, "../client/dist/")))
  .use(express.json())

  // CORS
  .use((req, res, next) => {
    const allowedOrigins = [
      "http://localhost:3000", // for local development
      "https://cps493final.onrender.com", // replace with your Render app URL
    ];

    const origin = req.headers.origin;

    if (allowedOrigins.includes(origin)) {
      res.setHeader("Access-Control-Allow-Origin", origin);
    }

    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.header("Access-Control-Allow-Credentials", "true");

    if (req.method === "OPTIONS") {
      return res.sendStatus(204); // No content for preflight requests
    }

    next();
  })

  .use(parseAuthorizationToken)

  .use("/api/v1/workouts", requireUser(), workoutController)
  .use("/api/v1/posts", requireUser(), postController)
  .use("/api/v1/users", userController)

  .get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/dist/index.html"));
  });

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err?.status || 500).json({ message: err?.message || err });
});

console.log("1: Trying to start server...");

app.listen(PORT, () => {
  console.log(`2: Server is running at http://localhost:${PORT}`);
});

console.log("3: End of file, waiting for requests...");
