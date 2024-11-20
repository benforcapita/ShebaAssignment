import React from 'react';
import { Dialog, Portal, Text, Button } from 'react-native-paper';
import { View } from 'react-native';
import centralizedStyles from '../styles/centralizedStyles';
import CustomButton from './CustomButton';

interface CustomDialogProps {
  visible: boolean;
  title: string;
  content: string;
  onDismiss: () => void;
}

const CustomDialog: React.FC<CustomDialogProps> = ({ visible, title, content, onDismiss }) => {
  return (
    <Portal>
      <View style={[centralizedStyles.modalBackground, { display: visible ? 'flex' : 'none' }]}>
        <View style={centralizedStyles.dialogContainer}>
          <Dialog.Title>{title}</Dialog.Title>
          <Dialog.Content>
            <Text>{content}</Text>
          </Dialog.Content>
          <View style={centralizedStyles.actionsContainer}>
            <CustomButton onPress={onDismiss} style={centralizedStyles.longButton} text="OK" buttonColor='secondary'  />
          </View>
        </View>
      </View>
    </Portal>
  );
};

export default CustomDialog;
