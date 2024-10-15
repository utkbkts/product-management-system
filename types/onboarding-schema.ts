import { z } from "zod";

export const OnboardingSchema = z.object({
  image: z.string(),
  location: z.string().min(2, {
    message: "location must be more than string 1 character",
  }),
});
