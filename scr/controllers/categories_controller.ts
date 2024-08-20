import pool from "../database/db_connect";
import { Response } from "express";
import { Request } from "express";
import { QueryResult } from "pg";

export const getCategories = async (req: Request, res:Response): Promise<Response>=>{
    try{
        const response: QueryResult = await pool.query('Select * From categories');
        return res.status(200).json(response.rows)
    }
    catch (error){
        console.error(console)
        return res.status(500).json('internal server error')
    }
};