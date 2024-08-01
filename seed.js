const mongoose = require('mongoose');
const User = require('./models/User');
const Event = require('./models/Event');
const Session = require('./models/Session');
require('dotenv').config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected');
  } catch (err) {
    console.error(`Error: ${err.message}`);
    process.exit(1);
  }
};

const seedData = async () => {
  await connectDB();

  // Clear existing data
  await User.deleteMany();
  await Event.deleteMany();
  await Session.deleteMany();

  // Create users
  const users = await User.create([
    {
      name: 'Alice',
      email: 'alice@example.com',
      passwordHash: 'hashedpassword1', // You should hash passwords in a real application
      role: 'admin'
    },
    {
      name: 'Bob',
      email: 'bob@example.com',
      passwordHash: 'hashedpassword2',
      role: 'user'
    }
  ]);

  // Create events
  const events = await Event.create([
    {
      name: 'Tech Conference',
      date: new Date('2024-09-15'),
      location: 'San Francisco',
      description: 'A conference about the latest in technology.',
      userId: users[0]._id
    },
    {
      name: 'Music Festival',
      date: new Date('2024-10-05'),
      location: 'Los Angeles',
      description: 'An outdoor music festival with various artists.',
      userId: users[1]._id
    }
  ]);

  // Create sessions
  const sessions = await Session.create([
    {
      userId: users[0]._id,
      createdAt: new Date(),
      expiresAt: new Date(Date.now() + 3600000) // 1 hour from now
    },
    {
      userId: users[1]._id,
      createdAt: new Date(),
      expiresAt: new Date(Date.now() + 3600000) // 1 hour from now
    }
  ]);

  console.log('Data seeded successfully');
  mongoose.connection.close();
};

seedData();
