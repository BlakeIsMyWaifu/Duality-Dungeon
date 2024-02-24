import { MISSING_ENEMY_EFFECT } from '~/utils/combatHelpers/_dev'
import { damageCharacter } from '~/utils/combatHelpers/damageCharacter'
import { shieldEnemy } from '~/utils/combatHelpers/shield'

import { type EnemyData } from '../enemies'

export type ActOneEnemyName = 'Blocky Boy' | 'Edwardo' | 'Jedguin' | 'Penwin' | 'Pew Pew Person' | 'Stabby McStabber'

export const actOneEnemies: Record<ActOneEnemyName, EnemyData> = {
	'Blocky Boy': {
		name: 'Blocky Boy',
		image: 'blockyBoy',
		maxHealth: 80,
		startingShield: 10,
		startingStatus: {},
		actions: {
			pattern: {},
			movePool: {
				reinforce: {
					name: 'reinforce',
					displayName: 'Reinforce',
					weight: 3,
					icon: 'block',
					effect: (lane, index) => shieldEnemy(lane, index, 5)
				},
				bash: {
					name: 'bash',
					displayName: 'Bash',
					weight: 1,
					icon: 'attack',
					effect: MISSING_ENEMY_EFFECT('Blocky Boy', 'bash')
				}
			}
		}
	},
	Edwardo: {
		name: 'Edwardo',
		image: 'edwardo',
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
					effect: MISSING_ENEMY_EFFECT('Edwardo', '_temp')
				}
			}
		}
	},
	Jedguin: {
		name: 'Jedguin',
		image: 'jedguin',
		maxHealth: 60,
		startingShield: 5,
		startingStatus: {},
		actions: {
			pattern: {},
			movePool: {
				vroom: {
					name: 'vroom',
					displayName: 'VROOM',
					weight: 2,
					icon: 'attack',
					effect: lane => damageCharacter(lane, 2)
				},
				block: {
					name: 'block',
					displayName: 'Block',
					weight: 1,
					icon: 'block',
					effect: (lane, index) => shieldEnemy(lane, index, 3)
				}
			}
		}
	},
	Penwin: {
		name: 'Penwin',
		image: 'penwin',
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
					effect: MISSING_ENEMY_EFFECT('Penwin', '_temp')
				}
			}
		}
	},
	'Pew Pew Person': {
		name: 'Pew Pew Person',
		image: 'pewPewPerson',
		maxHealth: 50,
		startingShield: 0,
		startingStatus: {},
		actions: {
			pattern: {
				order: {
					moveOrder: ['shoot', 'shoot', 'reload'],
					repeatingOrder: true
				}
			},
			movePool: {
				shoot: {
					name: 'shoot',
					displayName: 'Shoot',
					weight: 1,
					icon: 'attack',
					effect: lane => damageCharacter(lane, 4)
				},
				reload: {
					name: 'reload',
					displayName: 'Reload',
					weight: 1,
					icon: 'blank',
					effect: () => undefined
				}
			}
		}
	},
	'Stabby McStabber': {
		name: 'Stabby McStabber',
		image: 'stabbyMcStabber',
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
					effect: MISSING_ENEMY_EFFECT('Stabby McStabber', '_temp')
				}
			}
		}
	}
}
