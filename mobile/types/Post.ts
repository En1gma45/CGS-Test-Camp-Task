
export interface ITask {
    _id: string
    title: string;
    description: string;
    year: number;
    isPublic:boolean;
    isCompleted:boolean;
    owner: string
}
