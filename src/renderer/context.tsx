import React, { useReducer, ReactNode, useContext } from 'react';
import {
  State,
  Action,
  Task,
  initialState,
  Reducer,
  SET_COMPLETED,
  SET_NEW_TODO,
  REMOVE_TASK,
  WRITE_A_DRAFT,
} from './reducer';

type TodoContextType = {
  state: State;
  dispatch: React.Dispatch<Action>;
};

const TodoContext = React.createContext<TodoContextType | undefined>(undefined);
interface TodoProviderProps {
  children: ReactNode;
}

export const TodoProvider: React.FC<TodoProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer<React.Reducer<State, Action>>(
    Reducer,
    initialState
  );

  return (
    <TodoContext.Provider value={{ state, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
};

export const useTodoContext = (): [State, any] => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodoContext must be used within a TodoProvider');
  }

  const { state, dispatch } = context;

  const handleMarkAsCompleted = (title: string) => {
    dispatch({ type: SET_COMPLETED, payload: title });
  };

  const handleAddMark = () => {
    dispatch({ type: SET_NEW_TODO });
  };

  const handleRemoveMark = (title: string) => {
    dispatch({ type: REMOVE_TASK, payload: title });
  };

  const handleSetDraft = (draft: Task) => {
    dispatch({ type: WRITE_A_DRAFT, payload: draft });
  };

  return [
    state,
    { handleMarkAsCompleted, handleRemoveMark, handleAddMark, handleSetDraft }, // encapsulated some logic, a good practice ))
  ];
};
