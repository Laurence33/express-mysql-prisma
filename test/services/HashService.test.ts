import { hashPassword, verifyPassword } from "../../src/services/HashService";

describe("Hashing Tests", () => {
  test("should hash a password", async () => {
    const hashed = await hashPassword("testPassword");
    expect(hashed).toBeTruthy();
  });

  test("should verify a password hash", async () => {
    const hashed = await hashPassword("testPassword");
    const verified = await verifyPassword(hashed as string, "testPassword");
    expect(verified).toBe(true);
  });
});
