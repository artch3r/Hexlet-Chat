import { Container, Row } from 'react-bootstrap';
import SignUpCard from './components/SignUpCard';
import SignUpForm from './components/SignUpForm';

const SignUpPage = () => (
  <Container fluid className="h-100">
    <Row className="justify-content-center align-content-center h-100">
      <div className="col-12 col-md-8 col-xxl-6">
        <SignUpCard>
          <SignUpForm />
        </SignUpCard>
      </div>
    </Row>
  </Container>
);

export default SignUpPage;
