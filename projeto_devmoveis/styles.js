import { StyleSheet } from 'react-native';


const cor1 = "#00000" //preto
const cor2 = "FFD700" //dourado
const cor3 = "2F2F2F" // Cinza
const cor4 = "F5F5DC" // Bege
const cor5 = "B8860B" // dourado2


const styles = StyleSheet.create({
  container_principal: {
    flex: 1,
    backgroundColor: '#3333',
  },

  imagem_perfil: {
    width: 150,
    height: 150,
    resizeMode: 'cover',
    borderRadius: 350,
    borderWidth: 5,
    borderColor: 'purple',
  },

  imagem_login: {
    width: 294,
    height: 150,
    
  },

  container_image_login: {
    flex: 0.7,
    justifyContent: 'center',
    alignItems: 'center',
  },

  texto_estrutura: {
    color: 'black',
    fontWeight: 'bold',
  },

  texto_instituicao: {
    color: 'blue',
    textDecorationLine: 'underline',
  },

  container_botao: {
    flex: 0.3,
    alignItems: 'center',
    justifyContent: 'center',
  },

  botao: {
    backgroundColor: 'purple',
    width: 100,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },

  texto_botao: {
    color: 'white',
    fontSize: 15,
  },

  container_icons: {
    flex: 0.5,
    flexDirection: 'row',
    justifyContent: 'center',
  },

  container_login:{
    flex: 1,
    padding: 20,
    backgroundColor: '#3333',
  },
  
  /* Estilos para TELA RECURSOS */
 container: {
    flex: 1,
    backgroundColor: '#004AAD', // azul de fundo
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 30,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    color: '#004AAD',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  button: {
    width: '47%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5, // sombra Android
    shadowColor: '#000', // sombra iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginTop: 10,
  },
  icon: {
    width: 32,
    height: 32,
    resizeMode: 'contain',
  },
  //FIM


});

export default styles;
