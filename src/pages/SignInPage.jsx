import styled from "styled-components"
import { Link, useNavigate } from "react-router-dom"
import MyWalletLogo from "../components/MyWalletLogo"
import { useState, useContext } from "react";
import { ThreeDots } from "react-loader-spinner";
import axios from "axios";
import {UserContext} from "../context/UserContext";

export default function SignInPage() {

  const navigate = useNavigate();

  const {user, setUser} = useContext(UserContext)

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [disable, setDisable] = useState(false);

  function LoginUser(e) {
    e.preventDefault();
    setDisable(true);

    // const URL =
    //   "http://localhost:5000/user";

    const novocadastro = { email: email, password: password };

    const promise = axios.post(`${import.meta.env.VITE_API_URL}/user`, novocadastro);

    promise.then((resposta) => {
      const {name, token, userID} = resposta.data
      setUser({name: name, token: token, userID: userID})
      localStorage.setItem("user", JSON.stringify({name: name, token: token, userID: userID}))

      navigate("/home");
      setDisable(false)
      console.log("resposta.data em: POST no Login:", resposta.data);
    });

    promise.catch((erro) => {
      alert(erro.response.data);
      setDisable(false)
      console.log("erro em: POST no Login:", erro);
    });
  }

  return (
    <SingInContainer>
      <form onSubmit={LoginUser}>
        <MyWalletLogo />

        <input
          type="email"
          placeholder="E-mail"
          required
          disabled={disable}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Senha"
          autoComplete="new-password"
          required
          disabled={disable}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit" disabled={disable}>
          {disable ? (
            <ThreeDots type="ThreeDots" color="#fff" height={20} width={50} />
          ) : (
            "Entrar"
          )}
        </button>
      </form>

      <Link to={`/cadastro`}>
        Primeira vez? Cadastre-se!
      </Link>
    </SingInContainer>
  )
}

const SingInContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
