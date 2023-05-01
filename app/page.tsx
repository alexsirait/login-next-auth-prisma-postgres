import { getServerSession } from 'next-auth';
import React from 'react';
import { authOptions } from './api/auth/[...nextauth]/route';
import User from './user';
import { LoginBtn, LogoutBtn } from './auth';

export default async function Home() {
	const session = await getServerSession(authOptions);
	return (
		<>
			<main>
				<LoginBtn />
				<LogoutBtn />
				<span>helo world</span>
				<h1>Server Session</h1>
				<pre>{JSON.stringify(session)}</pre>
				<h1>client call</h1>
				<User />
			</main>
		</>
	);
}
