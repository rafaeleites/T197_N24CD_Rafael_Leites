import React, { useState } from 'react';
import { View, Text, ScrollView, Modal, TouchableOpacity, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../contexts/ThemeContext'; // Importar o contexto do tema

export default function TelaRequisicoes() {
  const { isDarkMode } = useTheme(); // Usar o estado do tema
  const [tipoSelecionado, setTipoSelecionado] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [justificativaModalVisible, setJustificativaModalVisible] = useState(false);
  const [atestadoModalVisible, setAtestadoModalVisible] = useState(false); // Novo estado para o modal de atestado
  const [requisicaoSelecionada, setRequisicaoSelecionada] = useState(null);
  const [requisicoesAtuais, setRequisicoesAtuais] = useState([
    { nome: "Daniel Silva", tipo: "Aprovação de conta", icon: "account-tie", universidade: "UNIFOR", semestre: "5º" },
    { nome: "Carlos Pereira", tipo: "Alteração no registro de ponto", icon: "account-clock", data: "2025-05-07", detalhes: "De: 09:10 para 09:00" },
    { nome: "Mariana Lima", tipo: "Justificativa de falta", icon: "calendar-remove", data: "2025-05-06", mensagem: "Estava doente e não consegui comparecer.", atestado: true },
    { nome: "Carlos Pereira", tipo: "Justificativa de atraso", icon: "clock-alert", data: "2025-05-07", mensagem: "Trânsito intenso devido a um acidente.", atestado: false },
    { nome: "Ana Souza", tipo: "Justificativa de saída antecipada", icon: "exit-run", data: "2025-05-07", mensagem: "Precisei sair para uma consulta médica.", atestado: true },
    { nome: "Mariana Lima", tipo: "Alteração no registro de ponto", icon: "account-clock", data: "2025-05-06", detalhes: "De: 08:30 para 08:00" },
    { nome: "João Silva", tipo: "Justificativa de falta", icon: "calendar-remove", data: "2025-05-05", mensagem: "Problemas familiares urgentes.", atestado: false },
    { nome: "Pedro Henrique", tipo: "Aprovação de conta", icon: "account-tie", universidade: "UFC", semestre: "3º" },
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
    <View style={[styles.container, { backgroundColor: isDarkMode ? 'black' : '#f5f5f5' }]}>
      {/* Título */}
      <Text style={[styles.title, { color: isDarkMode ? 'white' : '#333' }]}>Requisições</Text>

      {/* Filtro como Picker */}
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={tipoSelecionado}
          onValueChange={(itemValue) => setTipoSelecionado(itemValue)}
          style={[
            styles.picker,
            { backgroundColor: isDarkMode ? '#333' : '#fff', color: isDarkMode ? 'white' : '#000' },
          ]}
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
            <View style={[styles.card, { backgroundColor: isDarkMode ? '#333' : '#fff' }]}>
              <MaterialCommunityIcons
                name={item.icon}
                size={24}
                color={isDarkMode ? 'white' : '#000'}
                style={styles.avatar}
              />
              <View>
                <Text style={[styles.nome, { color: isDarkMode ? 'white' : '#000' }]}>{item.nome}</Text>
                <Text style={[styles.tipo, { color: isDarkMode ? '#ccc' : '#666' }]}>{item.tipo}</Text>
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
            <View style={[styles.modalContent, { backgroundColor: isDarkMode ? '#333' : '#fff' }]}>
              <Text style={[styles.modalTitle, { color: isDarkMode ? 'white' : '#000' }]}>Requisição</Text>
              <Text style={[styles.modalText, { color: isDarkMode ? 'white' : '#000' }]}>
                Nome: {requisicaoSelecionada.nome}
              </Text>
              <Text style={[styles.modalText, { color: isDarkMode ? 'white' : '#000' }]}>
                Tipo: {getTipoCurto(requisicaoSelecionada.tipo)}
              </Text>
              {requisicaoSelecionada.tipo === "Aprovação de conta" && (
                <>
                  <Text style={[styles.modalText, { color: isDarkMode ? 'white' : '#000' }]}>
                    Universidade: {requisicaoSelecionada.universidade}
                  </Text>
                  <Text style={[styles.modalText, { color: isDarkMode ? 'white' : '#000' }]}>
                    Semestre: {requisicaoSelecionada.semestre}
                  </Text>
                </>
              )}
              {requisicaoSelecionada.data && (
                <Text style={[styles.modalText, { color: isDarkMode ? 'white' : '#000' }]}>
                  Data: {formatarData(requisicaoSelecionada.data)}
                </Text>
              )}
              {requisicaoSelecionada.detalhes && (
                <Text style={[styles.modalText, { color: isDarkMode ? 'white' : '#000' }]}>
                  {requisicaoSelecionada.detalhes}
                </Text>
              )}

              {/* Botão "Ver Justificativa" */}
              {requisicaoSelecionada.mensagem && (
                <TouchableOpacity
                  style={[styles.justificativaButton, { backgroundColor: isDarkMode ? '#007bff' : '#007bff' }]}
                  onPress={() => {
                    setJustificativaModalVisible(true);
                    setModalVisible(false);
                  }}
                >
                  <Text style={styles.buttonText}>Ver Justificativa</Text>
                </TouchableOpacity>
              )}

              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={[styles.approveButton, { backgroundColor: isDarkMode ? '#28a745' : '#28a745' }]}
                  onPress={handleAprovar}
                >
                  <Text style={styles.buttonText}>Aprovar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.rejectButton, { backgroundColor: isDarkMode ? '#dc3545' : '#dc3545' }]}
                  onPress={handleReprovar}
                >
                  <Text style={styles.buttonText}>Reprovar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}

      {/* Modal para exibir justificativa */}
      {justificativaModalVisible && (
        <Modal
          visible={justificativaModalVisible}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setJustificativaModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={[styles.modalContent, { backgroundColor: isDarkMode ? '#333' : '#fff' }]}>
              <Text style={[styles.modalTitle, { color: isDarkMode ? 'white' : '#000' }]}>Justificativa</Text>
              <Text style={[styles.modalText, { color: isDarkMode ? 'white' : '#000' }]}>
                {requisicaoSelecionada.mensagem}
              </Text>
              {requisicaoSelecionada.atestado !== undefined && (
                <View style={styles.atestadoContainer}>
                  <Text style={[styles.modalText, { color: isDarkMode ? 'white' : '#000', marginRight: 8 }]}>
                    Possui atestado?
                  </Text>
                  <MaterialCommunityIcons
                    name={requisicaoSelecionada.atestado ? 'check-circle' : 'close-circle'}
                    size={24}
                    color={requisicaoSelecionada.atestado ? 'green' : 'red'}
                    style={{ marginTop: -18 }}
                  />
                </View>
              )}

              {/* Botão "Ver Atestado" */}
              {requisicaoSelecionada.atestado && (
                <TouchableOpacity
                  style={[styles.justificativaButton, { backgroundColor: isDarkMode ? '#28a745' : '#28a745' }]}
                  onPress={() => setAtestadoModalVisible(true)}
                >
                  <Text style={styles.buttonText}>Ver Atestado</Text>
                </TouchableOpacity>
              )}

              <TouchableOpacity
                style={[styles.closeButton, { backgroundColor: isDarkMode ? '#007bff' : '#007bff' }]}
                onPress={() => {
                  setJustificativaModalVisible(false);
                  setModalVisible(true);
                }}
              >
                <Text style={styles.buttonText}>Fechar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}

      {/* Modal para exibir atestado */}
      {atestadoModalVisible && (
        <Modal
          visible={atestadoModalVisible}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setAtestadoModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={[styles.modalContent, { backgroundColor: isDarkMode ? '#333' : '#fff' }]}>
              <Text style={[styles.modalTitle, { color: isDarkMode ? 'white' : '#000' }]}>Atestado Médico</Text>
              <Text style={[styles.modalText, { color: isDarkMode ? 'white' : '#000' }]}>
                Atesto que o paciente {requisicaoSelecionada.nome} esteve sob meus cuidados médicos e não pôde comparecer ao trabalho.{"\n"}
                {"\n"}
                Doutor Wesley Safadão, CRM 123456.{"\n"}
                {"\n"}
                {formatarData(requisicaoSelecionada.data)}{"\n"}
              </Text>
              <TouchableOpacity
                style={[styles.closeButton, { backgroundColor: isDarkMode ? '#007bff' : '#007bff' }]}
                onPress={() => setAtestadoModalVisible(false)}
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
    padding: 10,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  pickerContainer: {
    marginBottom: 10,
    marginTop: 20,
  },
  picker: {
    borderRadius: 5,
    height: 48,
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
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
  },
  tipo: {
    fontSize: 14,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'justify',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  approveButton: {
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginRight: 5,
    alignItems: 'center',
  },
  rejectButton: {
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginLeft: 5,
    alignItems: 'center',
  },
  justificativaButton: {
    padding: 8,
    borderRadius: 5,
    marginVertical: 10,
    alignItems: 'center',
  },
  closeButton: {
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  atestadoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});