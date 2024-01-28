import { type EnemyName } from '~/data/enemies'
import enemiesData from '~/data/enemies'
import { type CharacterCombat, type CombatStore, type EnemyCombat } from '~/state/combatStore/combatStore'
import { createActionName, type Slice } from '~/state/stateHelpers'
import { type Lane } from '~/types/Combat'

export type LaneActions = {
	addEnemy: (lane: Lane, enemyName: EnemyName) => void
	removeEnemy: (lane: Lane, index: number) => void
	updateEnemy: (lane: Lane, index: number, data: Partial<EnemyCombat>) => void
	updateCharacter: (lane: Lane, data: Partial<CharacterCombat>) => void
}

const actionName = createActionName<keyof LaneActions>('combat')

export const laneActions: Slice<CombatStore, LaneActions> = (set, get) => ({
	addEnemy: (lane, enemyName) => {
		const enemyData = enemiesData[enemyName]
		set(
			state => ({
				enemies: {
					...state.enemies,
					[lane]: [
						...state.enemies[lane],
						{
							name: enemyName,
							currentHealth: enemyData.maxHealth,
							shield: enemyData.startingShield,
							status: enemyData.startingStatus
						}
					]
				}
			}),
			...actionName('addEnemy')
		)
	},

	removeEnemy: (lane, index) => {
		const updatedLane = structuredClone(get().enemies[lane])
		updatedLane.splice(index, 1)

		set(
			state => ({
				enemies: {
					...state.enemies,
					[lane]: updatedLane
				}
			}),
			...actionName('removeEnemy')
		)
	},

	updateEnemy: (lane, index, data) => {
		const laneEnemies = structuredClone(get().enemies[lane])
		laneEnemies[index] = { ...laneEnemies[index], ...data }

		set(
			state => ({
				enemies: {
					...state.enemies,
					[lane]: laneEnemies
				}
			}),
			...actionName('updateEnemy')
		)

		const enemy = get().enemies[lane][index]
		if (enemy.currentHealth <= 0) {
			get().removeEnemy(lane, index)
		}
	},

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
	}
})
