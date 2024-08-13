import { StyleSheet } from 'react-native';

const MainStyles = StyleSheet.create({
    root: {
        flex: 1,
    },
	column_container: {
		flexDirection: 'column', 
		justifyContent: 'space-between',
		flex: 1, 
		width: '100%', 
		padding: 20
	},
	title_one: {
		fontSize: 30, 
		fontWeight: '600', 
		textAlign: 'left', 
		color: '#220622',
		marginBottom: 50, 
	},
	title_aaa: {
		fontSize: 30, 
		fontWeight: 'bold', 
		color: '#612bc1',
	},
	title_a28: {
		fontSize: 28, 
		fontWeight: '600', 
		color: '#220622',
	},
	title_a24: {
		fontSize: 24, 
		fontWeight: '600', 
		color: '#220622',
	},
	title_a20: {
		fontSize: 20, 
		fontWeight: '600', 
		color: '#220622',
	},
	title_a18: {
		fontSize: 18, 
		fontWeight: '600', 
		color: '#220622',
	},
	title_a16: {
		fontSize: 16, 
		fontWeight: '600', 
		color: '#220622',
	},
	title_a15: {
		fontSize: 15, 
		fontWeight: '600', 
		color: '#220622',
	},
	title_a14: {
		fontSize: 14, 
		fontWeight: '600', 
		color: '#220622',
	},
	title_a13: {
		fontSize: 13, 
		color: '#220622',
	},
	title_a12: {
		fontSize: 12, 
		color: '#220622',
	},
	textItalic: {
		fontStyle: 'italic',
	},
	textBold: {
		fontWeight: 'bold',
	},



    layout_container: {
        width: '100%',
        flexDirection: 'column',
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 20,
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
		borderRadius: 10,
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
