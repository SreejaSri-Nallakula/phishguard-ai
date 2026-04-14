import sgMail from "@sendgrid/mail";
import nodemailer from "nodemailer";

// Initialize SendGrid if key is present
if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

const transporterPromise = (async () => {
  // Gmail configuration
  if (process.env.MAIL_USER && process.env.MAIL_PASS && process.env.MAIL_USER !== "your-email@gmail.com") {
    return nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });
  }

  // Fallback to Ethereal Test Account
  console.log("⚠️ Real mail credentials not configured. Creating a temporary test account...");
  const testAccount = await nodemailer.createTestAccount();
  return nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });
})();

export const sendOTPEmail = async (email: string, otp: string) => {
  const mailOptions = {
    from: process.env.MAIL_FROM || '"PhishGuard AI" <noreply@phishguard-ai.com>',
    to: email,
    subject: "Reset Your Password - PhishGuard AI OTP",
    html: `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background-color: #0f172a; color: #f8fafc; padding: 40px; border-radius: 16px; border: 1px solid #1e293b;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #00f3ff; font-size: 28px; margin: 0; letter-spacing: 1px;">PHISHGUARD AI</h1>
          <p style="color: #64748b; font-size: 14px;">Intelligent Email Security</p>
        </div>
        
        <div style="background-color: #1e293b; padding: 30px; border-radius: 12px; text-align: center; border: 1px solid #334155;">
          <h2 style="font-size: 20px; margin-top: 0;">Password Reset Code</h2>
          <p style="color: #94a3b8; font-size: 16px; margin-bottom: 25px;">Use the verification code below to reset your password. This code will expire in 10 minutes.</p>
          
          <div style="background: #0f172a; padding: 20px; border-radius: 8px; border: 1px solid #00f3ff; display: inline-block; min-width: 150px;">
            <span style="font-size: 32px; font-weight: bold; letter-spacing: 10px; color: #00f3ff; font-family: monospace;">${otp}</span>
          </div>
        </div>
        
        <div style="margin-top: 30px; text-align: center; color: #64748b; font-size: 13px;">
          <p>If you didn't request a password reset, you can safely ignore this email.</p>
          <p style="margin-top: 20px; border-top: 1px solid #1e293b; pt-20">© 2026 PhishGuard AI. All rights reserved.</p>
        </div>
      </div>
    `,
  };

  try {
    // 1. Try SendGrid first if configured
    if (process.env.SENDGRID_API_KEY) {
      await sgMail.send({
        ...mailOptions,
        from: process.env.SENDGRID_FROM || "noreply@phishguard-ai.com",
      } as any);
      console.log("✅ Email sent via SendGrid");
      return;
    }

    // 2. Fallback to Transporter (Gmail or Ethereal)
    const transporter = await transporterPromise;
    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent via SMTP: %s", info.messageId);
    
    // Log preview URL if it's an Ethereal mail
    const previewUrl = nodemailer.getTestMessageUrl(info);
    if (previewUrl) {
      console.log("🔗 Preview URL: %s", previewUrl);
    }
  } catch (error: any) {
    console.error("❌ Email failed to send:", error.message);
    // Log the OTP as a last resort so the user can still proceed
    console.log(`[BACKUP OTP LOG] For ${email}: ${otp}`);
  }
};
