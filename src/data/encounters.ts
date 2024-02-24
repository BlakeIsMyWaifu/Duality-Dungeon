import { type ActOneEnemyName } from './acts/actOne'
import { type ActThreeEnemyName } from './acts/actThree'
import { type ActTwoEnemyName } from './acts/actTwo'
import { type EnemyName } from './enemies'

export type Encounter<T extends EnemyName = EnemyName> = {
	weight: number
	top: T[]
	bottom: T[]
}

type Act = 1 | 2 | 3

type EncounterType = 'monster' | 'boss'

type EncounterCategory = `${Act}-${EncounterType}`

const encounters = new Map<EncounterCategory, Encounter[]>()
	.set('1-monster', [
		{
			weight: 1,
			top: ['Blocky Boy'],
			bottom: ['Blocky Boy']
		},
		{
			weight: 1,
			top: ['Pew Pew Person', 'Jedguin'],
			bottom: ['Jedguin', 'Pew Pew Person', 'Pew Pew Person']
		},
		{
			weight: 1,
			top: ['Edwardo', 'Edwardo', 'Edwardo'],
			bottom: ['Penwin']
		},
		{
			weight: 1,
			top: ['Stabby McStabber'],
			bottom: ['Stabby McStabber']
		}
	] satisfies Encounter<ActOneEnemyName>[])
	.set('2-monster', [] satisfies Encounter<ActTwoEnemyName>[])
	.set('3-monster', [] satisfies Encounter<ActThreeEnemyName>[])

	.set('1-boss', [] satisfies Encounter<ActOneEnemyName>[])
	.set('2-boss', [] satisfies Encounter<ActTwoEnemyName>[])
	.set('3-boss', [] satisfies Encounter<ActThreeEnemyName>[])

export function getEncounterData(act: Act, type: EncounterType) {
	if (!encounters.has(`${act}-${type}`)) throw new Error(`Missing encounter: ${act}-${type}`)
	return encounters.get(`${act}-${type}`)!
}
