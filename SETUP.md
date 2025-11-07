# MarketIQ Backend Setup Guide

## 🚀 Quick Start

### Option 1: With MongoDB Atlas (Recommended)
```bash
# 1. Set up MongoDB Atlas
# - Go to https://www.mongodb.com/cloud/atlas
# - Create a free cluster
# - Get your connection string

# 2. Create environment file
cp server/env.example server/.env
# Edit server/.env with your MongoDB Atlas connection string

# 3. Start the server
cd server
npm start

# 4. Seed the database (optional)
npm run seed
```

### Option 2: Local Development (No Database)
```bash
# Start server without database (for testing API endpoints)
cd server
npm run local
```

## 🔧 Troubleshooting

### Port Already in Use Error
```bash
# Kill process using port 5000
netstat -ano | findstr :5000
taskkill /PID <PID_NUMBER> /F

# Or use a different port
PORT=5001 npm start
```

### MongoDB Connection Issues
```bash
# For local MongoDB
# Install MongoDB locally or use MongoDB Atlas

# For MongoDB Atlas
# 1. Create cluster at mongodb.com/cloud/atlas
# 2. Get connection string
# 3. Update .env file with your connection string
```

### PowerShell Execution Policy Error
```bash
# Fix PowerShell execution policy
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser -Force
```

## 📋 Available Scripts

- `npm start` - Start server with MongoDB Atlas
- `npm run local` - Start server for local development
- `npm run dev` - Start with nodemon (auto-restart)
- `npm run seed` - Populate database with sample data

## 🌐 API Endpoints

- **Health Check**: `http://localhost:5000/api/health`
- **Contact**: `http://localhost:5000/api/contact`
- **Feedback**: `http://localhost:5000/api/feedback`
- **Blog**: `http://localhost:5000/api/blog`
- **Careers**: `http://localhost:5000/api/careers`
- **Team**: `http://localhost:5000/api/team`

## 🎯 Next Steps

1. **Set up MongoDB Atlas** (recommended for production)
2. **Update .env file** with your connection string
3. **Start the server** with `npm start`
4. **Seed the database** with `npm run seed`
5. **Start the frontend** with `npm run dev` (in the main directory)

## 🆘 Need Help?

- Check the server logs for error messages
- Ensure all dependencies are installed: `npm install`
- Verify your MongoDB connection string
- Make sure port 5000 is available


