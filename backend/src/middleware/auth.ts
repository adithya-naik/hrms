import { Request, Response, NextFunction } from 'express';
import { jwtVerify, createRemoteJWKSet, JWTPayload } from 'jose';
import { config } from '../config/config';
import { prisma } from '../lib/prisma';
import { UserRole } from '@prisma/client';

interface AuthRequest extends Request {
  user?: {
    id: string;
    auth0Id: string;
    email: string;
    role: UserRole;
  };
}

const JWKS = createRemoteJWKSet(new URL(`https://${config.AUTH0_DOMAIN}/.well-known/jwks.json`));

export const authMiddleware = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const token = authHeader.substring(7);
    
    // Verify JWT with Auth0
    const { payload } = await jwtVerify(token, JWKS, {
      issuer: `https://${config.AUTH0_DOMAIN}/`,
      audience: config.AUTH0_AUDIENCE,
    });

    const auth0Id = payload.sub as string;
    
    if (!auth0Id) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    // Get user from database
    const user = await prisma.user.findUnique({
      where: { auth0Id },
      select: {
        id: true,
        auth0Id: true,
        email: true,
        role: true,
        isActive: true
      }
    });

    if (!user || !user.isActive) {
      return res.status(401).json({ error: 'User not found or inactive' });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    console.error('Token verification failed:', error);

    return res.status(401).json({ error: 'Invalid token' });
  }
};

export const authorize = (roles: UserRole[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Not authenticated' });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Insufficient permissions' });
    }
console.log('\n\n\n\n\nUser role:\n\n\n\n', req.user.role, 'Allowed roles:', roles);

    next();
  };
};

export type { AuthRequest };