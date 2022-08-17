import {useState, useEffect} from "react";
import Container from "react-bootstrap/Container";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import TodoForm from '../components/TodoForm';
import TodoItem from "../components/TodoItem";
import Storage from "../utils/Storage";
import withLoader from "../hoc/withLoader";
import cn from "classnames";

const HomePage = () => {
    const [todoList, setNewTodoList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            let dataFromStorage = [];

            try {
                dataFromStorage = await Storage.getItems();
            } catch (e) {
                console.log(e);
            }

            if (Array.isArray(dataFromStorage) && dataFromStorage.length) {
                setNewTodoList(dataFromStorage);
            }

            setIsLoading(false);
        }

        fetchData();

    }, []);

    const handleAddTodoItem = async (todoItem) => {
        setIsLoading(true);
        const newState = await Storage.setItem(todoItem);
        setNewTodoList(newState);
        setIsLoading(false);
    };

    const handleChangeStatus = todoItemId => async ({target}) => {
        setIsLoading(true);
        const newState = await Storage.changeStatus(todoItemId, target);
        setNewTodoList(newState);
        setIsLoading(false);
    };

    const handleRemoveTodoItem = todoItemId => async () => {
        setIsLoading(true);
        const newState = await Storage.removeItem(todoItemId);
        setNewTodoList(newState);
        setIsLoading(false);
    };

    const handleRemoveAllItems = async () => {
        setIsLoading(true);
        const newState = await Storage.clearStorage();
        setNewTodoList(newState);
        setIsLoading(false);
    };

    const renderTodoList = () => (
        <Row>
            {todoList.map(
                (item, index) => (
                    <Col xs={4} key={index} className='text-break'>
                        <TodoItem todoItem={item}
                                  checked={item.executionStatus}
                                  removeTodoEl={handleRemoveTodoItem}
                                  changeStatus={handleChangeStatus}
                        />
                    </Col>
                ))}
        </Row>
    );

    const activeDeleteBtn = cn({
        'disabled': !JSON.parse(localStorage.getItem('todosStorage'))
    });

    const FormWithLoader = withLoader(TodoForm, isLoading);
    const TodoWithLoader = withLoader(renderTodoList, isLoading);

    return (
        <div className='mt-5'>
            <h1 className="text-center mt-5 mb-5">MAKING TODO LIST</h1>
            <Container>
                <Row>
                    <Col xs={4}>
                        <FormWithLoader
                            disableDelBtn={activeDeleteBtn}
                            handleAdd={handleAddTodoItem}
                            removeAllTodos={handleRemoveAllItems}
                        />
                    </Col>
                    <Col>
                        {todoList.length > 0 ? <TodoWithLoader/> : null}
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default HomePage;