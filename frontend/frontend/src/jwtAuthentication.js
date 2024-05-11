import jwt_decode from 'jsonwebtoken';

export const verifyToken = (token) => {
    try {
      const decoded = jwt_decode(token);
      // Check if token is expired
      if (decoded.exp < Date.now() / 1000) {
        // Token is expired
        return false;
      }
      return decoded;
    } catch (error) {
      // Token is invalid
      return false;
    }
};
  