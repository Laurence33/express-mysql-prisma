import { prisma } from "./PrismaClient";

export async function generateUser(loginId: string, body: any) {
  return await prisma.user.create({
    data: {
      name: body.name,
      email: body.email,
      age: Number(body.age),
      loginId: loginId,
    },
  });
}

export async function getUsers() {
  return await prisma.user.findMany({});
}

export async function findUserByUsername(username: string) {
  return await prisma.login.findFirst({
    where: {
      username: username,
    },
    select: {
      password: true,
      User: {
        select: {
          id: true,
          email: true,
        },
      },
    },
  });
}

export async function getUserById(uid: string) {
  return await prisma.user.findUnique({
    where: {
      id: uid,
    },
  });
}
