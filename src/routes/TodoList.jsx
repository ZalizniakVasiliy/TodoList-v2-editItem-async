import {useEffect, useState} from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import TodoItemToView from "../components/TodoItemToView";
import Storage from "../utils/Storage";
import withLoader from "../hoc/withLoader";

const TodoList = () => {
    const [todoList, setTodoList] = useState([]);
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
                setTodoList(dataFromStorage);
            }
            setIsLoading(false);
        }

        fetchData();
    });

    const viewTodoList = () => (
        <Col xs={8}>
            <Row className='d-flex justify-content-center'>
                {todoList.map(
                    (item, index) => (
                        <Col xs={4} key={index}>
                            <TodoItemToView todoItem={item}/>
                        </Col>
                    ))}
            </Row>
        </Col>
    );

    const TodoWithLoader = withLoader(viewTodoList, isLoading);

    return (
        <div className='mt-5'>
            <h1 className="mt-5 mb-5 text-center">REVIEW TODO LIST</h1>
            <Container>
                <Row className='d-flex justify-content-center'>
                    <TodoWithLoader/>
                </Row>
            </Container>
        </div>
    );
};

export default TodoList;