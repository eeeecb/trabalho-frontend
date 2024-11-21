import { z } from "zod";

export const envSchema = z.object({
  // Remover variáveis relacionadas ao Prisma/NextAuth
  NODE_ENV: z.enum(["development", "test", "production"]),
});
