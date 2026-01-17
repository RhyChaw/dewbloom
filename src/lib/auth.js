import { cookies } from 'next/headers'
import { prisma } from './prisma'

export async function getAdminSession() {
  try {
    const cookieStore = await cookies()
    const sessionCookie = cookieStore.get('admin_session')

    if (!sessionCookie) {
      return null
    }

    // Try AdminUser first (new system)
    let admin = await prisma.adminUser.findUnique({
      where: { id: sessionCookie.value },
    })

    // Fallback to old Admin model for backward compatibility
    if (!admin) {
      admin = await prisma.admin.findUnique({
        where: { id: sessionCookie.value },
      })
    }

    return admin
  } catch (error) {
    console.error('Error getting admin session:', error)
    return null
  }
}

export async function requireAdmin() {
  const admin = await getAdminSession()

  if (!admin) {
    throw new Error('Unauthorized')
  }

  return admin
}
