import express from "express";
import cors from "cors";
import { initializeFirebase } from "./utils/firebase-config";
import router from "./routes/index"

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/v1", function (req, res) {
  res.send("Hello World!");
});

app.use("/api/v1", router);

const start = () => {
  try {
    initializeFirebase();
    return app.listen(process.env.PORT, () => {
      console.log(`REST API on ${process.env.PORT}`);
    });
  } catch (e) {
    console.error(e);
  }
};

const server = start();

export default server;
