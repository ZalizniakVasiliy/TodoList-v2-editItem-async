import './style.css';

const TodoItemToView = props => {
    return (
        <div className='taskWrapperToView'>
            <div className='taskHeadingToView'>{props.todoItem.title}</div>
            <div className='taskDescriptionToView'>{props.todoItem.description}</div>
        </div>
    );
};

export default TodoItemToView;