import { Profile } from '@prisma/client';
import {
  GraphQLBoolean,
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import { GqlContext } from '../types.js';
import { MemberType } from './MemberType.js';
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
        return ctx.prisma.user.findUnique({ where: { id: src.userId } });
      },
    },
    memberType: {
      type: MemberType,
      async resolve(src, _, ctx) {
        return ctx.prisma.memberType.findUnique({ where: { id: src.memberTypeId } });
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
