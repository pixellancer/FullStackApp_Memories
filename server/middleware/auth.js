/* 
                Authentication Middleware
    This file implement operations for authorized user.
    Authoritied user is allowed to create, like, delete, update posts.
 */



import jwt from 'jsonwebtoken'


/*  
    Check User token(identification) is correct
    
    USE CASE: like a post
    click the like button => auth middle (if correct then NEXT) => like controller
*/
const authMiddleware = async(req, res, next) =>{
    try {
        // console.log(req, req.headers);
        const token = req.headers.authorization.split(" ")[1]

        const isCustomAuth = token.length < 500
        let decodedData

        if (token && isCustomAuth) {
            // 2nd props is the secret verification code which used in creating token (controller signUp & signIn)
            decodedData = jwt.verify(token, 'test')

            req.userId = decodedData?.id
        } else {
            decodedData = jwt.decode(token)

            // "sub" is the style of google OAuth naming user ID
            req.userId = decodedData?.sub
        }

        next()

    } catch (error) {
        console.log(error);
    }
}


export default authMiddleware