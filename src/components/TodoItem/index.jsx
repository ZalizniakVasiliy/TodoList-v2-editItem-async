import './style.css';
import {useNavigate} from "react-router-dom";

const TodoItem = props => {
    const navigate = useNavigate();

    const redirect = () => {
        navigate('item-to-edit/' + props.todoItem.id)
    };

    return (
        <div className='taskWrapper'>
            <div className='taskHeading'>{props.todoItem.title}
                <span className='edit-content-icon fas fa-pen'
                      onClick={redirect}>
                </span>
            </div>
            <div className='taskDescription'>{props.todoItem.description}</div>
            <hr/>
            <label className='status'>
                <input type="checkbox"
                       className="form-check-input"
                       checked={props.checked}
                       onChange={props.changeStatus(props.todoItem.id)}
                />
                <span className='status-action'>Done?</span>
            </label>
            <hr/>
            <button className='btn btn-danger delete-btn d-block'
                    onClick={props.removeTodoEl(props.todoItem.id)}>Delete
            </button>
        </div>
    );
};

export default TodoItem;