import { Droppable } from 'react-beautiful-dnd';
import { SectionColumn } from '../types/types';
import TaskItem from './TaskItem';

type Props = {
	section: SectionColumn;
	index: number;
};

const classes = {
	column: 'w-full bg-gray-700 p-3 rounded-lg h-full',
	title: 'text-xl text-gray-200 font-semibold',
	listWrapper: 'mt-5',
};

const Section = ({ section, index }: Props) => {
	return (
		<div className={classes.column}>
			<div>
				<p className={classes.title}>{section.title}</p>
			</div>
			<Droppable key={section.id} droppableId={index.toString()}>
				{provided => (
					<div {...provided.droppableProps} ref={provided.innerRef}>
						<div className={classes.listWrapper} style={{ transition: '.5s' }}>
							<>
								{section.tasks.map((task, index) => (
									<TaskItem key={task.id} index={index} task={task} />
								))}
								{provided.placeholder}
							</>
						</div>
					</div>
				)}
			</Droppable>
		</div>
	);
};

export default Section;
