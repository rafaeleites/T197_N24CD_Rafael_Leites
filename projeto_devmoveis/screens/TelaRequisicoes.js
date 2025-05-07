import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Modal, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const cor1 = '#FFFFFF'; // Branco
const cor2 = "#f0dc82"; // Dourado
const cor3 = '#000000'; // Preto
const cor4 = '#FFFFFF'; // Branco
const cor5 = '#B8860B'; // Dourado ?

export default function TelaRequisicoes() {
  const [tipoSelecionado, setTipoSelecionado] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [requisicaoSelecionada, setRequisicaoSelecionada] = useState(null);
  const [requisicoesAtuais, setRequisicoesAtuais] = useState([
    { nome: "Daniel Silva", tipo: "Aprovação de conta", icon: "account-tie" },
    { nome: "Carlos Pereira", tipo: "Alteração no registro de ponto", icon: "account-clock", data: "2025-05-07", hora: "14:00" },
    { nome: "Mariana Lima", tipo: "Justificativa de falta", icon: "calendar-remove", data: "2025-05-06" },
    { nome: "Carlos Pereira", tipo: "Justificativa de atraso", icon: "clock-alert", data: "2025-05-07" },
    { nome: "Ana Souza", tipo: "Justificativa de saída antecipada", icon: "exit-run", data: "2025-05-07", hora: "16:00" },
    { nome: "Mariana Lima", tipo: "Alteração no registro de ponto", icon: "account-clock", data: "2025-05-06", hora: "09:00" },
    { nome: "João Silva", tipo: "Justificativa de falta", icon: "calendar-remove", data: "2025-05-05" },
    { nome: "Pedro Henrique", tipo: "Aprovação de conta", icon: "account-tie" },
    { nome: "Ana Souza", tipo: "Justificativa de atraso", icon: "clock-alert", data: "2025-05-07" },
    { nome: "João Silva", tipo: "Justificativa de saída antecipada", icon: "exit-run", data: "2025-05-07", hora: "15:30" },
  ]);

  const requisicoesFiltradas = tipoSelecionado
    ? requisicoesAtuais.filter((item) => item.tipo === tipoSelecionado)
    : requisicoesAtuais;

  const handleRequisicaoPress = (requisicao) => {
    setRequisicaoSelecionada(requisicao);
    setModalVisible(true);
  };

  const handleAprovar = () => {
    setRequisicoesAtuais((prev) =>
      prev.filter((item) => item !== requisicaoSelecionada)
    );
    setModalVisible(false);
    alert(`Requisição de ${requisicaoSelecionada.nome} aprovada!`);
  };

  const handleReprovar = () => {
    setRequisicoesAtuais((prev) =>
      prev.filter((item) => item !== requisicaoSelecionada)
    );
    setModalVisible(false);
    alert(`Requisição de ${requisicaoSelecionada.nome} reprovada!`);
  };

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
          <Picker.Item label="Justificativa de saída antecipada" value="Justificativa de saída antecipada" />
        </Picker>
      </View>

      {/* Lista de Requisições */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {requisicoesFiltradas.map((item, index) => (
          <TouchableOpacity key={index} onPress={() => handleRequisicaoPress(item)}>
            <View style={styles.card}>
              <MaterialCommunityIcons name={item.icon} size={24} color={cor3} style={styles.avatar} />
              <View>
                <Text style={styles.nome}>{item.nome}</Text>
                <Text style={styles.tipo}>{item.tipo}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Modal para Aprovar/Reprovar */}
      {requisicaoSelecionada && (
        <Modal
          visible={modalVisible}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Requisição</Text>
              <Text style={styles.modalText}>Nome: {requisicaoSelecionada.nome}</Text>
              <Text style={styles.modalText}>Tipo: {requisicaoSelecionada.tipo}</Text>
              {requisicaoSelecionada.data && (
                <Text style={styles.modalText}>Data: {requisicaoSelecionada.data}</Text>
              )}
              {requisicaoSelecionada.hora && (
                <Text style={styles.modalText}>Hora: {requisicaoSelecionada.hora}</Text>
              )}
              <View style={styles.modalButtons}>
                <TouchableOpacity style={styles.approveButton} onPress={handleAprovar}>
                  <Text style={styles.buttonText}>Aprovar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.rejectButton} onPress={handleReprovar}>
                  <Text style={styles.buttonText}>Reprovar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5', // Fundo padrão
    padding: 10,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: cor3, // Preto
    marginBottom: 10,
    textAlign: 'center',
  },
  pickerContainer: {
    marginBottom: 10,
    marginTop: 20,
  },
  picker: {
    backgroundColor: cor4, // Fundo branco
    borderRadius: 5,
    color: cor3, // Texto preto
    height: 48, // Altura reduzida
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: cor4, // Branco
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  avatar: {
    marginRight: 10,
  },
  nome: {
    fontSize: 16,
    fontWeight: 'bold',
    color: cor3, // Preto
  },
  tipo: {
    fontSize: 14,
    color: cor3, // Preto
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fundo semitransparente
  },
  modalContent: {
    backgroundColor: cor4, // Fundo branco
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: cor3, // Preto
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
    color: cor3, // Preto
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  approveButton: {
    backgroundColor: cor2, // Dourado
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginRight: 5,
    alignItems: 'center',
  },
  rejectButton: {
    backgroundColor: cor5, // Dourado 2
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginLeft: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: cor1, // Branco
    fontWeight: 'bold',
  },
});