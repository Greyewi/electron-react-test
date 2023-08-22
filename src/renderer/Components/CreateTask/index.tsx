import { useTodoContext } from '../../context';
import { Task } from '../../reducer';
import styles from './style.module.css';
import { useFocus } from './useFocus';

const CreateTask = () => {
  const [state, objectActions] = useTodoContext();
  const focusedRef = useFocus(state.list.length);
  const handleChange = (field: string) => (e: any) => {
    objectActions.handleSetDraft({
      ...state.draft,
      [field]: e.target.value,
    } as Task);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        objectActions.handleAddMark();
      }}
      className={styles.form}
    >
      <h1>Add a new task</h1>
      <input
        placeholder="title"
        className={styles.field}
        name="title"
        value={state.draft?.title || ''}
        onChange={handleChange('title')}
        ref={focusedRef}
      />
      <textarea
        placeholder="description"
        className={styles.field}
        name="content"
        value={state.draft?.content || ''}
        onChange={handleChange('content')}
      />
      <button type="submit">Add</button>
    </form>
  );
};

export default CreateTask;
