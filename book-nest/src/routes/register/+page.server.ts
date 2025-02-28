import type { Actions } from './$types';

interface ReturnObject {
	success: boolean;
	errors: string[];
}

export const actions: Actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		const name = formData.get('name') as string;
		const email = formData.get('email') as string;
		const password = formData.get('password') as string;
		const passwordConfirmation = formData.get('passwordConfirmation') as string;

		const returnObject: ReturnObject = {
			success: true,
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

		return returnObject;
	}
};
