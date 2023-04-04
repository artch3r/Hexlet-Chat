import CardContainer from '../commonComponents/CardContainer/CardContainer';
import LoginForm from './components/LoginForm';
import LoginCard from './components/LoginCard';

const LoginPage = () => (
  <CardContainer>
    <LoginCard>
      <LoginForm />
    </LoginCard>
  </CardContainer>
);

export default LoginPage;
