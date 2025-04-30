import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';

const formatarData = (data) => {
  const [ano, mes, dia] = data.split('-');
  return `${dia}-${mes}-${ano.slice(2)}`;
};

const atrasos = [
  { id: '1', funcionario: 'João Silva', motivo: 'Atraso de 15 minutos', data: formatarData('2025-01-10') },
  { id: '2', funcionario: 'Ana Souza', motivo: 'Atraso de 30 minutos', data: formatarData('2025-02-15') },
  { id: '3', funcionario: 'Carlos Pereira', motivo: 'Atraso de 10 minutos', data: formatarData('2025-03-20') },
];

const faltas = [
  { id: '1', funcionario: 'Mariana Lima', motivo: 'Falta não justificada', data: formatarData('2025-01-12') },
  { id: '2', funcionario: 'João Silva', motivo: 'Falta não justificada', data: formatarData('2025-02-18') },
  { id: '3', funcionario: 'Carlos Pereira', motivo: 'Falta não justificada', data: formatarData('2025-03-25') },
];

const saidas = [
  { id: '1', funcionario: 'João Silva', motivo: 'Saiu 1 hora antes', data: formatarData('2025-01-20') },
  { id: '2', funcionario: 'Ana Souza', motivo: 'Saiu 30 minutos antes', data: formatarData('2025-02-22') },
  { id: '3', funcionario: 'Carlos Pereira', motivo: 'Saiu 2 horas antes', data: formatarData('2025-03-28') },
  { id: '4', funcionario: 'Mariana Lima', motivo: 'Saiu 15 minutos antes', data: formatarData('2025-03-30') },
];

function TelaNotificacoes() {
  const handleAtrasoPress = (item) => {
    Alert.alert('Detalhes do Atraso', `Funcionário: ${item.funcionario}\nMotivo: ${item.motivo}\nData: ${item.data}`);
  };

  const handleFaltaPress = (item) => {
    Alert.alert('Detalhes da Falta', `Funcionário: ${item.funcionario}\nMotivo: ${item.motivo}\nData: ${item.data}`);
  };

  const handleSaidaPress = (item) => {
    Alert.alert('Detalhes da Saída', `Funcionário: ${item.funcionario}\nMotivo: ${item.motivo}\nData: ${item.data}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Configurações de Notificações</Text>

      <Text style={styles.sectionTitle}>Atrasos</Text>
      <FlatList
        data={atrasos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleAtrasoPress(item)}>
            <View style={styles.item}>
              <Text style={styles.itemText}>
                {item.funcionario}: {item.motivo}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />

      <Text style={styles.sectionTitle}>Faltas</Text>
      <FlatList
        data={faltas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleFaltaPress(item)}>
            <View style={styles.item}>
              <Text style={styles.itemText}>
                {item.funcionario}: {item.motivo}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />

      <Text style={styles.sectionTitle}>Saídas</Text>
      <FlatList
        data={saidas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleSaidaPress(item)}>
            <View style={styles.item}>
              <Text style={styles.itemText}>
                {item.funcionario}: {item.motivo}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: '#555',
  },
  item: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    elevation: 3,
  },
  itemText: {
    fontSize: 16,
    color: '#333',
  },
});

export default TelaNotificacoes;