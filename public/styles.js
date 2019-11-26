import {StyleSheet} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  MainLogo: {
    marginTop: 100,
    marginLeft: 65,
  },
  LogSignBtnContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    marginBottom: 250,
  },
  title: {
    backgroundColor: 'white',
    flex: 1,
  },
  LogSignBtn: {
    width: 200,
    backgroundColor: '#DA2727', // SUPREME RED COLOR
    paddingHorizontal: 26,
    fontSize: 22,
    marginVertical: 20,
  },
  BtnText: {
    fontSize: 22,
    color: '#ffffff',
    fontWeight: 'bold',
  },

  // LOGIN & SIGN UP SCREENS
  centerish: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 200,
  },
  LogSignBtnCentered: {
    width: 200,
    backgroundColor: '#DA2727',
    paddingHorizontal: 26,
    fontSize: 22,
    marginVertical: 20,
    marginLeft: 110,
  },

  //NAV BAR
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  navContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    justifyContent: 'space-around',
    backgroundColor: '#F0F0F0',
  },
  navButtonContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  NavButton: {
    backgroundColor: '#F0F0F0',
  },
  NavBtnText: {
    fontSize: 15,
    color: 'black',
    fontWeight: 'bold',
  },

  //SEARCH BAR
  resultElement: {
    flexDirection: 'row',
    alignSelf: 'stretch',
  },
  searchBar: {
    flex: 1,
  },
  listFriends: {
    padding: 20,
    fontSize: 20,
    backgroundColor: 'red',
  },
  addFriendBtn: {
    width: 50,
    justifyContent: 'flex-end',
  },
});

export default styles;

//bottomnav@email.com
