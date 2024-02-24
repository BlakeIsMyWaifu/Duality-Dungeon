import { type Lane } from '~/types/Combat'
import { damageCharacter } from '~/utils/combatHelpers/damageCharacter'
import { shieldEnemy } from '~/utils/combatHelpers/shield'

export type EnemyData = {
	name: EnemyName
	image: string
	maxHealth: number
	startingShield: number
	startingStatus: Record<string, number>
	actions: {
		pattern: {
			/** Predetermined order for moves to be used */
			order?: {
				moveOrder: string[]
				/** Should the moveOrder be repeated once finished or moved to the randomPool */
				repeatingOrder: boolean
			}
			/** Optional pool of moves to be used randomly. If undefined, all moves are in the random pool. */
			randomPool?: string[]
		}
		movePool: Record<string, MoveData>
	}
}

type MoveData = {
	/** Must match the key */
	name: string
	displayName: string
	weight: number
	icon: Icon
	/** Should the move be visually shown to the player */
	hidden?: boolean
	effect: (lane: Lane, index: number) => void
}

type Icon = 'attack' | 'block' | 'blank'

export type EnemyName =
	| 'Blocky Boy'
	| 'Draguin'
	| 'Drunk Geezer'
	| 'Edwardo'
	| 'Gamer Girl'
	| 'Jedguin'
	| 'Penguin with a Jetpack'
	| 'Penwin'
	| 'Pew Pew Person'
	| 'Ruin your day man'
	| 'Scrooge McPenguin'
	| 'Stabby McStabber'
	| 'Sus Gus'
	| 'Yarr'

const MISSING_EFFECT = (enemyName: EnemyName, move: string) => () =>
	console.warn(`${enemyName}-${move} is a missing effect`)

const enemies = new Map<EnemyName, EnemyData>()
	.set('Blocky Boy', {
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
					effect: MISSING_EFFECT('Blocky Boy', 'bash')
				}
			}
		}
	})
	.set('Draguin', {
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
					effect: MISSING_EFFECT('Draguin', '_temp')
				}
			}
		}
	})
	.set('Drunk Geezer', {
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
					effect: MISSING_EFFECT('Drunk Geezer', '_temp')
				}
			}
		}
	})
	.set('Edwardo', {
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
					effect: MISSING_EFFECT('Edwardo', '_temp')
				}
			}
		}
	})
	.set('Gamer Girl', {
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
					effect: MISSING_EFFECT('Gamer Girl', '_temp')
				}
			}
		}
	})
	.set('Jedguin', {
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
	})
	.set('Penguin with a Jetpack', {
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
					effect: MISSING_EFFECT('Penguin with a Jetpack', '_temp')
				}
			}
		}
	})
	.set('Penwin', {
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
					effect: MISSING_EFFECT('Penwin', '_temp')
				}
			}
		}
	})
	.set('Pew Pew Person', {
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
	})
	.set('Ruin your day man', {
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
					effect: MISSING_EFFECT('Ruin your day man', '_temp')
				}
			}
		}
	})
	.set('Scrooge McPenguin', {
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
					effect: MISSING_EFFECT('Scrooge McPenguin', '_temp')
				}
			}
		}
	})
	.set('Stabby McStabber', {
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
					effect: MISSING_EFFECT('Stabby McStabber', '_temp')
				}
			}
		}
	})
	.set('Sus Gus', {
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
					effect: MISSING_EFFECT('Sus Gus', '_temp')
				}
			}
		}
	})
	.set('Yarr', {
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
					effect: MISSING_EFFECT('Yarr', '_temp')
				}
			}
		}
	})

export function getEnemyData(enemyName: EnemyName) {
	if (!enemies.has(enemyName)) throw new Error(`Missing enemy: ${enemyName}`)
	return enemies.get(enemyName)!
}
