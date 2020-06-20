import React, { Component } from 'react'
import { Text, View } from 'react-native'
import Modal, { ModalFooter, ModalButton, ModalContent } from 'react-native-modals';

const CustomModal = ({visibleModal, cancell, submit}) => {
   
        return (
            <View style={{flex: 1, position: 'absolute', top: 0, left: 0, right: 0, bottom: 0}} >
                <Modal
                visible={visibleModal}
                footer={
                <ModalFooter>
                    <ModalButton
                    text="CANCEL"
                    onPress={cancell}
                    />
                    <ModalButton
                    text="OK"
                    onPress={submit}
                    />
                </ModalFooter>
                }
            >
                <ModalContent>
                <Text>isi kontent</Text>
                </ModalContent>
            </Modal>
            </View>
            
        )
    
}
export default CustomModal;
