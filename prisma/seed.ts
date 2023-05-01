import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';
const prisma = new PrismaClient();
async function main() {
	const password = await hash('test', 12);
	const alice = await prisma.user.upsert({
		where: { email: 'test@test.com' },
		update: {},
		create: {
			email: 'alice@prisma.io',
			name: 'Alice',
			password,
		},
	});
	console.log({ alice });
}
main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
