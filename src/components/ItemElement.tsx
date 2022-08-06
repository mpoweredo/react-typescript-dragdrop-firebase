import { Draggable } from 'react-beautiful-dnd';

type Props = {
	title: string;
	done: boolean;
	id: number;
	index: number;
};

const ItemElement = ({ title, done, id, index }: Props) => {
	return (
		<Draggable draggableId={id.toString()} index={index}>
			{(provided: any) => (
				<li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
					<div className='w-[300px] h-10 p-2 mt-3 bg-slate-300 text-slate-900'>
						{title} - done: {done.toString()}
					</div>
				</li>
			)}
		</Draggable>
	);
};

export default ItemElement;
