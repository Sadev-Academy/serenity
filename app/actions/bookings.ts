'use server'

import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const BookingSchema = z.object({
  serviceId: z.string().uuid('Invalid service selected'),
  staffId: z.string().uuid('Invalid therapist selected'),
  clientName: z.string().min(2, 'Name must be at least 2 characters'),
  clientEmail: z.string().email('Invalid email address'),
  clientPhone: z.string().min(10, 'Phone number must be at least 10 digits'),
  dateTime: z.string().refine((val) => !isNaN(Date.parse(val)), 'Invalid date or time'),
})

export type BookingInput = z.infer<typeof BookingSchema>

export async function createBooking(data: BookingInput) {
  // Validate the inputs
  const validation = BookingSchema.safeParse(data)
  if (!validation.success) {
    return {
      success: false,
      error: validation.error.issues[0].message,
    }
  }

  const { serviceId, staffId, clientName, clientEmail, clientPhone, dateTime } = validation.data
  
  const requestedStartTime = new Date(dateTime)
  
  // Prevent booking in the past
  if (requestedStartTime < new Date()) {
    return {
      success: false,
      error: 'Cannot book appointments in the past',
    }
  }

  try {
    // 1. Fetch the service to get its duration
    const service = await prisma.service.findUnique({
      where: { id: serviceId },
    })

    if (!service) {
      return {
        success: false,
        error: 'Selected service not found',
      }
    }

    // 2. Fetch the staff member to ensure they exist
    const staff = await prisma.staff.findUnique({
      where: { id: staffId },
    })

    if (!staff) {
      return {
        success: false,
        error: 'Selected therapist not found',
      }
    }

    // 3. Calculate end time
    const durationMs = service.duration * 60 * 1000
    const requestedEndTime = new Date(requestedStartTime.getTime() + durationMs)

    // 4. Overlap Check:
    // We check if there is an existing appointment for the SAME staff member
    // where the existing appointment's time window overlaps with the requested one.
    // Overlap condition:
    // existing.dateTime < requested.endTime AND existing.endTime > requested.startTime
    const overlappingAppointment = await prisma.appointment.findFirst({
      where: {
        staffId: staffId,
        status: { not: 'CANCELLED' },
        AND: [
          {
            dateTime: {
              lt: requestedEndTime,
            },
          },
          {
            endTime: {
              gt: requestedStartTime,
            },
          },
        ],
      },
    })

    if (overlappingAppointment) {
      return {
        success: false,
        error: `${staff.name} is already booked during this time slot. Please choose another time or therapist.`,
      }
    }

    // 5. Create the appointment
    const newAppointment = await prisma.appointment.create({
      data: {
        serviceId,
        staffId,
        clientName,
        clientEmail,
        clientPhone,
        dateTime: requestedStartTime,
        endTime: requestedEndTime,
        status: 'PENDING',
      },
      include: {
        service: true,
        staff: true,
      },
    })

    return {
      success: true,
      data: {
        id: newAppointment.id,
        serviceName: newAppointment.service.name,
        staffName: newAppointment.staff.name,
        dateTime: newAppointment.dateTime.toISOString(),
      },
    }
  } catch (error) {
    console.error('Failed to create booking:', error)
    return {
      success: false,
      error: 'An unexpected error occurred while booking your appointment. Please try again.',
    }
  }
}
