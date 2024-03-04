import { GraphQLFieldConfig, GraphQLList } from 'graphql';
import { GqlContext, UUID } from './types.js';
import { MemberType } from './types/MemberType.js';
import { MemberTypeId } from './types/MemberTypeId.js';
import { PostType } from './types/Post.js';
import { ProfileType } from './types/Profile.js';
import { UUIDType } from './types/UUID.js';
import { UserType } from './types/User.js';

export const MemberTypeQueries = {
  memberType: {
    type: MemberType,
    args: {
      id: {
        type: MemberTypeId,
      },
    },
    async resolve(_, args, ctx) {
      return ctx.prisma.memberType.findUnique({ where: { id: args.id } });
    },
  },
  memberTypes: {
    type: new GraphQLList(MemberType),
    async resolve(_, __, ctx) {
      return ctx.prisma.memberType.findMany();
    },
  },
} satisfies {
  memberType: GraphQLFieldConfig<void, GqlContext, { id: UUID }>;
  memberTypes: GraphQLFieldConfig<void, GqlContext>;
};

export const PostQueries = {
  post: {
    type: PostType,
    args: {
      id: {
        type: UUIDType,
      },
    },
    async resolve(_, args, ctx) {
      return ctx.prisma.post.findUnique({ where: { id: args.id } });
    },
  },
  posts: {
    type: new GraphQLList(PostType),
    async resolve(_, __, ctx) {
      return ctx.prisma.post.findMany();
    },
  },
} satisfies {
  post: GraphQLFieldConfig<void, GqlContext, { id: UUID }>;
  posts: GraphQLFieldConfig<void, GqlContext>;
};

export const ProfileQueries = {
  profile: {
    type: ProfileType,
    args: {
      id: {
        type: UUIDType,
      },
    },
    async resolve(_, args, ctx) {
      return ctx.prisma.profile.findUnique({ where: { id: args.id } });
    },
  },
  profiles: {
    type: new GraphQLList(ProfileType),
    async resolve(_, __, ctx) {
      return ctx.prisma.profile.findMany();
    },
  },
} satisfies {
  profile: GraphQLFieldConfig<void, GqlContext, { id: UUID }>;
  profiles: GraphQLFieldConfig<void, GqlContext>;
};

export const UserQueries = {
  user: {
    type: UserType,
    args: {
      id: {
        type: UUIDType,
      },
    },
    async resolve(_, args, ctx) {
      return ctx.prisma.user.findUnique({ where: { id: args.id } });
    },
  },
  users: {
    type: new GraphQLList(UserType),
    async resolve(_, __, ctx) {
      return ctx.prisma.user.findMany();
    },
  },
} satisfies {
  user: GraphQLFieldConfig<void, GqlContext, { id: UUID }>;
  users: GraphQLFieldConfig<void, GqlContext>;
};
