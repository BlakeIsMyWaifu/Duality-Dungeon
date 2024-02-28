import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

import { type Encounter, getEncounterData } from '~/data/encounters'
import { type CombatNode, type MapNode, type NodeStatus } from '~/types/Map'
import { weightedRandom } from '~/utils/weightedRandom'

import { useCombatStore } from './combatStore'
import { useSaveStore } from './saveStore'
import { createActionName, type Slice } from './stateHelpers'

type MapState = {
	currentNode: [nodeTier: number, nodeId: number] | null
	lastCompletedNode: [nodeTier: number, nodeId: number] | null
	/** First key is the tier, the value key is the node id */
	nodes: Record<number, Record<number, MapNode>>
}

const mapState: MapState = {
	currentNode: null,
	lastCompletedNode: null,
	nodes: {}
}

type MapActions = {
	/**
	 * Creates the whole map for the act.
	 * Only call at the start of a new game or start of a new act.
	 */
	generateNodes: () => void

	/**
	 * Sets the given node as the current.
	 * If the node is tier0, locks the other tier0 nodes.
	 */
	openNode: (nodeTier: number, nodeId: number) => void

	/**
	 * Marks the current node as complete and unlocks child nodes.
	 * Call after the node has fully finished.
	 */
	completeNode: () => void

	/**
	 * Changes the given nodes status.
	 * Does not affect other nodes around it.
	 * For internal use only.
	 */
	changeNodeStatus: (nodeTier: number, nodeId: number, status: NodeStatus) => void
}

const actionName = createActionName<keyof MapActions>('map')

const mapActions: Slice<MapStore, MapActions> = (set, get) => ({
	generateNodes: () => {
		const { act } = useSaveStore.getState()

		const monsterEncounters = getEncounterData(act, 'monster')
		const weightedMonsterEncounters = monsterEncounters.map<[Encounter, number]>(encounter => [
			encounter,
			encounter.weight
		])

		const bossEncounters = getEncounterData(act, 'boss')
		const weightedBossEncounters = bossEncounters.map<[Encounter, number]>(encounter => [
			encounter,
			encounter.weight
		])
		const bossEncounter = weightedRandom(weightedBossEncounters)

		const combatNode = (id: number, tier: number, childrenId: Record<number, number[]>) => {
			const { top, bottom } = tier === 3 ? bossEncounter : weightedRandom(weightedMonsterEncounters)

			const out: CombatNode = {
				id,
				tier,
				childrenId,
				status: tier === 0 ? 'available' : 'locked',
				type: 'combat',
				data: {
					enemies: {
						top,
						bottom
					}
				}
			}
			return out
		}

		set(
			{
				nodes: {
					0: {
						0: combatNode(0, 0, { 1: [3] }),
						1: combatNode(1, 0, { 1: [3] }),
						2: combatNode(2, 0, { 1: [4] })
					},
					1: {
						3: combatNode(3, 1, { 2: [5, 6] }),
						4: combatNode(4, 1, { 2: [6, 7] })
					},
					2: {
						5: combatNode(5, 2, { 3: [8] }),
						6: combatNode(6, 2, { 3: [8] }),
						7: combatNode(7, 2, { 3: [8] })
					},
					3: {
						8: combatNode(8, 3, {})
					}
				}
			},
			...actionName('generateNodes')
		)
	},

	openNode: (nodeTier, nodeId) => {
		if (nodeTier === 0) {
			const nodes = get().nodes[0]
			Object.values(nodes).forEach(node => {
				get().changeNodeStatus(0, node.id, node.id === nodeId ? 'active' : 'locked')
			})
		} else {
			get().changeNodeStatus(nodeTier, nodeId, 'active')
			const { lastCompletedNode } = get()
			if (!lastCompletedNode) return
			const { childrenId } = get().nodes[lastCompletedNode[0]][lastCompletedNode[1]]
			Object.entries(childrenId).forEach(([tier, ids]) => {
				ids.forEach(id => {
					if (id === nodeId) return
					get().changeNodeStatus(+tier, id, 'locked')
				})
			})
		}

		set({ currentNode: [nodeTier, nodeId] }, ...actionName('openNode'))

		const node = get().nodes[nodeTier][nodeId]
		if (node.type === 'combat') {
			useCombatStore.getState().initCombat(node)
		}
	},

	completeNode: () => {
		const [nodeTier, nodeId] = get().currentNode ?? [-1, -1]
		const node = get().nodes[nodeTier]?.[nodeId]
		if (!node) return

		useSaveStore.getState().changeGameStatus('map')

		if (nodeTier === 3) return useSaveStore.getState().completeAct()

		get().changeNodeStatus(nodeTier, nodeId, 'completed')

		set(
			{
				currentNode: null,
				lastCompletedNode: [nodeTier, nodeId]
			},
			...actionName('completeNode')
		)

		Object.entries(node.childrenId).forEach(([tier, ids]) => {
			ids.forEach(id => {
				get().changeNodeStatus(+tier, id, 'available')
			})
		})
	},

	changeNodeStatus: (nodeTier, nodeId, status) => {
		set(
			state => ({
				nodes: {
					...state.nodes,
					[nodeTier]: {
						...state.nodes[nodeTier],
						[nodeId]: {
							...state.nodes[nodeTier][nodeId],
							status
						}
					}
				}
			}),
			...actionName('changeNodeStatus')
		)
	}
})

type MapStore = MapState & MapActions

export const useMapStore = create<MapStore>()(
	persist(
		devtools(
			(...a) => ({
				...mapState,
				...mapActions(...a)
			}),
			{
				// Devtools settings
				name: 'map'
			}
		),
		{
			// Persist settings
			name: 'map'
		}
	)
)
