import { StyleSheet } from 'react-native'
import { colors, fonts } from '../configs'

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.primary
    },
    bigText: {
        fontFamily: fonts.bold,
        fontSize: 24,
        color: colors.text
    },
    titleText: {
        fontFamily: fonts.bold,
        fontSize: 18,
        color: colors.text
    },
    subTitleText: {
        fontFamily: fonts.bold,
        fontSize: 16,
        color: colors.text
    },
    normalText: {
        fontFamily: fonts.medium,
        fontSize: 14,
        color: colors.text
    },
    descText: {
        fontFamily: fonts.regular,
        fontSize: 12,
        color: colors.text
    }
})
