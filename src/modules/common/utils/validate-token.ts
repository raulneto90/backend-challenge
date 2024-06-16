import { verify } from 'jsonwebtoken';
import { env } from '../../../config/env/env';

export function validateToken(token: string) {
  return new Promise((resolve, reject) => {
    verify(token, env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return reject(err);
      }
      resolve(decoded);
    });
  });
}
