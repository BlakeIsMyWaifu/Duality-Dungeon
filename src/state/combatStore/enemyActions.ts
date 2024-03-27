import { type EnemyData, type EnemyName, getEnemyData } from '~/data/enemies'
import { type CombatStore, type EnemyCombat } from '~/state/combatStore'
import { createActionName, type Slice } from '~/state/stateHelpers'
import { type Lane } from '~/types/Combat'
import { weightedRandom } from '~/utils/random'

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
		const enemyData = getEnemyData(enemyName)
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
							moves: generateMovePool(enemyData.actions, true)
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

		if (!get().enemies.top.length && !get().enemies.bottom.length) {
			get().endCombat()
		}
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
		const enemyData = getEnemyData(enemyName)
		const movePool = generateMovePool(enemyData.actions, isSpawning)

		get().updateEnemy(lane, index, { moves: movePool })

		set({}, ...actionName('addEnemyMoves'))
	},

	enemyUseMove: (lane, index) => {
		const enemyCombatData = get().enemies[lane][index]
		const [nextMove, ...otherMoves] = enemyCombatData.moves
		const enemyData = getEnemyData(enemyCombatData.name)
		enemyData.actions.movePool[nextMove].effect(lane, index)

		if (otherMoves.length) {
			get().updateEnemy(lane, index, { moves: otherMoves })
		} else {
			get().addEnemyMoves(lane, index)
		}

		set({}, ...actionName('enemyUseMove'))
	}
})

function generateMovePool(actions: EnemyData['actions'], isSpawning = false) {
	if (actions.pattern.order?.moveOrder && (isSpawning || actions.pattern.order.repeatingOrder)) {
		return actions.pattern.order.moveOrder
	}

	const moves = actions.pattern.randomPool
		? actions.pattern.randomPool.map<[name: string, weight: number]>(moveName => [
				moveName,
				actions.movePool[moveName].weight
			])
		: Object.values(actions.movePool).map<[name: string, weight: number]>(moveData => [
				moveData.name,
				moveData.weight
			])
	return [weightedRandom(moves)]
}
