import { usuarios } from "./User"

export interface administratores {
  id_admin: number
  id_usuario: number
}

export interface isAdmin extends usuarios{
  adminCode: string | null
}