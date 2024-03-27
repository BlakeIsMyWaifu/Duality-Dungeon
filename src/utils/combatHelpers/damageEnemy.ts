import { useCombatStore } from '~/state/combatStore'
import { type Lane } from '~/types/Combat'

export function damageEnemy(lane: Lane, index: number, amount: number) {
	const enemy = useCombatStore.getState().enemies[lane][index]
	if (!enemy) return

	if (enemy.shield === 0) {
		return useCombatStore.getState().updateEnemy(lane, 0, { currentHealth: enemy.currentHealth - amount })
	}

	const updatedShield = enemy.shield - amount
	const updatedHealth = enemy.currentHealth + updatedShield
	const updatedData =
		updatedShield < 0
			? {
					currentHealth: updatedHealth,
					shield: 0
				}
			: { shield: updatedShield }
	useCombatStore.getState().updateEnemy(lane, index, updatedData)
}

export function damageFront(lane: Lane, amount: number) {
	damageEnemy(lane, 0, amount)
}

export function damageLane(lane: Lane, amount: number) {
	const enemies = useCombatStore.getState().enemies[lane]
	enemies.forEach((_enemy, i) => {
		damageEnemy(lane, i, amount)
	})
}
