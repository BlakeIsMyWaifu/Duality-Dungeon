import { Box, Group, Stack, Title } from '@mantine/core'
import { Fragment, type MutableRefObject, useRef, useState } from 'react'
import { StraightLine } from 'react-drawline'

import useMountEffect from '~/hooks/useMountEffect'
import { useMapStore } from '~/state/mapStore'
import { useSaveStore } from '~/state/saveStore'
import { type MapNode, type NodeStatus } from '~/types/Map'

const lineColours: Record<NodeStatus, string> = {
	available: 'gray',
	locked: 'red',
	completed: 'white',
	active: 'gray'
}

export default function Map() {
	const act = useSaveStore(state => state.act)
	const nodes = useMapStore(state => state.nodes)

	const nodeRefs = useRef<(HTMLDivElement | null)[]>([])

	return (
		<Stack align='center'>
			<Title p='xl'>Act - {act}</Title>
			<Group justify='center' gap={64}>
				{Object.entries(nodes).map(([tier, nodes]) => (
					<Stack key={tier}>
						{Object.values(nodes).map(node => (
							<Fragment key={node.id}>
								<Node node={node} tier={tier} nodeRefs={nodeRefs} />
								<NodeLines node={node} nodeRefs={nodeRefs} />
							</Fragment>
						))}
					</Stack>
				))}
			</Group>
		</Stack>
	)
}

type NodeProps = {
	node: MapNode
	tier: string
	nodeRefs: MutableRefObject<(HTMLDivElement | null)[]>
}

function Node({ node, tier, nodeRefs }: NodeProps) {
	const openNode = useMapStore(state => state.openNode)

	return (
		<Box
			ref={ref => {
				nodeRefs.current[node.id] = ref
			}}
			style={{
				height: '96px',
				aspectRatio: '1 / 1',
				border: 'var(--mantine-color-gray-2) solid 2px',
				margin: '8px',
				padding: '8px',
				boxSizing: 'content-box'
			}}
			onClick={() => {
				if (node.status !== 'available') return
				openNode(+tier, node.id)
			}}
		>
			{node.id}
			{node.status}
		</Box>
	)
}

type NodeLinesProps = {
	node: MapNode
	nodeRefs: MutableRefObject<(HTMLDivElement | null)[]>
}

function NodeLines({ node, nodeRefs }: NodeLinesProps) {
	/**
	 * Scuffed way to rerender after refs have been reassigned.
	 * This is needed for the lines between nodes to be rendered
	 */
	const [, setForce] = useState(0)
	useMountEffect(() => {
		setForce(1)
	})

	return nodeRefs.current[0] ? (
		<>
			{Object.values(node.childrenId)
				.flat()
				.map((childId, i) => (
					<StraightLine
						key={i}
						startingElement={{
							ref: { current: nodeRefs.current[node.id] },
							x: 'right',
							y: 'mid'
						}}
						endingElement={{
							ref: { current: nodeRefs.current[childId] },
							x: 'left',
							y: 'mid'
						}}
						style={{
							backgroundColor: lineColours[node.status]
						}}
					/>
				))}
		</>
	) : null
}
