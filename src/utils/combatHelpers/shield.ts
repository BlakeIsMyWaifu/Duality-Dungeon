import { useCombatStore } from '~/state/combatStore'
import { type Lane } from '~/types/Combat'

export function shieldCharacter(lane: Lane, amount: number) {
	const currentShield = useCombatStore.getState().characters[lane].shield

	useCombatStore.getState().updateCharacter(lane, { shield: currentShield + amount })
}
