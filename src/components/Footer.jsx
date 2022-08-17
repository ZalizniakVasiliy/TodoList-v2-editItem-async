import Container from 'react-bootstrap/Container';

const styles = {
    position: 'fixed',
    bottom: '0',
    width: '100%',
    color: '#949494',
    padding: '10px 0'
};

const Footer = () => {
    return (
        <footer style={styles} className='bg-dark'>
            <Container>
                App footer
            </Container>
        </footer>
    );
};

export default Footer;