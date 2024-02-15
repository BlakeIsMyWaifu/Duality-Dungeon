import { Progress } from '@mantine/core'

type HealthBarProps = {
	currentHealth: number
	maxHealth: number
	shield: number
}

export default function HealthBar({ currentHealth, maxHealth, shield }: HealthBarProps) {
	return (
		<Progress.Root size='xl' transitionDuration={200} style={{ width: '100%' }}>
			<Progress.Section value={(currentHealth / maxHealth) * 100} color='red'>
				<Progress.Label>
					{currentHealth >= 15 ? `${currentHealth} / ${maxHealth}` : currentHealth}
				</Progress.Label>
			</Progress.Section>

			<Progress.Section value={shield * 2.5}>
				<Progress.Label>{shield}</Progress.Label>
			</Progress.Section>
		</Progress.Root>
	)
}
