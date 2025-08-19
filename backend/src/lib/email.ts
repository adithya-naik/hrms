import nodemailer from 'nodemailer';
import { config } from '@/config/config';
import { logger } from '@/utils/logger';

const transporter = nodemailer.createTransporter({
  host: config.SMTP_HOST,
  port: config.SMTP_PORT,
  secure: false,
  auth: {
    user: config.SMTP_USER,
    pass: config.SMTP_PASS,
  },
});

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

export const sendEmail = async (options: EmailOptions): Promise<void> => {
  try {
    const mailOptions = {
      from: `${config.FROM_NAME} <${config.FROM_EMAIL}>`,
      to: options.to,
      subject: options.subject,
      html: options.html,
      text: options.text,
    };

    await transporter.sendMail(mailOptions);
    logger.info(`Email sent successfully to ${options.to}`);
  } catch (error) {
    logger.error('Email sending failed:', error);
    throw error;
  }
};

// Email templates
export const emailTemplates = {
  leaveRequest: (requesterName: string, leaveType: string, startDate: string, endDate: string) => ({
    subject: 'New Leave Request Submitted',
    html: `
      <h2>New Leave Request</h2>
      <p><strong>${requesterName}</strong> has submitted a new leave request:</p>
      <ul>
        <li><strong>Leave Type:</strong> ${leaveType}</li>
        <li><strong>Start Date:</strong> ${startDate}</li>
        <li><strong>End Date:</strong> ${endDate}</li>
      </ul>
      <p>Please review and approve/reject the request in the Leave Management System.</p>
    `,
  }),

  leaveApproved: (requesterName: string, leaveType: string, startDate: string, endDate: string) => ({
    subject: 'Leave Request Approved',
    html: `
      <h2>Leave Request Approved</h2>
      <p>Dear <strong>${requesterName}</strong>,</p>
      <p>Your leave request has been approved:</p>
      <ul>
        <li><strong>Leave Type:</strong> ${leaveType}</li>
        <li><strong>Start Date:</strong> ${startDate}</li>
        <li><strong>End Date:</strong> ${endDate}</li>
      </ul>
      <p>Enjoy your time off!</p>
    `,
  }),

  leaveRejected: (requesterName: string, leaveType: string, startDate: string, endDate: string, reason: string) => ({
    subject: 'Leave Request Rejected',
    html: `
      <h2>Leave Request Rejected</h2>
      <p>Dear <strong>${requesterName}</strong>,</p>
      <p>Your leave request has been rejected:</p>
      <ul>
        <li><strong>Leave Type:</strong> ${leaveType}</li>
        <li><strong>Start Date:</strong> ${startDate}</li>
        <li><strong>End Date:</strong> ${endDate}</li>
        <li><strong>Reason:</strong> ${reason}</li>
      </ul>
      <p>Please contact your manager or HR for more details.</p>
    `,
  }),
};