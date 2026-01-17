import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcrypt'

// Store seed status in memory (in production, use Redis or database flag)
let hasSeeded = false

export async function POST(request) {
  try {
    // Check if already seeded
    if (hasSeeded) {
      return NextResponse.json(
        { error: 'Seed already completed. This endpoint is disabled.' },
        { status: 403 }
      )
    }

    // Check if admin user already exists
    const existingAdmin = await prisma.adminUser.findUnique({
      where: { email: 'admin@dewbloom.dev' },
    })

    if (existingAdmin) {
      hasSeeded = true
      return NextResponse.json(
        { error: 'Seed already completed. Admin user already exists.' },
        { status: 403 }
      )
    }

    // Hash password
    const password = 'ChangeMe123!'
    const passwordHash = await bcrypt.hash(password, 10)

    // Create admin user
    const admin = await prisma.adminUser.create({
      data: {
        email: 'admin@dewbloom.dev',
        password: passwordHash,
      },
    })

    // Check if course already exists
    const existingCourse = await prisma.course.findUnique({
      where: { slug: 'dewbloom-dbt' },
    })

    let course
    if (!existingCourse) {
      // Create course
      course = await prisma.course.create({
        data: {
          slug: 'dewbloom-dbt',
          title: 'DewBloom — DBT Skills',
        },
      })
    } else {
      course = existingCourse
    }

    // Mark as seeded
    hasSeeded = true

    return NextResponse.json({
      message: 'Seed completed successfully',
      admin: {
        id: admin.id,
        email: admin.email,
        password: password, // Only returned on seed
      },
      course: {
        id: course.id,
        slug: course.slug,
        title: course.title,
      },
    })
  } catch (error) {
    console.error('Error during seed:', error)
    return NextResponse.json(
      { error: 'Seed failed', details: error.message },
      { status: 500 }
    )
  }
}
