import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { ApiError } from '../utils/ApiError';
import { catchAsync } from '../utils/catchAsync';

export const authMiddleware = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.token;

    if (!token) {
      throw new ApiError(401, 'Not authorized, no token provided');
    }

    try {
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || 'secret-fallback',
      ) as { id: string };
      req.body.userId = decoded.id;
      next();
    } catch (error) {
      throw new ApiError(401, 'Not authorized, token failed');
    }
  },
);
