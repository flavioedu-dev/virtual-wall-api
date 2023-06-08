import { usuarios } from "@prisma/client"
import { UserRepository } from "../repositories/UserRepository"
import { HttpResponse } from "./protocols"

export const UserController = {
  async getAll(): Promise<HttpResponse<usuarios[]>> {
    try {
      const users = await UserRepository.getAllUsers()

      if (!users) {
        return {
          statusCode: 404,
          body: "Users not found.",
        }
      }

      return {
        statusCode: 404,
        body: users,
      }
    } catch (error) {
      return {
        statusCode: 500,
        body: "Something went wrong.",
      }
    }
  },

  async createUser(body: usuarios): Promise<HttpResponse<usuarios>> {
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
          body: `Obrigátorio preencher o campo '${verifyRequiredProp}'`,
        }
      }

      const newUser = await UserRepository.createUser(body)
      if(!newUser) {
        return {
          statusCode: 400,
          body: "User not created."
        }
      }

      return {
        statusCode: 200,
        body: "OK",
      }
    } catch (error) {
      return {
        statusCode: 500,
        body: "Something went wrong.",
      }
    }
  },
}
