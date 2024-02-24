import { type Encounter } from '~/data/encounters'
import { MISSING_ENEMY_EFFECT } from '~/utils/combatHelpers/_dev'

import { type EnemyData } from '../enemies'

export type ActTwoEnemyName = 'Drunk Geezer' | 'Gamer Girl' | 'Ruin your day man' | 'Sus Gus' | 'Yarr'

export const actTwoEnemies: Record<ActTwoEnemyName, EnemyData> = {
	'Drunk Geezer': {
		name: 'Drunk Geezer',
		image: 'drunkGeezer',
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
					effect: MISSING_ENEMY_EFFECT('Drunk Geezer', '_temp')
				}
			}
		}
	},
	'Gamer Girl': {
		name: 'Gamer Girl',
		image: 'gamerGirl',
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
					effect: MISSING_ENEMY_EFFECT('Gamer Girl', '_temp')
				}
			}
		}
	},
	'Ruin your day man': {
		name: 'Ruin your day man',
		image: 'ruinYourDayMan',
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
					effect: MISSING_ENEMY_EFFECT('Ruin your day man', '_temp')
				}
			}
		}
	},
	'Sus Gus': {
		name: 'Sus Gus',
		image: 'susGus',
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
					effect: MISSING_ENEMY_EFFECT('Sus Gus', '_temp')
				}
			}
		}
	},
	Yarr: {
		name: 'Yarr',
		image: 'yarr',
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
					effect: MISSING_ENEMY_EFFECT('Yarr', '_temp')
				}
			}
		}
	}
}

export const actTwoEncounterMonster: Encounter<ActTwoEnemyName>[] = []

export const actTwoEncounterBoss: Encounter<ActTwoEnemyName>[] = []
