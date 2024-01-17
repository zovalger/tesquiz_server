import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config";

export function createAccessToken(payload: any){

    return new Promise((resolve:any, reject:any) =>{
        jwt.sign (
            payload, 
            TOKEN_SECRET || "", 
          {
            expiresIn: "1h"
          },
          (err, token) => {
            if(err) reject(err)
            resolve(token)
          })
    }) 


}
