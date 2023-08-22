import ToDoItem from '../ToDoItem';
import { useTodoContext } from '../../context';
import styles from './style.module.css';

const ToDoList = () => {
  const [state, objectActions] = useTodoContext();

  return (
    <main className={styles.root}>
      {state?.list.map((item) => (
        <ToDoItem
          key={item.title}
          data={item}
          onMarkAsComplete={() =>
            objectActions.handleMarkAsCompleted(item.title)
          }
          isHistory={false}
          onRemoveTask={() => objectActions.handleRemoveMark(item.title)}
        />
      ))}
    </main>
  );
};

export default ToDoList;
