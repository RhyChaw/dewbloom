import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getAdminSession } from '@/lib/auth'

export async function POST(request) {
  try {
    const admin = await getAdminSession()
    if (!admin) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { courseId, title, description, orderIndex } = body

    if (!courseId || !title) {
      return NextResponse.json(
        { error: 'courseId and title are required' },
        { status: 400 }
      )
    }

    // Verify course exists
    const course = await prisma.course.findUnique({
      where: { id: courseId },
    })

    if (!course) {
      return NextResponse.json(
        { error: 'Course not found' },
        { status: 404 }
      )
    }

    // Get max orderIndex if not provided
    const maxOrder = await prisma.chapter.findFirst({
      where: { courseId },
      orderBy: { orderIndex: 'desc' },
    })

    const newOrderIndex = orderIndex !== undefined ? orderIndex : (maxOrder?.orderIndex ?? -1) + 1

    const chapter = await prisma.chapter.create({
      data: {
        courseId,
        title,
        description: description || null,
        orderIndex: newOrderIndex,
      },
      include: {
        modules: true,
      },
    })

    return NextResponse.json(chapter, { status: 201 })
  } catch (error) {
    console.error('Error creating chapter:', error)
    return NextResponse.json(
      { error: 'Failed to create chapter', details: error.message },
      { status: 500 }
    )
  }
}
