// types/index.ts
import { User } from '@/hooks/useUsers'
import { UserRole } from '@prisma/client'

export interface ExtendedUser extends User {
    role?: UserRole | null;
}