import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"

export interface IRequestUser extends Request {
  userId?: number
  adminId?: number
}

export const authToken = (req: IRequestUser, res: Response, next: NextFunction): void | null => {
  const authHeader = req.headers["authorization"]
  const token = authHeader && authHeader.split(" ")[1]

  // Checking if token is valid
  jwt.verify(`${token}`, `${process.env.TOKEN_SECRET}`, (err, decoded) => {
    if (err) {
      res.json({ message: "Invalid token." })
      return
    }

    decoded = decoded as IRequestUser

    req.userId = decoded.userId
    req.adminId = decoded.adminId

    next()
  })
  
}
