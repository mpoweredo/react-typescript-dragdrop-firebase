import { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Item } from '../types/Item';
import ItemElement from './ItemElement';
import type { DropResult } from 'react-beautiful-dnd'

const dummyData: Item[] = [
	{
		id: 0,
		title: 'Go to gym',
		done: false,
	},
	{
		id: 1,
		title: 'Make a dinner',
		done: false,
	},
	{
		id: 2,
		title: 'Buy neckle for girlfriend',
		done: false,
	},
	{
		id: 3,
		title: 'Wash a car',
		done: false,
	},
];

const ItemList = () => {
	const [data, setData] = useState<Item[]>(dummyData);

	const handleDragEnd = (result: DropResult) => {
		if (!result.destination) return;

        console.log(result)

		const items = Array.from(data);
		const [reorderData] = items.splice(result.source.index, 1);
		items.splice(result.destination.index, 0, reorderData);
		setData(items);
	};

	return (
		<DragDropContext onDragEnd={handleDragEnd}>
			<Droppable droppableId='list'>
				{(provided: any) => (
					<ul className='flex flex-col p-4' {...provided.droppableProps} ref={provided.innerRef}>
						{data.map((item, index) => (
							<ItemElement
								title={item.title}
								key={item.id}
								id={item.id}
								index={index}
								done={item.done}
							/>
						))}
						{provided.placeholder}
					</ul>
				)}
			</Droppable>
		</DragDropContext>
	);
};

export default ItemList;
