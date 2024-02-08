import { type Lane } from '~/types/Combat'
import { damageCharacter } from '~/utils/combatHelpers/damageCharacter'
import { shieldEnemy } from '~/utils/combatHelpers/shield'

export type EnemyData = {
	name: string
	/** Must match the key */
	displayName: string
	maxHealth: number
	startingShield: number
	startingStatus: Record<string, number>
	actions: {
		pattern: {
			/** Predetermined order for moves to be used */
			order?: {
				moveOrder: string[]
				/** Should the moveOrder be repeated once finished or moved to the randomPool */
				repeatingOrder: boolean
			}
			/** Optional pool of moves to be used randomly. If undefined, all moves are in the random pool. */
			randomPool?: string[]
		}
		movePool: Record<string, MoveData>
	}
}

type MoveData = {
	name: string
	/** Must match the key */
	displayName: string
	weight: number
	/** Should the move be visually shown to the player */
	hidden?: boolean
	effect: (lane: Lane, index: number) => void
}

export type EnemyName = keyof typeof enemiesData

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const MISSING_EFFECT = (enemyName: EnemyName, move: string) => () =>
	console.log(`${enemyName}-${move} has a missing effect`)

const enemiesData: Record<string, EnemyData> = {
	pewPewPerson: {
		name: 'pewPewPerson',
		displayName: 'Pew Pew Person',
		maxHealth: 50,
		startingShield: 0,
		startingStatus: {},
		actions: {
			pattern: {
				order: {
					moveOrder: ['shoot', 'shoot', 'reload'],
					repeatingOrder: true
				}
			},
			movePool: {
				shoot: {
					name: 'shoot',
					displayName: 'Shoot',
					weight: 1,
					effect: lane => damageCharacter(lane, 4)
				},
				reload: {
					name: 'reload',
					displayName: 'Reload',
					weight: 1,
					effect: () => undefined
				}
			}
		}
	},
	jedguin: {
		name: 'jedguin',
		displayName: 'Jedguin',
		maxHealth: 60,
		startingShield: 5,
		startingStatus: {},
		actions: {
			pattern: {},
			movePool: {
				vroom: {
					name: 'vroom',
					displayName: 'VROOM',
					weight: 2,
					effect: lane => damageCharacter(lane, 2)
				},
				block: {
					name: 'block',
					displayName: 'Block',
					weight: 1,
					effect: (lane, index) => shieldEnemy(lane, index, 3)
				}
			}
		}
	}
}

export default enemiesData
