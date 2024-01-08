import { type EnemyName } from '~/data/enemies'

type MapNodeBase = {
	id: number
	tier: number
	/** Key is the tier and the value is an array of ids */
	childrenId: Record<number, number[]>
	status: NodeStatus
	type: MapNode['type']
	data: unknown
}

export type NodeStatus = 'available' | 'locked' | 'completed' | 'active'

export interface CombatNode extends MapNodeBase {
	type: 'combat'
	data: {
		enemies: {
			top: EnemyName[]
			bottom: EnemyName[]
		}
	}
}

export interface EventNode extends MapNodeBase {
	type: 'event'
	data: unknown
}

export interface ShopNode extends MapNodeBase {
	type: 'shop'
	data: {
		cards: Record<string, number>
	}
}

export type MapNode = CombatNode | EventNode | ShopNode
