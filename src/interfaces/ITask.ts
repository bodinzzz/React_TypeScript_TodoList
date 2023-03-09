export interface ITask {
  id: string;
  taskName: string;
  deadline: Date | null;
  importance: number | null;
}
