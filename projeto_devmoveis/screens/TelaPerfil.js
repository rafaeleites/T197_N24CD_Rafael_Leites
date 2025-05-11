import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert, Modal, TextInput } from 'react-native';
import { getAuth, signOut, updatePassword, sendEmailVerification } from 'firebase/auth';
import { getDatabase, ref, onValue } from 'firebase/database';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../contexts/ThemeContext';

export default function TelaPerfil() {
  const { isDarkMode } = useTheme();
  const [user, setUser] = useState({ name: 'Carregando...', email: 'Carregando...', emailVerified: false });
  const [modalVisible, setModalVisible] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [adminCode, setAdminCode] = useState('');
  const navigation = useNavigation();

  const ADMIN_CODE = '123456'; // Código de autenticação do administrador

  useEffect(() => {
    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (currentUser) {
      const email = currentUser.email;

      // Atualiza o estado do usuário
      currentUser.reload().then(() => {
        const db = getDatabase();
        const adminRef = ref(db, 'administradores');
        onValue(adminRef, (snapshot) => {
          const data = snapshot.val();
          if (data) {
            const admin = Object.values(data).find((admin) => admin.email === email);
            if (admin) {
              setUser({ name: admin.nome, email: admin.email, emailVerified: currentUser.emailVerified });
            } else {
              setUser({ name: 'Usuário não encontrado', email, emailVerified: currentUser.emailVerified });
            }
          }
        });
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
        Alert.alert('Erro', 'Não foi possível sair da conta.');
      });
  };

  const handlePasswordChange = () => {
    if (adminCode !== ADMIN_CODE) {
      Alert.alert('Erro', 'Código de autenticação inválido.');
      return;
    }

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
          setAdminCode('');
        })
        .catch((error) => {
          console.error('Erro ao alterar a senha:', error);
          Alert.alert('Erro', 'Não foi possível alterar a senha. Tente novamente.');
        });
    } else {
      Alert.alert('Erro', 'Usuário não autenticado.');
    }
  };

  const handleResendVerificationEmail = () => {
    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (currentUser) {
      sendEmailVerification(currentUser)
        .then(() => {
          Alert.alert('Sucesso', 'E-mail de verificação reenviado. Verifique sua caixa de entrada.');
        })
        .catch((error) => {
          console.error('Erro ao reenviar o e-mail de verificação:', error);
          Alert.alert('Erro', 'Não foi possível reenviar o e-mail de verificação. Tente novamente.');
        });
    } else {
      Alert.alert('Erro', 'Usuário não autenticado.');
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? '#000' : '#f5f5f5' }]}>
      <Text style={[styles.title, { color: isDarkMode ? '#fff' : '#333' }]}>Meu Perfil</Text>

      <Image
        source={require('../assets/avatar.png')}
        style={styles.avatar}
      />

      <View style={[styles.infoContainer, { backgroundColor: isDarkMode ? '#333' : '#fff' }]}>
        <Text style={[styles.infoText, { color: isDarkMode ? '#fff' : '#333' }]}>{user.name}</Text>
      </View>

      <View style={[styles.infoContainer, { backgroundColor: isDarkMode ? '#333' : '#fff' }]}>
        <Text style={[styles.infoText, { color: isDarkMode ? '#fff' : '#333' }]}>
          {user.email} {' '}
          {user.emailVerified ? (
            <Text style={{ color: 'green' }}>(Verificado)</Text>
          ) : (
            <Text style={{ color: 'red' }}>(Não Verificado)</Text>
          )}
        </Text>
        {!user.emailVerified && (
          <TouchableOpacity onPress={handleResendVerificationEmail}>
            <Text style={[styles.resendText, { color: 'green' }]}>Reenviar e-mail</Text>
          </TouchableOpacity>
        )}
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

      {/* Modal para alterar senha */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={[styles.modalContent, { backgroundColor: isDarkMode ? '#333' : '#fff' }]}>
            <Text style={[styles.modalTitle, { color: isDarkMode ? '#fff' : '#000' }]}>Alterar Senha</Text>
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: isDarkMode ? '#444' : '#fff',
                  color: isDarkMode ? '#fff' : '#000',
                  borderColor: isDarkMode ? '#555' : '#ccc',
                },
              ]}
              placeholder="Autenticação de Administrador"
              placeholderTextColor={isDarkMode ? '#aaa' : '#888'}
              secureTextEntry
              value={adminCode}
              onChangeText={setAdminCode}
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
              placeholder="Confirme a nova senha"
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
  resendText: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 5,
    textDecorationLine: 'underline', // Indica que é clicável
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