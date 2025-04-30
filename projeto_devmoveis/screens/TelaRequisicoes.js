import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const cor1 = '#000000'; // Preto
const cor2 = "#f0dc82"; // Dourado

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

      {/* Filtros */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterContainer}>
        <TouchableOpacity onPress={() => setTipoSelecionado('')} style={styles.filterButton}>
          <Text style={[styles.filterText, tipoSelecionado === '' && styles.filterTextSelected]}>Todos</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setTipoSelecionado('Aprovação de conta')} style={styles.filterButton}>
          <Text style={[styles.filterText, tipoSelecionado === 'Aprovação de conta' && styles.filterTextSelected]}>
            Aprovação de conta
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setTipoSelecionado('Alteração no registro de ponto')} style={styles.filterButton}>
          <Text style={[styles.filterText, tipoSelecionado === 'Alteração no registro de ponto' && styles.filterTextSelected]}>
            Alteração no ponto
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setTipoSelecionado('Justificativa de falta')} style={styles.filterButton}>
          <Text style={[styles.filterText, tipoSelecionado === 'Justificativa de falta' && styles.filterTextSelected]}>
            Justificativa de falta
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setTipoSelecionado('Justificativa de atraso')} style={styles.filterButton}>
          <Text style={[styles.filterText, tipoSelecionado === 'Justificativa de atraso' && styles.filterTextSelected]}>
            Justificativa de atraso
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setTipoSelecionado('Justificativa de saída antes do previsto')} style={styles.filterButton}>
          <Text style={[styles.filterText, tipoSelecionado === 'Justificativa de saída antes do previsto' && styles.filterTextSelected]}>
            Saída antecipada
          </Text>
        </TouchableOpacity>
      </ScrollView>

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
    color: '#000', // Alterado para preto
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
  filterContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
    gap: 10,
    zIndex: 1, // Garante que os filtros fiquem acima de outros elementos
  },
  filterButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    borderRadius: 20,
    elevation: 3,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 120,
    minHeight: 40,
    zIndex: 2, // Garante que os botões fiquem acima de outros elementos
  },
  filterText: {
    fontSize: 12,
    color: '#555',
    textAlign: 'center',
    flexShrink: 1,
  },
  filterTextSelected: {
    fontWeight: 'bold',
    color: '#0000FF', // Alterado para azul
  },
  scrollContainer: {
    paddingBottom: 80,
    marginTop: 10, // Adiciona espaço entre os filtros e a lista de notificações
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