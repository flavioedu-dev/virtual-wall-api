import { prisma } from "../database/db"
import { administratores } from "../models/Admin"

export const AdminRepository = {
  async getAdminById(id_user: number): Promise<administratores | null> {
    const admin = await prisma.administradores.findFirst({
      where: {
        id_usuario: id_user
      }
    })
    return admin
  },
  
  async createAdmin(id_user: number): Promise<administratores> {
    const admin = await prisma.administradores.create({
      data: {
        id_usuario: id_user
      }
    })
    return admin
  } 
}