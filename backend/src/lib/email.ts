import nodemailer from "nodemailer";
import { htmlToText } from "html-to-text";
import { config } from "../config/config";
import { logger } from "../utils/logger";
import { formatDate } from "../utils/date";

type CompanyInfo = {
  companyName: string;
  logoUrl?: string | null;
  address?: string | null;
  contactEmail?: string | null;
  contactPhone?: string | null;
};

type CommonLeave = {
  requesterName: string;
  leaveType: string;
  startDate: Date;
  endDate: Date;
  totalDays: number | string;
  reason?: string;
};

const transporter = nodemailer.createTransport({
  host: config.SMTP_HOST,
  port: config.SMTP_PORT,
  secure: config.SMTP_PORT === 465,
  auth: {
    user: config.SMTP_USER,
    pass: config.SMTP_PASS,
  },
});

transporter.verify((error) => {
  if (error) {
    logger.error("SMTP connection failed:", error);
  } else {
    logger.info("SMTP Server is ready to send emails");
  }
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
      text: options.text || htmlToText(options.html),
    };

    const info = await transporter.sendMail(mailOptions);
    logger.info(
      `Email sent successfully to ${options.to} | Message ID: ${info.messageId}`
    );
  } catch (error) {
    logger.error("Email sending failed:", error);
    throw error;
  }
};

function frame(company: CompanyInfo, inner: string): string {
  const safe = (s?: string | null) => (s ? s : "");
  return `
    <div style="font-family: Inter, -apple-system, Segoe UI, Roboto, Arial; background:#f6f7fb; padding:24px;">
      <table style="max-width:640px;margin:0 auto;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #eee">
        <thead>
          <tr>
            <th style="text-align:left;padding:16px 20px;border-bottom:1px solid #eee;background:#fafafa">
              <div style="display:flex;align-items:center;gap:12px">
                ${
                  company.logoUrl
                    ? `<img src="${company.logoUrl}" alt="${safe(
                        company.companyName
                      )}" style="height:36px;object-fit:contain" />`
                    : ""
                }
                <span style="font-size:16px;font-weight:600;color:#111">${safe(
                  company.companyName
                )}</span>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding:20px 20px 10px 20px;">
              ${inner}
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td style="padding:16px 20px;border-top:1px solid #eee;color:#666;font-size:12px;background:#fafafa">
              <div>${safe(company.address)}</div>
              <div>${safe(company.contactEmail)} ${
      company.contactPhone ? " • " + company.contactPhone : ""
    }</div>
            </td>
          </tr>
        </tfoot>
      </table>
      <div style="max-width:640px;margin:8px auto 0;color:#999;font-size:11px;text-align:center">
        This is an automated message from the Leave Management System.
      </div>
    </div>
    `;
}

function fmt(d: Date | string | null | undefined): string {
  return formatDate(d);
}

export const emailTemplates = {
  leaveRequest: (company: CompanyInfo, p: CommonLeave) => ({
    subject: `New Leave Request • ${p.requesterName} • ${p.leaveType}`,
    html: frame(
      company,
      `
        <h2 style="margin:0 0 8px 0;">New Leave Request</h2>
        <p><strong>${p.requesterName}</strong> submitted a new leave request.</p>
        <ul style="line-height:1.6">
          <li><strong>Leave Type:</strong> ${p.leaveType}</li>
          <li><strong>Dates:</strong> ${fmt(p.startDate)} → ${fmt(p.endDate)} (${p.totalDays} day${
            Number(p.totalDays) === 1 ? "" : "s"
          })</li>
          ${
            p.reason
              ? `<li><strong>Reason (as entered):</strong> ${p.reason}</li>`
              : ""
          }
        </ul>
        <p>Please review and take action in the Leave Management System.</p>
      `
    ),
  }),

  leaveSubmitted: (company: CompanyInfo, p: CommonLeave) => ({
    subject: `We received your ${p.leaveType} request`,
    html: frame(
      company,
      `
        <h2 style="margin:0 0 8px 0;">Leave Request Submitted</h2>
        <p>Hi <strong>${p.requesterName}</strong>,</p>
        <p>We've received your leave request and it's now <strong>pending approval</strong>.</p>
        <ul style="line-height:1.6">
          <li><strong>Leave Type:</strong> ${p.leaveType}</li>
          <li><strong>Dates:</strong> ${fmt(p.startDate)} → ${fmt(p.endDate)} (${p.totalDays} day${
            Number(p.totalDays) === 1 ? "" : "s"
          })</li>
          ${
            p.reason
              ? `<li><strong>Your Reason:</strong> ${p.reason}</li>`
              : ""
          }
        </ul>
        <p>We’ll email you as soon as your manager or HR takes action.</p>
      `
    ),
  }),

  leaveApproved: (company: CompanyInfo, p: CommonLeave) => ({
    subject: `Approved: ${p.leaveType} (${fmt(p.startDate)} → ${fmt(p.endDate)})`,
    html: frame(
      company,
      `
        <h2 style="margin:0 0 8px 0;">Leave Request Approved</h2>
        <p>Dear <strong>${p.requesterName}</strong>,</p>
        <p>Your leave request has been <strong>approved</strong>.</p>
        <ul style="line-height:1.6">
          <li><strong>Leave Type:</strong> ${p.leaveType}</li>
          <li><strong>Dates:</strong> ${fmt(p.startDate)} → ${fmt(p.endDate)} (${p.totalDays} day${
            Number(p.totalDays) === 1 ? "" : "s"
          })</li>
        </ul>
        <p>Enjoy your time off!</p>
      `
    ),
  }),

  leaveRejected: (
    company: CompanyInfo,
    p: CommonLeave & { reason: string }
  ) => ({
    subject: `Rejected: ${p.leaveType} (${fmt(p.startDate)} → ${fmt(p.endDate)})`,
    html: frame(
      company,
      `
        <h2 style="margin:0 0 8px 0;">Leave Request Rejected</h2>
        <p>Dear <strong>${p.requesterName}</strong>,</p>
        <p>Your leave request was <strong>rejected</strong>.</p>
        <ul style="line-height:1.6">
          <li><strong>Leave Type:</strong> ${p.leaveType}</li>
          <li><strong>Dates:</strong> ${fmt(p.startDate)} → ${fmt(p.endDate)} (${p.totalDays} day${
            Number(p.totalDays) === 1 ? "" : "s"
          })</li>
          <li><strong>Reason:</strong> ${p.reason}</li>
        </ul>
        <p>If you need more details, please reach out to your manager or HR.</p>
      `
    ),
  }),
};