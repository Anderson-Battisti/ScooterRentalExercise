import { dbQuery } from "../database/database";

export class User
{
    username: string = "";
    password: string = "";
    admin: boolean = false;

    static async authenticate(username: string, password: string)
    {
        let sql = `select * from users where username = $1 and password = crypt($2, password);`;
        let result;

        try
        {
            result = await dbQuery(sql, [username, password]);
        }
        catch(error)
        {
           return({success: false, message: "An error occured while connecting to the database."}); 
        }
        
        if (result.rows.length > 0)
        {
            return true;
        }
        else
        {
            return false;
        }
    }
}