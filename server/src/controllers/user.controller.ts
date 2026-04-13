import { Request, Response, NextFunction } from 'express';
import { UserService } from '../services/UserService';
import { catchAsync } from '../utils/catchAsync';

export class UserController {
  private userService: UserService;
  constructor() {
    this.userService = new UserService();
  }

  public updateInterests = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const { userId, interests } = req.body;
      const result = await this.userService.updateInterests(userId, interests);
      res
        .status(200)
        .json({ success: true, message: 'Interests updated successfully' });
    },
  );

  public setLastRoom = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const { userId, roomId } = req.body;
      const result = await this.userService.setLastRoom(userId, roomId);
      res
        .status(200)
        .json({ success: true, message: 'Last room set successfully' });
    },
  );

  public clearLastRoom = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const { userId } = req.body;
      const result = await this.userService.clearLastRoom(userId);
      res
        .status(200)
        .json({ success: true, message: 'Last room cleared successfully' });
    },
  );

  public setName = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const { userId, name } = req.body;
      const result = await this.userService.setName(userId, name);
      res.status(200).json({ success: true, message: 'Name set successfully' });
    },
  );

  public setGender = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const { userId, gender } = req.body;
      const result = await this.userService.setGender(userId, gender as any);
      res
        .status(200)
        .json({ success: true, message: 'Gender set successfully' });
    },
  );
}

export const userController = new UserController();
