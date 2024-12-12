import {Action, createReducer, on} from '@ngrx/store';
import {crear, deleteTodo, editingTodo, toggleAll, toggleCompleted} from './todo.actions';
import {Todo} from './models/todo.model';

export const initialState: Todo[] = [
  new Todo('Comprar leche'),
  new Todo('Vencer a thanos'),
  new Todo('Terminar el curso'),
];

export const _todoReducer = createReducer(
  initialState,
  on(crear, (state, {texto}) => [...state, new Todo(texto)]),
  on(deleteTodo, (state, {id}) => state.filter(todo => todo.id !== id)),
  on(toggleCompleted, (state, {id}) => {
    return state.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          completado: !todo.completado,
        };
      } else {
        return todo;
      }
    });
  }),
  on(editingTodo, (state, {id, texto}) => {
    return state.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          texto: texto,
        };
      } else {
        return todo;
      }
    });
  }),
  on(toggleAll, (state, {completed}) => state.map((todo) => {
    return {...todo, completado: completed}
  })));

export function todoReducer(state: Todo[] | undefined, actions: Action) {
  return _todoReducer(state, actions);
}
