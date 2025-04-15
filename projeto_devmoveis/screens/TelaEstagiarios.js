import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { getDatabase, ref, onValue } from 'firebase/database';

const TelaEstagiarios = () => {
  const [funcionarios, setFuncionarios] = useState([]);
  const [expandido, setExpandido] = useState({});

  useEffect(() => {
    const db = getDatabase();
    const cargaRef = ref(db, 'estagiarios/cargaHoraria');

    const unsubscribe = onValue(cargaRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const listaFuncionarios = Object.entries(data).map(([uid, dados]) => ({
          uid,
          nome: dados.nome,
          registros: dados.registros || {}
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
      [uid]: !prev[uid]
    }));
  };

  const formatarData = (data) => {
    const partes = data.split('-'); // espera 'YYYY-MM-DD'
    if (partes.length === 3) {
      const [ano, mes, dia] = partes;
      return `${dia}/${mes}/${ano.slice(2)}`;
    }
    return data;
  };

  const analisarCargaHoraria = (registros) => {
    const diasTrabalhados = Object.keys(registros).length;
    const horasTrabalhadas = Object.values(registros).reduce((total, info) => {
      return total + (parseFloat(info.totalHoras) || 0);
    }, 0);
    const cargaPrevista = diasTrabalhados * 6;
    const diferenca = horasTrabalhadas - cargaPrevista;

    return {
      diasTrabalhados,
      horasTrabalhadas,
      cargaPrevista,
      diferenca
    };
  };

  const renderItem = ({ item }) => {
    const { diasTrabalhados, horasTrabalhadas, cargaPrevista, diferenca } = analisarCargaHoraria(item.registros);

    // Cores para déficit ou excesso
    const corDiferenca = diferenca < 0 ? 'red' : 'green';

    return (
      <View style={styles.card}>
        <TouchableOpacity onPress={() => toggleExpandido(item.uid)}>
          <Text style={styles.nome}>
            {item.nome} <Text style={styles.seta}>{expandido[item.uid] ? '▲' : '▼'}</Text>
          </Text>
        </TouchableOpacity>

        <View style={styles.analise}>
          <Text>Dias trabalhados: {diasTrabalhados}</Text>
          <Text>Carga prevista: {cargaPrevista}h</Text>
          <Text>Horas trabalhadas: {horasTrabalhadas.toFixed(2)}h</Text>
          <Text style={{ color: corDiferenca }}>
            {diferenca < 0 ? `Déficit: ${Math.abs(diferenca).toFixed(2)}h` : `Excesso: +${diferenca.toFixed(2)}h`}
          </Text>
        </View>

        {expandido[item.uid] && (
          <View style={styles.registros}>
            {Object.entries(item.registros).map(([data, info]) => (
              <View key={data} style={styles.registro}>
                <Text style={styles.data}>{formatarData(data)}</Text>
                <Text>Entrada: {info.entrada || 'N/A'}</Text>
                <Text>Saída: {info.saida || 'N/A'}</Text>
                <Text>Pausas: {info.pausas ? info.pausas.join(', ') : 'Nenhuma'}</Text>
                <Text>Total: {info.totalHoras || 0}h</Text>
              </View>
            ))}
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
        ListEmptyComponent={<Text style={styles.vazio}>Nenhum estagiário encontrado</Text>}
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
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#eef6ff',
    borderRadius: 8,
  },
  registros: {
    marginTop: 10,
  },
  registro: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  data: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  vazio: {
    fontStyle: 'italic',
    color: '#999',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default TelaEstagiarios;
