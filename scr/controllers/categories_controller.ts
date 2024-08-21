import pool from "../database/db_connect";
import { request, Response } from "express";
import { Request } from "express";
import { QueryResult } from "pg";

/**
 * Get All Data of Categories Table.
 * @param req 
 * @param res 
 * @returns Categories
 */
export const getCategories = async (req: Request, res:Response): Promise<Response>=>{
    try{
        const response: QueryResult = await pool.query('Select * From categories');
        return res.status(200).json(response.rows)
    }
    catch (error){
        console.error(error)
        return res.status(500).json('internal server error')
    }
};

/**
 * Get all data of categories table by id
 * @param req 
 * @param res 
 * @returns Categories by id
 */

export const getCategoriesById = async (req: Request, res: Response): Promise<Response> =>{
    const id = parseInt(req.params.id);
    
    try {
        const response: QueryResult =await pool.query('Select * FROM Categories WHERE category_id = $1',[id])
        return res.json(response.rows);
    } catch (error) {
        console.error(error);
        return res.status(500).json('internal Server Error');
    }
};

/* *
 * Create a new categorie.
 * @param req 
 * @param res 
 * @returns 
 */

export const createCategories = async (req: Request, res: Response): Promise<Response> => {
    const {categoryId, categoryName, categoryDescription} = req.body;

    if (categoryId !== null && categoryName !== null && categoryDescription !== null){
        try {
            await pool.query('INSERT INTO categories (category_id, category_name, description) values ($1, $2, $3)',
                [categoryId, categoryName, categoryDescription]
            );
            return res.status(201).json({
                message: 'Category created successfully',
                category: {
                    categoryId,
                    categoryName,
                    categoryDescription,
                }
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json('Internal Server Error');
        }
    } else {
        return res.status(500).json('Internal Server Error');
    }
};

/**
 * delete categories by id
 * @param req
 * @param res 
 * @resturns
 */

 export const deleteCategories = async (req: Request, res: Response): Promise<Response>=>{
    const id =parseInt(req.params.id);

    try {
        await pool.query('DELETE from categories WHERE category_id = $1', [id])
        return res.status(200).json(`The category ${id} was deleted succesfully`)
    } catch (error) {
        console.error(error);
        return res.status(500).json('internal Server Error');
        
    }
};

/**
 * Update Category By id
 * @param req
 * @param res
 * @returns
 */

export const updateCategory = async (req: Request, res:Response): Promise<Response>=>{
    
    const id = parseInt(req.params.id);
    const {categoryName,categoryDescription} =req.body;
        
    try {
            await pool.query(' UPDATE categories SET category_name = $1, description =$2 WHERE category_id =$3'
            ,[categoryName,categoryDescription,id]
        );
        return res.json({
            message: 'category succesfully Updated.',
            category: {
                id,
                categoryName,
                categoryDescription
            }
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json('internal Server Error');
    }
}