import { Type } from '@fastify/type-provider-typebox';
import { GraphQLObjectType, GraphQLSchema } from 'graphql';
import {
  PostMutations,
  ProfileMutations,
  SubscribeMutations,
  UserMutations,
} from './mutations.js';
import {
  MemberTypeQueries,
  PostQueries,
  ProfileQueries,
  UserQueries,
} from './queries.js';

export const gqlResponseSchema = Type.Partial(
  Type.Object({
    data: Type.Any(),
    errors: Type.Any(),
  }),
);

export const createGqlResponseSchema = {
  body: Type.Object(
    {
      query: Type.String(),
      variables: Type.Optional(Type.Record(Type.String(), Type.Any())),
    },
    {
      additionalProperties: false,
    },
  ),
};

export const gqlRootSchema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: {
      ...MemberTypeQueries,
      ...PostQueries,
      ...ProfileQueries,
      ...UserQueries,
    },
  }),
  mutation: new GraphQLObjectType({
    name: 'Mutation',
    fields: {
      ...PostMutations,
      ...ProfileMutations,
      ...UserMutations,
      ...SubscribeMutations,
    },
  }),
});
