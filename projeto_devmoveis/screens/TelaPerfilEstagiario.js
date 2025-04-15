import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { getDatabase, ref, onValue } from 'firebase/database';

const TelaPerfilEstagiarios = () => {
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
      <View style={styles.card}>
        <TouchableOpacity onPress={() => toggleExpandido(item.uid)}>
          <Text style={styles.nome}>
            {item.nome} <Text style={styles.seta}>{expandido[item.uid] ? '▲' : '▼'}</Text>
          </Text>
        </TouchableOpacity>

        {expandido[item.uid] && (
          <View style={styles.analise}>
            <Text>Data de Contratação: {item.dataContratacao}</Text>
            <Text>Instituição de Ensino: {item.instituicaoEnsino}</Text>
            <Text>Curso: {item.curso}</Text>
            <Text>Semestre: {item.semestre}</Text>
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={funcionarios}
        keyExtractor={(item) => item.uid}
        renderItem={renderItem}
        contentContainerStyle={funcionarios.length === 0 && styles.emptyContainer}
        ListEmptyComponent={<Text style={styles.vazio}>Nenhum funcionário encontrado</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  emptyContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 15,
    borderRadius: 10,
    elevation: 3,
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
    backgroundColor: '#eef6ff',
    borderRadius: 8,
  },
  vazio: {
    fontStyle: 'italic',
    color: '#999',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default TelaPerfilEstagiarios;
