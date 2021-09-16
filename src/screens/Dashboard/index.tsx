import React from 'react';
import HighlightCard from '../../components/HighlightCard';
import TransactionCard, {
  TransactionCardProps,
} from '../../components/TransactionCard';
import {
  Container,
  Header,
  UserWrapper,
  UserInfo,
  Photo,
  User,
  UserGreeting,
  UserName,
  Icon,
  HighlightCards,
  Transactions,
  Title,
  TransactionList,
} from './styles';

export interface DataListProps extends TransactionCardProps {
  id: string;
}

interface Props {}

const Dashboard = (props: Props) => {
  const data: DataListProps[] = [
    {
      id: '1',
      type: 'positive',
      title: 'Desenvolvimento de site',
      amount: 'R$ 12000,00',
      category: { name: 'Vendas', icon: 'dollar-sign' },
      date: '16/09/2021',
    },
    {
      id: '2',
      type: 'negative',
      title: 'Hamburgeria Pizzy',
      amount: 'R$ 59,00',
      category: { name: 'Alimentação', icon: 'coffee' },
      date: '15/09/2021',
    },
    {
      id: '3',
      type: 'negative',
      title: 'Aluguel',
      amount: 'R$ 1200,00',
      category: { name: 'Casa', icon: 'shopping-bag' },
      date: '01/09/2021',
    },
  ];
  return (
    <Container>
      <Header>
        <UserWrapper>
          <UserInfo>
            <Photo source={{ uri: 'https://github.com/pablohen.png' }} />
            <User>
              <UserGreeting>Olá,</UserGreeting>
              <UserName>Pablo Henrique</UserName>
            </User>
          </UserInfo>
          <Icon name="power" />
        </UserWrapper>
      </Header>

      <HighlightCards>
        <HighlightCard
          type="up"
          title="Entradas"
          amount="R$ 17400,00"
          lastTransaction="Hoje"
        />
        <HighlightCard
          type="down"
          title="Saídas"
          amount="R$ 1259,00"
          lastTransaction="Hoje"
        />
        <HighlightCard
          type="total"
          title="Total"
          amount="R$ 16141,00"
          lastTransaction="Hoje"
        />
      </HighlightCards>

      <Transactions>
        <Title>Listagem</Title>

        <TransactionList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <TransactionCard data={item} />}
        />
      </Transactions>
    </Container>
  );
};

export default Dashboard;
