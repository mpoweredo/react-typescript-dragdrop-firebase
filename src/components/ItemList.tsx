import { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Item } from '../types/Item';
import ItemElement from './ItemElement';
import type { DropResult } from 'react-beautiful-dnd';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../data/firebaseConfig';

const ItemList = () => {
	const [data, setData] = useState<Item[]>([]);

	useEffect(() => {
		const getData = async () => {
			const docRef = doc(db, 'board', 'todos');
			const docSnap = await getDoc(docRef);
			const tasks = docSnap.data();
			console.log(docSnap.data());
			setData(tasks!.tasks);
		};

		getData();
	}, []);

	const handleDragEnd = async (result: DropResult) => {
		const { destination, source } = result;

		if (!destination) return;
		
		const toBeMoved = data[source.index];
		const newOrder = [...data];

		newOrder.splice(source.index, 1);
		newOrder.splice(destination.index, 0, toBeMoved);
		setData(newOrder);

		const docRef = doc(db, 'board', 'todos');

		await updateDoc(docRef, {
			tasks: newOrder,
		});
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
