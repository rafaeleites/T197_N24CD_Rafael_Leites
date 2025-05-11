import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Switch, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../contexts/ThemeContext'; // Importar o contexto do tema

function TelaConfiguracoes() {
  const { isDarkMode, toggleTheme } = useTheme(); // Usar o contexto do tema
  const [modalVisible, setModalVisible] = useState(false);
  const [notificationModalVisible, setNotificationModalVisible] = useState(false);
  const [notifications, setNotifications] = useState({
    atrasos: true,
    faltas: true,
    saidas: true,
  });
  const navigation = useNavigation();

  const toggleNotification = (type) => {
    setNotifications((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? 'black' : '#f5f5f5' }]}>
      <Text style={[styles.title, { color: isDarkMode ? 'white' : 'black' }]}>Configurações</Text>

      <View style={styles.option}>
        <Text style={[styles.optionText, { color: isDarkMode ? 'white' : 'black' }]}>Modo Escuro</Text>
        <Switch value={isDarkMode} onValueChange={toggleTheme} />
      </View>

      <TouchableOpacity
        style={styles.option}
        onPress={() => setNotificationModalVisible(true)}
      >
        <Text style={[styles.optionText, { color: isDarkMode ? 'white' : 'black' }]}>Notificações</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.option}
        onPress={() => setModalVisible(true)}
      >
        <Text style={[styles.optionText, { color: isDarkMode ? 'white' : 'black' }]}>Sobre o Aplicativo</Text>
      </TouchableOpacity>

      {/* Modal para notificações */}
      <Modal
        visible={notificationModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setNotificationModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={[styles.modalContent, { backgroundColor: isDarkMode ? '#333' : '#fff' }]}>
            <Text style={[styles.modalTitle, { color: isDarkMode ? 'white' : 'black' }]}>Notificações</Text>
            <View style={[styles.notificationOption, { backgroundColor: isDarkMode ? '#444' : '#f0f0f0' }]}>
              <Text style={[styles.optionText, { color: isDarkMode ? 'white' : 'black' }]}>Notificar Atrasos</Text>
              <Switch
                value={notifications.atrasos}
                onValueChange={() => toggleNotification('atrasos')}
              />
            </View>
            <View style={[styles.notificationOption, { backgroundColor: isDarkMode ? '#444' : '#f0f0f0' }]}>
              <Text style={[styles.optionText, { color: isDarkMode ? 'white' : 'black' }]}>Notificar Faltas</Text>
              <Switch
                value={notifications.faltas}
                onValueChange={() => toggleNotification('faltas')}
              />
            </View>
            <View style={[styles.notificationOption, { backgroundColor: isDarkMode ? '#444' : '#f0f0f0' }]}>
              <Text style={[styles.optionText, { color: isDarkMode ? 'white' : 'black' }]}>Notificar Saídas</Text>
              <Switch
                value={notifications.saidas}
                onValueChange={() => toggleNotification('saidas')}
              />
            </View>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setNotificationModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Modal para sobre o aplicativo */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={[styles.modalContent, { backgroundColor: isDarkMode ? '#333' : '#fff' }]}>
            <Text style={[styles.modalTitle, { color: isDarkMode ? 'white' : 'black' }]}>Sobre o Aplicativo</Text>
            <Text style={[styles.modalText, { color: isDarkMode ? '#ccc' : 'black' }]}>Versão: 1.2.0</Text>
            <Text style={[styles.modalText, { color: isDarkMode ? '#ccc' : 'black' }]}>Última atualização: 01/05/2025</Text>
            <Text style={[styles.modalText, { color: isDarkMode ? '#ccc' : 'black' }]}>Desenvolvido por R&D Softwares</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  optionText: {
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  notificationOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    width: '100%',
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default TelaConfiguracoes;