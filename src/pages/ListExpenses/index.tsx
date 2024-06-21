import { useCallback, useState } from 'react'
import { Header } from '../../components/Header'
import { Container, Transactions } from './styles'
import { FlatList } from 'react-native'
import { ListCard } from '../../components/ListCard'
import { spendingGetAll } from '../../spending/spendingGetAll'
import { SpendingStorageDTO } from '../../spending/SpendingStorageDTO'
import { useFocusEffect } from "@react-navigation/native";



export function ListExpenses() {

  const [dataExpenses, setListExpenses] = useState<SpendingStorageDTO[]>([])

  async function loadDataSpending() {
    const data = await spendingGetAll()
    console.log(data);
    setListExpenses(data);
  }

  useFocusEffect(
    useCallback(() => {
      loadDataSpending()

    }, []) 
  );

  return (
    <Container>
      <Header title='Listagem de Gastos' />
        <Transactions>
          <FlatList data={dataExpenses}
            renderItem={({item}) => 
              <ListCard data={item} />
            }
            showsHorizontalScrollIndicator={false}
          />
                  
        </Transactions>
    </Container>
   
  )
}
