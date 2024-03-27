// TODO delete this file!
import { type EnemyName } from '~/data/enemies'
import { type Lane } from '~/types/Combat'

export const MISSING_ENEMY_EFFECT = (enemyName: EnemyName, move: string) => () =>
	console.warn(`${enemyName}-${move} is a missing effect`)

export const MISSING_CARD_EFFECT = (cardName: string, lane: Lane) => () =>
	console.warn(`${cardName}-${lane} is a missing effect`)
