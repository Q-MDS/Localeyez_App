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

export const getBusinessPromotions = async (token: string, data: any) => 
{
	try 
	{
		const response = await api.post('/api/get_business_promotions/', data,
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

export const getBusinessEvents = async (token: string, data: any) => 
{
	try 
	{
		const response = await api.post('/api/get_business_events/', data,
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

export const newReview = async (token: string, data: any) => 
{
	try 
	{
		const response = await api.post('/api/new_review/', data,
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

export const searchByCategory = async (token: string, data: any) => 
{
	try 
	{
		const response = await api.post('/api/search_category/', data,
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