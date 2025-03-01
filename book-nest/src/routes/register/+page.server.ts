import type { Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';

interface ReturnObject {
	success: boolean;
	errors: string[];
	name: string;
	email: string;
	password: string;
	passwordConfirmation: string;
}

export const actions: Actions = {
	default: async ({ request, locals: { supabase } }) => {
		const formData = await request.formData();
		const name = formData.get('name') as string;
		const email = formData.get('email') as string;
		const password = formData.get('password') as string;
		const passwordConfirmation = formData.get('passwordConfirmation') as string;

		const returnObject: ReturnObject = {
			success: true,
			email,
			name,
			password,
			passwordConfirmation,
			errors: []
		};

		if (name.length < 3) {
			console.log('Name is too short');
			returnObject.errors.push('The name is too short. Must be at least 3 characters');
		}

		if (!email.length) {
			returnObject.errors.push('Email is required');
		}

		if (!password.length) {
			returnObject.errors.push('Password is required');
		}

		if (password !== passwordConfirmation) {
			returnObject.errors.push('Password do not match');
		}

		if (returnObject.errors.length) {
			returnObject.success = false;
			return returnObject;
		}

		// Registration flow;
		const { data, error } = await supabase.auth.signUp({
			email,
			password
		});

		if (error || !data.user) {
			console.log('There was an error signing up: ', error);
			returnObject.success = false;
			return fail(400, returnObject as any);
		}

		const userId = data.user.id;

		await supabase.from('user_names').insert([{ user_id: userId, name }]);

		redirect(303, '/private/dashboard');
	}
};
