import React, { useState, useEffect }  from 'react';
import DbUtils from '../../../../../services/DbUtils';
import MainStyles from '../../../../../assets/styles/MainStyles';
import { TopNavArrowTitle } from '../../../../../components/TopNavArrowTitle';
import { TabsBusProf } from '../../../../../components/TabsBusProf';
import { SafeAreaView, ScrollView, View } from 'react-native';
import { Layout, } from '@ui-kitten/components';
import { TitleFour } from '../../../../../components/TitleFour';
import TextOne from '../../../../../components/TextOne';
import TextTwo from '../../../../../components/TextTwo';
import { ButtonPrimary } from '../../../../../components/ButtonPrimary';

const Edit = (props) => 
{
    const [selectedIndex, setSelectedIndex] = useState(props.route.params.selectedIndex);
	const [businessId, setBusinessId] = useState('');
	const [token, setToken] = useState('');
	const [shoppingData, setShoppingData] = useState([]);
	const [showShopping, setShowShopping] = useState([]);
	const [travelData, setTravelData] = useState([]);
	const [showTravel, setShowTravel] = useState([]);
	const [healthData, setHealthData] = useState([]);
	const [showHealth, setShowHealth] = useState([]);
	const [entertainmentData, setEntertainmentData] = useState([]);
	const [showEntertainment, setShowEntertainment] = useState([]);
	const [educationData, setEducationData] = useState([]);
	const [showEducation, setShowEducation] = useState([]);
	const [propertyData, setPropertyData] = useState([]);
	const [showProperty, setShowProperty] = useState([]);
	const [servicesData, setServicesData] = useState([]);
	const [showServices, setShowServices] = useState([]);
	const [communityData, setCommunityData] = useState([]);
	const [showCommunity, setShowCommunity] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	const getProfile = async () => 
    {
        const profile = await DbUtils.getItem('business_profile');
		const parsedProfile = JSON.parse(profile);

		setShoppingData(parsedProfile.shoppingData);
		setTravelData(parsedProfile.travelData);
		setHealthData(parsedProfile.healthData);
		setEntertainmentData(parsedProfile.entertainmentData);
		setEducationData(parsedProfile.educationData);
		setPropertyData(parsedProfile.propertyData);
		setServicesData(parsedProfile.servicesData);
		setCommunityData(parsedProfile.communityData);

        console.log('Business Edit Profile: ', shoppingData);
    }

	const getBusniessId = async () => 
	{
		const id = await DbUtils.getItem('business_id');
		
		setBusinessId(id);
	}

	const getToken = async () => 
	{
		const token = await DbUtils.getItem('token');
		
		setToken(token);
	}

	useEffect(() => 
	{
		const fetchProfile = async () => 
		{
			await getProfile();
			await getBusniessId();
			await getToken();

			setIsLoading(false);
		};

		fetchProfile();
	}, []);

	useEffect(() => 
	{
		const showShopping = shoppingData.filter(obj => obj.checked).map(obj => ({ id: obj.id, category: obj.item, type: obj.type }));
		setShowShopping(showShopping);
		const showTravel = travelData.filter(obj => obj.checked).map(obj => ({ id: obj.id, category: obj.item, type: obj.type }));
		setShowTravel(showTravel);
		const showHealth = healthData.filter(obj => obj.checked).map(obj => ({ id: obj.id, category: obj.item, type: obj.type }));
		setShowHealth(showHealth);
		const showEntertainment = entertainmentData.filter(obj => obj.checked).map(obj => ({ id: obj.id, category: obj.item, type: obj.type }));
		setShowEntertainment(showEntertainment);
		const showEducation = educationData.filter(obj => obj.checked).map(obj => ({ id: obj.id, category: obj.item, type: obj.type }));
		setShowEducation(showEducation);
		const showProperty = propertyData.filter(obj => obj.checked).map(obj => ({ id: obj.id, category: obj.item, type: obj.type }));
		setShowProperty(showProperty);
		const showServices = servicesData.filter(obj => obj.checked).map(obj => ({ id: obj.id, category: obj.item, type: obj.type }));
		setShowServices(showServices);
		const showCommunity = communityData.filter(obj => obj.checked).map(obj => ({ id: obj.id, category: obj.item, type: obj.type }));
		setShowCommunity(showCommunity);
	}, [!isLoading]);
    
    if (selectedIndex === 0) 
    {
        props.navigation.navigate('BusProfEdit');
    }
    
    if (selectedIndex === 1) 
    {
        // console.log('Goto Business Profile');
    }

    const handleAddSector = () => 
    {
        // console.log('Fuck joe biden');
        props.navigation.navigate('BusProfSectorsAdd');
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
        <TopNavArrowTitle title="Edit Profile" alignment="start" navigation={props.navigation} goBackTo="BusProfProHome" />
        <TabsBusProf selected={1} value={selectedIndex} onchange={setSelectedIndex} />
            
                <Layout style={[MainStyles.layout_container, {width: '100%'}]}>
                {/* <Layout style={[{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#ff0000', flex: 1, height: '100%'}]}> */}
                    <View style={{ flex: 1, width: '100%' }}>
                    	<TextTwo title="Current Business Sectors" fontsize={20} mb={10} />
						<ScrollView>
							<Layout style={{ backgroundColor: '#f8f8fc', width: '100%', borderRadius: 10, padding: 20, marginTop: 10 }}>
								<TextTwo title="Shopping" fontsize={20} />
								{showShopping && showShopping.length > 0 && showShopping.map((obj, index) => 
								obj.type === 0 ? 
									<TextOne title={obj.category} fontweight='bold' />: 
									<TextTwo key={index} title={obj.category}  />
								)}
								<TextTwo title="Travel" fontsize={20} mt={20} />
								{showTravel && showTravel.length > 0 && showTravel.map((obj, index) => 
								obj.type === 0 ? 
									<TextOne title={obj.category} fontweight='bold' />: 
									<TextTwo key={index} title={obj.category}  />
								)}
								<TextTwo title="Health" fontsize={20} mt={20} />
								{showHealth && showHealth.length > 0 && showHealth.map((obj, index) => 
								obj.type === 0 ? 
									<TextOne title={obj.category} fontweight='bold' />: 
									<TextTwo key={index} title={obj.category}  />
								)}
								<TextTwo title="Entertainment" fontsize={20} mt={20} />
								{showEntertainment && showEntertainment.length > 0 && showEntertainment.map((obj, index) => 
								obj.type === 0 ? 
									<TextOne title={obj.category} fontweight='bold' />: 
									<TextTwo key={index} title={obj.category}  />
								)}
								<TextTwo title="Education" fontsize={20} mt={20} />
								{showEducation && showEducation.length > 0 && showEducation.map((obj, index) => 
								obj.type === 0 ? 
									<TextOne title={obj.category} fontweight='bold' />: 
									<TextTwo key={index} title={obj.category}  />
								)}
								<TextTwo title="Property" fontsize={20} mt={20} />
								{showProperty && showProperty.length > 0 && showProperty.map((obj, index) => 
								obj.type === 0 ? 
									<TextOne title={obj.category} fontweight='bold' />: 
									<TextTwo key={index} title={obj.category}  />
								)}
								<TextTwo title="Services" fontsize={20} mt={20} />
								{showServices && showServices.length > 0 && showServices.map((obj, index) => 
								obj.type === 0 ? 
									<TextOne title={obj.category} fontweight='bold' />: 
									<TextTwo key={index} title={obj.category}  />
								)}
								<TextTwo title="Comminity" fontsize={20} mt={20} />
								{showCommunity && showCommunity.length > 0 && showCommunity.map((obj, index) => 
								obj.type === 0 ? 
									<TextOne title={obj.category} fontweight='bold' />: 
									<TextTwo key={index} title={obj.category}  />
								)}
							</Layout>
						</ScrollView>
                    </View>
					<View style={{ width: '100%', marginTop: 20 }}>
						<View style={{ width: '100%' }} >
							<ButtonPrimary name="Add New Business Sector" mt={10} mb={10} width="100%" onpress={handleAddSector} />
						</View>
					</View>
                   
                </Layout>
            
        </SafeAreaView>
    );
};

export default Edit;