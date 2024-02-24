import { type Encounter } from '~/data/encounters'
import { MISSING_ENEMY_EFFECT } from '~/utils/combatHelpers/_dev'

import { type EnemyData } from '../enemies'

export type ActThreeEnemyName = 'Draguin' | 'Penguin with a Jetpack' | 'Scrooge McPenguin'

export const actThreeEnemies: Record<ActThreeEnemyName, EnemyData> = {
	Draguin: {
		name: 'Draguin',
		image: 'draguin',
		maxHealth: 50,
		startingShield: 0,
		startingStatus: {},
		actions: {
			pattern: {},
			movePool: {
				_temp: {
					name: '_temp',
					displayName: '_temp',
					weight: 1,
					icon: 'blank',
					effect: MISSING_ENEMY_EFFECT('Draguin', '_temp')
				}
			}
		}
	},
	'Penguin with a Jetpack': {
		name: 'Penguin with a Jetpack',
		image: 'penguinWithAJetpack',
		maxHealth: 50,
		startingShield: 0,
		startingStatus: {},
		actions: {
			pattern: {},
			movePool: {
				_temp: {
					name: '_temp',
					displayName: '_temp',
					weight: 1,
					icon: 'blank',
					effect: MISSING_ENEMY_EFFECT('Penguin with a Jetpack', '_temp')
				}
			}
		}
	},
	'Scrooge McPenguin': {
		name: 'Scrooge McPenguin',
		image: 'scroogeMcPenguin',
		maxHealth: 50,
		startingShield: 0,
		startingStatus: {},
		actions: {
			pattern: {},
			movePool: {
				_temp: {
					name: '_temp',
					displayName: '_temp',
					weight: 1,
					icon: 'blank',
					effect: MISSING_ENEMY_EFFECT('Scrooge McPenguin', '_temp')
				}
			}
		}
	}
}

export const actThreeEncounterMonster: Encounter<ActThreeEnemyName>[] = []

export const actThreeEncounterBoss: Encounter<ActThreeEnemyName>[] = []
