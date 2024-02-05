import { type CharacterCombat, type CombatStore } from '~/state/combatStore'
import { createActionName, type Slice } from '~/state/stateHelpers'
import { type Lane } from '~/types/Combat'

export type CharacterActions = {
	updateCharacter: (lane: Lane, data: Partial<CharacterCombat>) => void
	/** Does NOT check if the player has enough stamina */
	consumeStamina: (amount: number) => void
}

const actionName = createActionName<keyof CharacterActions>('combat')

export const characterActions: Slice<CombatStore, CharacterActions> = (set, _get) => ({
	updateCharacter: (lane, data) => {
		set(
			state => ({
				characters: {
					...state.characters,
					[lane]: { ...state.characters[lane], ...data }
				}
			}),
			...actionName('updateCharacter')
		)
	},

	consumeStamina: amount => {
		set(
			state => ({
				stamina: state.stamina - amount
			}),
			...actionName('consumeStamina')
		)
	}
})
