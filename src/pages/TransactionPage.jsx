import styled from "styled-components"
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { UserContext } from "../context/UserContext";

export default function TransactionsPage() {
  const { tipo } = useParams();
  const {user} = useContext(UserContext);

  const navigate = useNavigate();
  const [value, setValue] = useState('');
  const [description, setDescription] = useState('');

console.log('user em TransactionPage:', user)

function newTransition(e){
  e.preventDefault();

  const config = {
      headers: {"Authorization": `Bearer ${user.token}`}
  };

  axios.post(`${import.meta.env.VITE_API_URL}/operations`, {value: parseFloat(value), description: description, type: tipo}, config)
  .then((res) => {
      console.log("Operação feita com sucesso!");
      console.log('res.data de POST operation', res.data)
      navigate('/home');
  })
  .catch((res) => {
      console.log(res);
      alert(res);
  })
}

  return (
      <>
      { tipo === "entrada" ? 
        (<TransactionsContainer>
          <h1>Nova entrada</h1>
          <form onSubmit={newTransition}>

            <input 
            placeholder="Valor" 
            type='number'
            required={true}
            value={value}
            onChange={(e) => !isNaN(e.target.value) ? setValue(e.target.value) : setValue('')} 
            />

            <input 
            placeholder="Descrição" 
            type="text"
            required={true}
            value={description}
            onChange={(e) => setDescription(e.target.value)} 
            />

            <button type="submit">Salvar entrada</button>

          </form>
        </TransactionsContainer>) 
        : 
        (<TransactionsContainer>
          <h1>Nova saída</h1>
          <form onSubmit={newTransition}>

            <input 
            placeholder="Valor" 
            type='number'
            required={true}
            value={value}
            onChange={(e) => !isNaN(e.target.value) ? setValue(e.target.value) : setValue('')} 
            />

            <input 
            placeholder="Descrição" 
            type="text"
            required={true}
            value={description}
            onChange={(e) => setDescription(e.target.value)} 
            />

            <button type="submit">Salvar saída</button>

          </form>
        </TransactionsContainer>)
      }
      </>
  )
}

const TransactionsContainer = styled.main`
  height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  h1 {
    align-self: flex-start;
    margin-bottom: 40px;
  }
`
