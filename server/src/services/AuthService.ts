import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../models';

export class AuthService {
  public async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }
  public async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  public generateToken(userId: string): string {
    const secret = process.env.JWT_SECRET || 'secret-fallback';
    return jwt.sign({ id: userId }, secret, { expiresIn: '7d' });
  }
  public async getUserByEmail(email: string) {
    return prisma.user.findUnique({ where: { email } });
  }
}

export const authService = new AuthService();
