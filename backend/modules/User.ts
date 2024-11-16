import { dbQuery } from "../database/database";

export class User
{
    username: string = "";
    password: string = "";
    admin: boolean = false;

    static async authenticate(username: string, password: string)
    {
        let sql = `select * from users where username = $1 and password = crypt($2, password);`
        let result = await dbQuery(sql, [username, password]);

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