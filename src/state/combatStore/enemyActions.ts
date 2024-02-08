import { type EnemyData, type EnemyName } from '~/data/enemies'
import enemiesData from '~/data/enemies'
import { type CombatStore, type EnemyCombat } from '~/state/combatStore'
import { createActionName, type Slice } from '~/state/stateHelpers'
import { type Lane } from '~/types/Combat'
import { weightedRandom } from '~/utils/weightedRandom'

export type EnemyActions = {
	addEnemy: (lane: Lane, enemyName: EnemyName) => void
	removeEnemy: (lane: Lane, index: number) => void
	updateEnemy: (lane: Lane, index: number, data: Partial<EnemyCombat>) => void
	addEnemyMoves: (lane: Lane, index: number, isSpawning?: boolean) => void
	enemyUseMove: (lane: Lane, index: number) => void
}

const actionName = createActionName<keyof EnemyActions>('combat')

export const enemyActions: Slice<CombatStore, EnemyActions> = (set, get) => ({
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
							status: enemyData.startingStatus,
							moves: generateMovePool(enemyData, true)
						} satisfies EnemyCombat
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

	addEnemyMoves: (lane, index, isSpawning = false) => {
		const enemyName = get().enemies[lane][index].name
		const enemyData = enemiesData[enemyName]
		const movePool = generateMovePool(enemyData, isSpawning)

		get().updateEnemy(lane, index, { moves: movePool })

		set({}, ...actionName('addEnemyMoves'))
	},

	enemyUseMove: (lane, index) => {
		const enemyCombatData = get().enemies[lane][index]
		const [nextMove, ...otherMoves] = enemyCombatData.moves
		const enemyData = enemiesData[enemyCombatData.name]
		enemyData.actions.movePool[nextMove].effect(lane, index)

		if (otherMoves.length) {
			get().updateEnemy(lane, index, { moves: otherMoves })
		} else {
			get().addEnemyMoves(lane, index)
		}

		set({}, ...actionName('enemyUseMove'))
	}
})

function generateMovePool(enemyData: EnemyData, isSpawning = false) {
	if (enemyData.actions.pattern.order?.moveOrder && (isSpawning || enemyData.actions.pattern.order.repeatingOrder)) {
		return enemyData.actions.pattern.order.moveOrder
	}

	const moves = enemyData.actions.pattern.randomPool
		? enemyData.actions.pattern.randomPool.map<[name: string, weight: number]>(moveName => [
				moveName,
				enemyData.actions.movePool[moveName].weight
			])
		: Object.values(enemyData.actions.movePool).map<[name: string, weight: number]>(moveData => [
				moveData.name,
				moveData.weight
			])
	return [weightedRandom(moves)]
}
