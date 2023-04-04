import { Container, Row } from 'react-bootstrap';

const CardContainer = ({ children }) => (
  <Container fluid className="h-100">
    <Row className="justify-content-center align-content-center h-100">
      <div className="col-12 col-md-8 col-xxl-6">
        {children}
      </div>
    </Row>
  </Container>
);

export default CardContainer;
