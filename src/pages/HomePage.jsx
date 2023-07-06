import styled from "styled-components"
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BiExit } from "react-icons/bi"
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai"
import { UserContext } from "../context/UserContext";
import axios from "axios";
import ItemTransaction from "../components/ItemTransaction";

export default function HomePage() {
  const {user, setUser} = useContext(UserContext)
  const navigate = useNavigate();

  const [listTransaction, setListTransaction] = useState([]);
  
  let total = 0;

  useEffect(() => {
    const config = {
        headers: { "Authorization": `Bearer ${user.token}` }
    }
    axios.get(`${import.meta.env.VITE_API_URL}/operations`, config)
        .then((res) => {
            const transitions = res.data;
            console.log("res.data de operations in home:", res.data)
            setListTransaction(transitions.filter(u => u.idUser === user.userID));
        })
        .catch(res => console.log(res));

}, []);
console.log('listTransaction aqui:', listTransaction)


  function logout() {
    localStorage.removeItem("user");
    setUser({ name: "", token: "", userID: "" });
    navigate('/');
  }

  function calculateTotal() {
    total = 0;
  
    for (let i = 0; i < listTransaction.length; i++) {
      if (listTransaction[i].type === 'entrada') {
        total = total + listTransaction[i].value;
      } else if (listTransaction[i].type === 'saida') {
        total = total - listTransaction[i].value;
      }
    }
    return total;
  }
  calculateTotal()

  return (
    <HomeContainer>
      <Header>
        <h1>Olá, {user.name} </h1>
        <BiExit onClick={logout}/>
      </Header>

{!(listTransaction.length === 0) ? (<TransactionsContainer>
        <ul>
          {listTransaction.map((item, index) =>
          <ItemTransaction
          key={index} 
          date={item.date}
          value={item.value}
          description={item.description}
          type={item.type}
          /> )}
        </ul>

        <Total color={total > 0 ? "#03AC00" : "#C70000"}>
          <strong>Saldo</strong>
          <p className="value">{
                            Math.abs(total).toLocaleString('pt-br', {
                                style: 'decimal', minimumFractionDigits: 2, maximumFractionDigits: 2
                            })}</p>
        </Total>
      </TransactionsContainer>): (<TransactionsContainer><p>Não há registros de entrada ou saída</p></TransactionsContainer>)}

      <ButtonsContainer>
        <button onClick={() => navigate('/nova-transacao/entrada')}>
          <AiOutlinePlusCircle />
          <p>Nova <br /> entrada</p>
        </button>
        <button onClick={() => navigate('/nova-transacao/saida')}>
          <AiOutlineMinusCircle />
          <p>Nova <br />saída</p>
        </button>
      </ButtonsContainer>

    </HomeContainer>
  )
}

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 50px);
`
const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2px 5px 2px;
  margin-bottom: 15px;
  font-size: 26px;
  color: white;
`
const TransactionsContainer = styled.article`
  flex-grow: 1;
  background-color: #fff;
  color: #000;
  border-radius: 5px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  article {
    display: flex;
    justify-content: space-between;   
    strong {
      font-weight: 700;
      text-transform: uppercase;
    }
  }
`
const ButtonsContainer = styled.section`
  margin-top: 15px;
  margin-bottom: 0;
  display: flex;
  gap: 15px;
  
  button {
    width: 50%;
    height: 115px;
    font-size: 22px;
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    p {
      font-size: 18px;
    }
  }
`
const Total = styled.article`

    p.value{
      font-size: 16px;
  text-align: right;
        color: ${props => props.color};
    }
`;