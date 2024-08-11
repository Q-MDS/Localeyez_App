import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Platform, ScrollView, SafeAreaView } from 'react-native';
// import { useIAP } from 'react-native-iap';

const subscriptionSkus = Platform.select({
  ios: ["localeyezmonthly_1"],
});

const Subscriptions = ({ navigation }) => {
//   const { connected, getSubscriptions } = useIAP();
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchSubscriptions = async () => {
    setLoading(true);
    try {
      const subs = await getSubscriptions({ skus: subscriptionSkus });
      setSubscriptions(subs);
    } catch (error) {
      console.error("Error fetching subscriptions", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (connected) {
      fetchSubscriptions();
    }
  }, [connected]);

  const renderSubscription = ({ item }) => (
    <View>
      <Text style={{color: 'black'}}>{item.title}</Text>
      <Text style={{color: 'black'}}>{item.description}</Text>
      <Text style={{color: 'black'}}>{item.price}</Text>
    </View>
  );

  return (
    <SafeAreaView>
    <View style={{marginTop: 20}}>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <FlatList
          data={subscriptions}
          renderItem={renderSubscription}
          keyExtractor={(item) => item.productId}
        />
      )}
    </View>
    </SafeAreaView>
  );
};

export default Subscriptions;