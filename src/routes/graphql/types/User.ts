import {
  GraphQLFloat,
  GraphQLInputObjectType,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import { GqlContext, User } from '../types.js';
import { PostType } from './Post.js';
import { ProfileType } from './Profile.js';
import { UUIDType } from './UUID.js';

export const UserType: GraphQLObjectType<User, GqlContext> = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: {
      type: UUIDType,
    },
    name: {
      type: GraphQLString,
    },
    balance: {
      type: GraphQLFloat,
    },
    profile: {
      type: ProfileType,
      async resolve(src, _, ctx) {
        return ctx.prisma.profile.findUnique({ where: { userId: src.id } });
      },
    },
    posts: {
      type: new GraphQLList(PostType),
      async resolve(src, _, ctx) {
        return ctx.prisma.post.findMany({ where: { authorId: src.id } });
      },
    },
    userSubscribedTo: {
      type: new GraphQLList(UserType),
      async resolve(src, _, ctx) {
        const results = await ctx.prisma.subscribersOnAuthors.findMany({
          where: {
            subscriberId: src.id,
          },
          select: {
            author: true,
          },
        });
        return results.map((result) => result.author);
      },
    },
    subscribedToUser: {
      type: new GraphQLList(UserType),
      async resolve(src, _, ctx) {
        const results = await ctx.prisma.subscribersOnAuthors.findMany({
          where: {
            authorId: src.id,
          },
          select: {
            subscriber: true,
          },
        });
        return results.map((result) => result.subscriber);
      },
    },
  }),
});

export const CreateUserInputType = new GraphQLInputObjectType({
  name: 'CreateUserInput',
  fields: {
    name: {
      type: GraphQLString,
    },
    balance: {
      type: GraphQLFloat,
    },
  },
});

export const ChangeUserInputType = new GraphQLInputObjectType({
  name: 'ChangeUserInput',
  fields: {
    name: {
      type: GraphQLString,
    },
    balance: {
      type: GraphQLFloat,
    },
  },
});
