// prisma/seed.js
const { PrismaClient } = require('@prisma/client');
const { hash } = require('bcryptjs');
require('dotenv').config();

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');
  
  try {
    // Create admin user
    const adminPassword = await hash('admin123', 12);
    const admin = await prisma.user.upsert({
      where: { email: 'admin@ambaari.com' },
      update: {},
      create: {
        email: 'admin@ambaari.com',
        name: 'Admin User',
        password: adminPassword,
        role: 'ADMIN',
      },
    });
    console.log(`✅ Admin created: ${admin.email}`);
    
    // Create sales user
    const salesPassword = await hash('sales123', 12);
    const sales = await prisma.user.upsert({
      where: { email: 'sales@ambaari.com' },
      update: {},
      create: {
        email: 'sales@ambaari.com',
        name: 'Sales User',
        password: salesPassword,
        role: 'SALES',
      },
    });
    console.log(`✅ Sales created: ${sales.email}`);
    
    // Create package categories
    const categories = await Promise.all([
      prisma.packageCategory.upsert({
        where: { slug: 'international' },
        update: {},
        create: { name: 'International Tours', slug: 'international', icon: '🌍' },
      }),
      prisma.packageCategory.upsert({
        where: { slug: 'domestic' },
        update: {},
        create: { name: 'Domestic Tours', slug: 'domestic', icon: '🇮🇳' },
      }),
      prisma.packageCategory.upsert({
        where: { slug: 'adventure' },
        update: {},
        create: { name: 'Adventure', slug: 'adventure', icon: '🏔️' },
      }),
      prisma.packageCategory.upsert({
        where: { slug: 'pilgrimage' },
        update: {},
        create: { name: 'Pilgrimage', slug: 'pilgrimage', icon: '🛕' },
      }),
    ]);
    console.log(`✅ Categories created: ${categories.length}`);
    
    // Create sample packages
    const packages = [
      {
        title: 'THAILAND 3N/4D (WITH FLIGHT)',
        slug: 'thailand-3n-4d-with-flight',
        shortDesc: 'Explore Bangkok and Pattaya with flights included',
        duration: '3N/4D',
        destination: 'Thailand',
        price: 58666,
        isOnSale: true,
        totalSeats: 40,
        images: ['/images/thailand-1.jpg', '/images/thailand-2.jpg'],
        inclusions: ['Flight tickets', 'Hotel accommodation', 'Sightseeing', 'Breakfast'],
        exclusions: ['Visa fees', 'Travel insurance', 'Lunch/Dinner'],
      },
      {
        title: 'PHU QUOC PARADISE ESCAPE 2026',
        slug: 'phu-quoc-paradise-escape',
        shortDesc: 'Vietnam\'s hidden gem island paradise',
        duration: '4N/5D',
        destination: 'Vietnam',
        price: 59999,
        isOnSale: false,
        totalSeats: 30,
        images: ['/images/phuquoc-1.jpg', '/images/phuquoc-2.jpg'],
        inclusions: ['Flight tickets', 'Beach resort', 'Island tours', 'All meals'],
        exclusions: ['Visa fees', 'Personal expenses'],
      },
      {
        title: 'KASHMIR GREAT LAKES TREK',
        slug: 'kashmir-great-lakes-trek',
        shortDesc: '7 days of breathtaking Himalayan lake trekking',
        duration: '6N/7D',
        destination: 'Kashmir',
        price: 24999,
        isOnSale: true,
        totalSeats: 20,
        images: ['/images/kashmir-1.jpg', '/images/kashmir-2.jpg'],
        inclusions: ['Trekking permits', 'Camping equipment', 'Meals', 'Guide'],
        exclusions: ['Personal gear', 'Travel to base camp'],
      },
    ];
    
    for (const pkg of packages) {
      await prisma.package.upsert({
        where: { slug: pkg.slug },
        update: {},
        create: pkg,
      });
    }
    console.log(`✅ Packages created: ${packages.length}`);
    
    // Create sample leads
    const leads = [
      {
        name: 'Rahul Sharma',
        email: 'rahul@example.com',
        phone: '9876543210',
        destination: 'Thailand',
        travelers: 4,
        status: 'NEW',
        source: 'WEBSITE',
      },
      {
        name: 'Priya Patel',
        email: 'priya@example.com',
        phone: '9876543211',
        destination: 'Kashmir',
        travelers: 2,
        status: 'CONTACTED',
        source: 'SOCIAL_MEDIA',
      },
      {
        name: 'Amit Kumar',
        email: 'amit@example.com',
        phone: '9876543212',
        destination: 'Vietnam',
        travelers: 3,
        status: 'QUALIFIED',
        source: 'WEBSITE',
      },
    ];
    
    for (const lead of leads) {
      await prisma.lead.create({
        data: lead,
      });
    }
    console.log(`✅ Leads created: ${leads.length}`);
    
    console.log('\n🎉 Database seeding completed!');
    console.log('\n📋 Login credentials:');
    console.log('   Admin:  admin@ambaari.com / admin123');
    console.log('   Sales:  sales@ambaari.com / sales123');
    
  } catch (error) {
    console.error('❌ Seeding failed:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

main();