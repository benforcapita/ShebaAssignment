import { StyleSheet, Dimensions } from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const isLargeScreen = screenWidth > 768;

const centralizedStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    width: isLargeScreen ? '60%' : '100%',
    alignSelf: 'center',
    height: '75%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  option: {
    borderBottomWidth: 1,
  },
  optionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  optionSubtitle: {
    fontSize: 16,
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 8,
  },
  longButton: {
    marginTop: 8,
    width: '100%',
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 8,
  },
  chip: {
    margin: 4,
  },
  confirmButton: {
    marginTop: 16,
  },
  appointmentCard: {
    marginBottom: 10,
    borderRadius: 5,
    borderWidth: 1,
  },
  centeredContainer: {
    flex: 1,
    padding: 'auto',
  },
  detailText: {
    fontSize: 30,
    marginBottom: 8,
  },
  centeredTextContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    fontSize: 27,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'black',
    
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  dialogContainer: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
  },
});

export default centralizedStyles;
