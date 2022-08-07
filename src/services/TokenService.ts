import jsonwebtoken, { JwtPayload } from "jsonwebtoken";

export function createTokens(userDetails: any) {
  try {
    const accessToken = jsonwebtoken.sign(
      userDetails,
      process.env.PRIVATE_KEY as string,
      {
        algorithm: "RS256",
        expiresIn: "15m",
      }
    );

    const refreshToken = jsonwebtoken.sign(
      userDetails,
      process.env.PRIVATE_KEY as string,
      {
        algorithm: "RS256",
        expiresIn: "30d",
      }
    );
    return { accessToken, refreshToken };
  } catch (error: any) {
    console.log(
      "🚀 ~ file: TokenService.ts ~ line 24 ~ createTokens ~ error",
      error.message
    );
    return null;
  }
}

export function verifyToken(token: string) {
  try {
    const decoded = jsonwebtoken.verify(
      token,
      process.env.PUBLIC_KEY as string,
      {
        algorithms: ["RS256"],
      }
    );
    if (decoded) {
      return decoded as JwtPayload;
    } //
  } catch (error) {
    console.log(
      "🚀 ~ file: TokenService.ts ~ line 41 ~ verifyToken ~ error",
      error
    );
    return null;
  }
  return null;
}
