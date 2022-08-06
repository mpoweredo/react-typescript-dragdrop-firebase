import { Draggable } from 'react-beautiful-dnd';
import { Task } from '../types/types';

type Props = {
	index: number;
	task: Task;
};

const classes = 'w-full bg-gray-400 p-3 mb-3 '

const TaskItem = ({ index, task }: Props) => {
	return (
		<Draggable key={task.id} draggableId={task.id.toString()} index={index}>
			{(provided) => (
				<div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className={classes}>
					<p>{task.title}</p>
				</div>
			)}
		</Draggable>
	);
};

export default TaskItem;
