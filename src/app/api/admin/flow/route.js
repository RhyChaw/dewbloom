import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getAdminSession } from '@/lib/auth'

export async function GET(request) {
  try {
    const admin = await getAdminSession()
    if (!admin) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const courseSlug = searchParams.get('courseSlug') || 'dewbloom-dbt'

    const course = await prisma.course.findUnique({
      where: { slug: courseSlug },
      include: {
        modules: {
          orderBy: { orderIndex: 'asc' },
        },
      },
    })

    if (!course) {
      return NextResponse.json(
        { error: 'Course not found' },
        { status: 404 }
      )
    }

    // Format flow data for Flutter app
    const flow = {
      course: {
        id: course.id,
        slug: course.slug,
        title: course.title,
      },
      modules: course.modules.map((module) => ({
        id: module.id,
        title: module.title,
        type: module.type,
        orderIndex: module.orderIndex,
        published: module.published,
        content: module.content,
        submodules: module.submodules || null,
        createdAt: module.createdAt,
        updatedAt: module.updatedAt,
      })),
    }

    return NextResponse.json(flow)
  } catch (error) {
    console.error('Error fetching flow:', error)
    return NextResponse.json(
      { error: 'Failed to fetch flow' },
      { status: 500 }
    )
  }
}
