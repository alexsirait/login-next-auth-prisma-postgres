import { PrismaClient } from '@prisma/client';
import { compare } from 'bcrypt';
import NextAuth, { type NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
	providers: [
		CredentialsProvider({
			name: 'Sign in',
			credentials: {
				email: {
					label: 'email',
					type: 'email',
					placeholder: 'hello@gmail.com',
				},
				password: { label: 'Password', type: 'password' },
			},
			async authorize(credentials) {
				if (!credentials?.email || !credentials?.password) {
					return null;
				}

				const user = await prisma.user.findUnique({
					where: {
						email: credentials?.email,
					},
				});

				if (!user) {
					return null;
				}

				const checkPassword = await compare(
					credentials?.password,
					user?.password
				);

				if (!checkPassword) {
					return null;
				}

				return {
					id: user.id + '',
					email: user.email,
					name: user.name,
					randomKey: 'this is random key',
				};
			},
		}),
	],
	callbacks: {
		session: ({ session, token }) => {
			return {
				...session,
				user: {
					...session.user,
					id: token.id,
					randomKey: token.randomKey,
					remark: 'ooo alekk',
				},
			};
		},
		jwt: ({ token, user }: { token: any; user: any }) => {
			if (user) {
				const dataUser = user as unknown as any;
				return {
					...token,
					id: dataUser.id,
					randomKey: dataUser.randomKey,
				};
			}
			return token;
		},
	},
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
