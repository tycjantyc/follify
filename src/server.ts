import env from "./environment";
import express from "express";
import session from "express-session";
import cors from "cors";
import path from "path"
import initRoutes from "./routes/setup"
import log from "./logs"

global.appRoot = path.resolve(__dirname);

const app = express();
app.use(cors());
app.use(session({
  secret: process.env.SESSION_SECRET || process.exit(1), //TODO use Environment class
  saveUninitialized: true,
  resave: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

initRoutes(app, env);

app.listen(process.env.PORT, () => {
  log.info(`Follify back-end started on port ${process.env.PORT}`); //TODO use Environment class
})