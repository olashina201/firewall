import express, { Response, Request } from "express";
import {connect} from "./DB/connect";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes";

const app = express();
dotenv.config()

connect();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());
app.use((req: Request, res: Response, next: any) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "*");
  //res.header("Content-type", "text/plain");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});


app.get("/", async (_req: Request, res: Response) => {
  res.send({ status: 200, message: "server up and running" });
});

// routes
app.use("/api", router);

const port: string | number = process.env.PORT || 8080;

app.listen(port, () => {
  return console.log(`Server is running on port ${port}`);
});
