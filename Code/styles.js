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
  button: {
    display: flex,
    justifycontent: space-between,
    marginbottom: 15,
    padding: 15,
    backgroundcolor: "#ffff",
    borderradius: 8,
    boxshadow: 0 4 6 rgba(0, 0, 0, 0.1),
    cursor: pointer,
    transition: all 0.3s ease,
  },  
  button: {
    backgroundcolor: #e0f2ff,
  },
  
  buttonimg: {
    width: 30,
    height: 30,
    marginright: 15,
  },
  
  buttontext {
    flexgrow: 1,
    fontsize: 16,
    color: cor1,
  },
  
  /* Estilos para os ícones */
  icon: {
    display: flex,
    alignitems: center,
  },
  
  /* Estilo de separação entre os botões */
  .button + .button {
    margin-top: 10px,
  }
  //FIM


});

export default styles;
