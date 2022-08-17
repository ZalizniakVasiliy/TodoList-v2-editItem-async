import Loader from "../components/Loader";

const withLoader = (WrappedComponent, isLoading) => {
    return props => (
        <>
            {isLoading ? <Loader/> : <WrappedComponent {...props}/>}
        </>
    );
};

export default withLoader;