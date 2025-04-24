import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker'; // Importação do Picker
import { getDatabase, ref, onValue } from 'firebase/database';

const TelaRegistro = () => {
  const [funcionarios, setFuncionarios] = useState([]);
  const [expandido, setExpandido] = useState({});
  const [filtroMes, setFiltroMes] = useState('7dias'); // Estado inicial para "Últimos 7 dias"

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
    if (!entrada || !saida) return '0h0min';

    try {
      const [horaEntrada, minutoEntrada] = entrada.split(':').map(Number);
      const [horaSaida, minutoSaida] = saida.split(':').map(Number);

      const inicio = new Date(0, 0, 0, horaEntrada, minutoEntrada);
      const fim = new Date(0, 0, 0, horaSaida, minutoSaida);

      let totalMinutos = (fim - inicio) / (1000 * 60);

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

      totalMinutos = Math.max(totalMinutos, 0);

      const horas = Math.floor(totalMinutos / 60);
      const minutos = Math.round(totalMinutos % 60);

      return `${horas}h${minutos}min`;
    } catch (error) {
      console.error('Erro ao calcular total de horas:', error);
      return '0h0min';
    }
  };

  const filtrarPorMes = (registros, mes) => {
    if (!mes) return Object.entries(registros); // Retorna todos os registros se nenhum mês for selecionado

    return Object.entries(registros).filter(([data]) => {
      const [ano, mesRegistro] = data.split('-');
      return mesRegistro === mes;
    });
  };

  const obterUltimos7Dias = (registros) => {
    // Converte os registros em um array, ordena pela data e seleciona os últimos 7
    return Object.entries(registros)
      .sort(([dataA], [dataB]) => {
        const [anoA, mesA, diaA] = dataA.split('-').map(Number);
        const [anoB, mesB, diaB] = dataB.split('-').map(Number);
        const dataRegistroA = new Date(anoA, mesA - 1, diaA);
        const dataRegistroB = new Date(anoB, mesB - 1, diaB);
        return dataRegistroB - dataRegistroA; // Ordena em ordem decrescente (mais recente primeiro)
      })
      .slice(0, 7); // Seleciona os últimos 7 registros
  };

  const renderItem = ({ item }) => {
    // Verifica se o filtro é "7dias" ou um mês específico
    const registrosFiltrados =
      filtroMes === '7dias'
        ? obterUltimos7Dias(item.registros) // Últimos 7 dias
        : filtrarPorMes(item.registros, filtroMes); // Filtra por mês

    return (
      <View style={styles.card}>
        <TouchableOpacity onPress={() => toggleExpandido(item.uid)}>
          <Text style={styles.nome}>
            {item.nome} <Text style={styles.seta}>{expandido[item.uid] ? '▲' : '▼'}</Text>
          </Text>
        </TouchableOpacity>

        {expandido[item.uid] && (
          <View style={styles.registros}>
            {registrosFiltrados.length > 0 ? (
              registrosFiltrados.map(([data, info]) => (
                <View key={data} style={styles.registro}>
                  <Text style={styles.data}>{formatarData(data)}</Text>
                  <Text>Entrada: {info.entrada || 'N/A'}</Text>
                  <Text>Saída: {info.saida || 'N/A'}</Text>
                  <Text>Pausas: {info.pausas ? info.pausas.join(', ') : 'Nenhuma'}</Text>
                  <Text>Total: {calcularTotalHoras(info.entrada, info.saida, info.pausas)}</Text>
                </View>
              ))
            ) : (
              <Text style={styles.vazio}>Nenhum registro encontrado</Text>
            )}
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Picker
        selectedValue={filtroMes}
        onValueChange={(itemValue) => setFiltroMes(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Últimos 7 dias" value="7dias" />
        <Picker.Item label="Janeiro" value="01" />
        <Picker.Item label="Fevereiro" value="02" />
        <Picker.Item label="Março" value="03" />
        <Picker.Item label="Abril" value="04" />
        <Picker.Item label="Maio" value="05" />
        <Picker.Item label="Junho" value="06" />
        <Picker.Item label="Julho" value="07" />
        <Picker.Item label="Agosto" value="08" />
        <Picker.Item label="Setembro" value="09" />
        <Picker.Item label="Outubro" value="10" />
        <Picker.Item label="Novembro" value="11" />
        <Picker.Item label="Dezembro" value="12" />
      </Picker>

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
  picker: {
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 5,
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