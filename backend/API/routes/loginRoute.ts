import { Router } from "express";
import { Request, Response, NextFunction } from "express";
import { User } from "../../modules/User";

export const loginRoute = Router();

loginRoute.use(async (req: Request, res: Response, next: NextFunction) =>
{
    let authorization = req.get("Authorization")?.replace("Basic ", "");
    
    if (authorization)
    {
        let decoded = Buffer.from(authorization, "base64").toString("utf8");
        let loginSplitted: string[] = decoded.split(":");
        let username = loginSplitted[0];
        let password = loginSplitted[1];
        let successfulAuthentication = await User.authenticate(username, password);

        if (successfulAuthentication)
        {
            next();
            return;
        }
        else
        {
            return res.status(401).json({success: false, message: "Error: authentication failed. Check the username and password"});
        }
    }
    else
    {
        return res.status(401).json({success: false, message: "Error: The server didn't received the Authorizarion"});
    }
});

loginRoute.get("/checkLogin", async (req: Request, res: Response) =>
{
    return res.status(200).json({success: true, message: "Successful authentication!"});
});