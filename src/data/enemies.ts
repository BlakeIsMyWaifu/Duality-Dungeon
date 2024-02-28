import { type Lane } from '~/types/Combat'

import { actOneEnemies, type ActOneEnemyName } from './enemies/actOne'
import { actThreeEnemies, type ActThreeEnemyName } from './enemies/actThree'
import { actTwoEnemies, type ActTwoEnemyName } from './enemies/actTwo'

export type EnemyData = {
	name: EnemyName
	image: string
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
	/** Must match the key */
	name: string
	displayName: string
	weight: number
	icon: Icon
	/** Should the move be visually shown to the player */
	hidden?: boolean
	effect: (lane: Lane, index: number) => void
}

type Icon = 'attack' | 'block' | 'blank'

export type EnemyName = ActOneEnemyName | ActTwoEnemyName | ActThreeEnemyName

const enemies = new Map<EnemyName, EnemyData>()

function addEnemy(enemy: EnemyData) {
	enemies.set(enemy.name, enemy)
}

Object.values(actOneEnemies).forEach(addEnemy)
Object.values(actTwoEnemies).forEach(addEnemy)
Object.values(actThreeEnemies).forEach(addEnemy)

export function getEnemyData(enemyName: EnemyName) {
	if (!enemies.has(enemyName)) throw new Error(`Missing enemy: ${enemyName}`)
	return enemies.get(enemyName)!
}
