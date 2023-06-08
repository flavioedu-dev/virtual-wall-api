import { usuarios } from "@prisma/client"
import { UserRepository } from "../repositories/UserRepository"
import { HttpResponse } from "./protocols"
import * as EmailValidator from "email-validator"

export const UserController = {
  async getAll(): Promise<HttpResponse<usuarios[]>> {
    try {
      const users = await UserRepository.getAllUsers()
      // Check if any failure occurred
      if (!users) {
        return {
          statusCode: 404,
          body: "Users not found.",
        }
      }

      // Getting all users sucessfully
      return {
        statusCode: 200,
        body: users,
      }
    } catch (error) {
      return {
        statusCode: 500,
        body: "Something went wrong.",
      }
    }
  },

  async createUser(body: usuarios): Promise<HttpResponse<Omit<usuarios, "senha">>> {
    try {
      // Checking if all required properties are filled
      const requireProps = ["email", "nome", "senha", "tipo", "username"]
      let verifyRequiredProp = ""
      requireProps.forEach((prop) => {
        if (!(prop in body)) {
          verifyRequiredProp = prop
          return
        }
      })

      if (verifyRequiredProp) {
        if (verifyRequiredProp === "username") {
          verifyRequiredProp = "Nome de usuário"
        }
        verifyRequiredProp =
          verifyRequiredProp.charAt(0).toUpperCase() +
          verifyRequiredProp.slice(1)

        return {
          statusCode: 404,
          body: `Required '${verifyRequiredProp}!'`,
        }
      }

      // Checking if email is valid
      if(!EmailValidator.validate(body.email)){
        return {
          statusCode: 400,
          body: "Invalid email.",
        }
      }

      // Checking if user already exists
      if(await UserRepository.getUserByEmail(body.email)){
        return {
          statusCode: 401,
          body: "Email already registered.",
        }
      }

      // Create a new user
      const newUser = await UserRepository.createUser(body)
      // Check if any failure occurred
      if(!newUser) {
        return {
          statusCode: 400,
          body: "User not created."
        }
      }

      // User created successfully
      return {
        statusCode: 201,
        body: newUser,
      }
    } catch (error) {
      return {
        statusCode: 500,
        body: "Something went wrong.",
      }
    }
  },
}
