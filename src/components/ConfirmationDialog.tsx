import React from 'react';
import { Dialog, Text } from 'react-native-paper';
import CustomButton from './CustomButton';
import { View } from 'react-native';
import centralizedStyles from '../styles/centralizedStyles';

interface ConfirmationDialogProps {
  visible: boolean;
  title: string;
  content: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  visible,
  title,
  content,
  onConfirm,
  onCancel,
}) => {
  return (
    <View style={[centralizedStyles.modalBackground,{ display: visible ? 'flex' : 'none'}]}>
      <View style={centralizedStyles.dialogContainer}>
        <Dialog.Title>{title}</Dialog.Title>
        <Dialog.Content>
          <Text>{content}</Text>
        </Dialog.Content>
        <View style={centralizedStyles.actionsContainer}>
          <CustomButton onPress={onCancel} text="No" style={centralizedStyles.button} />
          <CustomButton onPress={onConfirm} text="Yes" buttonColor='secondary' style={centralizedStyles.button} />
        </View>
      </View>
    </View>
  );
};

export default ConfirmationDialog;
