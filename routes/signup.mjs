import express from 'express'
import client from '../mongodb.mjs'

import 'dotenv/config'
import bcrypt from 'bcrypt';
import Swal from 'sweetalert2';

const db = client.db("crud")
const col = db.collection("users")
const router = express.Router()

router.post('/signup',async (req,res)=>{
   
  
        try{
       
        let {password, email, firstName, lastName} = req.body
const result = await col.findOne({email: email})

    const hashPassword =  await   bcrypt.hash(password, 10);
    if(!result){

        const insertUser = await col.insertOne({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: hashPassword,
        })
        res.status(200).send({
            message: "Signup Successful", user: insertUser 
        })
    }else{
        res.status(400).send({
            message: "User already exists with this email"
        })
    }
    }catch(e){
        console.log(e)
        res.status(401).send({
            message: e.message
        })
    }
}

)

export default router