import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import { getDatabase, ref, onValue, update } from 'firebase/database';

const TelaModerador = () => {
  const [funcionarios, setFuncionarios] = useState([]);
  const [expandido, setExpandido] = useState({});
  const [editando, setEditando] = useState(null);
  const [novoEntrada, setNovoEntrada] = useState('');
  const [novoSaida, setNovoSaida] = useState('');
  const [novoPausa, setNovoPausa] = useState('');

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

  const toggleExpandido = (key) => {
    setExpandido((prev) => ({
      ...prev,
      [key]: !prev[key]
    }));
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

  const salvarEdicao = (uid, data) => {
    const db = getDatabase();
    const registroRef = ref(db, `estagiarios/cargaHoraria/${uid}/registros/${data}`);

    const atualizacoes = {
      entrada: novoEntrada,
      saida: novoSaida,
      pausas: novoPausa ? novoPausa.split(',').map((p) => p.trim()) : [],
    };

    update(registroRef, atualizacoes)
      .then(() => {
        Alert.alert('Sucesso', 'Registro atualizado com sucesso!');
        setEditando(null);
        setNovoEntrada('');
        setNovoSaida('');
        setNovoPausa('');
      })
      .catch((error) => {
        Alert.alert('Erro', 'Não foi possível atualizar o registro.');
        console.error(error);
      });
  };

  const formatarData = (data) => {
    const partes = data.split('-');
    if (partes.length === 3) {
      const [ano, mes, dia] = partes;
      return `${dia}-${mes}-${ano}`;
    }
    return data;
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
          <View style={styles.registros}>
            {Object.entries(item.registros).map(([data, info]) => (
              <View key={data} style={styles.registro}>
                <TouchableOpacity onPress={() => toggleExpandido(data)}>
                  <Text style={styles.data}>{formatarData(data)}</Text>
                </TouchableOpacity>

                {expandido[data] && (
                  <>
                    {editando === data ? (
                      <>
                        <TextInput
                          style={styles.input}
                          value={novoEntrada}
                          onChangeText={setNovoEntrada}
                          placeholder="Nova entrada"
                        />
                        <TextInput
                          style={styles.input}
                          value={novoSaida}
                          onChangeText={setNovoSaida}
                          placeholder="Nova saída"
                        />
                        <TextInput
                          style={styles.input}
                          value={novoPausa}
                          onChangeText={setNovoPausa}
                          placeholder="Novas pausas (separadas por vírgula)"
                        />
                        <TouchableOpacity
                          style={styles.botaoSalvar}
                          onPress={() => salvarEdicao(item.uid, data)}
                        >
                          <Text style={styles.textoBotao}>Salvar</Text>
                        </TouchableOpacity>
                      </>
                    ) : (
                      <>
                        <Text>Entrada: {info.entrada || 'N/A'}</Text>
                        <Text>Saída: {info.saida || 'N/A'}</Text>
                        <Text>Pausas: {info.pausas ? info.pausas.join(', ') : 'Nenhuma'}</Text>
                        <Text>Total: {calcularTotalHoras(info.entrada, info.saida, info.pausas)}</Text>
                        <TouchableOpacity
                          style={styles.botaoEditar}
                          onPress={() => {
                            setEditando(data);
                            setNovoEntrada(info.entrada || '');
                            setNovoSaida(info.saida || '');
                            setNovoPausa(info.pausas ? info.pausas.join(', ') : '');
                          }}
                        >
                          <Text style={styles.textoBotao}>Editar</Text>
                        </TouchableOpacity>
                      </>
                    )}
                  </>
                )}
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
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 5,
    marginBottom: 10,
  },
  botaoEditar: {
    backgroundColor: '#1e90ff',
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
  },
  botaoSalvar: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
  },
  textoBotao: {
    color: '#fff',
    textAlign: 'center',
  },
  vazio: {
    fontStyle: 'italic',
    color: '#999',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default TelaModerador;