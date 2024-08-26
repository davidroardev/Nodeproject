import express, { Router } from "express";
import { getCategories, getCategoriesById, createCategories, deleteCategories, updateCategory } from "./controllers/categories_controller";
import {generateToken} from "./controllers/user_controllers";
import {authenticateToken} from "./middleware/authorization";
import { errorHandler } from "./middleware/error";
import { createCustomer, deleteCustomer, getAllCustomers, getCustomersById, updateCustomers } from "./controllers/customers_controller";
require ('dotenv').config();

const app = express();
const port = process.env.PORT


const categoriesRoutes = Router();
const customersRoutes = Router();
const userRoutes = Router();

categoriesRoutes.get('/categories',  authenticateToken, getCategories);
categoriesRoutes.get('/getCategoriesById/:id',  authenticateToken, getCategoriesById);
categoriesRoutes.post('/createCategories', authenticateToken,  createCategories);
categoriesRoutes.delete('/deleteCategories/:id',  authenticateToken, deleteCategories)
categoriesRoutes.put('/updateCategories/:id',  authenticateToken, updateCategory)
userRoutes.post('/api/login', generateToken);

//customers endpoints
customersRoutes.get('/getCustomers', getAllCustomers);
customersRoutes.get('/getCustomerbyid/:id', getCustomersById);
customersRoutes.post('/createCustomer', createCustomer);
customersRoutes.delete('/deleteCustomer/:id', deleteCustomer);
customersRoutes.put('/updateCustomer/:id', updateCustomers)


app.use(express.json());
app.use(errorHandler);
app.use(categoriesRoutes);
app.use(userRoutes);
app.use(customersRoutes);


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  });
























































































