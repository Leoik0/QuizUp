import { useState } from "react";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import { auth, db } from "../../config/firebase";
import { ref, child, set } from "firebase/database";
import styled from "styled-components";

const Container = styled.div`
  height: 100dvh;
  width: 100dvw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(to bottom right, #380369, #5b0e79);
`;

const Header = styled.header`
  margin-bottom: 20px;

  img {
    width: 150px;
    height: auto;
  }
`;

const Form = styled.form`
  width: 300px;
`;

const InputContainer = styled.div`
  margin-bottom: 20px;

  label {
    color: white;
    display: block;
    margin-bottom: 5px;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  background: transparent;
  border: 1px solid white;
  color: white;

  ::placeholder {
    color: rgba(255, 255, 255, 0.7);
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  background-color: #ff69b4;
  color: #fff;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #ff1493;
  }
`;

const Footer = styled.div`
  margin-top: 20px;
  text-align: center;

  p {
    color: white;
  }

  a {
    color: white;
    text-decoration: underline;

    &:hover {
      color: #ff69b4;
    }
  }
`;

function RegisterComponent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);

  async function handleSignUp(e) {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        email,
        password
      );

      const userId = userCredential.user.uid;

      const userRef = ref(db, `users/${userId}`);

      await set(userRef, {
        totalPoints: 0,
      });
    } catch (error) {
      console.error("Error creating user:", error);
    }
  }

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <Container>
      <Header>
        <img src="/anonimo.webp" alt="" />
      </Header>

      <Form onSubmit={handleSignUp}>
        <InputContainer>
          <label htmlFor="email">E-mail</label>
          <Input
            type="text"
            name="email"
            id="email"
            placeholder="johndoe@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </InputContainer>

        <InputContainer>
          <label htmlFor="password">Senha</label>
          <Input
            type="password"
            name="password"
            id="password"
            placeholder="********************"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </InputContainer>

        <Link to="/">
          <Button type="submit">Cadastrar</Button>
        </Link>
        <Footer>
          <p>Você já tem uma conta?</p>
          <Link to="/">Acesse sua conta aqui</Link>
        </Footer>
      </Form>
    </Container>
  );
}

export default RegisterComponent;
