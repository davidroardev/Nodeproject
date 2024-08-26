import { Router } from "express";
import { createCategories, deleteCategories, getCategories, getCategoriesById, updateCategory } from "../controllers/categories_controller";
import { authenticateToken } from "../middleware/authorization";


export const categoriesRoutes = Router();

categoriesRoutes.get('/categories',  authenticateToken, getCategories);
categoriesRoutes.get('/getCategoriesById/:id',  authenticateToken, getCategoriesById);
categoriesRoutes.post('/createCategories', authenticateToken,  createCategories);
categoriesRoutes.delete('/deleteCategories/:id',  authenticateToken, deleteCategories)
categoriesRoutes.put('/updateCategories/:id',  authenticateToken, updateCategory)