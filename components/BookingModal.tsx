"use client"

import * as React from "react"
import { User, CheckCircle2, AlertCircle, Loader2 } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { createBooking } from "@/app/actions/bookings"

interface Staff {
  id: string
  name: string
  role: string
  imageUrl: string | null
}

interface Service {
  id: string
  name: string
  description: string
  price: number
  duration: number
}

interface BookingModalProps {
  isOpen: boolean
  onClose: () => void
  service: Service | null
  staffList: Staff[]
}

const TIME_SLOTS = [
  "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"
]

export function BookingModal({ isOpen, onClose, service, staffList }: BookingModalProps) {
  const [selectedStaffId, setSelectedStaffId] = React.useState("")
  const [selectedDate, setSelectedDate] = React.useState("")
  const [selectedTime, setSelectedTime] = React.useState("")
  
  const [clientName, setClientName] = React.useState("")
  const [clientEmail, setClientEmail] = React.useState("")
  const [clientPhone, setClientPhone] = React.useState("")

  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const [successData, setSuccessData] = React.useState<{
    serviceName: string
    staffName: string
    dateTime: string
  } | null>(null)

  // Reset state when modal opens/closes
  React.useEffect(() => {
    if (isOpen) {
      setSelectedStaffId(staffList[0]?.id || "")
      setSelectedDate("")
      setSelectedTime("")
      setClientName("")
      setClientEmail("")
      setClientPhone("")
      setError(null)
      setSuccessData(null)
    }
  }, [isOpen, staffList])

  if (!service) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!selectedDate || !selectedTime) {
      setError("Please select a date and time slot.")
      return
    }

    if (!selectedStaffId) {
      setError("Please select a therapist.")
      return
    }

    setIsSubmitting(true)

    // Combine date and time
    // selectedDate is "YYYY-MM-DD", selectedTime is "HH:MM"
    const dateTimeStr = `${selectedDate}T${selectedTime}:00`
    
    const result = await createBooking({
      serviceId: service.id,
      staffId: selectedStaffId,
      clientName,
      clientEmail,
      clientPhone,
      dateTime: dateTimeStr,
    })

    setIsSubmitting(false)

    if (result.success && result.data) {
      setSuccessData(result.data)
    } else {
      setError(result.error || "Something went wrong.")
    }
  }

  // Minimum date is tomorrow
  const getMinDate = () => {
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    return tomorrow.toISOString().split("T")[0]
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Book {service.name}</DialogTitle>
          <DialogDescription>
            {service.duration} minutes • ${service.price}
          </DialogDescription>
        </DialogHeader>

        {successData ? (
          <div className="flex flex-col items-center justify-center py-8 text-center animate-in fade-in zoom-in-95 duration-300">
            <CheckCircle2 className="h-16 w-16 text-primary mb-4" aria-hidden="true" />
            <h3 className="text-xl font-serif mb-2 text-foreground">Appointment Requested!</h3>
            <p className="text-sm text-muted-foreground max-w-sm mb-6 leading-relaxed">
              Thank you, {clientName}. Your booking request for <strong>{successData.serviceName}</strong> with <strong>{successData.staffName}</strong> has been received.
            </p>
            <div className="w-full rounded-xl bg-muted p-4 text-left text-sm mb-6 space-y-2 border border-border/40">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Date & Time:</span>
                <span className="font-semibold text-foreground">
                  {new Date(successData.dateTime).toLocaleDateString(undefined, { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })} at {selectedTime}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Therapist:</span>
                <span className="font-semibold text-foreground">{successData.staffName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Duration:</span>
                <span className="font-semibold text-foreground">{service.duration} mins</span>
              </div>
            </div>
            <Button onClick={onClose} className="rounded-full px-8 uppercase tracking-wider text-xs">
              Close Window
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6 pt-2">
            {error && (
              <div className="flex items-start gap-3 rounded-lg bg-destructive/10 p-3.5 text-sm text-destructive border border-destructive/20" role="alert">
                <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" aria-hidden="true" />
                <span>{error}</span>
              </div>
            )}

            {/* Step 1: Select Therapist */}
            <div className="space-y-3">
              <Label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">1. Select Therapist</Label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {staffList.map((staff) => (
                  <button
                    key={staff.id}
                    type="button"
                    onClick={() => setSelectedStaffId(staff.id)}
                    className={`flex items-center gap-3 p-2.5 rounded-xl border text-left transition-all duration-300 ${
                      selectedStaffId === staff.id
                        ? "border-primary bg-primary/5 ring-1 ring-primary"
                        : "border-border hover:border-muted-foreground/30 bg-background"
                    }`}
                    aria-label={`Select therapist ${staff.name}, ${staff.role}`}
                    aria-pressed={selectedStaffId === staff.id}
                  >
                    {staff.imageUrl ? (
                      <img
                        src={staff.imageUrl}
                        alt=""
                        className="h-9 w-9 rounded-full object-cover shrink-0"
                      />
                    ) : (
                      <div className="h-9 w-9 rounded-full bg-muted flex items-center justify-center shrink-0">
                        <User className="h-4 w-4 text-muted-foreground" />
                      </div>
                    )}
                    <div className="min-w-0">
                      <p className="text-xs font-medium text-foreground truncate">{staff.name}</p>
                      <p className="text-[10px] text-muted-foreground truncate">{staff.role.split(' ')[0]}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Date & Time */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="booking-date" className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  2. Select Date
                </Label>
                <div className="relative">
                  <Input
                    id="booking-date"
                    type="date"
                    min={getMinDate()}
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    required
                    className="w-full pl-3 pr-3"
                    aria-label="Appointment Date"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="booking-time" className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  3. Select Time
                </Label>
                <select
                  id="booking-time"
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  required
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200"
                  aria-label="Appointment Time"
                >
                  <option value="">Choose a time...</option>
                  {TIME_SLOTS.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Step 3: Client Details */}
            <div className="space-y-3 pt-2 border-t border-border/40">
              <Label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">4. Your Details</Label>
              
              <div className="space-y-3">
                <div>
                  <Label htmlFor="client-name" className="sr-only">Full Name</Label>
                  <Input
                    id="client-name"
                    placeholder="Full Name"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    required
                    aria-label="Your Full Name"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="client-email" className="sr-only">Email Address</Label>
                    <Input
                      id="client-email"
                      type="email"
                      placeholder="Email Address"
                      value={clientEmail}
                      onChange={(e) => setClientEmail(e.target.value)}
                      required
                      aria-label="Your Email Address"
                    />
                  </div>
                  <div>
                    <Label htmlFor="client-phone" className="sr-only">Phone Number</Label>
                    <Input
                      id="client-phone"
                      type="tel"
                      placeholder="Phone Number"
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      required
                      aria-label="Your Phone Number"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-4 border-t border-border/40">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="w-1/2 rounded-full uppercase tracking-wider text-xs"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-1/2 rounded-full uppercase tracking-wider text-xs bg-primary text-primary-foreground hover:bg-primary/95"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
                    Booking...
                  </>
                ) : (
                  "Confirm Booking"
                )}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
