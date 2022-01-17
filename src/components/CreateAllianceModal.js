import React, { memo, useCallback, useState } from 'react'
import { ActivityIndicator, Alert, Modal, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

import AllianceActions from '../redux/AllianceRedux'
import { colors } from '../configs'
import { WORDS } from '../constants'
import { WithContext } from '../context/CustomContext'
import globalStyles from '../styles'

const CreateAllianceModal = ({modalVisible, setModalVisible}) => {
    const dispatch = useDispatch()
    const persistState = useSelector(state => state.persist)
    const allianceState = useSelector(state => state.alliance)
    const [name, setName] = useState('')

    const createAlliance = () => {
        if (!name) {
            Alert.alert(`Alliance name can't be empty!`)
        } else {
            const data = {
                name,
                admin: persistState.authUser.email
            }
            dispatch(AllianceActions.createAllianceRequest(data, () => {
                setName('')
                setModalVisible(false)
            }))
        }
    }

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
                        <Text style={[globalStyles.subTitleText, {alignSelf: 'center'}]}>{WORDS.CREATE_ALLIANCE}</Text>
                        <TextInput 
                            value={name}
                            onChangeText={value => setName(value)}
                            placeholder={WORDS.ALLIANCE_NAME}
                            placeholderTextColor={colors.placeholder}
                            style={[globalStyles.normalText, styles.inputWrap]}
                        />
                        <View style={styles.wrapButton}>
                            <TouchableOpacity
                                style={styles.cancelBtn}
                                onPress={() => setModalVisible(false)}
                            >
                                <Text style={globalStyles.normalText}>{WORDS.CANCEL}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                style={styles.createBtn}
                                onPress={createAlliance}
                            >
                                {allianceState.fetchingAlliance ? (
                                    <ActivityIndicator/>
                                ) : (
                                    <Text style={[globalStyles.normalText, {color: colors.primary}]}>{WORDS.CREATE}</Text>
                                )}
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </TouchableOpacity>
        </Modal>
    )
}

export default WithContext(memo(CreateAllianceModal))

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
