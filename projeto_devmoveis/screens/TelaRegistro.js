import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { getDatabase, ref, onValue } from 'firebase/database';

const TelaRegistro = () => {
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

  const calcularTotalHoras = (entrada, saida, pausas) => {
    if (!entrada || !saida) return '0h0min'; // Se entrada ou saída estiverem ausentes, retorna 0h0min

    try {
      // Converte entrada e saída para objetos Date
      const [horaEntrada, minutoEntrada] = entrada.split(':').map(Number);
      const [horaSaida, minutoSaida] = saida.split(':').map(Number);

      const inicio = new Date(0, 0, 0, horaEntrada, minutoEntrada);
      const fim = new Date(0, 0, 0, horaSaida, minutoSaida);

      // Calcula a diferença em minutos
      let totalMinutos = (fim - inicio) / (1000 * 60);

      // Subtrai o tempo total das pausas (se houver)
      if (pausas && pausas.length > 0) {
        const totalPausasMinutos = pausas.reduce((total, pausa) => {
          const [inicioPausa, fimPausa] = pausa.split('-');
          const [horaInicioPausa, minutoInicioPausa] = inicioPausa.split(':').map(Number);
          const [horaFimPausa, minutoFimPausa] = fimPausa.split(':').map(Number);

          const inicioPausaDate = new Date(0, 0, 0, horaInicioPausa, minutoInicioPausa);
          const fimPausaDate = new Date(0, 0, 0, horaFimPausa, minutoFimPausa);

          return total + (fimPausaDate - inicioPausaDate) / (1000 * 60);
        }, 0);

        totalMinutos -= totalPausasMinutos;
      }

      // Garante que o total não seja negativo
      totalMinutos = Math.max(totalMinutos, 0);

      // Converte minutos para horas e minutos
      const horas = Math.floor(totalMinutos / 60);
      const minutos = Math.round(totalMinutos % 60);

      return `${horas}h${minutos}min`;
    } catch (error) {
      console.error('Erro ao calcular total de horas:', error);
      return '0h0min'; // Retorna 0h0min em caso de erro
    }
  };

  const analisarCargaHoraria = (registros) => {
    const diasTrabalhados = Object.keys(registros).length;
    const totalMinutosTrabalhados = Object.values(registros).reduce((total, info) => {
      const [horas, minutos] = calcularTotalHoras(info.entrada, info.saida, info.pausas)
        .replace('h', ':')
        .replace('min', '')
        .split(':')
        .map(Number);
      return total + horas * 60 + minutos;
    }, 0);

    const horasTrabalhadas = Math.floor(totalMinutosTrabalhados / 60);
    const minutosTrabalhados = totalMinutosTrabalhados % 60;
    const cargaPrevistaMinutos = diasTrabalhados * 5 * 60; // 5 horas por dia em minutos
    const diferencaMinutos = totalMinutosTrabalhados - cargaPrevistaMinutos;

    const diferencaHoras = Math.floor(Math.abs(diferencaMinutos) / 60);
    const diferencaMinutosRestantes = Math.abs(diferencaMinutos) % 60;

    return {
      diasTrabalhados,
      horasTrabalhadas: `${horasTrabalhadas}h${minutosTrabalhados}min`,
      cargaPrevista: `${Math.floor(cargaPrevistaMinutos / 60)}h${cargaPrevistaMinutos % 60}min`,
      diferenca: diferencaMinutos < 0
        ? `Déficit: ${diferencaHoras}h${diferencaMinutosRestantes}min`
        : `Excesso: +${diferencaHoras}h${diferencaMinutosRestantes}min`,
      corDiferenca: diferencaMinutos < 0 ? 'red' : 'green',
    };
  };

  const renderItem = ({ item }) => {
    const { diasTrabalhados, horasTrabalhadas, cargaPrevista, diferenca, corDiferenca } = analisarCargaHoraria(item.registros);

    return (
      <View style={styles.card}>
        <TouchableOpacity onPress={() => toggleExpandido(item.uid)}>
          <Text style={styles.nome}>
            {item.nome} <Text style={styles.seta}>{expandido[item.uid] ? '▲' : '▼'}</Text>
          </Text>
        </TouchableOpacity>

        <View style={styles.analise}>
          <Text>Dias trabalhados: {diasTrabalhados}</Text>
          <Text>Carga prevista: {cargaPrevista}</Text>
          <Text>Horas trabalhadas: {horasTrabalhadas}</Text>
          <Text style={{ color: corDiferenca }}>{diferenca}</Text>
        </View>

        {expandido[item.uid] && (
          <View style={styles.registros}>
            {Object.entries(item.registros).map(([data, info]) => (
              <View key={data} style={styles.registro}>
                <Text style={styles.data}>{formatarData(data)}</Text>
                <Text>Entrada: {info.entrada || 'N/A'}</Text>
                <Text>Saída: {info.saida || 'N/A'}</Text>
                <Text>Pausas: {info.pausas ? info.pausas.join(', ') : 'Nenhuma'}</Text>
                <Text>Total: {calcularTotalHoras(info.entrada, info.saida, info.pausas)}</Text>
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

export default TelaRegistro;