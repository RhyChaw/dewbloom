import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getAdminSession } from '@/lib/auth'
import { convertTipTapToContent } from '@/lib/content-converter'

export async function PUT(request, { params }) {
  try {
    const admin = await getAdminSession()
    if (!admin) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { id } = params
    const body = await request.json()
    const { title, type, content, orderIndex, published, submodules } = body

    // Find module
    const existingModule = await prisma.courseModule.findUnique({
      where: { id },
    })

    if (!existingModule) {
      return NextResponse.json(
        { error: 'Module not found' },
        { status: 404 }
      )
    }

    // Content handling:
    // - If content has infoBoxes or questions, it's already structured
    // - If content has type: 'doc', it's TipTap format and needs conversion
    // - Otherwise, use content as-is
    let structuredContent = content
    if (content) {
      // Check if it's TipTap format (has type: 'doc' and content array)
      if (content.type === 'doc' && Array.isArray(content.content)) {
        structuredContent = convertTipTapToContent(content)
      }
      // If it already has infoBoxes or questions, it's already structured
      // No conversion needed
    }

    // Update module
    const updateData = {}
    if (title !== undefined) updateData.title = title
    if (type !== undefined) updateData.type = type
    if (content !== undefined) updateData.content = structuredContent
    if (orderIndex !== undefined) updateData.orderIndex = orderIndex
    if (published !== undefined) updateData.published = published
    if (submodules !== undefined) updateData.submodules = submodules

    const module = await prisma.courseModule.update({
      where: { id },
      data: updateData,
    })

    return NextResponse.json(module)
  } catch (error) {
    console.error('Error updating module:', error)
    console.error('Error details:', {
      message: error.message,
      stack: error.stack,
      name: error.name,
    })
    return NextResponse.json(
      { error: 'Failed to update module', details: error.message },
      { status: 500 }
    )
  }
}

export async function DELETE(request, { params }) {
  try {
    const admin = await getAdminSession()
    if (!admin) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { id } = params

    await prisma.courseModule.delete({
      where: { id },
    })

    return NextResponse.json({ message: 'Module deleted successfully' })
  } catch (error) {
    console.error('Error deleting module:', error)
    return NextResponse.json(
      { error: 'Failed to delete module' },
      { status: 500 }
    )
  }
}
