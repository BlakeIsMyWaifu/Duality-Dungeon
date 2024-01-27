import { ActionIcon, Box, Modal, ScrollArea, Text, Tooltip } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconPlayCard } from '@tabler/icons-react'

import { useCombatStore } from '~/state/combatStore'
import { capitalize } from '~/utils/strings'

export default function Piles() {
	return (
		<Box
			style={{
				gridArea: 'piles',
				display: 'grid',
				gridTemplateAreas: `
					"deck banish"
					"deck discard"
				`,
				gridTemplateColumns: '1fr 1fr',
				gridTemplateRows: '1fr 1fr',
				justifyItems: 'center',
				alignItems: 'center'
			}}
		>
			<Tooltip.Group closeDelay={300}>
				<Pile label='deck' />
				<Pile label='discard' />
				<Pile label='banish' />
			</Tooltip.Group>
		</Box>
	)
}

type PileProps = {
	label: 'deck' | 'discard' | 'banish'
}

function Pile({ label }: PileProps) {
	const [opened, { open, close }] = useDisclosure(false)

	const cards = useCombatStore(state => state.cards)
	/* This is the easiest way to sort the deck without mutating the zustand state */
	const cardsClone = structuredClone(cards)
	cardsClone.deck.sort()

	return (
		<>
			<Modal
				opened={opened}
				onClose={close}
				title={capitalize(label)}
				scrollAreaComponent={ScrollArea.Autosize}
				overlayProps={{
					color: 'var(--mantine-color-dark-2)',
					opacity: 0.55,
					blur: 3
				}}
			>
				{cardsClone[label].map((card, i) => (
					<Text key={i}>{card}</Text>
				))}
			</Modal>
			<Tooltip
				withArrow
				label={`${capitalize(label)} [${cards[label].length}]`}
				color='gray'
				transitionProps={{
					transition: 'slide-up',
					duration: 300
				}}
			>
				<ActionIcon
					size={90}
					variant='filled'
					color='brown'
					radius='lg'
					onClick={open}
					style={{
						gridArea: label
					}}
				>
					<IconPlayCard size={90} />
				</ActionIcon>
			</Tooltip>
		</>
	)
}
