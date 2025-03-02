import { goto } from '$app/navigation';
import type { Database } from '$lib/types/database.types';
import type { SupabaseClient, User, Session } from '@supabase/supabase-js';
import { getContext, setContext } from 'svelte';

interface UserStateProps {
	session: Session | null;
	supabase: SupabaseClient | null;
	user: User | null;
}

export interface Book {
	author: string | null;
	cover_image: string | null;
	created_at: string;
	description: string | null;
	finished_reading_on: string | null;
	genre: string | null;
	id: number;
	rating: number | null;
	started_reading_on: string | null;
	title: string;
	user_id: string;
}
export interface OpenAIBook {
	author: string;
	bookTitle: string;
}
type UpdatableBookFields = Omit<Book, 'id' | 'user_id' | 'created_at'>;

export class UserState {
	session = $state<Session | null>(null);
	supabase = $state<SupabaseClient<Database> | null>(null);
	user = $state<User | null>(null);
	allBooks = $state<Book[]>([]);
	userName = $state<string | null>(null);

	constructor(data: UserStateProps) {
		this.updateState(data);
	}

	updateState(data: UserStateProps) {
		this.session = data.session;
		this.supabase = data.supabase;
		this.user = data.user;
		this.fetchUserData();
	}

	async fetchUserData() {
		if (!this.user || !this.supabase) {
			return;
		}

		const userId = this.user.id;

		const [booksResponse, userNamesResponse] = await Promise.all([
			this.supabase.from('books').select('*').eq('user_id', userId),
			this.supabase.from('user_names').select('name').eq('user_id', userId).single()
		]);

		if (
			booksResponse.error ||
			!booksResponse.data ||
			userNamesResponse.error ||
			!userNamesResponse.data
		) {
			console.log('Error fetching user data');
			console.log({ booksError: booksResponse.error, userNamesError: userNamesResponse.error });
			return;
		}

		this.allBooks = booksResponse.data;
		this.userName = userNamesResponse.data.name;
	}

	getHighestRatedBooks() {
		if (!this.allBooks.length) return [];
		return this.allBooks
			.filter((book) => book.rating)
			.toSorted((a, z) => z.rating! - a.rating!)
			.slice(0, 9);
	}
	getUnreadBooks() {
		if (!this.allBooks.length) return [];
		return this.allBooks
			.filter((book) => !book.started_reading_on)
			.toSorted((a, z) => new Date(z.created_at).getTime() - new Date(a.created_at).getTime())
			.slice(0, 9);
	}

	getFavoriteGenre() {
		if (this.allBooks.filter((book) => book.genre).length === 0) return '';
		const genreCounts: { [key: string]: number } = {};

		this.allBooks.forEach((book) => {
			const genres = book.genre ? book.genre.split(',') : [];
			genres.forEach((genre) => {
				const trimmedGenre = genre.trim();
				if (trimmedGenre) {
					if (!genreCounts[trimmedGenre]) {
						genreCounts[trimmedGenre] = 1;
					} else {
						genreCounts[trimmedGenre]++;
					}
				}
			});
		});

		const mostCommonGenre = Object.keys(genreCounts).reduce((a, b) =>
			genreCounts[a] > genreCounts[b] ? a : b
		);

		return mostCommonGenre || '';
	}

	getBooksFromFavoriteGenre() {
		if (!this.allBooks.length) return [];
		const mostCommonGenre = this.getFavoriteGenre();

		return this.allBooks
			.filter((book) => book.genre?.includes(mostCommonGenre))
			.toSorted((a, z) => {
				const ratingA = a.rating || 0;
				const ratingZ = z.rating || 0;
				return ratingZ - ratingA;
			});
	}

	async updateBook(bookId: number, updateObject: Partial<UpdatableBookFields>) {
		if (!this.supabase) return;

		const { status, error } = await this.supabase
			.from('books')
			.update(updateObject)
			.eq('id', bookId);

		if (status === 204 && !error) {
			this.allBooks = this.allBooks.map((book) => {
				if (book.id === bookId) {
					return {
						...book,
						...updateObject
					};
				} else {
					return book;
				}
			});
		}
	}

	async uploadBookCover(id: number, file: File) {
		if (!this.user || !this.supabase) return;

		const filePath = `${this.user.id}/${new Date().getTime()}_${file.name}`;
		const { error: uploadError } = await this.supabase.storage
			.from('book-cover')
			.upload(filePath, file);

		if (uploadError) {
			console.log('Some error happened uploading the cover', uploadError);
			return;
		}

		const {
			data: { publicUrl }
		} = this.supabase.storage.from('book-cover').getPublicUrl(filePath);

		await this.updateBook(id, { cover_image: publicUrl });
	}

	getBookById(id: number) {
		return this.allBooks.find((book) => book.id === id);
	}

	async deleteBook(id: number) {
		if (!this.supabase) return;

		const { error, status } = await this.supabase.from('books').delete().eq('id', id);

		if (!error && status == 204) {
			this.allBooks = this.allBooks.filter((book) => book.id !== id);
		}

		goto('/private/dashboard');
	}

	async addBooks(books: OpenAIBook[]) {
		if (!this.supabase || !this.user) return;

		const userId = this.user.id;

		const processedBooks = books.map((book) => ({
			title: book.bookTitle,
			author: book.author,
			user_id: userId
		}));

		const { error } = await this.supabase.from('books').insert(processedBooks);

		if (error) {
			throw new Error(error.message);
		} else {
			const { data } = await this.supabase.from('books').select('*').eq('user_id', userId);

			if (!data) {
				throw new Error('Could not fetch books');
			}
			this.allBooks = data;
		}
	}

	async logout() {
		await this.supabase?.auth.signOut();
		goto('/');
	}

	async updateAccountData(email: string, userName: string) {
		if (!this.session) return;

		try {
			const response = await fetch('/api/update-account', {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${this.session.access_token}`
				},
				body: JSON.stringify({
					email,
					userName
				})
			});

			if (response.ok) {
				this.userName = userName;
			}
		} catch (error) {
			console.log('Failed to update account:', error);
		}
	}

	async deleteAccount() {
		if (!this.session) return;

		try {
			const response = await fetch('/api/delete-account', {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${this.session.access_token}`
				}
			});

			if (response.ok) {
				await this.logout();
			}
		} catch (error) {
			console.log('Failed to delete account:', error);
		}
	}
}

const USER_STATE_KEY = Symbol('USER_STATE');

export function setUserState(data: UserStateProps) {
	return setContext(USER_STATE_KEY, new UserState(data));
}

export function getUserState() {
	return getContext<ReturnType<typeof setUserState>>(USER_STATE_KEY);
}
