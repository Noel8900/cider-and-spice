import { NextResponse } from "next/server";
import { hasBusinessPlanAccess } from "@/lib/business-plan/auth";
import { getBusinessPlanForReader } from "@/lib/business-plan/data";

export async function GET() {
  if (!(await hasBusinessPlanAccess())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  return NextResponse.json(getBusinessPlanForReader());
}
