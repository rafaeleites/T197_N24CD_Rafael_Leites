import React, { useState } from 'react';
import { View, Text, ScrollView, Modal, TouchableOpacity, StyleSheet } from 'react-native';
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
  const [justificativaModalVisible, setJustificativaModalVisible] = useState(false);
  const [requisicaoSelecionada, setRequisicaoSelecionada] = useState(null);
  const [requisicoesAtuais, setRequisicoesAtuais] = useState([
    { nome: "Daniel Silva", tipo: "Aprovação de conta", icon: "account-tie" },
    { nome: "Carlos Pereira", tipo: "Alteração no registro de ponto", icon: "account-clock", data: "2025-05-07", detalhes: "De: 09:10 para 09:00" },
    { nome: "Mariana Lima", tipo: "Justificativa de falta", icon: "calendar-remove", data: "2025-05-06", mensagem: "Estava doente e não consegui comparecer.", atestado: true },
    { nome: "Carlos Pereira", tipo: "Justificativa de atraso", icon: "clock-alert", data: "2025-05-07", mensagem: "Trânsito intenso devido a um acidente.", atestado: false },
    { nome: "Ana Souza", tipo: "Justificativa de saída antecipada", icon: "exit-run", data: "2025-05-07", mensagem: "Precisei sair para uma consulta médica.", atestado: true },
    { nome: "Mariana Lima", tipo: "Alteração no registro de ponto", icon: "account-clock", data: "2025-05-06", detalhes: "De: 08:30 para 08:00" },
    { nome: "João Silva", tipo: "Justificativa de falta", icon: "calendar-remove", data: "2025-05-05", mensagem: "Problemas familiares urgentes.", atestado: false },
    { nome: "Pedro Henrique", tipo: "Aprovação de conta", icon: "account-tie" },
    { nome: "Ana Souza", tipo: "Justificativa de atraso", icon: "clock-alert", data: "2025-05-07", mensagem: "Perdi o ônibus e precisei esperar o próximo.", atestado: true },
    { nome: "João Silva", tipo: "Justificativa de saída antecipada", icon: "exit-run", data: "2025-05-07", mensagem: "Tive que buscar meu filho na escola.", atestado: false },
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

  const getTipoCurto = (tipo) => {
    const tiposCurto = {
      "Justificativa de saída antecipada": "Saída antecipada",
      "Justificativa de atraso": "Atraso",
      "Justificativa de falta": "Falta",
      "Alteração no registro de ponto": "Alteração de ponto",
      "Aprovação de conta": "Aprovação de conta",
    };
    return tiposCurto[tipo] || tipo;
  };

  const formatarData = (data) => {
    const [ano, mes, dia] = data.split("-");
    return `${dia}-${mes}-${ano}`;
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
              <Text style={styles.modalText}>Tipo: {getTipoCurto(requisicaoSelecionada.tipo)}</Text>
              {requisicaoSelecionada.data && (
                <Text style={styles.modalText}>Data: {formatarData(requisicaoSelecionada.data)}</Text>
              )}
              {requisicaoSelecionada.detalhes && (
                <Text style={styles.modalText}>
                  <Text style={{ color: 'red' }}>
                    {requisicaoSelecionada.detalhes.split('para')[0].trim()}
                  </Text>{' '}
                  <Text style={{ color: 'blue' }}>
                    para {requisicaoSelecionada.detalhes.split('para')[1].trim()}
                  </Text>
                </Text>
              )}
              {requisicaoSelecionada.mensagem && (
                <TouchableOpacity
                  style={styles.justificativaButton}
                  onPress={() => setJustificativaModalVisible(true)}
                >
                  <Text style={styles.buttonText}>Ver Justificativa</Text>
                </TouchableOpacity>
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

      {/* Modal para Justificativa */}
      {requisicaoSelecionada && (
        <Modal
          visible={justificativaModalVisible}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setJustificativaModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Justificativa</Text>
              {requisicaoSelecionada.mensagem && (
                <Text style={styles.modalText}>{requisicaoSelecionada.mensagem}</Text>
              )}
              {requisicaoSelecionada.atestado !== undefined && (
                <Text style={styles.modalText}>
                  Possui Atestado? {requisicaoSelecionada.atestado ? "Sim" : "Não"}
                </Text>
)}
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setJustificativaModalVisible(false)}
              >
                <Text style={styles.buttonText}>Fechar</Text>
              </TouchableOpacity>
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
    backgroundColor: '#f5f5f5',
    padding: 10,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: cor3,
    marginBottom: 10,
    textAlign: 'center',
  },
  pickerContainer: {
    marginBottom: 10,
    marginTop: 20,
  },
  picker: {
    backgroundColor: cor4,
    borderRadius: 5,
    color: cor3,
    height: 48,
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: cor4,
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
    color: cor3,
  },
  tipo: {
    fontSize: 14,
    color: cor3,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: cor4,
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: cor3,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
    color: cor3,
    textAlign: 'justify',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  approveButton: {
    backgroundColor: '#28a745', // Verde
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginRight: 5,
    alignItems: 'center',
  },
  rejectButton: {
    backgroundColor: '#dc3545', // Vermelho
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginLeft: 5,
    alignItems: 'center',
  },
  justificativaButton: {
    backgroundColor: '#17a2b8', // Azul claro
    padding: 6,
    borderRadius: 8,
    marginBottom: 8, 
    alignItems: 'center',
  },
  closeButton: {
    backgroundColor: cor5,
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: cor1,
    fontWeight: 'bold',
  },
});