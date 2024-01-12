import { Box, Image, Text } from '@mantine/core'

import cardsData, { type CardName } from '~/data/cards'

import classes from './card.module.css'

type CardProps = {
	cardName: CardName
}

export default function Card({ cardName }: CardProps) {
	const cardData = cardsData[cardName]

	return (
		<Box className={classes.container}>
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
}
