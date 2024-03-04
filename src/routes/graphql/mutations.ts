import { GraphQLBoolean, GraphQLFieldConfig } from 'graphql';
import { GqlContext, Post, Profile, SubscribeUpdate, UUID, UserUpdate } from './types.js';
import { ChangePostInputType, CreatePostInputType, PostType } from './types/Post.js';
import {
  ChangeProfileInputType,
  CreateProfileInputType,
  ProfileType,
} from './types/Profile.js';
import { UUIDType } from './types/UUID.js';
import { ChangeUserInputType, CreateUserInputType, UserType } from './types/User.js';

export const PostMutations = {
  createPost: {
    type: PostType,
    args: {
      dto: {
        type: CreatePostInputType,
      },
    },
    async resolve(_, args, ctx) {
      return ctx.prisma.post.create({ data: args.dto });
    },
  },
  changePost: {
    type: PostType,
    args: {
      id: {
        type: UUIDType,
      },
      dto: {
        type: ChangePostInputType,
      },
    },
    async resolve(_, args, ctx) {
      return ctx.prisma.post.update({ where: { id: args.id }, data: args.dto });
    },
  },
  deletePost: {
    type: GraphQLBoolean,
    args: {
      id: {
        type: UUIDType,
      },
    },
    async resolve(_, args, ctx) {
      try {
        await ctx.prisma.post.delete({ where: { id: args.id } });
        return true;
      } catch (err) {
        return false;
      }
    },
  },
} satisfies {
  createPost: GraphQLFieldConfig<void, GqlContext, { dto: Post }>;
  changePost: GraphQLFieldConfig<void, GqlContext, { id: UUID; dto: Post }>;
  deletePost: GraphQLFieldConfig<void, GqlContext, { id: UUID }>;
};

export const ProfileMutations = {
  createProfile: {
    type: ProfileType,
    args: {
      dto: {
        type: CreateProfileInputType,
      },
    },
    async resolve(_, args, ctx) {
      return ctx.prisma.profile.create({ data: args.dto });
    },
  },
  changeProfile: {
    type: ProfileType,
    args: {
      id: {
        type: UUIDType,
      },
      dto: {
        type: ChangeProfileInputType,
      },
    },
    async resolve(_, args, ctx) {
      return ctx.prisma.profile.update({ where: { id: args.id }, data: args.dto });
    },
  },
  deleteProfile: {
    type: GraphQLBoolean,
    args: {
      id: {
        type: UUIDType,
      },
    },
    async resolve(_, args, ctx) {
      try {
        await ctx.prisma.profile.delete({ where: { id: args.id } });
        return true;
      } catch (err) {
        return false;
      }
    },
  },
} satisfies {
  createProfile: GraphQLFieldConfig<void, GqlContext, { dto: Profile }>;
  changeProfile: GraphQLFieldConfig<void, GqlContext, { id: UUID; dto: Profile }>;
  deleteProfile: GraphQLFieldConfig<void, GqlContext, { id: UUID }>;
};

export const UserMutations = {
  createUser: {
    type: UserType,
    args: {
      dto: {
        type: CreateUserInputType,
      },
    },
    async resolve(_, args, ctx) {
      return ctx.prisma.user.create({ data: args.dto });
    },
  },
  changeUser: {
    type: UserType,
    args: {
      id: {
        type: UUIDType,
      },
      dto: {
        type: ChangeUserInputType,
      },
    },
    async resolve(_, args, ctx) {
      return ctx.prisma.user.update({ where: { id: args.id }, data: args.dto });
    },
  },
  deleteUser: {
    type: GraphQLBoolean,
    args: {
      id: {
        type: UUIDType,
      },
    },
    async resolve(_, args, ctx) {
      try {
        await ctx.prisma.user.delete({ where: { id: args.id } });
        return true;
      } catch (err) {
        return false;
      }
    },
  },
} satisfies {
  createUser: GraphQLFieldConfig<void, GqlContext, { dto: UserUpdate }>;
  changeUser: GraphQLFieldConfig<void, GqlContext, { id: UUID; dto: UserUpdate }>;
  deleteUser: GraphQLFieldConfig<void, GqlContext, { id: UUID }>;
};

export const SubscribeMutations = {
  subscribeTo: {
    type: UserType,
    args: {
      userId: {
        type: UUIDType,
      },
      authorId: {
        type: UUIDType,
      },
    },
    async resolve(_, args, ctx) {
      await ctx.prisma.subscribersOnAuthors.create({
        data: {
          subscriberId: args.userId,
          authorId: args.authorId,
        },
      });
      return ctx.prisma.user.findUnique({ where: { id: args.userId } });
    },
  },
  unsubscribeFrom: {
    type: GraphQLBoolean,
    args: {
      userId: {
        type: UUIDType,
      },
      authorId: {
        type: UUIDType,
      },
    },
    async resolve(_, args, ctx) {
      try {
        await ctx.prisma.subscribersOnAuthors.deleteMany({
          where: {
            subscriberId: args.userId,
            authorId: args.authorId,
          },
        });
        return true;
      } catch {
        return false;
      }
    },
  },
} satisfies {
  subscribeTo: GraphQLFieldConfig<void, GqlContext, SubscribeUpdate>;
  unsubscribeFrom: GraphQLFieldConfig<void, GqlContext, SubscribeUpdate>;
};
