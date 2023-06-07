import { usuarios } from "@prisma/client"
import { UserRepository } from "../repositories/UserRepository"
import { HttpResponse } from "./protocols"

export const UserController = {
  async getAll(): Promise<HttpResponse<usuarios[]>>{
    const users = await UserRepository.getAllUsers()

    if(!users) {
      return {
        statusCode: 404,
        body: "Error loading..."
      }
    }

    return {
      statusCode: 404,
      body: users
    }
  }
}