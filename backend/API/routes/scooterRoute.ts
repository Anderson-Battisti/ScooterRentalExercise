import { Router, Request, Response } from "express";
import { Scooter } from "../../modules/Scooter";

export const scooterRoute = Router()

scooterRoute.get("/listScooters", async (req: Request, res: Response) =>
{
    let scooters = await Scooter.getScooters();

    if (scooters != null)
    {
        return res.status(200).json({success: true, scooters});
    }
    else
    {
        return res.status(404).json({success: false, message: "There aren't any scooters in the database."});
    }
});

scooterRoute.put("/rentScooter", async (req: Request, res: Response) =>
{
    let id = Number(req.body.id);
    let rented = await Scooter.rentScooter(id);

    if (rented.success)
    {
        return res.status(200).json({success: true, message: "Scooter rented successfuly."});
    }
    else
    {
        return res.status(500).json({success: false, message: "Internal server error: It wasn't possible to rent the scooter"});
    }
});

scooterRoute.put("/returnScooter", async (req: Request, res: Response) =>
    {
        let id = Number(req.body.id);
        let returned = await Scooter.returnScooter(id);
    
        if (returned.success)
        {
            return res.status(200).json({success: true, message: "Scooter returned successfuly."});
        }
        else
        {
            return res.status(500).json({success: false, message: "Internal server error: It wasn't possible to returned the scooter"});
        }
    });