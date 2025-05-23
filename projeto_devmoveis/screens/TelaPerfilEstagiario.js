import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { getDatabase, ref, onValue } from 'firebase/database';
import { useTheme } from '../contexts/ThemeContext'; // Importar o contexto do tema

// Mapeamento de avatares para cada estagiário
const avatarMap = {
  uidDoFuncionario2: require('../assets/avatar3.png'),
  uidDoFuncionario3: require('../assets/avatar2.png'),
  uidDoFuncionario4: require('../assets/avatar4.png'),
  uidDoFuncionario5: require('../assets/avatar5.png'),
};

const TelaPerfilEstagiarios = () => {
  const { isDarkMode } = useTheme(); // Usar o estado do tema
  const [funcionarios, setFuncionarios] = useState([]);
  const [expandido, setExpandido] = useState({});

  useEffect(() => {
    const db = getDatabase();
    const infoRef = ref(db, 'info/informacoes');

    const unsubscribe = onValue(infoRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const listaFuncionarios = Object.entries(data).map(([uid, dados]) => ({
          uid,
          nome: dados.nome,
          dataContratacao: dados.dataContratacao,
          instituicaoEnsino: dados.instituicaoEnsino,
          curso: dados.curso,
          semestre: dados.semestre,
        }));
        setFuncionarios(listaFuncionarios);
      } else {
        setFuncionarios([]);
      }
    });

    return () => unsubscribe();
  }, []);

  const toggleExpandido = (uid) => {
    setExpandido((prev) => ({
      ...prev,
      [uid]: !prev[uid],
    }));
  };

  const renderItem = ({ item }) => {
    return (
      <View style={[styles.card, { backgroundColor: isDarkMode ? '#333' : '#fff' }]}>
        <TouchableOpacity onPress={() => toggleExpandido(item.uid)} style={styles.row}>
          <Image
            source={avatarMap[item.uid] || require('../assets/avatar.png')} // Seleciona o avatar com base no UID
            style={styles.avatar}
          />
          <Text style={[styles.nome, { color: isDarkMode ? 'white' : 'black' }]}>
            {item.nome} <Text style={styles.seta}>{expandido[item.uid] ? '▲' : '▼'}</Text>
          </Text>
        </TouchableOpacity>

        {expandido[item.uid] && (
          <View style={[styles.analise, { backgroundColor: isDarkMode ? '#444' : '#eef6ff' }]}>
            <Text style={{ color: isDarkMode ? 'white' : 'black' }}>Data de Contratação: {item.dataContratacao}</Text>
            <Text style={{ color: isDarkMode ? 'white' : 'black' }}>Instituição de Ensino: {item.instituicaoEnsino}</Text>
            <Text style={{ color: isDarkMode ? 'white' : 'black' }}>Curso: {item.curso}</Text>
            <Text style={{ color: isDarkMode ? 'white' : 'black' }}>Semestre: {item.semestre}</Text>
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? 'black' : '#f2f2f2' }]}>
      <View>
        <Text style={[styles.titulo, { color: isDarkMode ? 'white' : 'black' }]}>Lista de Estagiários</Text>
      </View>

      <View>
        <FlatList
          data={funcionarios}
          keyExtractor={(item) => item.uid}
          renderItem={renderItem}
          contentContainerStyle={funcionarios.length === 0 && styles.emptyContainer}
          ListEmptyComponent={
            <Text style={[styles.vazio, { color: isDarkMode ? '#ccc' : '#999' }]}>
              Nenhum funcionário encontrado
            </Text>
          }
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  emptyContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    padding: 15,
    marginBottom: 15,
    borderRadius: 10,
    elevation: 3,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  nome: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  seta: {
    fontSize: 16,
    color: '#666',
  },
  analise: {
    marginTop: 10,
    padding: 10,
    borderRadius: 8,
  },
  vazio: {
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 20,
  },
  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default TelaPerfilEstagiarios;