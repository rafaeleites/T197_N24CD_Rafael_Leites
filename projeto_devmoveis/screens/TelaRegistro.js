import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { getDatabase, ref, onValue } from 'firebase/database';

const TelaRegistro = () => {
  const [funcionarios, setFuncionarios] = useState([]);
  const [expandido, setExpandido] = useState({});
  const [filtroMes, setFiltroMes] = useState('7dias');

  useEffect(() => {
    const db = getDatabase();
    const cargaRef = ref(db, 'estagiarios/cargaHoraria');

    const unsubscribe = onValue(cargaRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const listaFuncionarios = Object.entries(data).map(([uid, dados]) => ({
          uid,
          nome: dados.nome,
          registros: dados.registros || {},
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

  const formatarData = (data) => {
    const partes = data.split('-');
    if (partes.length === 3) {
      const [ano, mes, dia] = partes;
      return `${dia}/${mes}/${ano.slice(2)}`;
    }
    return data;
  };

  const calcularMinutosTotais = (entrada, saida, pausas) => {
    if (!entrada || !saida) return 0;

    try {
      const [hEntrada, mEntrada] = entrada.split(':').map(Number);
      const [hSaida, mSaida] = saida.split(':').map(Number);
      const inicio = new Date(0, 0, 0, hEntrada, mEntrada);
      const fim = new Date(0, 0, 0, hSaida, mSaida);
      let totalMinutos = (fim - inicio) / 60000;

      if (pausas && pausas.length > 0) {
        const pausaMinutos = pausas.reduce((total, pausa) => {
          const [inicioP, fimP] = pausa.split('-');
          const [hIni, mIni] = inicioP.split(':').map(Number);
          const [hFim, mFim] = fimP.split(':').map(Number);
          const iniDate = new Date(0, 0, 0, hIni, mIni);
          const fimDate = new Date(0, 0, 0, hFim, mFim);
          return total + (fimDate - iniDate) / 60000;
        }, 0);
        totalMinutos -= pausaMinutos;
      }

      return Math.max(totalMinutos, 0);
    } catch (error) {
      return 0;
    }
  };

  const minutosParaTexto = (minutos) => {
    const h = Math.floor(minutos / 60);
    const m = Math.round(minutos % 60);
    return `${h}h${m}min`;
  };

  const filtrarPorMes = (registros, mes) => {
    if (!mes) return Object.entries(registros);
    return Object.entries(registros).filter(([data]) => {
      const [_, mesRegistro] = data.split('-');
      return mesRegistro === mes;
    });
  };

  const obterUltimos7Dias = (registros) => {
    return Object.entries(registros)
      .sort(([a], [b]) => new Date(b) - new Date(a))
      .slice(0, 7);
  };

  const renderItem = ({ item }) => {
    const registrosFiltrados =
      filtroMes === '7dias'
        ? obterUltimos7Dias(item.registros)
        : filtrarPorMes(item.registros, filtroMes);

    const totalMinutos = registrosFiltrados.reduce((soma, [_, info]) => {
      return soma + calcularMinutosTotais(info.entrada, info.saida, info.pausas);
    }, 0);

    const diasTrabalhados = registrosFiltrados.length;
    const minutosEsperados = diasTrabalhados * 5 * 60;
    const diferenca = totalMinutos - minutosEsperados;
    const corDiferenca = diferenca < 0 ? styles.faltando : styles.sobrando;

    return (
      <View style={styles.card}>
        <TouchableOpacity onPress={() => toggleExpandido(item.uid)}>
          <Text style={styles.nome}>
            {item.nome} <Text style={styles.seta}>{expandido[item.uid] ? '▲' : '▼'}</Text>
          </Text>
        </TouchableOpacity>

        <Text style={styles.info}>
          Dias trabalhados: {diasTrabalhados}
        </Text>
        <Text style={styles.info}>
          Carga horária esperada: {minutosParaTexto(minutosEsperados)}
        </Text>
        <Text style={styles.info}>
          Carga horária realizada: {minutosParaTexto(totalMinutos)}
        </Text>
        <Text style={[styles.info, corDiferenca]}>
          {diferenca < 0
            ? `Faltando: ${minutosParaTexto(Math.abs(diferenca))}`
            : `Sobrando: ${minutosParaTexto(diferenca)}`}
        </Text>

        {expandido[item.uid] && (
          <View style={styles.registros}>
            {registrosFiltrados.length > 0 ? (
              registrosFiltrados.map(([data, info]) => (
                <View key={data} style={styles.registro}>
                  <Text style={styles.data}>{formatarData(data)}</Text>
                  <Text>Entrada: {info.entrada || 'N/A'}</Text>
                  <Text>Saída: {info.saida || 'N/A'}</Text>
                  <Text>Pausas: {info.pausas ? info.pausas.join(', ') : 'Nenhuma'}</Text>
                  <Text>Total: {minutosParaTexto(calcularMinutosTotais(info.entrada, info.saida, info.pausas))}</Text>
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
    marginBottom: 5,
  },
  seta: {
    fontSize: 16,
    color: '#666',
  },
  info: {
    fontSize: 14,
    marginBottom: 2,
  },
  faltando: {
    color: 'red',
  },
  sobrando: {
    color: 'green',
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
