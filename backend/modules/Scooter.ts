import { dbQuery } from "../database/database";

export class Scooter
{
    rented: boolean = false;

    static async getScooters()
    {
        let sql = `select * from scooters order by id;`;
        let result;

        try
        {
            result = await dbQuery(sql);
        }
        catch(error)
        {
            return({success: false, message: "An error occured while connecting to the database."}); 
        }
        
        if (result.rows.length > 0)
        {
            return result.rows;
        }
        else
        {
            return null;
        }
    }

    static async rentScooter(id: number)
    {
        let sql = `update scooters set rented = true where id = $1;`;
        let result;

        try
        {
            result = await dbQuery(sql, [id]);
        }
        catch(error)
        {
            return({success: false, message: "An error occured while connecting to the database."}); 
        }
        
        if (result.rowCount)
        {
            return ({success: true, message: "Scooter ID = " + id + "rented successfully."});
        }
        else
        {
            return ({success: false, message: "Error: It wasn't possible to rent this scooter"});
        }
    }

    static async returnScooter(id: number)
    {
        let sql = `update scooters set rented = false where id = $1;`;
        let result;

        try
        {
            result = await dbQuery(sql, [id]);
        }
        catch(error)
        {
            return({success: false, message: "An error occured while connecting to the database."}); 
        }

        if (result.rowCount)
        {
            return ({success: true, message: "Scooter ID = " + id + "returned successfully."});
        }
        else
        {
            return ({success: false, message: "Error: It wasn't possible to return this scooter"});
        }
    }
}