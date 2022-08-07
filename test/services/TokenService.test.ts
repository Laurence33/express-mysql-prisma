import { createTokens, verifyToken } from "../../src/services/TokenService";
import dotenv from "dotenv";
dotenv.config();

describe("Token Service Tests", () => {
  it("should create AT and RT tokens", () => {
    const body = { id: "dfg234vsf", email: "test@example.com" };
    let tokens = createTokens(body);
    tokens = createTokens(body);
    expect(tokens).toBeTruthy();
    if (tokens) {
      const { accessToken, refreshToken } = tokens;
      expect(accessToken).toBeTruthy();
      expect(refreshToken).toBeTruthy();
    }
  });

  it("should decode a token properly", () => {
    const body = { id: "dfg234vsf", email: "test@example.com" };
    const tokens = createTokens(body);
    expect(tokens).toBeTruthy();
    if (tokens) {
      const { accessToken, refreshToken } = tokens;

      const body1 = verifyToken(accessToken);
      delete body1?.exp;
      delete body1?.iat;

      expect(body1).toStrictEqual(body);

      const body2 = verifyToken(refreshToken);
      delete body2?.exp;
      delete body2?.iat;

      expect(body2).toStrictEqual(body);
    }
  });
});
