import { Router } from 'express';
import { userController } from '../controllers/user.controller';
import { authMiddleware } from '../middleware/auth.middleware';
import { validate } from '../middleware/validate.middleware';
import {
  updateInterestsValidation,
  setLastRoomValidation,
  clearLastRoomValidation,
  setNameValidation,
  setGenderValidation,
} from '../validations/user.validation';

const router = Router();

router.post(
  '/update-interests',
  authMiddleware,
  validate(updateInterestsValidation),
  userController.updateInterests,
);
router.post(
  '/set-last-room',
  authMiddleware,
  validate(setLastRoomValidation),
  userController.setLastRoom,
);
router.post(
  '/clear-last-room',
  authMiddleware,
  validate(clearLastRoomValidation),
  userController.clearLastRoom,
);
router.post(
  '/set-name',
  authMiddleware,
  validate(setNameValidation),
  userController.setName,
);

export default router;
