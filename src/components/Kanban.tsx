import { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Item, SectionColumn } from '../types/types';
import type { DropResult } from 'react-beautiful-dnd';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../data/firebaseConfig';
import Section from './Section';

const classes = 'flex flex-col sm:flex-row p-4 bg-zinc-800 rounded-lg w-[900px] gap-2';

const mockData = [
	{
		id: 1230,
		title: ' 📃 To do',
		tasks: [
			{
				id: 1,
				title: 'Learn JavaScript',
			},
			{
				id: 2,
				title: 'Learn Git',
			},
			{
				id: 3,
				title: 'Learn Python',
			},
		],
	},
	{
		id: 1456,
		title: ' ✏️ In progress',
		tasks: [
			{
				id: 4,
				title: 'Learn CSS',
			},
			{
				id: 5,
				title: 'Learn Golang',
			},
		],
	},
	{
		id: 2789,
		title: ' ✔️ Completed',
		tasks: [
			{
				id: 6,
				title: 'Learn HTML',
			},
		],
	},
];


const Kanban = () => {
	const [data, setData] = useState<SectionColumn[]>(mockData);

	// useEffect(() => {
	// 	const getData = async () => {
	// 		const docRef = doc(db, 'board', 'todos');
	// 		const docSnap = await getDoc(docRef);
	// 		const tasks = docSnap.data();
	// 		console.log(docSnap.data());
	// 		setData(tasks!.tasks);
	// 	};

	// 	getData();
	// }, []);

	const handleDragEnd = (result: DropResult) => {
		if (!result.destination) return;
		const { source, destination } = result;

		const sourceDroppableId: number = +source.droppableId
		const destinationDroppableId: number = +destination.droppableId

		if (sourceDroppableId !== destinationDroppableId) {
			const sourceCol = data[sourceDroppableId];
			const destinationCol = data[destinationDroppableId];
            console.log(sourceCol)

			const sourceTask = [...sourceCol.tasks];
			const destinationTask = [...destinationCol.tasks];

			const [removed] = sourceTask.splice(source.index, 1);
			destinationTask.splice(destination.index, 0, removed);

			data[sourceDroppableId].tasks = sourceTask;
			data[destinationDroppableId].tasks = destinationTask;

			setData(data);
		} else if (sourceDroppableId === destinationDroppableId) {
			const selectedColumn = data[sourceDroppableId].tasks;

			const toBeMoved = selectedColumn[source.index];
			const newOrder = [...selectedColumn];

			newOrder.splice(source.index, 1);
			newOrder.splice(destination.index, 0, toBeMoved);

            setData(prevState => {
                const copy = [...prevState]
                copy[sourceDroppableId].tasks = newOrder
                return copy
            })
        }
	};

	return (
		<DragDropContext onDragEnd={handleDragEnd}>
			<div className={classes}>
				{data.map((section, index) => (
					<Section key={section.id} section={section} index={index} />
				))}
			</div>
		</DragDropContext>
	);
};

export default Kanban;

// const handleDragEnd = async (result: DropResult) => {
//     const { destination, source } = result;

//     if (!destination) return;

//     const toBeMoved = data[source.index];
//     const newOrder = [...data];

//     newOrder.splice(source.index, 1);
//     newOrder.splice(destination.index, 0, toBeMoved);
//     setData(newOrder);

//     const docRef = doc(db, 'board', 'todos');

//     await updateDoc(docRef, {
//         tasks: newOrder,
//     });
// };
