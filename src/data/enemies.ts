interface EnemyData {
	name: string
	image: string
	maxHealth: number
	startingBlock: number
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

interface MoveData {
	name: string
	weight: number
	/** Should the move be visually shown to the player */
	hidden?: boolean
	effects: MoveEffect[]
}

type Target = 'player' | 'self' | 'ally' | 'all'

interface MoveEffect {
	target: Target
	damage?: number
	block?: number
	status?: StatusData
}

interface StatusData {
	type: string
	amount: number
}

export type EnemyName = keyof typeof enemiesData

const enemiesData = {
	'Pew Pew Person': {
		name: 'Pew Pew Person',
		image: 'pewPewPerson',
		maxHealth: 50,
		startingBlock: 0,
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
					name: 'Shoot',
					weight: 1,
					effects: [
						{
							target: 'player',
							damage: 6
						}
					]
				},
				reload: {
					name: 'Reload',
					weight: 1,
					effects: []
				}
			}
		}
	},
	Jedguin: {
		name: 'Jedguin',
		image: 'jedguin',
		maxHealth: 60,
		startingBlock: 5,
		startingStatus: {},
		actions: {
			pattern: {},
			movePool: {
				vroom: {
					name: 'VROOM',
					weight: 2,
					effects: [
						{
							target: 'player',
							damage: 4
						}
					]
				},
				block: {
					name: 'Block',
					weight: 1,
					effects: [
						{
							target: 'self',
							block: 4
						}
					]
				}
			}
		}
	}
} satisfies Record<string, EnemyData>

export default enemiesData
