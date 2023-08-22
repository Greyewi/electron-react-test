import { Link } from 'react-router-dom';
import icon from '../../../../assets/icon.svg';
import ToDoList from '../../Components/ToDoList';
import CreateTask from '../../Components/CreateTask';

const ToDo = () => {
  return (
    <>
      <div className="Hello">
        <Link to="/">
          <img width="200" alt="icon" src={icon} />
        </Link>
      </div>
      <h1>To do list</h1>
      <ToDoList />
      <CreateTask />
    </>
  );
};

export default ToDo;
