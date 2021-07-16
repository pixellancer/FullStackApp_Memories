/* Back End Data Process */

/* bcrypt 加密， jwt 记住用户（可长期） */
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import UserDB from '../models/user.js'


/* Sign In */
/* 
    1. check Email if it exist
    2. check Password is correct
    3. response a token for user
*/
export const signin = async (req, res) => {
    const { email, password } = req.body
    try {
        /* check Email existed */
        const existedUser = await UserDB.findOne({ email })
        if (!existedUser) {
            return res.status(404).json({message: "User doesn't existed! Please Sign Up."})
        }

        /* check password correct */
        const isPasswordCorrect = await bcrypt.compare(password, existedUser.password)
        if (!isPasswordCorrect) {
            return res.status(404).json({message: "Invalid Password."})
        }

        /* generate and return json web token for user */
        // 2nd prop should be in env, 3rd is option prop
        const token = jwt.sign({ email: existedUser.email, id: existedUser._id }, 'test', {expiresIn: "1h"})
        
        res.status(200).json({result: existedUser, token})

    } catch (error) {
        res.status(500).json(error)
    }
}



/* Sign UP */
/* 
    1. Get all user data
    2. Serach user Email to check if exist
    3. 
*/
export const signup = async (req, res) => {
    const { firstName, lastName, email, password, confirmPassword } = req.body
    
    try {
        const existedUser = await UserDB.findOne({ email })
        if (existedUser) {
            return res.status(400).json({message: "User already exists!"})
        }

        if (password !== confirmPassword) {
            return res.status(400).json({message: "Password do not match!"})
            
        }

        // 2nd props (salt): difficulty level to hash password
        const hashPassword = await bcrypt.hash(password, 12)
        
        const result = await UserDB.create({
            email,
            password: hashPassword,
            name: `${firstName} ${lastName}`
        })

        const token = jwt.sign({email: result.email, id:result._id}, 'test', {expiresIn: "1h"})
        res.status(200).json({ result, token })

    } catch (error) {
        res.status(500).json({message: error})
    }
    
}