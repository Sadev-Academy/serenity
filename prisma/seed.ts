import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Clear existing data
  await prisma.appointment.deleteMany({})
  await prisma.service.deleteMany({})
  await prisma.staff.deleteMany({})

  console.log('Cleared existing database tables.')

  // Seed Staff
  const sarah = await prisma.staff.create({
    data: {
      name: 'Sarah Jenkins',
      role: 'Lead Massage Therapist',
      imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=600',
    },
  })

  const michael = await prisma.staff.create({
    data: {
      name: 'Michael Chen',
      role: 'Senior Esthetician',
      imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=600',
    },
  })

  const elena = await prisma.staff.create({
    data: {
      name: 'Elena Rostova',
      role: 'Holistic Body Practitioner',
      imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600',
    },
  })

  console.log('Seeded staff.')

  // Seed Services
  const services = [
    // Massages
    {
      name: 'Swedish Massage',
      description: 'A classic full-body massage using long, gliding strokes to improve circulation and melt away daily stress.',
      price: 120.00,
      duration: 60,
      category: 'Massage',
      imageUrl: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&q=80&w=800',
    },
    {
      name: 'Deep Tissue Massage',
      description: 'Focuses on realigning deeper layers of muscles. Ideal for chronic aches, pain, and contracted areas.',
      price: 160.00,
      duration: 90,
      category: 'Massage',
      imageUrl: 'https://images.unsplash.com/photo-1519813572847-f70b2fe4d7e3?auto=format&fit=crop&q=80&w=800',
    },
    {
      name: 'Hot Stone Therapy',
      description: 'Smooth, heated basalt stones are placed on key points of the body to deeply relax muscles and balance energy.',
      price: 150.00,
      duration: 75,
      category: 'Massage',
      imageUrl: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&q=80&w=800',
    },
    // Facials
    {
      name: 'Radiance Facial',
      description: 'A custom botanical treatment designed to restore natural glow, deeply cleanse, and hydrate the skin.',
      price: 130.00,
      duration: 60,
      category: 'Facial',
      imageUrl: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=800',
    },
    {
      name: 'Anti-Aging Collagen Treatment',
      description: 'An advanced facial using active collagen serums to plump fine lines, improve elasticity, and firm facial contours.',
      price: 170.00,
      duration: 75,
      category: 'Facial',
      imageUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=800',
    },
    {
      name: 'Detoxifying HydraFacial',
      description: 'Patented technology to cleanse, extract, and hydrate. Outstandingly effective for clearing pores and polishing skin.',
      price: 110.00,
      duration: 45,
      category: 'Facial',
      imageUrl: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&q=80&w=800',
    },
    // Body Treatments
    {
      name: 'Organic Sugar Scrub',
      description: 'A full-body exfoliation with organic cane sugar and essential oils, leaving your skin silky smooth and radiant.',
      price: 115.00,
      duration: 60,
      category: 'Body Treatments',
      imageUrl: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=800',
    },
    {
      name: 'Detoxifying Seaweed Wrap',
      description: 'A warm seaweed body mask rich in vitamins and minerals to detoxify, firm, and hydrate the skin.',
      price: 145.00,
      duration: 75,
      category: 'Body Treatments',
      imageUrl: 'https://images.unsplash.com/photo-1519813572847-f70b2fe4d7e3?auto=format&fit=crop&q=80&w=800',
    },
    {
      name: 'Herbal Body Polish',
      description: 'A gentle skin-refining treatment using therapeutic herbs to polish, nourish, and revitalize the entire body.',
      price: 125.00,
      duration: 60,
      category: 'Body Treatments',
      imageUrl: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=800',
    },
  ]

  for (const service of services) {
    await prisma.service.create({
      data: service,
    })
  }

  console.log('Seeded services.')
  console.log('Database seeding completed successfully.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
