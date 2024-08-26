import { Router } from "express";
import { createCustomer, deleteCustomer, getAllCustomers, getCustomersById, updateCustomers } from "../controllers/customers_controller";
import { authenticateToken } from "../middleware/authorization";

export const customersRoutes = Router();

//customers endpoints
customersRoutes.get('/getCustomers',  authenticateToken, getAllCustomers);
customersRoutes.get('/getCustomerbyid/:id',  authenticateToken, getCustomersById);
customersRoutes.post('/createCustomer',  authenticateToken, createCustomer);
customersRoutes.delete('/deleteCustomer/:id',  authenticateToken, deleteCustomer);
customersRoutes.put('/updateCustomer/:id',  authenticateToken, updateCustomers)