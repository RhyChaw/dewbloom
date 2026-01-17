import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request) {
  try {
    const body = await request.json()
    const { user_id, lesson_id, score } = body

    // Use snake_case for API, but Prisma uses camelCase
    const userId = user_id
    const lessonId = lesson_id

    if (!userId || !lessonId) {
      return NextResponse.json(
        { error: 'user_id and lesson_id are required' },
        { status: 400 }
      )
    }

    // Verify user exists
    const user = await prisma.user.findUnique({
      where: { id: userId },
    })

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // Verify lesson exists
    const lesson = await prisma.lesson.findUnique({
      where: { id: lessonId },
    })

    if (!lesson) {
      return NextResponse.json(
        { error: 'Lesson not found' },
        { status: 404 }
      )
    }

    // Get or create progress record
    const progress = await prisma.userProgress.upsert({
      where: {
        userId_lessonId: {
          userId: userId,
          lessonId: lessonId,
        },
      },
      update: {
        completed: true,
        score: score !== undefined ? score : undefined,
      },
      create: {
        userId: userId,
        lessonId: lessonId,
        completed: true,
        score: score !== undefined ? score : undefined,
      },
    })

    // Update streak
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const streak = await prisma.streak.findUnique({
      where: { userId: userId },
    })

    if (streak) {
      if (streak.lastCompleted) {
        const lastCompleted = new Date(streak.lastCompleted)
        lastCompleted.setHours(0, 0, 0, 0)
        const daysDiff = Math.floor((today - lastCompleted) / (1000 * 60 * 60 * 24))

        if (daysDiff === 0) {
          // Already completed today, don't update streak
        } else if (daysDiff === 1) {
          // Consecutive day, increment streak
          await prisma.streak.update({
            where: { userId: userId },
            data: {
              currentStreak: streak.currentStreak + 1,
              lastCompleted: today,
            },
          })
        } else {
          // Streak broken, reset to 1
          await prisma.streak.update({
            where: { userId: userId },
            data: {
              currentStreak: 1,
              lastCompleted: today,
            },
          })
        }
      } else {
        // First completion
        await prisma.streak.update({
          where: { userId: userId },
          data: {
            currentStreak: 1,
            lastCompleted: today,
          },
        })
      }
    } else {
      // Create new streak
      await prisma.streak.create({
        data: {
          userId: userId,
          currentStreak: 1,
          lastCompleted: today,
        },
      })
    }

    return NextResponse.json({
      user_id: progress.userId,
      lesson_id: progress.lessonId,
      completed: progress.completed,
      score: progress.score,
      xp_earned: lesson.xpReward,
    })
  } catch (error) {
    console.error('Error completing progress:', error)
    return NextResponse.json(
      { error: 'Failed to complete progress' },
      { status: 500 }
    )
  }
}
