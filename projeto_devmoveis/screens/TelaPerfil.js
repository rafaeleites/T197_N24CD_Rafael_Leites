import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal, TextInput, Alert } from 'react-native';
import { getAuth, signOut, updatePassword } from 'firebase/auth';
import { getDatabase, ref, onValue } from 'firebase/database';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../contexts/ThemeContext'; // Importar o contexto do tema

export default function TelaPerfil() {
  const { isDarkMode } = useTheme(); // Usar o estado do tema
  const [user, setUser] = useState({ name: 'Carregando...', email: 'Carregando...' });
  const [modalVisible, setModalVisible] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (currentUser) {
      const email = currentUser.email;

      // Buscar o nome no Realtime Database
      const db = getDatabase();
      const adminRef = ref(db, 'administradores');
      onValue(adminRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          // Procurar o nome correspondente ao e-mail
          const admin = Object.values(data).find((admin) => admin.email === email);
          if (admin) {
            setUser({ name: admin.nome, email: admin.email });
          } else {
            setUser({ name: 'Usuário não encontrado', email });
          }
        }
      });
    }
  }, []);

  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        navigation.replace('TelaLogin'); // Redireciona para a tela de login
      })
      .catch((error) => {
        console.error('Erro ao sair:', error);
      });
  };

  const handlePasswordChange = () => {
    if (newPassword !== confirmPassword) {
      Alert.alert('Erro', 'As senhas não coincidem. Tente novamente.');
      return;
    }

    if (newPassword.length < 6) {
      Alert.alert('Erro', 'A senha deve ter pelo menos 6 caracteres.');
      return;
    }

    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (currentUser) {
      updatePassword(currentUser, newPassword)
        .then(() => {
          Alert.alert('Sucesso', 'Senha alterada com sucesso!');
          setModalVisible(false);
          setNewPassword('');
          setConfirmPassword('');
        })
        .catch((error) => {
          console.error('Erro ao alterar a senha:', error);
          Alert.alert('Erro', 'Não foi possível alterar a senha. Tente novamente.');
        });
    } else {
      Alert.alert('Erro', 'Usuário não autenticado.');
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? '#000' : '#f5f5f5' }]}>
      <Text style={[styles.title, { color: isDarkMode ? '#fff' : '#333' }]}>Meu Perfil</Text>

      <Image
        source={{ uri: 'https://via.placeholder.com/100x100.png?text=Perfil' }}
        style={styles.avatar}
      />

      <View style={[styles.infoContainer, { backgroundColor: isDarkMode ? '#333' : '#fff' }]}>
        <Text style={[styles.infoText, { color: isDarkMode ? '#fff' : '#333' }]}>{user.name}</Text>
      </View>

      <View style={[styles.infoContainer, { backgroundColor: isDarkMode ? '#333' : '#fff' }]}>
        <Text style={[styles.infoText, { color: isDarkMode ? '#fff' : '#333' }]}>{user.email}</Text>
      </View>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: isDarkMode ? '#444' : '#fff' }]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={[styles.buttonText, { color: isDarkMode ? '#fff' : '#333' }]}>Alterar senha</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: isDarkMode ? '#444' : '#fff' }]}
        onPress={handleLogout}
      >
        <Text style={[styles.buttonText, { color: isDarkMode ? '#fff' : '#333' }]}>Sair</Text>
      </TouchableOpacity>

      {/* Modal para redefinir senha */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={[styles.modalContent, { backgroundColor: isDarkMode ? '#333' : '#fff' }]}>
            <Text style={[styles.modalTitle, { color: isDarkMode ? '#fff' : '#000' }]}>Redefinir Senha</Text>
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: isDarkMode ? '#444' : '#fff',
                  color: isDarkMode ? '#fff' : '#000',
                  borderColor: isDarkMode ? '#555' : '#ccc',
                },
              ]}
              placeholder="Digite a nova senha"
              placeholderTextColor={isDarkMode ? '#aaa' : '#888'}
              secureTextEntry
              value={newPassword}
              onChangeText={setNewPassword}
            />
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: isDarkMode ? '#444' : '#fff',
                  color: isDarkMode ? '#fff' : '#000',
                  borderColor: isDarkMode ? '#555' : '#ccc',
                },
              ]}
              placeholder="Repita a nova senha"
              placeholderTextColor={isDarkMode ? '#aaa' : '#888'}
              secureTextEntry
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
            <TouchableOpacity
              style={[styles.modalButton, { backgroundColor: isDarkMode ? '#555' : '#333' }]}
              onPress={handlePasswordChange}
            >
              <Text style={styles.modalButtonText}>Confirmar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalButton, { backgroundColor: isDarkMode ? '#555' : '#333' }]}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalButtonText}>Cancelar</Text>
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
    alignItems: 'center',
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#eee',
    marginBottom: 20,
  },
  infoContainer: {
    width: '100%',
    paddingVertical: 15,
    borderRadius: 8,
    marginBottom: 15,
    alignItems: 'center',
    elevation: 3,
  },
  infoText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  button: {
    width: '100%',
    paddingVertical: 15,
    borderRadius: 8,
    marginBottom: 15,
    alignItems: 'center',
    elevation: 3,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    borderRadius: 8,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
  },
  modalButton: {
    width: '100%',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  modalButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
