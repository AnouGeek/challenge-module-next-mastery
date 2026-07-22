import type { UserModel } from '@/db/schema/users'

// Fonction de base réutilisable pour n'importe quelle ressource
export function isAdminOrOwner(user: UserModel, resourceOwnerId: string): boolean {
  return user.role === 'ADMIN' || user.id === resourceOwnerId
}

// Fonction spécifique aux subscriptions, s'appuie sur la précédente
export function canReadOwnSubscriptions(user: UserModel, targetUserId: string): boolean {
  return isAdminOrOwner(user, targetUserId)
}