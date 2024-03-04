import { GraphQLFieldConfig, GraphQLList } from 'graphql';
import {
  ResolveTree,
  parseResolveInfo,
  simplifyParsedResolveInfoFragmentWithType as simplifyResolve,
} from 'graphql-parse-resolve-info';
import { GqlContext, UUID } from './types.js';
import { MemberTypeType } from './types/MemberType.js';
import { MemberTypeId } from './types/MemberTypeId.js';
import { PostType } from './types/Post.js';
import { ProfileType } from './types/Profile.js';
import { UUIDType } from './types/UUID.js';
import { UserType } from './types/User.js';

export const MemberTypeQueries = {
  memberType: {
    type: MemberTypeType,
    args: {
      id: {
        type: MemberTypeId,
      },
    },
    async resolve(_, args, ctx) {
      return ctx.loaders.memberTypeById.load(args.id);
    },
  },
  memberTypes: {
    type: new GraphQLList(MemberTypeType),
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
      return ctx.loaders.postById.load(args.id);
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
      return ctx.loaders.profileById.load(args.id);
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
      return ctx.loaders.userById.load(args.id);
    },
  },
  users: {
    type: new GraphQLList(UserType),
    async resolve(_, __, ctx, info) {
      const resolveInfo = simplifyResolve(
        parseResolveInfo(info) as ResolveTree,
        new GraphQLList(UserType),
      );
      const users = await ctx.prisma.user.findMany({
        include: {
          userSubscribedTo: Boolean(resolveInfo.fields['userSubscribedTo']),
          subscribedToUser: Boolean(resolveInfo.fields['subscribedToUser']),
        },
      });
      users.forEach((u) => {
        ctx.loaders.userById.prime(u.id as UUID, u);
      });
      return users;
    },
  },
} satisfies {
  user: GraphQLFieldConfig<void, GqlContext, { id: UUID }>;
  users: GraphQLFieldConfig<void, GqlContext>;
};
