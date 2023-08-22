import { useTodoContext } from '../../context';
import ToDoItem from '../ToDoItem';
import styles from './style.module.css';

const HistoryList = () => {
  const [state] = useTodoContext();

  return (
    <div className={styles.root}>
      {state.history.map((item) => (
        <section className={styles.list}>
          {item.type === 'add' && (
            <span className={styles.type} style={{ color: 'rgb(2,255,131)' }}>
              New Task:
            </span>
          )}
          {item.type === 'remove' && (
            <span className={styles.type} style={{ color: 'rgb(255,0,0)' }}>
              No longer Task:
            </span>
          )}
          <ToDoItem data={item.task} key={item.task.title} isHistory />
        </section>
      ))}
    </div>
  );
};

export default HistoryList;
