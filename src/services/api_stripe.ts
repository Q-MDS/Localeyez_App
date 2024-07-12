import api from './api';

export const subscription = async (data: any) =>
{
	const response = await api.post('/create-subscription', data, {});

	return response.data;
};