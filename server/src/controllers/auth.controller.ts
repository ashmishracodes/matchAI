import { Request, Response, NextFunction } from 'express';
import { authService } from '../services/AuthService';
import { ApiError } from '../utils/ApiError';
import prisma from '../models';
import { catchAsync } from '../utils/catchAsync';

export class AuthController {
  public register = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const { username, email, gender, password } = req.body;

      const existingUser = await authService.getUserByEmail(email);
      if (existingUser) {
        throw new ApiError(400, 'User with this email already exists');
      }

      const hashedPassword = await authService.hashPassword(password);

      const user = await prisma.user.create({
        data: {
          username,
          email,
          gender,
          hashedPassword: hashedPassword,
        },
      });

      const token = authService.generateToken(user.id);

      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      res.status(201).json({
        success: true,
        user: { id: user.id, username: user.username, email: user.email },
      });
    },
  );

  public login = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const { email, password } = req.body;

      const user = await authService.getUserByEmail(email);
      if (!user) {
        throw new ApiError(401, 'Invalid email or password');
      }

      // Compare against the database column 'hashedPassword'
      const isMatch = await authService.comparePassword(
        password,
        user.hashedPassword,
      );
      if (!isMatch) {
        throw new ApiError(401, 'Invalid email or password');
      }

      const token = authService.generateToken(user.id);

      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      res.status(200).json({
        success: true,
        user: { id: user.id, username: user.username, email: user.email },
      });
    },
  );
}

export const authController = new AuthController();
