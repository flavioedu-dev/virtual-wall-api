import { prisma } from "../database/db"
import { usuarios } from "../models/User"

export const UserRepository = {
  async getAllUsers(): Promise<usuarios[]>{
    const allUsers = await prisma.usuarios.findMany()

    return allUsers
  },

  async createUser({ email, nome, senha, tipo, username }: usuarios): Promise<usuarios>{
    const newUser = await prisma.usuarios.create({
      data: {
        nome,
        email,
        senha,
        tipo,
        username
      }
    })
    
    return newUser
  }
}