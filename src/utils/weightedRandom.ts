export function weightedRandom<T>(data: [value: T, weight: number][]) {
	if (!data.length) return null as T

	const total = data.reduce((a, [, weight]) => a + weight, 0)
	const threshold = Math.random() * total

	let current = 0
	for (let i = 0; i < data.length - 1; i++) {
		current += data[i][1]

		if (current >= threshold) {
			return data[i][0]
		}
	}

	return data.at(-1)![0]
}
