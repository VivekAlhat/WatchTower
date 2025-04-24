import { prisma } from "./db/client";

async function main() {
  const monitors = await prisma.monitor.findMany();
  console.log(monitors);
}

main().catch(console.error);
