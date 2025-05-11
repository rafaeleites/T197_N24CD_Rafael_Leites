import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal, TouchableWithoutFeedback } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { getDatabase, ref, onValue } from 'firebase/database';
import { useTheme } from '../contexts/ThemeContext';

const TelaNotificacoes = () => {
  const { isDarkMode } = useTheme();
  const [notificacoes, setNotificacoes] = useState([]);
  const [expandAtrasos, setExpandAtrasos] = useState(false);
  const [expandFaltas, setExpandFaltas] = useState(false);
  const [expandSaidas, setExpandSaidas] = useState(false);
  const [mesSelecionado, setMesSelecionado] = useState('');
  const [funcionarioSelecionado, setFuncionarioSelecionado] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);

  // Função para formatar a data no padrão DD-MM-AAAA
  const formatarData = (data) => {
    const [ano, mes, dia] = data.split('-');
    return `${dia}-${mes}-${ano}`;
  };

  useEffect(() => {
    const db = getDatabase();
    const cargaRef = ref(db, 'estagiarios/cargaHoraria');

    const unsubscribe = onValue(cargaRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const listaNotificacoes = [];

        Object.entries(data).forEach(([uid, dados]) => {
          const nome = dados.nome;
          const registros = dados.registros || {};

          Object.entries(registros).forEach(([data, info]) => {
            const entrada = info.entrada || null;
            const saida = info.saida || null;

            if (!entrada && !saida) {
              listaNotificacoes.push({
                id: `${uid}-${data}-falta`,
                funcionario: nome,
                motivo: 'Falta sem justificativa',
                data,
                tipo: 'Falta',
              });
            } else {
              const [hEntrada, mEntrada] = entrada ? entrada.split(':').map(Number) : [0, 0];
              const [hSaida, mSaida] = saida ? saida.split(':').map(Number) : [0, 0];
              const inicio = new Date(0, 0, 0, hEntrada, mEntrada);
              const fim = new Date(0, 0, 0, hSaida, mSaida);

              // Calcula o total de horas trabalhadas, subtraindo 1 hora de almoço
              const totalMinutos = (fim - inicio) / 60000 - 60; // Subtraindo 60 minutos de almoço
              const totalHoras = totalMinutos / 60;

              if (hEntrada > 9 || (hEntrada === 9 && mEntrada > 0)) {
                const atrasoMinutos = (hEntrada - 9) * 60 + mEntrada;
                listaNotificacoes.push({
                  id: `${uid}-${data}-atraso`,
                  funcionario: nome,
                  motivo: `Atraso de ${atrasoMinutos} minutos`,
                  data,
                  tipo: 'Atraso',
                });
              }

              if (totalHoras < 5) {
                const saidaAntecipadaMinutos = Math.round((5 * 60) - totalMinutos);
                listaNotificacoes.push({
                  id: `${uid}-${data}-saida`,
                  funcionario: nome,
                  motivo: `Saiu ${saidaAntecipadaMinutos} minutos antes`,
                  data,
                  tipo: 'Saída',
                });
              }
            }
          });
        });

        setNotificacoes(listaNotificacoes);
      } else {
        setNotificacoes([]);
      }
    });

    return () => unsubscribe();
  }, []);

  const filtrarPorMes = (notificacoes) => {
    if (!mesSelecionado || mesSelecionado === '') return notificacoes;
    return notificacoes.filter((item) => item.data.split('-')[1] === mesSelecionado);
  };

  const filtrarPorFuncionario = (notificacoes) => {
    if (!funcionarioSelecionado || funcionarioSelecionado === '') return notificacoes;
    return notificacoes.filter((item) => item.funcionario === funcionarioSelecionado);
  };

  const handlePress = (item) => {
    setSelectedNotification(item);
    setModalVisible(true);
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
        {Array.from(new Set(notificacoes.map((item) => item.funcionario))).map((funcionario) => (
          <Picker.Item key={funcionario} label={funcionario} value={funcionario} />
        ))}
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
            {filtrarPorMes(filtrarPorFuncionario(notificacoes.filter((item) => item.tipo === 'Atraso'))).length}
          </Text>
        </View>
      </TouchableOpacity>
      {expandAtrasos && (
        <FlatList
          data={filtrarPorMes(filtrarPorFuncionario(notificacoes.filter((item) => item.tipo === 'Atraso')))}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handlePress(item)}>
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
            {filtrarPorMes(filtrarPorFuncionario(notificacoes.filter((item) => item.tipo === 'Falta'))).length}
          </Text>
        </View>
      </TouchableOpacity>
      {expandFaltas && (
        <FlatList
          data={filtrarPorMes(filtrarPorFuncionario(notificacoes.filter((item) => item.tipo === 'Falta')))}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handlePress(item)}>
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
            {filtrarPorMes(filtrarPorFuncionario(notificacoes.filter((item) => item.tipo === 'Saída'))).length}
          </Text>
        </View>
      </TouchableOpacity>
      {expandSaidas && (
        <FlatList
          data={filtrarPorMes(filtrarPorFuncionario(notificacoes.filter((item) => item.tipo === 'Saída')))}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handlePress(item)}>
              <View style={[styles.item, { backgroundColor: isDarkMode ? '#444' : '#fff' }]}>
                <Text style={[styles.itemText, { color: isDarkMode ? 'white' : '#333' }]}>
                  {item.funcionario}: {item.motivo}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}

      {/* Modal */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>Data da Notificação</Text>
              {selectedNotification && (
                <Text style={styles.modalText}>
                  {formatarData(selectedNotification.data)}
                </Text>
              )}
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Fechar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

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
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default TelaNotificacoes;