import { Card } from 'react-bootstrap';

const AuthCard = ({ children, image, footer }) => (
  <Card className="shadow-sm">
    <Card.Body className="row p-5">
      <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
        <img
          src={image.src}
          className="rounded-circle"
          alt={image.alt}
        />
      </div>
      {children}
    </Card.Body>
    <Card.Footer className="p-4">
      <div className="text-center">
        <span>
          {footer.text}
          {' '}
        </span>
        <a href={footer.href}>{footer.hrefText}</a>
      </div>
    </Card.Footer>
  </Card>
);

export default AuthCard;
