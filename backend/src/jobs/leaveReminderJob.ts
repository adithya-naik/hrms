import cron from "node-cron"
import { prisma } from "../lib/prisma"
import { sendEmail } from "../lib/email"
import { differenceInHours } from "date-fns"

const reminderRules = {
  SICK: { intervalHours: 2, repeat: true },
  WFH: { intervals: [12, 24, 48], repeat: false },
  CASUAL: { intervals: [12, 24, 48], repeat: false },
}

export function startLeaveReminderJob() {
  // Run every hour
  cron.schedule("0 * * * *", async () => {
    console.log("⏰ Running leave reminder job...")

    const pendingLeaves = await prisma.leave.findMany({
      where: { status: "PENDING" },
      include: {
        requester: true,
        approver: true,
      },
    })

    const now = new Date()

    for (const leave of pendingLeaves) {
      const rules = reminderRules[leave.leaveType as keyof typeof reminderRules]
      if (!rules) continue

      const lastSent = leave.lastReminderSent || leave.createdAt
      const hoursSinceLast = differenceInHours(now, lastSent)
      const hoursSinceApplied = differenceInHours(now, leave.createdAt)

      let shouldSend = false

      if (leave.leaveType === "SICK") {
        // Every 2 hours
        if (hoursSinceLast >= rules.intervalHours) shouldSend = true
      } else {
        // WFH / CASUAL → fixed intervals
        if (
          rules.intervals.includes(hoursSinceApplied) &&
          hoursSinceLast >= 1 // avoid duplicate in same hour
        ) {
          shouldSend = true
        }
      }

      if (shouldSend && leave.approver) {
        await sendEmail({
          to: leave.approver.email,
          subject: `Reminder: Pending ${leave.leaveType} Leave Request`,
          html: `
            <p>Employee: ${leave.requester.firstName} ${leave.requester.lastName}</p>
            <p>Leave Type: ${leave.leaveType}</p>
            <p>Start: ${leave.startDate.toDateString()} → End: ${leave.endDate.toDateString()}</p>
            <p>Status: ${leave.status}</p>
            <p>Please review and approve/reject this request.</p>
          `,
        })

        await prisma.leave.update({
          where: { id: leave.id },
          data: { lastReminderSent: now },
        })

        console.log(`📧 Reminder sent for leave ${leave.id}`)
      }
    }
  })
}
