import React from "react";
import { useAppSelector, useAppDispatch } from "../global/Hooks";
import { getAllTodos, TodoActions } from "../global/TodoSlice";

export const Main = () => {
    const dispatch = useAppDispatch();
    const loading = useAppSelector((state) => state.todos.loading);
    const error = useAppSelector((state) => state.todos.error);
    const todos = useAppSelector((state) => state.todos.todos);
    const todosPerPage = useAppSelector((state) => state.todos.todosPerPage);
    const currentPage = useAppSelector((state) => state.todos.currentPage);

    React.useEffect(() => {
        dispatch(getAllTodos());
    }, [dispatch]);
    
    const totalPages = Math.ceil(todos.length / todosPerPage);
    const pages = [...Array(totalPages + 1).keys()].slice(1);
    const indexOfLastPage = currentPage * todosPerPage;
    const indexOfFirstPage = indexOfLastPage - todosPerPage;
    const visibleTodos = todos.slice(indexOfFirstPage, indexOfLastPage);

    const navigatePrev = () => {
        if (currentPage !== 1) {
            dispatch(TodoActions.onNavigatePrev());
        }
    };

    const navigateNext = () => {
        if (currentPage !== totalPages) {
            dispatch(TodoActions.onNavigateNext());
        }
    };

    const handleCurrentPage = (page: number) => {
        dispatch(TodoActions.onClickCurrentPage(page));
    };

    const handleChange = 
    (event: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch(
            TodoActions
            .onChangeTodosPerpage(
                Number(event.target.value)));
    };

    if (error) return <h1>Error: {error.message}</h1>;
    if (loading) return <h1>Loading...</h1>;

    return (
        <main>
            <p>
                <span 
                    className="button" 
                    onClick={navigatePrev}
                    >Previous
                </span>
                {pages.map((page) => (
                    <span 
                        className="button" 
                        key={page} 
                        onClick={() => handleCurrentPage.call(null, page)}
                        >{page}
                    </span>
                ))}
                <span 
                    className="button" 
                    onClick={navigateNext}
                    >Next
                </span>
            </p>
            <ul>
                {visibleTodos.map((todo) => (
                    <li key={todo.id}>
                        {todo.id} - {todo.title}
                    </li>
                ))}
            </ul>
            <hr />
            <footer>
                Page {currentPage} of {totalPages}
            </footer>
            <hr />
            <select 
                id="option__group"
                onChange={handleChange}
                >
                    <option value="10">10</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
            </select>
        </main>
    );
};


