import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useTheme } from '../contexts/ThemeContext'; // Importar o contexto do tema

const formatarData = (data) => {
  const [ano, mes, dia] = data.split('-');
  return `${dia}-${mes}-${ano.slice(2)}`;
};

const atrasos = [
  { id: '1', funcionario: 'João Silva', motivo: 'Atraso de 15 minutos', data: formatarData('2025-01-10') },
  { id: '2', funcionario: 'Ana Souza', motivo: 'Atraso de 30 minutos', data: formatarData('2025-02-15') },
  { id: '3', funcionario: 'Carlos Pereira', motivo: 'Atraso de 10 minutos', data: formatarData('2025-03-20') },
  { id: '4', funcionario: 'Mariana Lima', motivo: 'Atraso de 20 minutos', data: formatarData('2025-01-12') },
  { id: '5', funcionario: 'João Silva', motivo: 'Atraso de 5 minutos', data: formatarData('2025-01-15') },
  { id: '6', funcionario: 'Ana Souza', motivo: 'Atraso de 25 minutos', data: formatarData('2025-02-18') },
  { id: '7', funcionario: 'Carlos Pereira', motivo: 'Atraso de 12 minutos', data: formatarData('2025-03-25') },
  { id: '8', funcionario: 'Mariana Lima', motivo: 'Atraso de 18 minutos', data: formatarData('2025-01-20') },
];

const faltas = [
  { id: '1', funcionario: 'Mariana Lima', motivo: 'Falta não justificada', data: formatarData('2025-01-12') },
  { id: '2', funcionario: 'João Silva', motivo: 'Falta não justificada', data: formatarData('2025-02-18') },
  { id: '3', funcionario: 'Ana Souza', motivo: 'Falta justificada', data: formatarData('2025-03-05') },
  { id: '4', funcionario: 'Carlos Pereira', motivo: 'Falta não justificada', data: formatarData('2025-03-10') },
  { id: '5', funcionario: 'João Silva', motivo: 'Falta justificada', data: formatarData('2025-01-25') },
  { id: '6', funcionario: 'Mariana Lima', motivo: 'Falta não justificada', data: formatarData('2025-02-05') },
  { id: '7', funcionario: 'Ana Souza', motivo: 'Falta justificada', data: formatarData('2025-03-15') },
  { id: '8', funcionario: 'Carlos Pereira', motivo: 'Falta não justificada', data: formatarData('2025-01-30') },
  { id: '9', funcionario: 'João Silva', motivo: 'Falta justificada', data: formatarData('2025-02-12') },
  { id: '10', funcionario: 'Mariana Lima', motivo: 'Falta não justificada', data: formatarData('2025-03-22') },
  { id: '11', funcionario: 'Ana Souza', motivo: 'Falta justificada', data: formatarData('2025-01-18') },
  { id: '12', funcionario: 'Carlos Pereira', motivo: 'Falta não justificada', data: formatarData('2025-02-25') },
];

const saidas = [
  { id: '1', funcionario: 'João Silva', motivo: 'Saiu 1 hora antes', data: formatarData('2025-01-20') },
  { id: '2', funcionario: 'Ana Souza', motivo: 'Saiu 30 minutos antes', data: formatarData('2025-02-22') },
  { id: '3', funcionario: 'Carlos Pereira', motivo: 'Saiu 15 minutos antes', data: formatarData('2025-03-10') },
  { id: '4', funcionario: 'Mariana Lima', motivo: 'Saiu 45 minutos antes', data: formatarData('2025-01-25') },
  { id: '5', funcionario: 'João Silva', motivo: 'Saiu 20 minutos antes', data: formatarData('2025-02-05') },
  { id: '6', funcionario: 'Ana Souza', motivo: 'Saiu 10 minutos antes', data: formatarData('2025-03-15') },
  { id: '7', funcionario: 'Carlos Pereira', motivo: 'Saiu 1 hora antes', data: formatarData('2025-01-30') },
  { id: '8', funcionario: 'Mariana Lima', motivo: 'Saiu 25 minutos antes', data: formatarData('2025-02-12') },
  { id: '9', funcionario: 'João Silva', motivo: 'Saiu 50 minutos antes', data: formatarData('2025-03-22') },
];

function TelaNotificacoes() {
  const { isDarkMode } = useTheme(); // Usar o estado do tema
  const [expandAtrasos, setExpandAtrasos] = useState(false);
  const [expandFaltas, setExpandFaltas] = useState(false);
  const [expandSaidas, setExpandSaidas] = useState(false);

  const [mesSelecionado, setMesSelecionado] = useState('');
  const [funcionarioSelecionado, setFuncionarioSelecionado] = useState('');

  const filtrarPorMes = (notificacoes) => {
    if (!mesSelecionado || mesSelecionado === '') return notificacoes;
    return notificacoes.filter((item) => item.data.split('-')[1] === mesSelecionado);
  };

  const filtrarPorFuncionario = (notificacoes) => {
    if (!funcionarioSelecionado || funcionarioSelecionado === '') return notificacoes;
    return notificacoes.filter((item) => item.funcionario === funcionarioSelecionado);
  };

  const handlePress = (item, tipo) => {
    Alert.alert(`Detalhes do ${tipo}`, `Funcionário: ${item.funcionario}\nMotivo: ${item.motivo}\nData: ${item.data}`);
  };

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? 'black' : '#f5f5f5' }]}>
      <Text style={[styles.title, { color: isDarkMode ? 'white' : '#333' }]}>Notificações</Text>

      {/* Filtro por Funcionário */}
      <Picker
        selectedValue={funcionarioSelecionado}
        onValueChange={(itemValue) => setFuncionarioSelecionado(itemValue)}
        style={[styles.picker, { backgroundColor: isDarkMode ? '#333' : '#fff', color: isDarkMode ? 'white' : 'black' }]}
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
        style={[styles.picker, { backgroundColor: isDarkMode ? '#333' : '#fff', color: isDarkMode ? 'white' : 'black' }]}
      >
        <Picker.Item label="Todos os meses" value="" />
        <Picker.Item label="Janeiro" value="01" />
        <Picker.Item label="Fevereiro" value="02" />
        <Picker.Item label="Março" value="03" />
      </Picker>

      {/* Atrasos */}
      <TouchableOpacity onPress={() => setExpandAtrasos(!expandAtrasos)}>
        <View style={[styles.sectionHeader, { borderBottomColor: isDarkMode ? '#555' : '#ddd' }]}>
          <Text style={[styles.sectionTitle, { color: isDarkMode ? 'white' : '#555' }]}>Atrasos</Text>
          <Text style={[styles.notificationCount, { color: isDarkMode ? '#ccc' : '#888' }]}>
            {filtrarPorMes(filtrarPorFuncionario(atrasos)).length}
          </Text>
        </View>
      </TouchableOpacity>
      {expandAtrasos && (
        <FlatList
          data={filtrarPorMes(filtrarPorFuncionario(atrasos))}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handlePress(item, 'Atraso')}>
              <View style={[styles.item, { backgroundColor: isDarkMode ? '#444' : '#fff' }]}>
                <Text style={[styles.itemText, { color: isDarkMode ? 'white' : '#333' }]}>
                  {item.funcionario}: {item.motivo}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}

      {/* Faltas */}
      <TouchableOpacity onPress={() => setExpandFaltas(!expandFaltas)}>
        <View style={[styles.sectionHeader, { borderBottomColor: isDarkMode ? '#555' : '#ddd' }]}>
          <Text style={[styles.sectionTitle, { color: isDarkMode ? 'white' : '#555' }]}>Faltas</Text>
          <Text style={[styles.notificationCount, { color: isDarkMode ? '#ccc' : '#888' }]}>
            {filtrarPorMes(filtrarPorFuncionario(faltas)).length}
          </Text>
        </View>
      </TouchableOpacity>
      {expandFaltas && (
        <FlatList
          data={filtrarPorMes(filtrarPorFuncionario(faltas))}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handlePress(item, 'Falta')}>
              <View style={[styles.item, { backgroundColor: isDarkMode ? '#444' : '#fff' }]}>
                <Text style={[styles.itemText, { color: isDarkMode ? 'white' : '#333' }]}>
                  {item.funcionario}: {item.motivo}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}

      {/* Saídas */}
      <TouchableOpacity onPress={() => setExpandSaidas(!expandSaidas)}>
        <View style={[styles.sectionHeader, { borderBottomColor: isDarkMode ? '#555' : '#ddd' }]}>
          <Text style={[styles.sectionTitle, { color: isDarkMode ? 'white' : '#555' }]}>Saídas</Text>
          <Text style={[styles.notificationCount, { color: isDarkMode ? '#ccc' : '#888' }]}>
            {filtrarPorMes(filtrarPorFuncionario(saidas)).length}
          </Text>
        </View>
      </TouchableOpacity>
      {expandSaidas && (
        <FlatList
          data={filtrarPorMes(filtrarPorFuncionario(saidas))}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handlePress(item, 'Saída')}>
              <View style={[styles.item, { backgroundColor: isDarkMode ? '#444' : '#fff' }]}>
                <Text style={[styles.itemText, { color: isDarkMode ? 'white' : '#333' }]}>
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
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  picker: {
    marginBottom: 20,
    borderRadius: 8,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  notificationCount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  item: {
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    elevation: 3,
  },
  itemText: {
    fontSize: 16,
  },
});

export default TelaNotificacoes;