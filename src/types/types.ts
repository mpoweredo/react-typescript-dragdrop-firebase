import { DropResult } from "react-beautiful-dnd";

export type Item = {
    title: string;
	done: boolean;
    id: number;
}

export type Task = {
	id: number;
	title: string
}

export type SectionColumn = {
	id: number;
	title: string;
	tasks: Task[]
}

