import { Box, Image, Text } from '@mantine/core'
import { forwardRef, useMemo } from 'react'

import cardsData, { type CardName } from '~/data/cards'

import classes from './card.module.css'

export type CardProps = {
	cardName: CardName
}

const Card = forwardRef<HTMLDivElement, CardProps>(function Card({ cardName, ...props }, ref) {
	const cardData = useMemo(() => cardsData[cardName], [cardName])

	return (
		<Box className={classes.container} ref={ref} {...props}>
			<Text className={classes.effect} data-position='top'>
				{cardData.top.description}
			</Text>
			<Text className={classes.mood} data-position='top'>
				{cardData.top.mood}
			</Text>

			<Image
				className={classes.image}
				src={`/cards/${cardData.image}.webp`}
				onMouseDown={event => event.preventDefault()}
			/>
			<Text className={classes.stamina}>{cardData.stamina}</Text>

			<Text className={classes.effect} data-position='bottom'>
				{cardData.bottom.description}
			</Text>
			<Text className={classes.mood} data-position='bottom'>
				{cardData.bottom.mood}
			</Text>

			<Text className={classes.name}>{cardData.name}</Text>
		</Box>
	)
})

export default Card
