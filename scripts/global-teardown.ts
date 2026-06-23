/*
 * MÁRCIO RODRIGUES DE OLIVEIRA, DEV FULSTACK, (62) 99646-6033
 */

import { StartedPostgreSqlContainer } from "@testcontainers/postgresql";
import { StartedTestContainer } from "testcontainers";

export default async () => {
  console.log("\n[GlobalTeardown] Stopping shared test containers...");
  const postgresContainer: StartedPostgreSqlContainer = (global as any)
    .__POSTGRES_CONTAINER__;
  const redisContainer: StartedTestContainer = (global as any)
    .__REDIS_CONTAINER__;

  await Promise.all([postgresContainer?.stop(), redisContainer?.stop()]);
  console.log("[GlobalTeardown] Shared containers stopped.");
};
