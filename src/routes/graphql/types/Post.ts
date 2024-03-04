import { GraphQLInputObjectType, GraphQLObjectType, GraphQLString } from 'graphql';
import { GqlContext, Post } from '../types.js';
import { UUIDType } from './UUID.js';

export const PostType: GraphQLObjectType<Post, GqlContext> = new GraphQLObjectType({
  name: 'Post',
  fields: () => ({
    id: {
      type: UUIDType,
    },
    title: {
      type: GraphQLString,
    },
    content: {
      type: GraphQLString,
    },
    authorId: {
      type: UUIDType,
    },
  }),
});

export const CreatePostInputType = new GraphQLInputObjectType({
  name: 'CreatePostInput',
  fields: {
    title: {
      type: GraphQLString,
    },
    content: {
      type: GraphQLString,
    },
    authorId: {
      type: UUIDType,
    },
  },
});

export const ChangePostInputType = new GraphQLInputObjectType({
  name: 'ChangePostInput',
  fields: {
    title: {
      type: GraphQLString,
    },
    content: {
      type: GraphQLString,
    },
  },
});
