import api from './api';

export const updBusinessProfile = async (token: string, data: any) =>
{
	console.log('Token FJB 1: ', token);
	console.log('Token FJB 2: ', data);

	const response = await api.post('/api/upd_business_profile/', data,
	{
		headers: { Authorization: `Bearer ${token}` },
	});

	console.log('upd_business_profile: ', response.data);
	return response.data;
};