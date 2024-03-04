import { PrismaClient } from '@prisma/client';
import { UUID as CryptoUUID } from 'crypto';

export type UUID = CryptoUUID;

export type Member = {
  id: UUID;
  discount: number;
  postsLimitPerMonth: number;
};

export type Post = {
  id: UUID;
  title: string;
  content: string;
  authorId: string;
};

export type Profile = {
  id: UUID;
  isMale: boolean;
  yearOfBirth: number;
  userId: string;
  memberTypeId: string;
};

export type Subscribe = {
  subscriberId: UUID;
  authorId: UUID;
};

export type User = {
  id: UUID;
  name: string;
  balance: number;
  userSubscribedTo?: Subscribe[];
  subscribedToUser?: Subscribe[];
};

export type UserUpdate = {
  name: string;
  balance: number;
};

export type SubscribeUpdate = {
  userId: UUID;
  authorId: UUID;
};

/* Graphql specific */

export type GqlContext = {
  prisma: PrismaClient;
};
