import { Express } from "express";
import * as express from "express";
import * as cors from "cors";
import { loginRoute } from "../API/routes/loginRoute";
import { scooterRoute } from "./routes/scooterRoute";

let server: Express = express();
const serverport = 3500;

server.use(cors());
server.use(express.json());
server.use(loginRoute);
server.use(scooterRoute);

server.listen(serverport, () =>
{
    console.log("Server started on port " + serverport);
});
