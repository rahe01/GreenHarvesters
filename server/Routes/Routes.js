import { logout } from '../Controller/controller';

const express = require('express')


const router = express.Router();

router.get("/signup", signup )

router.get("/login" , login)

router.get("/logout" , logout) 
 


export default router