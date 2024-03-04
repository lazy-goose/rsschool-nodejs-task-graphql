import { PrismaClient } from '@prisma/client';
import DataLoader from 'dataloader';
import { Post, UUID } from './types.js';

export const createLoaders = (prisma: PrismaClient) => {
  const memberTypeById = new DataLoader(async (ids: readonly string[]) => {
    const memberTypeList = await prisma.memberType.findMany({
      where: { id: { in: [...ids] } },
    });
    return ids.map((id) => memberTypeList.find((m) => m.id === id));
  });

  const postById = new DataLoader(async (ids: readonly UUID[]) => {
    const postList = await prisma.post.findMany({
      where: { id: { in: [...ids] } },
    });
    return ids.map((id) => postList.find((p) => p.id === id));
  });

  const postsByAuthorId = new DataLoader(async (ids: readonly UUID[]) => {
    const postsUngroupedList = await prisma.post.findMany({
      where: { authorId: { in: [...ids] } },
    });
    const groupedByAuthorId = {} as Record<UUID, Post[]>;
    for (const post of postsUngroupedList) {
      const map = groupedByAuthorId;
      const key = post.authorId as UUID;
      const val = post as Post;
      map[key] = map[key] ? [...map[key], val] : [val];
    }
    return ids.map((id) => groupedByAuthorId[id]);
  });

  const profileById = new DataLoader(async (ids: readonly UUID[]) => {
    const profileList = await prisma.profile.findMany({
      where: { id: { in: [...ids] } },
    });
    profileList.forEach((p) => {
      profileByUserId.prime(p.userId as UUID, p);
    });
    return ids.map((id) => profileList.find((p) => p.id === id));
  });

  const profileByUserId = new DataLoader(async (ids: readonly UUID[]) => {
    const profileList = await prisma.profile.findMany({
      where: { userId: { in: [...ids] } },
    });
    profileList.forEach((p) => {
      profileById.prime(p.id as UUID, p);
    });
    return ids.map((id) => profileList.find((p) => p.userId === id));
  });

  const userById = new DataLoader(async (ids: readonly UUID[]) => {
    const userList = await prisma.user.findMany({
      where: { id: { in: [...ids] } },
      include: {
        userSubscribedTo: true,
        subscribedToUser: true,
      },
    });
    return ids.map((id) => userList.find((u) => u.id === id));
  });

  return {
    memberTypeById,
    postById,
    postsByAuthorId,
    profileById,
    profileByUserId,
    userById,
  };
};
