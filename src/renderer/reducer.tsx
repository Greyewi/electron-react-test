export interface Action {
  payload?: any;
  type: string;
}

export interface Task {
  author: string;
  title: string; // instead of ID, must be uniq
  content: string;
  isComplete: boolean;
}

export interface State {
  list: Task[];
  error: null | string;
  draft: Task | null;
  history: {
    type: 'add' | 'remove';
    task: Task;
  }[];
}

const prefix = 'to-do';
export const LOAD_DATA = `${prefix}/LOAD_DATA`;
export const SET_NEW_TODO = `${prefix}/SET_NEW_TODO`;
export const WRITE_A_DRAFT = `${prefix}/WRITE_A_DRAFT`;
export const SET_COMPLETED = `${prefix}/SET_COMPLETED`;
export const REMOVE_TASK = `${prefix}/REMOVE_TASK`;

export const initialState: State = {
  list: [],
  error: null,
  draft: null,
  history: [],
};

export const Reducer = (state: State, action: Action): State => {
  // TODO: the better option to move logic to another layer, but I have a lack of time((
  const { payload, type } = action;
  switch (type) {
    case LOAD_DATA:
      if (payload) {
        return { ...state, list: payload };
      }
      return state;
    case SET_NEW_TODO:
      if (state.list.find((f) => f.title === state.draft?.title)) {
        return { ...state, error: 'The title must be uniq' };
      }
      if (state.draft) {
        return {
          ...state,
          list: [...state.list, state.draft],
          draft: null,
          history: [...state.history, { type: 'add', task: state.draft }],
        };
      }
      return state;
    case WRITE_A_DRAFT:
      if (payload) {
        return { ...state, draft: payload };
      }
      return state;
    case SET_COMPLETED:
      if (payload) {
        return {
          ...state,
          list: state.list.map((item) =>
            item.title === payload ? { ...item, isComplete: true } : item
          ),
        };
      }
      return state;
    case REMOVE_TASK:
      if (payload) {
        return {
          ...state,
          list: state.list.filter((f) => f.title !== payload),
          history: [
            ...state.history,
            {
              type: 'remove',
              task: state.list.find((f) => f.title !== payload),
            },
          ],
        } as State;
      }
      return state;
    default:
      return state;
  }
};
