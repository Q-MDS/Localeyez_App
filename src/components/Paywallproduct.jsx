import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text, Button } from 'react-native';

const PaywallProduct = (props) => 
{
	// 0/1 - active, title, price, identifier
	const pkg = props.pkg;
	const activeProduct = props.activeProduct;

	const handleChangeProduct = (selectedProduct, ap) => {
		props.onChangeProduct(selectedProduct, ap);
	}

	return (
		<TouchableOpacity onPress={() => handleChangeProduct(pkg, pkg.packageType)}>
		<View key={pkg.identifier} style={activeProduct == pkg.packageType ? styles.optionActive : styles.optionInActive}>
			<Text style={styles.packageTitle}>{pkg.packageType}</Text>
			<Text style={styles.packageDesc}>{pkg.product.title}</Text>
			<Text style={styles.packagePrice}>Full access for just {pkg.product.priceString}{pkg.packageType == "MONTHLY" ? "/mo" : "/yr"}</Text>
		</View>
		</TouchableOpacity>
  	)
}

const styles = StyleSheet.create({
	optionActive: {
        flexDirection: 'column', 
		alignItems: 'flex-start', 
		justifyContent: 'flex-start', 
		padding: 10, 
		width: '100%', 
		marginTop: 20, 
		borderRadius: 20, 
		borderColor: '#612bc1', 
		borderWidth: 2,
		fontSize: 18,
    },
	optionInActive: {
        flexDirection: 'column', 
		alignItems: 'flex-start', 
		justifyContent: 'flex-start', 
		padding: 10, 
		width: '100%', 
		marginTop: 20, 
		borderRadius: 20, 
		borderColor: '#612bc1', 
		borderWidth: 1,
		fontSize: 18,
		opacity: 0.4
    },
	optionText: {
		fontSize: 18,
		color: '#000',
		flex: 1
	},
	button: {
		backgroundColor: '#7B90AF',
		borderRadius: 20,
		padding: 20,
		width: '100%',
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 20,
	},
	packageTitle: {
		fontSize: 18,
		fontWeight: 'bold',
		color: '#000',
	},
	packageDesc: {
		fontSize: 16,
		color: '#612bc1',
	},
	packagePrice: {
		fontSize: 16,
		color: '#000',
	}
});

export default PaywallProduct