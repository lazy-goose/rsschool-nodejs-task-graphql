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
        return ctx.loaders.profileByUserId.load(src.id);
      },
    },
    posts: {
      type: new GraphQLList(PostType),
      async resolve(src, _, ctx) {
        return ctx.loaders.postsByAuthorId.load(src.id);
      },
    },
    userSubscribedTo: {
      type: new GraphQLList(UserType),
      async resolve(src, _, ctx) {
        const userSubs = src.userSubscribedTo || [];
        return ctx.loaders.userById.loadMany(userSubs.map((s) => s.authorId));
      },
    },
    subscribedToUser: {
      type: new GraphQLList(UserType),
      async resolve(src, _, ctx) {
        const subsToUser = src.subscribedToUser || [];
        return ctx.loaders.userById.loadMany(subsToUser.map((s) => s.subscriberId));
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
