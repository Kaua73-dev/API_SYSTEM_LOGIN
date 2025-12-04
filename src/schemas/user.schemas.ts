import { z } from "zod"


export const userCreateSchema = z.object({
    email: z.string().min(1, "please type type your email"),
    password: z.string().min(6, 'password must have 6 characteres'),
    adm: z.boolean().optional()
})

