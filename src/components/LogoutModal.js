import React, { memo } from 'react'
import { Modal, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import { useDispatch } from 'react-redux'

import { colors } from '../configs'
import { WORDS } from '../constants'
import { WithContext } from '../context/CustomContext'
import globalStyles from '../styles'
import PersistActions from '../redux/PersistRedux'

const LogoutModal = ({modalVisible, setModalVisible}) => {
    const dispatch = useDispatch()

    return (
        <Modal
            visible={modalVisible}
            transparent
            animationType='fade'
        >
            <TouchableOpacity
                activeOpacity={1}
                style={styles.modalWrap}
                onPress={() => setModalVisible(false)}
            >
                <TouchableWithoutFeedback>
                    <View style={styles.modalContainer}>
                        <Text style={[globalStyles.subTitleText, {alignSelf: 'center', marginBottom: 16}]}>{WORDS.WANT_LOGOUT}</Text>
                        <View style={styles.wrapButton}>
                            <TouchableOpacity
                                activeOpacity={0.5}
                                style={styles.cancelBtn}
                                onPress={() => setModalVisible(false)}
                            >
                                <Text style={globalStyles.normalText}>{WORDS.CANCEL}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                activeOpacity={0.5}
                                style={styles.createBtn}
                                onPress={() => {
                                    setModalVisible(false)
                                    dispatch(PersistActions.logoutRequest())
                                }}
                            >
                                <Text style={[globalStyles.normalText, {color: colors.primary}]}>{WORDS.LOGOUT}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </TouchableOpacity>
        </Modal>
    )
}

export default WithContext(memo(LogoutModal))

const styles = StyleSheet.create({
    modalWrap: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.8)'
    },
    modalContainer: {
        width: '90%',
        padding: 16,
        borderRadius: 5,
        backgroundColor: colors.darkPrimary
    },
    inputWrap: {
        width: '100%',
        paddingHorizontal: 0,
        paddingVertical: 2,
        borderBottomColor: colors.text,
        borderBottomWidth: 1,
        marginVertical: 8
    },
    wrapButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 8
    },
    cancelBtn: {
        width: '48%',
        padding: 8,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: colors.text,
        alignItems: 'center'
    },
    createBtn: {
        width: '48%',
        padding: 8,
        borderRadius: 5,
        backgroundColor: colors.text,
        alignItems: 'center'
    }
})
