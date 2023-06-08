import { prisma } from "../database/db"
import { usuarios } from "../models/User"

export const UserRepository = {
  async getAllUsers(): Promise<usuarios[]>{
    const allUsers = await prisma.usuarios.findMany()

    return allUsers
  },

  async getUserByEmail(email: string): Promise<usuarios | null> {
    const user = await prisma.usuarios.findUnique({
      where: {
        email: email
      }
    })
    return user
  },

  async createUser({ email, nome, senha, tipo, username }: usuarios): Promise<Omit<usuarios, "senha">>{
    const newUser = await prisma.usuarios.create({
      data: {
        nome,
        email,
        senha,
        tipo,
        username
      }
    })

    // Removing user password
    const { senha: pass, ...restUser} = newUser
    pass
    
    return restUser
  }
}