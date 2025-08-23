"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { DayPicker } from "react-day-picker"
import "react-day-picker/dist/style.css"
import { useDayWiseUpdateLeaveMutation, DayStatus } from "@/store/api/leaveApi"
import { toast } from "@/components/ui/sonner"

interface DayWiseRejectProps {
  leave: any
  onClose: () => void
}

export default function DayWiseReject({ leave, onClose }: DayWiseRejectProps) {
  const [dayStatuses, setDayStatuses] = useState<DayStatus[]>(leave.dayStatuses || [])
  const [selectedDays, setSelectedDays] = useState<Date[]>([])
  const [comment, setComment] = useState("")
  const [updateDayWiseLeave] = useDayWiseUpdateLeaveMutation()

  // Convert backend ISO strings to Date objects
  const validDates = (leave.dayStatuses || []).map((d: DayStatus) => new Date(d.date))

  const handleSubmit = async () => {
    try {
      const updatedStatuses = dayStatuses.map(d => {
        const isSelected = selectedDays.find(
          sel => sel.toISOString().split("T")[0] === d.date
        )
        if (isSelected) return { ...d, status: "REJECTED", rejectedReason: comment }
        return d
      })

      await updateDayWiseLeave({ id: leave.id, dayStatuses: updatedStatuses }).unwrap()
      toast.success("Day-wise leave updated successfully")
      onClose()
    } catch {
      toast.error("Failed to update day-wise leave")
    }
  }

  return (
    <div className="space-y-4">
      <div>
        <p className="text-sm font-medium mb-2">Select days to reject</p>
        <DayPicker
          mode="multiple"
          selected={selectedDays}
          onSelect={setSelectedDays}
          disabled={(date) =>
            !validDates.some(
              valid => valid.toISOString().split("T")[0] === date.toISOString().split("T")[0]
            )
          }
          classNames={{
            root: "rounded-md border",
          }}
        />
      </div>

      <Textarea
        placeholder="Reason for rejection"
        value={comment}
        onChange={e => setComment(e.target.value)}
      />

      <div className="flex justify-end gap-2 pt-2 border-t">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button
          variant="destructive"
          onClick={handleSubmit}
          disabled={selectedDays.length === 0 || !comment.trim()}
        >
          Reject Selected
        </Button>
      </div>
    </div>
  )
}
