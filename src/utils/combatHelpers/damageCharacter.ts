import { useCombatStore } from '~/state/combatStore/combatStore'
import { useSaveStore } from '~/state/saveStore'
import { type Lane } from '~/types/Combat'

export function damageCharacter(lane: Lane, amount: number) {
	const health = useSaveStore.getState().characters[lane].health.current
	const { shield } = useCombatStore.getState().characters[lane]

	if (shield === 0) {
		return useSaveStore.getState().updateCharacterHealth(lane, health - amount)
	}

	const updatedShield = shield - amount
	const updatedHealth = health + updatedShield

	if (updatedShield < 0) {
		useCombatStore.getState().updateCharacter(lane, { shield: 0 })
		useSaveStore.getState().updateCharacterHealth(lane, updatedHealth)
	} else {
		useCombatStore.getState().updateCharacter(lane, { shield: updatedShield })
	}
}
