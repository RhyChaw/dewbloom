/**
 * Simple seed script for CMS
 * Run with: node scripts/seed-cms.js
 */

const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcrypt')

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting CMS seed...')

  // Check if admin user already exists
  const existingAdmin = await prisma.adminUser.findUnique({
    where: { email: 'admin@dewbloom.dev' },
  })

  if (existingAdmin) {
    console.log('✅ Admin user already exists')
    console.log('   Email: admin@dewbloom.dev')
    console.log('   Password: ChangeMe123!')
  } else {
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

    console.log('✅ Admin user created:')
    console.log('   Email: admin@dewbloom.dev')
    console.log('   Password: ChangeMe123!')
  }

  // Check if course already exists
  const existingCourse = await prisma.course.findUnique({
    where: { slug: 'dewbloom-dbt' },
  })

  if (existingCourse) {
    console.log('✅ Course already exists')
    console.log(`   Slug: ${existingCourse.slug}`)
    console.log(`   Title: ${existingCourse.title}`)
  } else {
    // Create course
    const course = await prisma.course.create({
      data: {
        slug: 'dewbloom-dbt',
        title: 'DewBloom — DBT Skills',
      },
    })

    console.log('✅ Course created:')
    console.log(`   Slug: ${course.slug}`)
    console.log(`   Title: ${course.title}`)
  }

  console.log('')
  console.log('🎉 Seed completed!')
  console.log('')
  console.log('You can now login at: http://localhost:3000/admin/login')
  console.log('   Email: admin@dewbloom.dev')
  console.log('   Password: ChangeMe123!')
}

main()
  .catch((e) => {
    console.error('❌ Error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
