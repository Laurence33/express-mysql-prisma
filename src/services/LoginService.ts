import { prisma } from "./PrismaClient";

export async function generateLogin(body: any) {
  return await prisma.login.create({
    data: {
      username: body.username,
      password: body.password,
    },
  });
}
