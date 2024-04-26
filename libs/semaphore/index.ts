export class Semaphore {
	private queue: ((value: void) => void)[] = [];
	private _countLimit: number;
	constructor(limit: number) {
		this._countLimit = limit;
	}

	async wait() {
		if (this._countLimit > 0) {
			this._countLimit--;
		} else {
			await new Promise(resolve => this.queue.push(resolve));
		}
	}

	signal() {
		if (this.queue.length > 0) {
			const resolve = this.queue.shift()!;
			resolve();
		} else {
			this._countLimit++;
		}
	}
}