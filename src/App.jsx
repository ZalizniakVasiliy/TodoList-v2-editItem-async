import {Routes, Route} from "react-router-dom";
import Container from "react-bootstrap/Container";
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './routes/HomePage';
import ItemToEdit from "./routes/ItemToEdit";
import TodoList from "./routes/TodoList";

function App() {
    return (
        <>
            <Header/>
            <main>
                <Routes>
                    <Route path='/' element={<HomePage/>}/>
                    <Route path='item-to-edit/:todoId' element={<ItemToEdit/>}/>
                    <Route path='all-items' element={<TodoList/>}/>
                    <Route path='*'
                           element={
                               <Container>
                                   <main className='mt-5' style={{color: 'darkred'}}>
                                       <h2>There's nothing here!</h2>
                                   </main>
                               </Container>
                           }
                    />
                </Routes>
            </main>
            <Footer/>
        </>
    );
}

export default App;
