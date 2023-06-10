import { prisma } from "../database/db"
import { isAdmin } from "../models/Admin"
import { usuarios } from "../models/User"

export const UserRepository = {
  async getAllUsers(): Promise<usuarios[]> {
    const allUsers = await prisma.usuarios.findMany()

    return allUsers
  },

  async getUserByEmail(email: string): Promise<usuarios | null> {
    const user = await prisma.usuarios.findUnique({
      where: {
        email: email,
      },
    })
    return user
  },

  async getUserByUsername(username: string): Promise<usuarios | null> {
    const user = await prisma.usuarios.findUnique({
      where: {
        username: username,
      },
    })
    return user
  },

  async createUser({
    email,
    nome,
    senha,
    tipo,
    username
  }: isAdmin): Promise<Omit<usuarios, "senha"> | null> {
    const newUser = await prisma.usuarios.create({
      data: {
        nome,
        email,
        senha,
        tipo,
        username: username.toLowerCase(),
      },
    })
    // Removing user password
    const { senha: pass, ...restUser } = newUser
    pass

    return restUser
  },
}
