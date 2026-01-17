import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getAdminSession } from '@/lib/auth'
import { convertTipTapToContent } from '@/lib/content-converter'

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
    const { courseId, title, type, content, orderIndex } = body

    if (!courseId || !title || !type) {
      return NextResponse.json(
        { error: 'courseId, title, and type are required' },
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

    // Content can be structured JSON or TipTap format
    let structuredContent = content
    if (content && content.type === 'doc') {
      structuredContent = convertTipTapToContent(content)
    }

    // Get max orderIndex for this course
    const maxOrder = await prisma.courseModule.findFirst({
      where: { courseId },
      orderBy: { orderIndex: 'desc' },
    })

    const newOrderIndex = orderIndex !== undefined ? orderIndex : (maxOrder?.orderIndex ?? -1) + 1

    const bodyData = {
      courseId,
      title,
      type,
      content: structuredContent,
      orderIndex: newOrderIndex,
    }

    // Add submodules if provided
    if (body.submodules !== undefined) {
      bodyData.submodules = body.submodules
    }

    const module = await prisma.courseModule.create({
      data: bodyData,
    })

    return NextResponse.json(module, { status: 201 })
  } catch (error) {
    console.error('Error creating module:', error)
    return NextResponse.json(
      { error: 'Failed to create module' },
      { status: 500 }
    )
  }
}
