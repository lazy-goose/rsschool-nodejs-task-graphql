import { GraphQLFloat, GraphQLInt, GraphQLObjectType } from 'graphql';
import { GqlContext, Member } from '../types.js';
import { MemberTypeId } from './MemberTypeId.js';

export const MemberType: GraphQLObjectType<Member, GqlContext> = new GraphQLObjectType({
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
