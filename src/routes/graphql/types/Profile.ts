import {
  GraphQLBoolean,
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import { GqlContext, Profile } from '../types.js';
import { MemberTypeType } from './MemberType.js';
import { MemberTypeId } from './MemberTypeId.js';
import { UUIDType } from './UUID.js';
import { UserType } from './User.js';

export const ProfileType: GraphQLObjectType<Profile, GqlContext> = new GraphQLObjectType({
  name: 'Profile',
  fields: () => ({
    id: {
      type: UUIDType,
    },
    isMale: {
      type: GraphQLBoolean,
    },
    yearOfBirth: {
      type: GraphQLInt,
    },
    memberTypeId: {
      type: GraphQLString,
    },
    userId: {
      type: UUIDType,
    },
    user: {
      type: UserType,
      async resolve(src, _, ctx) {
        return ctx.loaders.userById.load(src.userId);
      },
    },
    memberType: {
      type: MemberTypeType,
      async resolve(src, _, ctx) {
        return ctx.loaders.memberTypeById.load(src.memberTypeId);
      },
    },
  }),
});

export const CreateProfileInputType = new GraphQLInputObjectType({
  name: 'CreateProfileInput',
  fields: {
    isMale: {
      type: GraphQLBoolean,
    },
    yearOfBirth: {
      type: GraphQLInt,
    },
    memberTypeId: {
      type: GraphQLString,
    },
    userId: {
      type: UUIDType,
    },
  },
});

export const ChangeProfileInputType = new GraphQLInputObjectType({
  name: 'ChangeProfileInput',
  fields: {
    isMale: {
      type: GraphQLBoolean,
    },
    yearOfBirth: {
      type: GraphQLInt,
    },
    memberTypeId: {
      type: MemberTypeId,
    },
  },
});
