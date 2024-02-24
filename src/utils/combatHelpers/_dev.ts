// TODO delete this file!
import { type EnemyName } from '~/data/enemies'

export const MISSING_ENEMY_EFFECT = (enemyName: EnemyName, move: string) => () =>
	console.warn(`${enemyName}-${move} is a missing effect`)
