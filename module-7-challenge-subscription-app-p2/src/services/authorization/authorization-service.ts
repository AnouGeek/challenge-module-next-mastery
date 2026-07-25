import { UserModel } from "@/db/schema/users";

export function isAdminOrOwner(user: UserModel, resourceOwnerId: string): boolean {
    return user.role === 'ADMIN' || user.id === resourceOwnerId
}

export function canReadOwnSubscriptions(user: UserModel, targetUserId: string): boolean {
    return isAdminOrOwner(user, targetUserId)
}