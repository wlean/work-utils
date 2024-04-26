import { Semaphore } from './index';
const s = new Semaphore(1);

const run = async (x: number) => {
	await s.wait();
	setTimeout(() => {
		console.log(x);
		s.signal();
	}, 1000);
};

run(1);
run(2);
run(3);
run(4);
run(5);
