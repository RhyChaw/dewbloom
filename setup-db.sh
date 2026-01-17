#!/bin/bash

echo "🚀 Dewbloom Database Setup"
echo ""

# Check if DATABASE_URL is provided as argument
if [ -z "$1" ]; then
  echo "Usage: ./setup-db.sh 'your-neon-database-url'"
  echo ""
  echo "Example:"
  echo "  ./setup-db.sh 'postgresql://user:pass@ep-xxx-xxx.us-east-2.aws.neon.tech/neondb?sslmode=require'"
  echo ""
  echo "To get your Neon URL:"
  echo "  1. Go to https://neon.tech"
  echo "  2. Open your project → Connection Details"
  echo "  3. Copy the connection string"
  exit 1
fi

DATABASE_URL="$1"

echo "📝 Updating .env file..."
# Update DATABASE_URL in .env file
if [[ "$OSTYPE" == "darwin"* ]]; then
  # macOS
  sed -i '' "s|DATABASE_URL=.*|DATABASE_URL=$DATABASE_URL|" .env
else
  # Linux
  sed -i "s|DATABASE_URL=.*|DATABASE_URL=$DATABASE_URL|" .env
fi

echo "✅ Updated .env file"
echo ""
echo "🔄 Generating Prisma Client..."
npm run db:generate

echo ""
echo "📦 Running database migrations..."
npm run db:migrate

echo ""
echo "🌱 Seeding database with admin user..."
npm run db:seed

echo ""
echo "✅ Database setup complete!"
echo ""
echo "Default admin credentials:"
echo "  Username: admin"
echo "  Password: changeme123"
echo ""
echo "⚠️  Remember to change the admin password in production!"
