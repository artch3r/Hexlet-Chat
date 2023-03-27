import { Container, Row } from 'react-bootstrap';
import LoginForm from './components/LoginForm';
import LoginCard from './components/LoginCard';

const LoginPage = () => (
  <Container fluid className="h-100">
    <Row className="justify-content-center align-content-center h-100">
      <div className="col-12 col-md-8 col-xxl-6">
        <LoginCard>
          <LoginForm />
        </LoginCard>
      </div>
    </Row>
  </Container>
);

export default LoginPage;
