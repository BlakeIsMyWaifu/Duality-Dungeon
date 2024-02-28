import { type EnemyName } from './enemies'
import { type ActOneEnemyName } from './enemies/actOne'
import { type ActThreeEnemyName } from './enemies/actThree'
import { type ActTwoEnemyName } from './enemies/actTwo'

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
			top: ['Stabby McStabber'],
			bottom: ['Stabby McStabber']
		}
	] satisfies Encounter<ActOneEnemyName>[])
	.set('2-monster', [
		{
			weight: 1,
			top: ['Drunk Geezer'],
			bottom: ['Yarr']
		}
	] satisfies Encounter<ActTwoEnemyName>[])
	.set('3-monster', [
		{
			weight: 1,
			top: ['Scrooge McPenguin'],
			bottom: ['Scrooge McPenguin']
		}
	] satisfies Encounter<ActThreeEnemyName>[])

	.set('1-boss', [
		{
			weight: 1,
			top: ['Edwardo'],
			bottom: ['Penwin']
		}
	] satisfies Encounter<ActOneEnemyName>[])
	.set('2-boss', [
		{
			weight: 1,
			top: ['Ruin your day man'],
			bottom: ['Ruin your day man']
		}
	] satisfies Encounter<ActTwoEnemyName>[])
	.set('3-boss', [
		{
			weight: 1,
			top: ['Draguin'],
			bottom: ['Draguin']
		}
	] satisfies Encounter<ActThreeEnemyName>[])

export function getEncounterData(act: Act, type: EncounterType) {
	if (!encounters.has(`${act}-${type}`)) throw new Error(`Missing encounter: ${act}-${type}`)
	return encounters.get(`${act}-${type}`)!
}
