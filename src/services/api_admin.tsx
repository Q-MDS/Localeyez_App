import api from './api';

export const getNewBusinesses = async (token: string, data: any) => 
{
	try 
	{
		const response = await api.post('/api/new_businesses/', data,
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

export const approveBusiness = async (token: string, data: any) => 
{
	try 
	{
		const response = await api.post('/api/approve_business/', data,
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

export const denyBusiness = async (token: string, data: any) => 
{
	try 
	{
		const response = await api.post('/api/deny_business/', data,
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

export const getAllBusinesses = async (token: string, data: any) => 
{
	try 
	{
		const response = await api.post('/api/all_businesses/', data,
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

export const getSupportMessages = async (token: string, data: any) => 
{
	try 
	{
		const response = await api.post('/api/support_messages/', data,
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