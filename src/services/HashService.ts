import argon2 from "argon2";

export async function hashPassword(password: string) {
  try {
    const hash = await argon2.hash(password);
    return hash;
  } catch (err) {
    console.log(
      "🚀 ~ file: HashService.ts ~ line 14 ~ hashPassword ~ err",
      err
    );
    return null;
  }
}

export async function verifyPassword(hash: string, password: string) {
  try {
    const result = await argon2.verify(hash, password);
    return result;
  } catch (error) {
    console.log(
      "🚀 ~ file: HashService.ts ~ line 21 ~ verifyPassword ~ error",
      error
    );
    return false;
  }
}
