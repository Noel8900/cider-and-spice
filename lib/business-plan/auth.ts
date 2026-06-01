import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

export const BUSINESS_PLAN_COOKIE = "business_plan_access";

function getPasscode() {
  return process.env.BUSINESS_PLAN_PASSCODE || "";
}

function getSessionSecret() {
  return (
    process.env.BUSINESS_PLAN_SESSION_SECRET ||
    process.env.BUSINESS_PLAN_PASSCODE ||
    "local-business-plan-review-secret"
  );
}

export function isPasscodeConfigured() {
  return Boolean(getPasscode());
}

export function verifyPasscode(passcode: string) {
  const expected = getPasscode();
  if (!expected) return false;

  const providedBuffer = Buffer.from(passcode);
  const expectedBuffer = Buffer.from(expected);
  if (providedBuffer.length !== expectedBuffer.length) return false;

  return timingSafeEqual(providedBuffer, expectedBuffer);
}

export function createAccessToken() {
  return createHmac("sha256", getSessionSecret()).update("business-plan-review").digest("hex");
}

export async function hasBusinessPlanAccess() {
  const cookieStore = await cookies();
  return cookieStore.get(BUSINESS_PLAN_COOKIE)?.value === createAccessToken();
}

export async function setBusinessPlanAccessCookie() {
  const cookieStore = await cookies();
  cookieStore.set(BUSINESS_PLAN_COOKIE, createAccessToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8,
  });
}

export async function clearBusinessPlanAccessCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(BUSINESS_PLAN_COOKIE);
}
