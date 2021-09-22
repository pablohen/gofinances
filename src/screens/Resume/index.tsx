import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useCallback, useEffect, useState } from 'react';
import HistoryCard from '../../components/HistoryCard';
import {
  ChartContainer,
  Container,
  Content,
  Header,
  Month,
  MonthSelect,
  MonthSelectButton,
  MonthSelectIcon,
  Title,
} from './styles';
import { categories } from './../../utils/categories';
import { VictoryPie } from 'victory-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { addMonths, subMonths, format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { LoadContainer } from './styles';
import { ActivityIndicator } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useAuth } from '../../hooks/auth';

interface TransactionData {
  type: 'positive' | 'negative';
  name: string;
  amount: string;
  category: string;
  date: string;
}

interface CategoryData {
  key: string;
  name: string;
  color: string;
  total: number;
  totalFormatted: string;
  percent: string;
}

interface Props {}

const Resume = (props: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>(
    []
  );

  const theme = useTheme();
  const { user } = useAuth();

  const handleDateChange = (action: 'next' | 'prev') => {
    setIsLoading(true);
    if (action === 'next') {
      const newDate = addMonths(selectedDate, 1);
      setSelectedDate(newDate);
    } else {
      const newDate = subMonths(selectedDate, 1);
      setSelectedDate(newDate);
    }
  };

  const loadData = async () => {
    setIsLoading(true);

    const dataKey = `@gofinances:transactions_${user.id}`;
    const res = await AsyncStorage.getItem(dataKey);
    const resFormatted = res ? JSON.parse(res) : [];

    const expensives = resFormatted.filter(
      (expensive: TransactionData) =>
        expensive.type === 'negative' &&
        new Date(expensive.date).getFullYear() === selectedDate.getFullYear() &&
        new Date(expensive.date).getMonth() === selectedDate.getMonth()
    );

    const expensivesTotal = expensives.reduce(
      (accumulator: number, expensive: TransactionData) => {
        return accumulator + Number(expensive.amount);
      },
      0
    );

    const totalByCategory = [];

    categories.forEach((category) => {
      let categorySum = 0;

      expensives.forEach((expensive: TransactionData) => {
        if (expensive.category === category.key) {
          categorySum += Number(expensive.amount);
        }
      });

      if (categorySum > 0) {
        const totalFormatted = categorySum.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        });

        const percent = `${((categorySum / expensivesTotal) * 100).toFixed(
          0
        )}%`;

        totalByCategory.push({
          key: category.key,
          name: category.name,
          color: category.color,
          total: categorySum,
          totalFormatted,
          percent,
        });
      }
    });

    setTotalByCategories(totalByCategory);
    setIsLoading(false);
  };

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [selectedDate])
  );

  return (
    <Container>
      <Header>
        <Title>Resumo por categoria</Title>
      </Header>

      {isLoading ? (
        <LoadContainer>
          <ActivityIndicator color={theme.colors.primary} size="large" />
        </LoadContainer>
      ) : (
        <Content
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 24,
            paddingBottom: useBottomTabBarHeight(),
          }}
        >
          <MonthSelect>
            <MonthSelectButton onPress={() => handleDateChange('prev')}>
              <MonthSelectIcon name="chevron-left" />
            </MonthSelectButton>

            <Month>{format(selectedDate, 'MMMM yyyy', { locale: ptBR })}</Month>

            <MonthSelectButton onPress={() => handleDateChange('next')}>
              <MonthSelectIcon name="chevron-right" />
            </MonthSelectButton>
          </MonthSelect>

          <ChartContainer>
            <VictoryPie
              data={totalByCategories}
              colorScale={totalByCategories.map((category) => category.color)}
              style={{
                labels: {
                  fontSize: RFValue(18),
                  fontWeight: 'bold',
                  fill: theme.colors.shape,
                },
              }}
              labelRadius={50}
              x="percent"
              y="total"
            />
          </ChartContainer>

          {totalByCategories.map((item) => (
            <HistoryCard
              key={item.key}
              title={item.name}
              color={item.color}
              amount={item.totalFormatted}
            />
          ))}
        </Content>
      )}
    </Container>
  );
};

export default Resume;
