import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { getAuth, signOut } from 'firebase/auth';
import { getDatabase, ref, onValue } from 'firebase/database';
import { useNavigation } from '@react-navigation/native';

export default function TelaPerfil() {
  const [user, setUser] = useState({ name: 'Carregando...', email: 'Carregando...' });
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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meu Perfil</Text>

      <Image
        source={{ uri: 'https://via.placeholder.com/100x100.png?text=Perfil' }}
        style={styles.avatar}
      />

      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>{user.name}</Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>{user.email}</Text>
      </View>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Alterar senha</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5', // Mesma cor de fundo da TelaNotificacoes
    alignItems: 'center',
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333', // Mesma cor do título da TelaNotificacoes
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
    backgroundColor: '#fff', // Mesma cor dos itens da TelaNotificacoes
    paddingVertical: 15,
    borderRadius: 8,
    marginBottom: 15,
    alignItems: 'center',
    elevation: 3,
  },
  infoText: {
    fontSize: 16,
    color: '#333', // Mesma cor do texto dos itens da TelaNotificacoes
    fontWeight: 'bold',
  },
  button: {
    width: '100%',
    backgroundColor: '#fff', // Mesma cor dos itens da TelaNotificacoes
    paddingVertical: 15,
    borderRadius: 8,
    marginBottom: 15,
    alignItems: 'center',
    elevation: 3,
  },
  buttonText: {
    fontSize: 16,
    color: '#333', // Mesma cor do texto dos itens da TelaNotificacoes
    fontWeight: 'bold',
  },
});