import { Container, Transactions, Description, Amount } from "./styles";
import { Header } from "../../components/Header";
import { useCallback, useState } from "react";
import { Alert, FlatList } from "react-native";
import { SpendingStorageDTO } from "../../spending/SpendingStorageDTO";
import { spendingGetAll } from "../../spending/spendingGetAll";
import { useFocusEffect } from "@react-navigation/native";

const states = ['RJ', 'SP', 'MG'];
const providers = ['Totvs', 'Microsoft'];

// function generateCombination(provider: string[], state: string[]) {
//     const combinantions = [];

//     for (let i = 0; i < providers.length; i++) {
//         for (let j = 0; j < states.length; j++) {
//             combinantions.push({ item1: providers[i].valueOf(), item2: states[j] });
//         }
//     }

//     return combinantions;
// }


function formatToBRL(value: number): string {
    return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  }

const parseBRL = (value: string) => {
// Remove R$, espaços, pontos e substitui vírgulas por pontos

    const cleanedString = value.replace(/[R$\s]/g, "").trim();
    const parsedValue = cleanedString.replace(/\./g, "").replace(/,/g, ".");
    return parseFloat(parsedValue);
}

export function ListAll() {

    const [data, setData] = useState<SpendingStorageDTO[]>([]);
    
    //Variável auxiliar para trazer todas as combinações
    //const [aux, setAux] = useState<{item1: string, item2: string}[]>([]);

    const aux = providers.flatMap((item1) => 
        states.map((item2) => ({item1, item2}))
    );


    async function loadData() {
        try{
            const data = await spendingGetAll();
            setData(data);
        }catch(e) {
            Alert.alert("Error", "Não foi possível carregar os dados, tente novamente!");
        }
    }

    useFocusEffect(
        useCallback(() => {
        
           

            loadData();
        
        },[])
    );

    function countData(provider: string, state: string): number {
        
        // let count = 0;

        // for(let i = 0; data.length; i++) {
        //     if(data[i].provider === provider && data[i].state === state) {
        //         count++;
        //     }
        // }

        // return count;

        const count = data.filter((row) => row.provider === provider && row.state === state).length;

        return count;
    }

    function countTotalValue(provider: string, state: string): string {

        const stateAndProvider = data.filter((row) => row.provider === provider && row.state === state);

        const value = stateAndProvider.map((row) => {
            return {
                initialValue: parseBRL(row.invoiceValue),
                taxValue: parseBRL(row.tax!)
            };
        })
       .reduce((total, row) => {
            return total + row.initialValue + row.taxValue; 
       }, 0);

       return formatToBRL(value);
       
    }
    return (
           
            
        <Container>
            <Header title="Resumo"/>
            <FlatList

                data={aux}
                keyExtractor={(item, index) => `${item.item1} / ${item.item2} / ${index}`}
                renderItem={({item}) => (
                    <Transactions>
                        <Container>
                            <Description>{`${item.item1}/${item.item2}`}</Description>
                            <Description>
                                Quantidade: {countData(item.item1, item.item2)} {" "} 
                            </Description>
                            <Amount>
                                {countTotalValue(item.item1, item.item2)}
                            </Amount>
                        </Container>
                    </Transactions>
                )} 
                showsHorizontalScrollIndicator={false}      
            />
        </Container>
        



            
        

    );

}