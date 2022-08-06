import { Draggable } from 'react-beautiful-dnd';

type Props = {
	title: string;
	done: boolean;
	id: number;
	index: number;
};

const classes = 'w-full h-32 p-2 mt-3 bg-[#3e404a] text-slate-50 font-bold text-xl'

const ItemElement = ({ title, done, id, index }: Props) => {
	return (
		<Draggable draggableId={id.toString()} index={index}>
			{(provided: any) => (
				<li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
					<div className={classes}>
						{title} - done: {done.toString()}
					</div>
				</li>
			)}
		</Draggable>
	);
};

export default ItemElement;
