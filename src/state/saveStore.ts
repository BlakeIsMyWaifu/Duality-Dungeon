import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

import { type CardName } from '~/data/cards'
import { type MapNode } from '~/types/Map'

import { useMapStore } from './mapStore'
import { createActionName, type Slice } from './stateHelpers'

type SaveState = {
	active: boolean
	gameStatus: 'map' | MapNode['type']
	maxStamina: number
	deck: CardName[]
	characters: {
		top: CharacterState
		bottom: CharacterState
	}
}

type CharacterState = {
	readonly characterInfo: RaphaelInfo | AzraelInfo
	health: NumberStat
	mood: Mood
}

type RaphaelInfo = {
	name: 'raphael'
	type: 'holy'
}

type AzraelInfo = {
	name: 'azrael'
	type: 'demonic'
}

type NumberStat = {
	current: number
	max: number
}

interface Mood extends NumberStat {
	thresholds: [number, number]
}

const saveState: SaveState = {
	active: false,
	gameStatus: 'map',
	maxStamina: 5,
	deck: ['slash', 'slash', 'slash', 'slash', 'slash', 'block', 'block', 'block', 'block', 'block'],
	characters: {
		top: {
			characterInfo: {
				name: 'raphael',
				type: 'holy'
			},
			health: {
				current: 50,
				max: 50
			},
			mood: {
				current: 10,
				max: 100,
				thresholds: [60, 80]
			}
		},
		bottom: {
			characterInfo: {
				name: 'azrael',
				type: 'demonic'
			},
			health: {
				current: 75,
				max: 75
			},
			mood: {
				current: 10,
				max: 100,
				thresholds: [60, 80]
			}
		}
	}
}

type SaveActions = {
	newGame: () => void
}

const actionName = createActionName('save')

const saveActions: Slice<SaveStore, SaveActions> = (set, _get) => ({
	newGame: () => {
		set(
			{
				...saveState,
				active: true
			},
			...actionName('newGame')
		)

		useMapStore.getState().generateNodes()
	}
})

type SaveStore = SaveState & SaveActions

export const useSaveStore = create<SaveStore>()(
	persist(
		devtools(
			(...a) => ({
				...saveState,
				...saveActions(...a)
			}),
			{
				// Devtools settings
				name: 'save'
			}
		),
		{
			// Persist settings
			name: 'save'
		}
	)
)
