import {useState, useEffect} from "react";
import {useParams, useNavigate} from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import EditTodoForm from "../components/EditTodoForm";
import Storage from "../utils/Storage";
import withLoader from "../hoc/withLoader";

const ItemToEdit = () => {
    const navigate = useNavigate();
    const {todoId} = useParams();
    const [singleItem, setNewSingleItem] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const currentIndex = singleItem.id;

    const redirect = () => {
        navigate('../');
    };

    useEffect(() => {
        const fetchData = async () => {
            const dataFromStorage = await Storage.getItems();
            const item = dataFromStorage.find(item => item.id === +todoId);
            setNewSingleItem(item);
            setIsLoading(false);
        }

        fetchData();

    }, []);

    const handleUpdateTodoItem = async (singleItem) => {
        setIsLoading(true);
        const currentTitle = singleItem.title.trim();
        const currentDescription = singleItem.description.trim();
        const newState = await Storage.changeContent(currentIndex, currentTitle, currentDescription);
        setNewSingleItem(newState);
        redirect();
        setIsLoading(false);
    };

    const handleRemoveTodoItem = async () => {
        setIsLoading(true);
        const newState = await Storage.removeItem(currentIndex);
        setNewSingleItem(newState);
        redirect();
        setIsLoading(false);
    };

    const ItemFormWithLoader = withLoader(EditTodoForm, isLoading);

    return (
        <div className='mt-5'>
            <Container>
                <h1 className='mb-5 text-center'>ITEM TO EDIT with id: {todoId}</h1>
                <Row className='d-flex justify-content-center'>
                    <Col xs={4}>
                        <ItemFormWithLoader
                            preloadValues={singleItem}
                            handleUpdate={handleUpdateTodoItem}
                            handleRemove={handleRemoveTodoItem}
                        />
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default ItemToEdit;