import { useCombatStore } from '~/state/combatStore'
import { type Lane } from '~/types/Combat'

export function shieldCharacter(lane: Lane, amount: number) {
	const currentShield = useCombatStore.getState().characters[lane].shield

	useCombatStore.getState().updateCharacter(lane, { shield: currentShield + amount })
}

export function shieldEnemy(lane: Lane, index: number, amount: number) {
	const currentShield = useCombatStore.getState().enemies[lane][index].shield

	useCombatStore.getState().updateEnemy(lane, index, { shield: currentShield + amount })
}
