import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
dotenv.config();

const prisma = new PrismaClient();

async function test() {
  console.log('Testing Prisma connection to Atlas...');
  try {
    await prisma.$connect();
    console.log('Connected successfully via Prisma!');
    const count = await prisma.user.count();
    console.log('User count:', count);
  } catch (err) {
    console.error('Connection failed:', err);
  } finally {
    await prisma.$disconnect();
    process.exit();
  }
}

test();
