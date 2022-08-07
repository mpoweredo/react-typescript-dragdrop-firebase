import { useEffect, useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { SectionColumn } from '../types/types';
import type { DropResult } from 'react-beautiful-dnd';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../data/firebaseConfig';
import Section from './Section';
import { dragBetweenColumns, dragBetweenRows } from '../helpers/dragDrop';

const classes = 'flex flex-col sm:flex-row p-4 rounded-lg w-[900px] gap-2';

const Kanban = () => {
	const [data, setData] = useState<SectionColumn[]>([]);

	useEffect(() => {
		const getData = async () => {
			const docRef = doc(db, 'USER13', 'board');
			const docSnap = await getDoc(docRef);
			const tasks = docSnap.data();
			setData(tasks!.kanban);
		};

		getData();
	}, []);

	const handleDragEnd = async (result: DropResult) => {
		if (!result.destination) return;
		const { source, destination } = result;

		if (source.droppableId !== destination.droppableId) {
			const newData = dragBetweenColumns(result, data);
			setData(newData);

			const docRef = doc(db, 'USER13', 'board');
			await updateDoc(docRef, {
				kanban: data,
			});
		} else if (source.droppableId === destination.droppableId) {
			const newData = dragBetweenRows(result, data);

			setData(newData);

			const docRef = doc(db, 'USER13', 'board');
			await updateDoc(docRef, {
				kanban: newData,
			});
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

