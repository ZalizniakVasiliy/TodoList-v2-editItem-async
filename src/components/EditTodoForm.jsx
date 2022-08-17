import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {useFormik} from "formik";
import * as Yup from 'yup';

const EditTodoForm = ({handleUpdate, preloadValues, handleRemove}) => {
    const formik = useFormik({
        initialValues: {
            title: preloadValues.title,
            description: preloadValues.description,
        },

        validationSchema: Yup.object({
            title: Yup.string().trim().required('Required to fill'),
            description: Yup.string().trim().required('Required to fill'),
        }),

        onSubmit: (values) => {
            handleUpdate(values);
        },
    });

    return (
        <Form onSubmit={formik.handleSubmit}>
            <Form.Group className='mb-3'>
                <Form.Label htmlFor='title'>Enter new task title</Form.Label>
                <Form.Control
                    id='title'
                    type='text'
                    {...formik.getFieldProps('title')}/>
                {formik.touched.title && formik.errors.title ? (
                    <div>{formik.errors.title}</div>) : null}
            </Form.Group>

            <Form.Group className='mb-3'>
                <Form.Label htmlFor='description'>Enter new task description</Form.Label>
                <Form.Control
                    id='description'
                    as='textarea'
                    style={{
                        height: '150px'
                    }}
                    {...formik.getFieldProps('description')} />
                {formik.touched.description && formik.errors.description ? (
                    <div>{formik.errors.description}</div>) : null}
            </Form.Group>
            <Button variant="warning mb-1 d-block"
                    type="submit">Edit Task
            </Button>
            <Button variant="danger mb-1 d-block"
                    onClick={handleRemove}
            >Delete Task
            </Button>
        </Form>
    );
};

export default EditTodoForm;