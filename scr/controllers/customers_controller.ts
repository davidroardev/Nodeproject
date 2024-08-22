import pool from "../database/db_connect";
import { Request, Response } from "express";
import { Query, QueryResult } from "pg";

/**
 * Funcion de traer 
 * todo de la tabla 
 * customers
 */

export const getAllCustomers = async (req: Request , res: Response): Promise<Response>=>{
    try {
        const response: QueryResult = await pool.query('SELECT * FROM customers');
        return res.status(200).json(response.rows);
    } catch (error) {
        console.error(error);
        return res.status(500).json('Internal server error');
        
    }
};

export const getcustomerById =async (req: Request, res: Response): Promise <Response> =>{
    const id = req.params.body;
    try {
        const response: QueryResult = await pool.query('SELECT * FROM customers WHERE customer_id = $1', [id]);
        return res.status(200).json(response.rows);
    } catch (error) {
        console.error(error);
        return res.status(500).json('Internal Server Error');
    }
};


export const createCustomer = async (req: Request, res: Response): Promise <Response> =>{
    const {customerId, companyName, contactName, contactTitle,
    address, postalCode, city, region, country, phone, fax}= req.body;
    
    if (customerId !== null && companyName !== null && contactName !== null &&
        address !== null && city !== null && country !== null && phone !== null){

            try {
                await pool.query ('INSERT INTO customers (customer_id, company_name, contact_name, contact_title, address, city, region, postal_code, country, phone, fax) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11);'
                    , [customerId, companyName, contactName, contactTitle, address, city, region, postalCode, country, phone,fax]);
                return res.status(201).json({
                    message: 'Customer created successfully',
                    category: {
                        customerId,
                        companyName,
                        contactName,
                        contactTitle,
                        address,
                        city,
                        region,
                        postalCode,
                        country,
                        phone,
                        fax,
                    }
                });
            } catch (error) {
                console.error(error);
                return res.status(500).json('Internal server error');
            }
        } else{
            return res.status(500).json('internal server error')
        }
};

export const deleteCustomer = async (req: Request, res: Response): Promise<Response> => {
    const id = req.params.body
    if(id !== null){

        try {
            await pool.query('DELETE FROM customers WHERE customer_id= $1', [id]);
            return res.status(200).json(`The customer ${id} was deleted successfully`);
        } catch (error) {
            console.error(error);
            return res.status(500).json('internal server error')
        }
    } else {
        return res.status(500).json('Id not found')
    }
};

export const updateCustomers = async (req: Request, res:Response): Promise<Response> =>{
    const customerId = req.params.id;
    const {companyName, contactName, contactTitle,
        address, postalCode, city, region, country, phone, fax} = req.body;
    if(customerId !== null && companyName !== null && contactName !== null &&
        address !== null && city !== null && country !== null && phone !== null)
        {
            try {
                await pool.query('UPDATE customers SET company_name= $1, contact_name =$2, contact_title= $3, address = $4, city = $5, region= $6, postal_code = $7, country= $8, phone =$9, fax= $10 WHERE customer_id = $11',
                    [companyName, contactName, contactTitle, address, city, region,postalCode, country, phone, fax, customerId]);
                    return res.json({
                        message: 'Customer Successfully Updated.',
                    category: {
                        customerId,
                        companyName,
                        contactName,
                        contactTitle,
                        address,
                        city,
                        region,
                        postalCode,
                        country,
                        phone,
                        fax,
                    },
                    });
            } catch (error) {
                console.error(error);
                return res.status(500).json('Internal Server Error');
            }
        } else {
            return res.status(500).json('Not Null')
        }
};