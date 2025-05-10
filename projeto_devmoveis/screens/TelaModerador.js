import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { Picker } from '@react-native-picker/picker'; // Importação do Picker
import { getDatabase, ref, onValue, update } from 'firebase/database';
import { useTheme } from '../contexts/ThemeContext'; // Importar o contexto do tema

const TelaModerador = () => {
  const { isDarkMode } = useTheme(); // Usar o estado do tema
  const [funcionarios, setFuncionarios] = useState([]);
  const [expandido, setExpandido] = useState({});
  const [editando, setEditando] = useState(null);
  const [novoEntrada, setNovoEntrada] = useState('');
  const [novoSaida, setNovoSaida] = useState('');
  const [novoPausa, setNovoPausa] = useState('');
  const [mesSelecionado, setMesSelecionado] = useState(null);
  const [carregando, setCarregando] = useState(true);

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
      setCarregando(false);
    });

    return () => unsubscribe();
  }, []);

  const toggleExpandido = (key) => {
    setExpandido((prev) => ({
      ...prev,
      [key]: !prev[key],
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
      <View style={[styles.card, { backgroundColor: isDarkMode ? '#333' : '#fff' }]}>
        <TouchableOpacity onPress={() => toggleExpandido(item.uid)}>
          <Text style={[styles.nome, { color: isDarkMode ? 'white' : 'black' }]}>
            {item.nome} <Text style={styles.seta}>{expandido[item.uid] ? '▲' : '▼'}</Text>
          </Text>
        </TouchableOpacity>

        {expandido[item.uid] && (
          <View style={styles.registros}>
            {Object.entries(item.registros)
              .filter(([data]) => {
                if (!mesSelecionado) return true;
                const mes = data.split('-')[1];
                return mes === mesSelecionado;
              })
              .map(([data, info]) => (
                <View
                  key={data}
                  style={[
                    styles.registro,
                    { backgroundColor: isDarkMode ? '#444' : '#f9f9f9', borderColor: isDarkMode ? '#555' : '#ddd' },
                  ]}
                >
                  <TouchableOpacity onPress={() => toggleExpandido(`${item.uid}_${data}`)}>
                    <Text style={[styles.data, { color: isDarkMode ? 'white' : 'black' }]}>
                      {formatarData(data)}
                    </Text>
                  </TouchableOpacity>

                  {expandido[`${item.uid}_${data}`] && (
                    <>
                      {editando === data ? (
                        <>
                          <TextInput
                            style={[
                              styles.input,
                              { backgroundColor: isDarkMode ? '#555' : '#fff', color: isDarkMode ? 'white' : 'black' },
                            ]}
                            value={novoEntrada}
                            onChangeText={setNovoEntrada}
                            placeholder="Nova entrada"
                            placeholderTextColor={isDarkMode ? '#ccc' : '#999'}
                          />
                          <TextInput
                            style={[
                              styles.input,
                              { backgroundColor: isDarkMode ? '#555' : '#fff', color: isDarkMode ? 'white' : 'black' },
                            ]}
                            value={novoSaida}
                            onChangeText={setNovoSaida}
                            placeholder="Nova saída"
                            placeholderTextColor={isDarkMode ? '#ccc' : '#999'}
                          />
                          <TextInput
                            style={[
                              styles.input,
                              { backgroundColor: isDarkMode ? '#555' : '#fff', color: isDarkMode ? 'white' : 'black' },
                            ]}
                            value={novoPausa}
                            onChangeText={setNovoPausa}
                            placeholder="Novas pausas (separadas por vírgula)"
                            placeholderTextColor={isDarkMode ? '#ccc' : '#999'}
                          />
                          <TouchableOpacity
                            style={[
                              styles.botaoSalvar,
                              { backgroundColor: isDarkMode ? 'green' : 'green' },
                            ]}
                            onPress={() => salvarEdicao(item.uid, data)}
                          >
                            <Text style={styles.textoBotao}>Salvar</Text>
                          </TouchableOpacity>
                        </>
                      ) : (
                        <>
                          <Text style={{ color: isDarkMode ? 'white' : 'black' }}>
                            Entrada: {info.entrada || 'N/A'}
                          </Text>
                          <Text style={{ color: isDarkMode ? 'white' : 'black' }}>
                            Saída: {info.saida || 'N/A'}
                          </Text>
                          <Text style={{ color: isDarkMode ? 'white' : 'black' }}>
                            Pausas: {info.pausas ? info.pausas.join(', ') : 'Nenhuma'}
                          </Text>
                          <Text style={{ color: isDarkMode ? 'white' : 'black' }}>
                            Total: {calcularTotalHoras(info.entrada, info.saida, info.pausas)}
                          </Text>
                          <TouchableOpacity
                            style={[
                              styles.botaoEditar,
                              { backgroundColor: isDarkMode ? '#1e90ff' : '#1e90ff' },
                            ]}
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
    <View style={[styles.container, { backgroundColor: isDarkMode ? 'black' : '#f2f2f2' }]}>
      <View style={styles.filtroContainer}>
        <Text style={[styles.labelFiltro, { color: isDarkMode ? 'white' : 'black' }]}>Selecione o mês:</Text>
        <View
          style={[
            styles.pickerContainer,
            { backgroundColor: isDarkMode ? '#333' : '#fff', borderColor: isDarkMode ? '#555' : '#ccc' },
          ]}
        >
          <Picker
            selectedValue={mesSelecionado}
            onValueChange={(itemValue) => setMesSelecionado(itemValue)}
            style={[styles.picker, { color: isDarkMode ? 'white' : 'black' }]}
          >
            <Picker.Item label="Todos" value={null} />
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
        </View>
      </View>

      {carregando ? (
        <ActivityIndicator size="large" color="#1e90ff" />
      ) : (
        <FlatList
          data={funcionarios}
          keyExtractor={(item) => item.uid}
          renderItem={renderItem}
          contentContainerStyle={funcionarios.length === 0 && styles.emptyContainer}
          ListEmptyComponent={
            <Text style={[styles.vazio, { color: isDarkMode ? '#ccc' : '#999' }]}>
              Nenhum estagiário encontrado
            </Text>
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  card: {
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
    borderRadius: 8,
    borderWidth: 1,
  },
  data: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    marginBottom: 10,
  },
  botaoEditar: {
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
  },
  botaoSalvar: {
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
    textAlign: 'center',
    marginTop: 20,
  },
  filtroContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  labelFiltro: {
    marginRight: 10,
    fontWeight: 'bold',
  },
  pickerContainer: {
    borderWidth: 1,
    borderRadius: 5,
    overflow: 'hidden',
    width: 150,
    height: 30,
    justifyContent: 'center',
  },
  picker: {
    height: 50,
    fontSize: 16,
  },
});

export default TelaModerador;