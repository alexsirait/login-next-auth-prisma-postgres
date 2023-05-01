'use client';
import { signIn, signOut } from 'next-auth/react';

export function LoginBtn() {
	return (
		<div>
			<button onClick={() => signIn()}>Sign in</button>
		</div>
	);
}

export function LogoutBtn() {
	return (
		<div>
			<button onClick={() => signOut()}>Sign out</button>
		</div>
	);
}
