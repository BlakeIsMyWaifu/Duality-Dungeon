import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

import { type CardName } from '~/data/cards'
import { Router } from '~/pages/router'
import { type Lane } from '~/types/Combat'

import { useMapStore } from './mapStore'
import { createActionName, type Slice } from './stateHelpers'

type SaveState = {
	isActive: boolean
	gameStatus: GameStatus
	act: 1 | 2 | 3
	maxStamina: number
	deck: CardName[]
	characters: {
		top: CharacterState
		bottom: CharacterState
	}
}

export type GameStatus = Exclude<Parameters<(typeof Router)['useRoute']>[0][number], 'home'>

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
	isActive: false,
	gameStatus: 'map',
	act: 1,
	maxStamina: 5,
	deck: ['Slash', 'Slash', 'Slash', 'Slash', 'Slash', 'Block', 'Block', 'Block', 'Block', 'Block'],
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
	changeGameStatus: (gameStatus: GameStatus) => void
	updateCharacterHealth: (lane: Lane, amount: number) => void
	completeAct: () => void
}

const actionName = createActionName<keyof SaveActions>('save')

const saveActions: Slice<SaveStore, SaveActions> = (set, get) => ({
	newGame: () => {
		set(
			{
				...saveState,
				isActive: true
			},
			...actionName('newGame')
		)

		useMapStore.getState().generateNodes()

		get().changeGameStatus('map')
	},

	changeGameStatus: gameStatus => {
		Router.push(gameStatus)

		set({ gameStatus }, ...actionName('changeGameStatus'))
	},

	updateCharacterHealth: (lane, amount) => {
		set(
			state => ({
				characters: {
					...state.characters,
					[lane]: {
						...state.characters[lane],
						health: {
							...state.characters[lane].health,
							current: amount
						}
					}
				}
			}),
			...actionName('updateCharacterHealth')
		)
	},

	completeAct: () => {
		const { act: currentAct } = useSaveStore.getState()

		if (currentAct === 1 || currentAct === 2) {
			set({ act: (currentAct + 1) as 2 | 3 }, ...actionName('completeAct'))
			useMapStore.getState().generateNodes()
		}

		if (currentAct === 3) {
			Router.push('home')
		}
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
