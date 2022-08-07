import { DropResult } from 'react-beautiful-dnd';
import { SectionColumn } from '../types/types';

const dragBetweenColumns = ({ source, destination }: DropResult, data: SectionColumn[]): SectionColumn[] => {
	const sourceDroppableId: number = +source.droppableId;
	const destinationDroppableId: number = +destination!.droppableId;

	const sourceCol = data[sourceDroppableId];
	const destinationCol = data[destinationDroppableId];

	const sourceTask = [...sourceCol.tasks];
	const destinationTask = [...destinationCol.tasks];

	const [removed] = sourceTask.splice(source.index, 1);
	destinationTask.splice(destination!.index, 0, removed);

	data[sourceDroppableId].tasks = sourceTask;
	data[destinationDroppableId].tasks = destinationTask;

	return data;
};

const dragBetweenRows = ({ source, destination }: DropResult, data: SectionColumn[]): SectionColumn[] => {
	const sourceDroppableId: number = +source.droppableId;
	const destinationDroppableId: number = +destination!.droppableId;

	const selectedColumn = data[sourceDroppableId].tasks;

	const toBeMoved = selectedColumn[source.index];
	const newOrder = [...selectedColumn];

	newOrder.splice(source.index, 1);
	newOrder.splice(destination!.index, 0, toBeMoved);

	data[sourceDroppableId].tasks = newOrder;
	return data;
};

export { dragBetweenColumns, dragBetweenRows };
