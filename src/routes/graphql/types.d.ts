import { PrismaClient } from '@prisma/client';
import { UUID as CryptoUUID } from 'crypto';
import { MemberTypeId } from '../member-types/schemas.ts';
import { createLoaders } from './createLoaders.ts';

export type UUID = CryptoUUID;

export type MemberTypeId = `${MemberTypeId}`;

export type MemberType = {
  id: MemberTypeId;
  discount: number;
  postsLimitPerMonth: number;
};

export type Post = {
  id: UUID;
  title: string;
  content: string;
  authorId: UUID;
};

export type Profile = {
  id: UUID;
  isMale: boolean;
  yearOfBirth: number;
  userId: UUID;
  memberTypeId: UUID;
};

export type Subscription = {
  subscriberId: UUID;
  authorId: UUID;
};

export type User = {
  id: UUID;
  name: string;
  balance: number;
  userSubscribedTo?: Subscription[];
  subscribedToUser?: Subscription[];
};

export type SubscriptionUpdate = {
  userId: UUID;
  authorId: UUID;
};

export type UserUpdate = {
  name: string;
  balance: number;
};


/* Graphql specific */

export type GqlContext = {
  prisma: PrismaClient;
  loaders: ReturnType<typeof createLoaders>;
};
