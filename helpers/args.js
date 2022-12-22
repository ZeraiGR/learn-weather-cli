const getArgs = (args) => {
	const res = {};

	const [exs, file, ...rest] = args;

	rest.forEach((item, idx, arr) => {
		if (item.charAt(0) === '-') {
			if (idx === arr.length - 1) {
				res[arr[idx].substring(1)] = true;
			} else if (arr[idx + 1].charAt(0) !== '-') {
				res[arr[idx].substring(1)] = arr[idx + 1];
			} else {
				res[arr[idx].substring(1)] = true;
			}
		}
	});
	
	return res;
};

export { getArgs };