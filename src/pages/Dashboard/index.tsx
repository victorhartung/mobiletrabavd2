import { useState } from 'react'
import { Alert } from 'react-native'
import AsyncStorage
  from "@react-native-async-storage/async-storage";

import { Button } from '../../components/Button'
import { Header } from '../../components/Header'
import { Input } from '../../components/Input'
import { Container } from './styles'
import { spendingCreate } from '../../spending/spendingCreate'
import { spendingGetAll } from '../../spending/spendingGetAll';

export function Dashboard() {

  const [invoice, setInvoice] = useState('')
  const [productCode, setProductCode] = useState('')
  const [invoiceValue, setInvoiceValue] = useState('')
  const [state, setState] = useState('')
  const [provider, setProvider] = useState('')


  const validProductCodes = ['1234', '6789', '1708', '5952'];
  const validStates = ['RJ', 'SP', 'MG'];
  const validProviders = ['Totvs', 'Microsoft'];

  function calculateTax(productCode: string, state: string, invoiceValue: string): number {
    if((productCode === '1234' || productCode === '6789') && state === 'RJ') {
     
      return invoiceValue * 0.01;
    
    }else if((productCode === '1234' || productCode === '6789') && state === 'SP') {
     
      return invoiceValue * 0.02;
    
    }else if((productCode === '1234' || productCode === '6789') && state === 'MG') {
     
      return invoiceValue * 0.03;
    
    }else{
    
      return 0;
    }
  }

  async function handleAddNewSpending() {

    //limpar o AsyncStorage no IOS
    // AsyncStorage.getAllKeys().then(AsyncStorage.multiRemove)
    // Alert.alert('Atencao', 'Programa finalizado !!')
    // return

    // limpa o AsyncStorage no Android
    // await AsyncStorage.clear()
    // Alert.alert('Atencao', 'Programa finalizado !!')
    // return


    if (invoice.trim() === '' || productCode.trim() === ''
      || invoiceValue.trim() === '' || state.trim() === ''
      || provider.trim() === '') {
      return Alert.alert('Atencao',
        'Todos os campos devem ser preenchidos')
    }

    // validações
    if (!validProductCodes.includes(productCode.trim())) {
      return Alert.alert('Atenção', 'Código do Imposto inválido. Aceitos: 1234, 6789, 1708, 5952');
    }

    if (!validStates.includes(state.trim())) {
      return Alert.alert('Atenção', 'Estado inválido. Aceitos: RJ, SP, MG');
    }

    if (!validProviders.includes(provider.trim())) {
      return Alert.alert('Atenção', 'Fornecedor inválido. Aceitos: Totvs, Microsoft');
    }

    //Calcula imposto
    const tax = calculateTax(productCode.trim(), state.trim(), parseFloat(invoiceValue.trim()));

    const data = {
      id: String(new Date().getTime()),
      invoice,
      productCode,
      invoiceValue,
      state,
      provider,
      tax: tax.toFixed(2)
    }

    setInvoice('')
    setProductCode('')
    setInvoiceValue('')
    setState('')
    setProvider('')

    await spendingCreate(data)
    const result = await spendingGetAll()
    console.log(result)
  }

  return (
    <Container>

      <Header title='Cadastro de Produtos' />

      <Input
        placeholder='Nota Fiscal'
        placeholderTextColor='#363F5F'
        value={invoice}
        onChangeText={value => setInvoice(value)}
      />

      <Input
        placeholder='Código do Imposto'
        placeholderTextColor='#363F5F'
        value={productCode}
        onChangeText={value => setProductCode(value)}
      />

      <Input
        placeholder='Valor da Nota Fiscal'
        placeholderTextColor='#363F5F'
        value={invoiceValue}
        onChangeText={value => setInvoiceValue(value)}
      />

      <Input
        placeholder='Estado'
        placeholderTextColor='#363F5F'
        value={state}
        onChangeText={value => setState(value)}
      />
      
      <Input
        placeholder='Fornecedor'
        placeholderTextColor='#363F5F'
        value={provider}
        onChangeText={value => setProvider(value)}
      />

      <Button
        title='Adicionar'
        onPress={handleAddNewSpending}
      />

    </Container>
  )
}