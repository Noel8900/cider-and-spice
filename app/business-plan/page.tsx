import { isPasscodeConfigured, hasBusinessPlanAccess } from "@/lib/business-plan/auth";
import { BusinessPlanReviewRoom } from "@/components/business-plan/business-plan-review-room";

export default async function BusinessPlanPage() {
  const [authorized, passcodeConfigured] = await Promise.all([
    hasBusinessPlanAccess(),
    Promise.resolve(isPasscodeConfigured()),
  ]);

  return (
    <BusinessPlanReviewRoom
      initialAuthorized={authorized}
      passcodeConfigured={passcodeConfigured}
    />
  );
}
