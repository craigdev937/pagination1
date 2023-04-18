export interface ITodo {
    userId: number,
    id: number,
    title: string,
    completed: boolean
};

export interface ITodoState {
    todos: ITodo[],
    todosPerPage: number,
    currentPage: number,
    loading: boolean,
    error: Error | null
};


