import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker'; // Importação corrigida
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const cor1 = '#000000'; // Preto
const cor2 = "#f0dc82"; // Dourado
const cor3 = '#2F2F2F'; // Cinza
const cor4 = '#F5F5DC'; // Bege
const cor5 = '#B8860B'; // Dourado 2

export default function TelaRequisicoes() {
  const [tipoSelecionado, setTipoSelecionado] = useState(''); // Filtro por tipo de requisição

  const requisicoes = [
    { nome: "Daniel Silva", tipo: "Aprovação de conta", icon: "account-tie" },
    { nome: "Carlos Pereira", tipo: "Alteração no registro de ponto", icon: "account-clock" },
    { nome: "Mariana Lima", tipo: "Justificativa de falta", icon: "calendar-remove" },
    { nome: "Carlos Pereira", tipo: "Justificativa de atraso", icon: "clock-alert" },
    { nome: "Ana Souza", tipo: "Justificativa de saída antes do previsto", icon: "exit-run" },
    { nome: "Mariana Lima", tipo: "Alteração no registro de ponto", icon: "account-clock" },
    { nome: "João Silva", tipo: "Justificativa de falta", icon: "calendar-remove" },
    { nome: "Pedro Henrique", tipo: "Aprovação de conta", icon: "account-tie" },
    { nome: "Ana Souza", tipo: "Justificativa de atraso", icon: "clock-alert" },
    { nome: "João Silva", tipo: "Justificativa de saída antes do previsto", icon: "exit-run" },
  ];

  // Filtrar as requisições com base no tipo selecionado
  const requisicoesFiltradas = tipoSelecionado
    ? requisicoes.filter((item) => item.tipo === tipoSelecionado)
    : requisicoes;

  return (
    <View style={styles.container}>
      {/* Título */}
      <Text style={styles.title}>Requisições</Text>

      {/* Filtro como Picker */}
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={tipoSelecionado}
          onValueChange={(itemValue) => setTipoSelecionado(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Todos" value="" />
          <Picker.Item label="Aprovação de conta" value="Aprovação de conta" />
          <Picker.Item label="Alteração no registro de ponto" value="Alteração no registro de ponto" />
          <Picker.Item label="Justificativa de falta" value="Justificativa de falta" />
          <Picker.Item label="Justificativa de atraso" value="Justificativa de atraso" />
          <Picker.Item label="Justificativa de saída antes do previsto" value="Justificativa de saída antes do previsto" />
        </Picker>
      </View>

      {/* Lista de Requisições */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {requisicoesFiltradas.map((item, index) => (
          <View key={index} style={styles.card}>
            <MaterialCommunityIcons name={item.icon} size={24} color="#000" style={styles.avatar} />
            <View>
              <Text style={styles.nome}>{item.nome}</Text>
              <Text style={styles.tipo}>{item.tipo}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: cor1,
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    textAlign: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
  },
  pickerContainer: {
    backgroundColor: '#fff',
    borderRadius: 20,
    marginBottom: 20,
    elevation: 2,
  },
  picker: {
    height: 50,
    width: '100%',
    color: '#000',
  },
  scrollContainer: {
    paddingBottom: 80,
    marginTop: 10,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F1F1',
    padding: 15,
    borderRadius: 15,
    marginBottom: 15,
  },
  avatar: {
    marginRight: 15,
  },
  nome: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#000',
  },
  tipo: {
    fontSize: 13,
    color: '#555',
  },
});