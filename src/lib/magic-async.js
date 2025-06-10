async function magic(...fns) {
	for (const fn of fns) {
		await Promise.resolve(fn())
	}
}

function _f1() {
	return new Promise((resolve) => {
		setTimeout(() => {
			console.log('1')
			resolve()
		}, 1000)
	})
}

function _f2() {
	return new Promise((resolve) => {
		setTimeout(() => {
			console.log('2')
			resolve()
		}, 5000)
	})
}

function f1() {
	console.log(1)
	// return Promise.resolve();
}

function f2() {
	console.log(2)
	// return Promise.resolve();
}

function f3() {
	console.log('done')
}

// Run them in order:
// magic(f1, f2, f3);

magic(_f1, _f2, f3)
