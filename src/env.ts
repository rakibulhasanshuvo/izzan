import { createEnv } from "@t3-oss/env-nextjs";

export const env = createEnv({
  server: {},
  client: {
    // If you need any frontend keys, define them here, e.g.:
    // NEXT_PUBLIC_SOME_KEY: z.string(),
  },
  runtimeEnv: {
    // And map them here:
    // NEXT_PUBLIC_SOME_KEY: process.env.NEXT_PUBLIC_SOME_KEY,
  },
});
