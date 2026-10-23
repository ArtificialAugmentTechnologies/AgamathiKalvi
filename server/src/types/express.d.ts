import type { Role } from '@prisma/client';

export type AuthUser = {
  id: string;
  email: string;
  name: string;
  phone: string | null;
  role: Role;
};

declare global {
  namespace Express {
    interface Request {
      /** Set by `attachUser` when a valid session cookie is present. */
      user?: AuthUser;
    }
  }
}
