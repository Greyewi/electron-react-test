import { FC, useState } from 'react';
import { Task } from '../../reducer';
import styles from './style.module.css';

interface Props {
  data: Task;
  onMarkAsComplete?: () => void;
  onRemoveTask?: () => void;
  isHistory: boolean;
}

const ToDoItem: FC<Props> = ({
  data,
  onMarkAsComplete,
  onRemoveTask,
  isHistory,
}) => {
  const [expanded, setExpanded] = useState<boolean>(false);
  return (
    <section className={styles.item}>
      <span className={styles.item__header}>
        <span
          aria-hidden="true"
          className={styles.title}
          onClick={() => setExpanded((prev) => !prev)}
        >
          {data.title}
        </span>
        {!data.isComplete && (
          <div
            onClick={isHistory ? () => false : onMarkAsComplete}
            aria-hidden="true"
            className={styles.in_progress}
          >
            In progress (click to mark as done)
          </div>
        )}
        {data.isComplete && <div className={styles.done}>Done</div>}
      </span>
      <div className={expanded ? styles.active : styles.hidden}>
        <span className={styles.description}>{data.content}</span>
      </div>
      {!isHistory && (
        <button type="button" onClick={onRemoveTask}>
          Remove
        </button>
      )}
    </section>
  );
};

export default ToDoItem;
