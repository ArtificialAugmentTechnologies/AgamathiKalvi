/**
 * Phone OTP sign-in — interface only (planned for a later phase).
 *
 * To enable it, implement this with an SMS provider (e.g. MSG91, Twilio or AWS SNS),
 * store hashed codes with a short expiry and attempt limits, and add
 * POST /api/auth/otp/send and /api/auth/otp/verify routes that call it.
 */
export interface OtpProvider {
  /** Sends a one-time code to an Indian mobile number in +91XXXXXXXXXX form. */
  send(phone: string): Promise<{ requestId: string }>;
  /** Returns true when the code matches and has not expired or been used. */
  verify(requestId: string, code: string): Promise<boolean>;
}

export const otpProvider: OtpProvider | null = null;
