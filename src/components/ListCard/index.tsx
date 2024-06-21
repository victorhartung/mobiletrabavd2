import { TouchableOpacityProps } from 'react-native'

import {
    Container,
    ButtonCard,
    TextCard
} from './styles'

import { SpendingStorageDTO } from '../../spending/SpendingStorageDTO'

type Props = {
    data: SpendingStorageDTO
}

export function ListCard({ data }: Props) {
    return (
        <Container>
            <ButtonCard>
                <TextCard>Dados do Cadastro</TextCard>
                <TextCard>Nota Fiscal:{data.invoice} </TextCard>
                <TextCard>Código do Imposto: {data.productCode}</TextCard>
                <TextCard>Valor da Nota Fiscal: {data.invoiceValue} </TextCard>
                <TextCard>Estado: {data.state} </TextCard>
                <TextCard>Fornecedor: {data.provider} </TextCard>
                <TextCard>Valor do Imposto: {data.tax}</TextCard>
            </ButtonCard>
        </Container>
    )
}


