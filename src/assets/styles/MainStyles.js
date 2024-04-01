import { StyleSheet } from 'react-native';

const MainStyles = StyleSheet.create({
    root: {
        flex: 1,
    },
    layout_container: {
        width: '100%',
        flexDirection: 'column',
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        padding: 30,
        paddingTop: 20,
    },
    layout_container_grid: {
        flexDirection: 'column',
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    layout_container_center: {
        flexDirection: 'column',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 30,
        position: 'absolute',
		
    },
    card_review: {
        flexDirection: 'column',
        width: '100%',
    },

    mt_0: {
        marginTop: 0,
    },
    mt_1: {
        marginTop: 4,
    },
    mt_2: {
        marginTop: 8,
    },
    mt_3: {
        marginTop: 16,
    },
    mt_4: {
        marginTop: 24,
    },
    mt_5: {
        marginTop: 48,
    },
    mb_0: {
        marginBottom: 0,
    },
    mb_1: {
        marginBottom: 4,
    },
    mb_2: {
        marginBottom: 8,
    },
    mb_3: {
        marginBottom: 16,
    },
    mb_4: {
        marginBottom: 24,
    },
    mb_5: {
        marginBottom: 48,
    },
});

export default MainStyles;
