import { Semaphore } from '../semaphore';

export class SemaphorePoll {
	private _semaphore: Semaphore;
	constructor(limit: number) {
		this._semaphore = new Semaphore(limit);
	}

	async add(execute: () => Promise<any>) {
		try {
			await this._semaphore.wait();
			await execute();
			this._semaphore.signal();
		} catch (e: any) {
			this._semaphore.signal();
			throw e;
		}
	}
}