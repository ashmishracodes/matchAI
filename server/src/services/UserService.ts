import prisma from '../models';
import { getGeminiEmbedding } from '../utils/gemini';
import { Gender } from '@prisma/client';

export class UserService {

  public async updateInterests(userId: string, interests: string) {
    try {
      const interestsEmbedding = await getGeminiEmbedding(interests);
      return prisma.user.update({
        where: { id: userId },
        data: {
          interests,
          interestsEmbedding,
        },
      });
    } catch (error) {
      console.error('[services/UserService] Error updating interests:', error);
      throw error;
    }
  }
  
  public async setLastRoom(userId: string, roomId: string) {
    try {
      return prisma.user.update({
        where: { id: userId },
        data: { lastRoomId: roomId },
      });
    } catch (error) {
      console.error('[services/UserService] Error setting last room:', error);
      throw error;
    }
  }

  public async clearLastRoom(userId: string) {
    try {
      return prisma.user.update({
        where: { id: userId },
        data: { lastRoomId: null },
      });
    } catch (error) {
      console.error('[services/UserService] Error clearing last room:', error);
      throw error;
    }
  }

  public async setName(userId: string, name: string) {
    try {
      return prisma.user.update({
        where: { id: userId },
        data: { username: name },
      });
    } catch (error) {
      console.error('[services/UserService] Error setting name:', error);
      throw error;
    }
  }

  public async setGender(userId: string, gender: Gender) {
    try {
      return prisma.user.update({
        where: { id: userId },
        data: { gender },
      });
    } catch (error) {
      console.error('[services/UserService] Error setting gender:', error);
      throw error;
    }
  }

}
