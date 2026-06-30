'use server'

import { prisma } from '@/lib/prisma'

export async function getServices() {
  try {
    const services = await prisma.service.findMany({
      orderBy: { name: 'asc' },
    })
    
    // Convert Prisma Decimal objects to standard numbers for JSON serialization
    return {
      success: true,
      data: services.map((s) => ({
        ...s,
        price: Number(s.price),
      })),
    }
  } catch (error) {
    console.error('Error fetching services:', error)
    return {
      success: false,
      error: 'Failed to fetch services',
      data: [],
    }
  }
}

export async function getStaff() {
  try {
    const staff = await prisma.staff.findMany({
      orderBy: { name: 'asc' },
    })
    return {
      success: true,
      data: staff,
    }
  } catch (error) {
    console.error('Error fetching staff:', error)
    return {
      success: false,
      error: 'Failed to fetch staff',
      data: [],
    }
  }
}
