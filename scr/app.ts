import express, { Router } from "express";
import { getCategories, getCategoriesById, createCategories, deleteCategories, updateCategory } from "./controllers/categories_controller";

require ('dotenv').config();

const app = express();
const port = process.env.PORT


const categoriesRoutes = Router();
app.use(express.json());

categoriesRoutes.get('/categories', getCategories);
categoriesRoutes.get('/getCategoriesById/:id', getCategoriesById);
categoriesRoutes.post('/createCategories', createCategories);
categoriesRoutes.delete('/deleteCategories/:id', deleteCategories)
categoriesRoutes.put('/updateCategories/:id', updateCategory)



app.use(categoriesRoutes);


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  });
























































































