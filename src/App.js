import './App.css';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [formValues, setFormValues] = useState({ email: "", password: "", favClass: "1" });
  const [validationStates, setValidationStates] = useState({ emailState: true, passwordState: true });
  const [validateEmailOnSubmit, setValidateEmailOnSubmit] = useState(false); // Estado para controlar la validación del email

  const handleEmailChange = (e) => {
    const email = e.target.value;
    setFormValues({ ...formValues, email });

    // Solo validar el email si validateEmailOnSubmit es true
    if (validateEmailOnSubmit) {
      const emailIsValid = email.includes('@') && email.includes('.');
      setValidationStates({ ...validationStates, emailState: emailIsValid });
    }
  };

  const handlePasswordChange = (e) => {
    const password = e.target.value;
    setFormValues({ ...formValues, password });

    // Validar la contraseña de inmediato
    const passwordIsValid = password.length >= 9 && /\d/.test(password) && /[a-zA-Z]/.test(password);
    setValidationStates({ ...validationStates, passwordState: passwordIsValid });
  };

  const handleSelectChange = (e) => {
    setFormValues({ ...formValues, favClass: e.target.value });
  };

  const clickSubmit = () => {
    // Activar validación del email
    setValidateEmailOnSubmit(true);

    // Validar email solo si es necesario
    const emailIsValid = formValues.email.includes('@') && formValues.email.includes('.');
    setValidationStates({ ...validationStates, emailState: emailIsValid });

    if (emailIsValid && validationStates.passwordState) {
      alert(JSON.stringify(formValues));
    }
  };

  return (
    <div>
      <h1>Ejemplo de formularios!</h1>
     
      <Form>
        <Form.Group className="mb-6" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control 
            type="email" 
            placeholder="Enter email" 
            onChange={handleEmailChange} 
            value={formValues.email} 
            isInvalid={validateEmailOnSubmit && !validationStates.emailState} // Mostrar estado inválido solo después de Submit
          />
          {validateEmailOnSubmit && !validationStates.emailState && (
            <Form.Text className="text-muted" style={{ color: "red" }}>
              Your email should follow an established format.
            </Form.Text>
          )}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control 
            type="password" 
            placeholder="Password" 
            onChange={handlePasswordChange} 
            value={formValues.password} 
            isInvalid={!validationStates.passwordState} // Mostrar el estado inválido inmediatamente
          />
          {!validationStates.passwordState && (
            <Form.Text className="text-muted" style={{ color: "red" }}>
              Your password should have numbers and letters and should be at least 9 char long
            </Form.Text>
          )}
        </Form.Group>
        
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Label>Favorite Class</Form.Label>
          <Form.Select onChange={handleSelectChange}>
            <option value="1">ISIS3710</option>
            <option value="2">Programación con tecnologías web</option>
          </Form.Select>
        </Form.Group>

        <Button variant="primary" onClick={clickSubmit}>
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default App;
