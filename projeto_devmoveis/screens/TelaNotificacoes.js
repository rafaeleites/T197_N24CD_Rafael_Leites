import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const formatarData = (data) => {
  const [ano, mes, dia] = data.split('-');
  return `${dia}-${mes}-${ano.slice(2)}`;
};

const atrasos = [
  { id: '1', funcionario: 'João Silva', motivo: 'Atraso de 15 minutos', data: formatarData('2025-01-10') },
  { id: '2', funcionario: 'Ana Souza', motivo: 'Atraso de 30 minutos', data: formatarData('2025-02-15') },
  { id: '3', funcionario: 'Carlos Pereira', motivo: 'Atraso de 10 minutos', data: formatarData('2025-03-20') },
  { id: '4', funcionario: 'Mariana Lima', motivo: 'Atraso de 20 minutos', data: formatarData('2025-01-12') },
  { id: '5', funcionario: 'João Silva', motivo: 'Atraso de 25 minutos', data: formatarData('2025-02-18') },
  { id: '6', funcionario: 'Ana Souza', motivo: 'Atraso de 40 minutos', data: formatarData('2025-03-05') },
  { id: '7', funcionario: 'Carlos Pereira', motivo: 'Atraso de 5 minutos', data: formatarData('2025-03-10') },
  { id: '8', funcionario: 'Mariana Lima', motivo: 'Atraso de 50 minutos', data: formatarData('2025-03-25') },
];

const faltas = [
  { id: '1', funcionario: 'Mariana Lima', motivo: 'Falta não justificada', data: formatarData('2025-01-12') },
  { id: '2', funcionario: 'João Silva', motivo: 'Falta não justificada', data: formatarData('2025-02-18') },
  { id: '3', funcionario: 'Carlos Pereira', motivo: 'Falta não justificada', data: formatarData('2025-03-25') },
  { id: '4', funcionario: 'Ana Souza', motivo: 'Falta justificada', data: formatarData('2025-01-15') },
  { id: '5', funcionario: 'João Silva', motivo: 'Falta não justificada', data: formatarData('2025-02-20') },
  { id: '6', funcionario: 'Carlos Pereira', motivo: 'Falta justificada', data: formatarData('2025-03-01') },
  { id: '7', funcionario: 'Mariana Lima', motivo: 'Falta não justificada', data: formatarData('2025-03-10') },
  { id: '8', funcionario: 'Ana Souza', motivo: 'Falta não justificada', data: formatarData('2025-03-15') },
  { id: '9', funcionario: 'João Silva', motivo: 'Falta justificada', data: formatarData('2025-03-20') },
  { id: '10', funcionario: 'Carlos Pereira', motivo: 'Falta não justificada', data: formatarData('2025-03-30') },
];

const saidas = [
  { id: '1', funcionario: 'João Silva', motivo: 'Saiu 1 hora antes', data: formatarData('2025-01-20') },
  { id: '2', funcionario: 'Ana Souza', motivo: 'Saiu 30 minutos antes', data: formatarData('2025-02-22') },
  { id: '3', funcionario: 'Carlos Pereira', motivo: 'Saiu 2 horas antes', data: formatarData('2025-03-28') },
  { id: '4', funcionario: 'Mariana Lima', motivo: 'Saiu 15 minutos antes', data: formatarData('2025-03-30') },
  { id: '5', funcionario: 'João Silva', motivo: 'Saiu 45 minutos antes', data: formatarData('2025-01-25') },
  { id: '6', funcionario: 'Ana Souza', motivo: 'Saiu 1 hora antes', data: formatarData('2025-02-10') },
  { id: '7', funcionario: 'Carlos Pereira', motivo: 'Saiu 30 minutos antes', data: formatarData('2025-02-15') },
  { id: '8', funcionario: 'Mariana Lima', motivo: 'Saiu 2 horas antes', data: formatarData('2025-03-05') },
  { id: '9', funcionario: 'João Silva', motivo: 'Saiu 1 hora antes', data: formatarData('2025-03-10') },
  { id: '10', funcionario: 'Ana Souza', motivo: 'Saiu 15 minutos antes', data: formatarData('2025-03-15') },
  { id: '11', funcionario: 'Carlos Pereira', motivo: 'Saiu 1 hora antes', data: formatarData('2025-03-20') },
  { id: '12', funcionario: 'Mariana Lima', motivo: 'Saiu 30 minutos antes', data: formatarData('2025-03-25') },
  { id: '13', funcionario: 'João Silva', motivo: 'Saiu 2 horas antes', data: formatarData('2025-03-28') },
  { id: '14', funcionario: 'Ana Souza', motivo: 'Saiu 1 hora antes', data: formatarData('2025-03-30') },
];

function TelaNotificacoes() {
  const [expandAtrasos, setExpandAtrasos] = useState(false);
  const [expandFaltas, setExpandFaltas] = useState(false);
  const [expandSaidas, setExpandSaidas] = useState(false);

  const [mesSelecionado, setMesSelecionado] = useState('');
  const [funcionarioSelecionado, setFuncionarioSelecionado] = useState('');

  const filtrarPorMes = (notificacoes) => {
    if (!mesSelecionado || mesSelecionado === "") return notificacoes;
    return notificacoes.filter((item) => item.data.split('-')[1] === mesSelecionado);
  };

  const filtrarPorFuncionario = (notificacoes) => {
    if (!funcionarioSelecionado || funcionarioSelecionado === "") return notificacoes;
    return notificacoes.filter((item) => item.funcionario === funcionarioSelecionado);
  };

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
      <Text style={styles.title}>Notificações</Text>

      {/* Filtro por Funcionário */}
      <Picker
        selectedValue={funcionarioSelecionado}
        onValueChange={(itemValue) => setFuncionarioSelecionado(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Todos os funcionários" value="" />
        <Picker.Item label="João Silva" value="João Silva" />
        <Picker.Item label="Ana Souza" value="Ana Souza" />
        <Picker.Item label="Carlos Pereira" value="Carlos Pereira" />
        <Picker.Item label="Mariana Lima" value="Mariana Lima" />
      </Picker>

      {/* Filtro por Mês */}
      <Picker
        selectedValue={mesSelecionado}
        onValueChange={(itemValue) => setMesSelecionado(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Todos os meses" value="" />
        <Picker.Item label="Janeiro" value="01" />
        <Picker.Item label="Fevereiro" value="02" />
        <Picker.Item label="Março" value="03" />
        <Picker.Item label="Abril" value="04" />
        <Picker.Item label="Maio" value="05" />
        <Picker.Item label="Junho" value="06" />
        <Picker.Item label="Julho" value="07" />
        <Picker.Item label="Agosto" value="08" />
        <Picker.Item label="Setembro" value="09" />
        <Picker.Item label="Outubro" value="10" />
        <Picker.Item label="Novembro" value="11" />
        <Picker.Item label="Dezembro" value="12" />
      </Picker>

      {/* Atrasos */}
      <TouchableOpacity onPress={() => setExpandAtrasos(!expandAtrasos)}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Atrasos</Text>
          <Text style={styles.notificationCount}>{filtrarPorMes(filtrarPorFuncionario(atrasos)).length}</Text>
        </View>
      </TouchableOpacity>
      {expandAtrasos && (
        <FlatList
          data={filtrarPorMes(filtrarPorFuncionario(atrasos))}
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
      )}

      {/* Faltas */}
      <TouchableOpacity onPress={() => setExpandFaltas(!expandFaltas)}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Faltas</Text>
          <Text style={styles.notificationCount}>{filtrarPorMes(filtrarPorFuncionario(faltas)).length}</Text>
        </View>
      </TouchableOpacity>
      {expandFaltas && (
        <FlatList
          data={filtrarPorMes(filtrarPorFuncionario(faltas))}
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
      )}

      {/* Saídas */}
      <TouchableOpacity onPress={() => setExpandSaidas(!expandSaidas)}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Saídas</Text>
          <Text style={styles.notificationCount}>{filtrarPorMes(filtrarPorFuncionario(saidas)).length}</Text>
        </View>
      </TouchableOpacity>
      {expandSaidas && (
        <FlatList
          data={filtrarPorMes(filtrarPorFuncionario(saidas))}
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
      )}
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
  picker: {
    backgroundColor: '#fff',
    marginBottom: 20,
    borderRadius: 8,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#555',
  },
  notificationCount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#888',
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