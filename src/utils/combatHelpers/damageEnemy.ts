import { useCombatStore } from '~/state/combatStore'
import { type Lane } from '~/types/Combat'

export function damageFront(lane: Lane, amount: number) {
	const [firstEnemy] = useCombatStore.getState().enemies[lane]
	if (!firstEnemy) return

	if (firstEnemy.shield === 0) {
		return useCombatStore.getState().updateEnemy(lane, 0, { currentHealth: firstEnemy.currentHealth - amount })
	}

	const updatedShield = firstEnemy.shield - amount
	const updatedHealth = firstEnemy.currentHealth + updatedShield
	const updatedData =
		updatedShield < 0
			? {
					currentHealth: updatedHealth,
					shield: 0
				}
			: { shield: updatedShield }
	useCombatStore.getState().updateEnemy(lane, 0, updatedData)
}
