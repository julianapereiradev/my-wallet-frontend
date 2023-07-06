import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import MyWalletLogo from "../components/MyWalletLogo";
import { useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import axios from "axios";


export default function SignUpPage() {
  
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordagain, setPasswordagain] = useState("");
  const [disable, setDisable] = useState(false);

  function RegisterUser(e) {
    e.preventDefault();
    setDisable(true);

  // Verificar se as senhas são iguais
  if (password !== passwordagain) {
    alert("As senhas não coincidem");
    setDisable(false);
    return; // Retorna sem fazer a requisição
  }

    const novocadastro = { name: name, email: email, password: password };

    const promise = axios.post(`${import.meta.env.VITE_API_URL}/signup`, novocadastro);

    promise.then((resposta) => {
      console.log("resposta.data em: POST no Cadastro:", resposta.data);
      alert("Usuário criado com sucesso!");
      navigate("/");
      setDisable(false)
    });

    promise.catch((erro) => {
      alert(erro.response.data);
      setDisable(false)
      console.log("erro em: POST no Cadastro:", erro);
    });
  }


  return (
    <SingUpContainer>
      <form onSubmit={RegisterUser}>
        <MyWalletLogo />

        <input
          data-test="name"
          type="text"
          placeholder="Nome"
          required
          disabled={disable}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          data-test="email"
          type="email"
          placeholder="E-mail"
          required
          disabled={disable}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          data-test="password"
          type="password"
          placeholder="Senha"
          autoComplete="new-password"
          required
          disabled={disable}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          data-test="conf-password"
          type="password"
          placeholder="Confirme a senha"
          autoComplete="new-password"
          required
          disabled={disable}
          value={passwordagain}
          onChange={(e) => setPasswordagain(e.target.value)}
        />

        <button
        data-test="sign-up-submit" 
        type="submit" 
        disabled={disable}
        >
          {disable ? (
            <ThreeDots type="ThreeDots" color="#fff" height={20} width={50} />
          ) : (
            "Cadastrar"
          )}
        </button>
      </form>

      <Link to={`/`}>Já tem uma conta? Entre agora!</Link>
    </SingUpContainer>
  );
}

const SingUpContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
