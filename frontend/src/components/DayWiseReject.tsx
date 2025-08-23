// src/components/DayWiseReject.tsx
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useDayWiseUpdateLeaveMutation, DayStatus } from '@/store/api/leaveApi';
import { toast } from '@/components/ui/sonner';

interface DayWiseRejectProps {
  leave: any;
  onClose: () => void;
}

export default function DayWiseReject({ leave, onClose }: DayWiseRejectProps) {
  const [dayStatuses, setDayStatuses] = useState<DayStatus[]>(leave.dayStatuses || []);
  const [updateDayWiseLeave] = useDayWiseUpdateLeaveMutation();

  const handleStatusChange = (date: string, status: 'APPROVED' | 'REJECTED', reason?: string) => {
    setDayStatuses(prev =>
      prev.map(d => (d.date === date ? { ...d, status, rejectedReason: reason || '' } : d))
    );
  };

  const handleSubmit = async () => {
    try {
      await updateDayWiseLeave({ id: leave.id, dayStatuses }).unwrap();
      toast.success('Day-wise leave updated successfully');
      onClose();
    } catch {
      toast.error('Failed to update day-wise leave');
    }
  };

  return (
    <div className="space-y-3">
      {dayStatuses.map(day => (
        <div key={day.date} className="flex items-center justify-between gap-2">
          <span>{day.date}</span>
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant={day.status === 'APPROVED' ? 'default' : 'outline'}
              onClick={() => handleStatusChange(day.date, 'APPROVED')}
            >
              Approve
            </Button>
            <Button
              size="sm"
              variant={day.status === 'REJECTED' ? 'destructive' : 'outline'}
              onClick={() => handleStatusChange(day.date, 'REJECTED')}
            >
              Reject
            </Button>
            {day.status === 'REJECTED' && (
              <input
                type="text"
                placeholder="Reason"
                value={day.rejectedReason || ''}
                onChange={e => handleStatusChange(day.date, 'REJECTED', e.target.value)}
                className="border rounded px-2 py-1 text-sm"
              />
            )}
          </div>
        </div>
      ))}

      <div className="flex justify-end gap-2 pt-2 border-t">
        <Button variant="outline" onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Submit</Button>
      </div>
    </div>
  );
}
