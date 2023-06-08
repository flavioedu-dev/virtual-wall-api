import { prisma } from "../database/db"
import { administratores } from "../models/Admin"

export const AdminRepository = {
  async createAdmin(id_user: number): Promise<administratores> {
    const admin = await prisma.administradores.create({
      data: {
        id_usuario: id_user
      }
    })

    return admin
  }
}