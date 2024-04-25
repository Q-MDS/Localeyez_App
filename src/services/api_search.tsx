import api from './api';

export const shopperSearch = async (token: string, data: any) => 
{
	try 
	{
		const response = await api.post('/api/search/', data,
		{
			headers: { Authorization: `Bearer ${token}` },
		});

		return response.data;
	} 
	catch (error) 
	{
		console.error(error);
	
		return false;
	}
}