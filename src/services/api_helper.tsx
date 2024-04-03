import api from './api';

export const updBusinessProfile = async (token: string, data: any) =>
{
	const response = await api.post('/api/upd_business_profile/', data,
	{
		headers: { Authorization: `Bearer ${token}` },
	});

	return response.data;
};

export const addPromotion = async (token: string, data: any) => 
{
	const response = await api.post('/api/add_promotion/', data,
	{
		headers: { Authorization: `Bearer ${token}` },
	});

	console.log('Add promotion response: ', response.data);
	return response.data;
}

export const addEvent = async (token: string, data: any) => 
{
	console.log('Token FJB 1: ', token);
	console.log('Token FJB 2: ', data);

	const response = await api.post('/api/add_event/', data,
	{
		headers: { Authorization: `Bearer ${token}` },
	});

	console.log('Add event response: ', response.data);
	return response.data;
}