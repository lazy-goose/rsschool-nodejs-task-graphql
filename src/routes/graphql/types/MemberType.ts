import { GraphQLFloat, GraphQLInt, GraphQLObjectType } from 'graphql';
import { GqlContext, MemberType } from '../types.js';
import { MemberTypeId } from './MemberTypeId.js';

export const MemberTypeType: GraphQLObjectType<MemberType, GqlContext> =
  new GraphQLObjectType({
    name: 'MemberType',
    fields: () => ({
      id: {
        type: MemberTypeId,
      },
      discount: {
        type: GraphQLFloat,
      },
      postsLimitPerMonth: {
        type: GraphQLInt,
      },
    }),
  });
