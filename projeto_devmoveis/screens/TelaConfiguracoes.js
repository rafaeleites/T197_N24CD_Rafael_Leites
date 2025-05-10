import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Switch, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../contexts/ThemeContext'; // Importar o contexto do tema

function TelaConfiguracoes() {
  const { isDarkMode, toggleTheme } = useTheme(); // Usar o contexto do tema
  const [modalVisible, setModalVisible] = useState(false);
  const [languageModalVisible, setLanguageModalVisible] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('Português');
  const navigation = useNavigation();

  const changeLanguage = (language) => {
    setSelectedLanguage(language);
    setLanguageModalVisible(false);
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
        onPress={() => setLanguageModalVisible(true)}
      >
        <Text style={[styles.optionText, { color: isDarkMode ? 'white' : 'black' }]}>Alterar Idioma</Text>
        <Text style={[styles.selectedLanguage, { color: isDarkMode ? '#ccc' : '#555' }]}>{selectedLanguage}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.option}
        onPress={() => navigation.navigate('TelaAlerta')}
      >
        <Text style={[styles.optionText, { color: isDarkMode ? 'white' : 'black' }]}>Notificações</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.option}
        onPress={() => setModalVisible(true)}
      >
        <Text style={[styles.optionText, { color: isDarkMode ? 'white' : 'black' }]}>Sobre o Aplicativo</Text>
      </TouchableOpacity>

      {/* Modal para exibir informações do aplicativo */}
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

      {/* Modal para selecionar idioma */}
      <Modal
        visible={languageModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setLanguageModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={[styles.modalContent, { backgroundColor: isDarkMode ? '#333' : '#fff' }]}>
            <Text style={[styles.modalTitle, { color: isDarkMode ? 'white' : 'black' }]}>Selecione o Idioma</Text>
            <TouchableOpacity
              style={[styles.languageOption, { backgroundColor: isDarkMode ? '#444' : '#f0f0f0' }]}
              onPress={() => changeLanguage('Português')}
            >
              <Text style={[styles.languageText, { color: isDarkMode ? 'white' : 'black' }]}>Português</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.languageOption, { backgroundColor: isDarkMode ? '#444' : '#f0f0f0' }]}
              onPress={() => changeLanguage('Inglês')}
            >
              <Text style={[styles.languageText, { color: isDarkMode ? 'white' : 'black' }]}>Inglês</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.languageOption, { backgroundColor: isDarkMode ? '#444' : '#f0f0f0' }]}
              onPress={() => changeLanguage('Espanhol')}
            >
              <Text style={[styles.languageText, { color: isDarkMode ? 'white' : 'black' }]}>Espanhol</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setLanguageModalVisible(false)}
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
  selectedLanguage: {
    fontSize: 14,
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
  modalText: {
    fontSize: 16,
    marginBottom: 5,
  },
  languageOption: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 5,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  languageText: {
    fontSize: 16,
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
});

export default TelaConfiguracoes;