export function randomValue<T>(array: T[]) {
	const [first] = randomValues(array, 1)
	return first
}

export function randomValues<T>(array: T[], amount: number) {
	const shuffled = Array.from(array).sort(() => 0.5 - Math.random())
	return shuffled.slice(0, amount)
}

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
