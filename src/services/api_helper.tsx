import api from './api';

export const updBusinessProfile = async (token: string, data: any) =>
{
	const response = await api.post('/api/upd_business_profile/', data,
	{
		headers: { Authorization: `Bearer ${token}` },
	});

	return response.data;
};

export const updBusinessSectors =  async (token: string, data: any) => 
{
	const response = await api.post('/api/upd_business_sectors/', data, 
	{
		headers: { Authorization: `Bearer ${token}` },
	});
	return response.data;
}

export const addPromotion = async (token: string, data: any) => 
{
	const response = await api.post('/api/add_promotion/', data,
	{
		headers: { Authorization: `Bearer ${token}` },
	});
	
	return response.data;
}

export const updPromotion = async (token: string, data: any) => 
{
	const response = await api.post('/api/upd_promotion/', data,
	{
		headers: { Authorization: `Bearer ${token}` },
	});
	
	return response.data;
}

export const delPromotion = async (token: string, data: any) => 
{
	const response = await api.post('/api/del_promotion/', data,
	{
		headers: { Authorization: `Bearer ${token}` },
	});
	
	return response.data;
}

export const updEvent = async (token: string, data: any) => 
{
	const response = await api.post('/api/upd_event/', data,
	{
		headers: { Authorization: `Bearer ${token}` },
	});

	console.log('Update event response: ', response.data);
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

	return response.data;
}

export const delEvent = async (token: string, data: any) => 
{
	const response = await api.post('/api/del_event/', data,
	{
		headers: { Authorization: `Bearer ${token}` },
	});
	
	return response.data;
}

export const getBusinessReviews = async (token: string, data: any) => 
{
	const response = await api.post('/api/business_reviews/', data,
	{
		headers: { Authorization: `Bearer ${token}` },
	});
	
	return response.data;
}

export const businesSupport = async (token: string, data: any) => 
{
	const response = await api.post('/api/business_support/', data,
	{
		headers: { Authorization: `Bearer ${token}` },
	});
	
	return response.data;
}

export const getShopperReviews = async (token: string, data: any) => 
{
	const response = await api.post('/api/shopper_reviews/', data,
	{
		headers: { Authorization: `Bearer ${token}` },
	});
	
	return response.data;
}

export const updShopperProfile = async (token: string, data: any) =>
{
	const response = await api.post('/api/upd_shopper_profile/', data,
	{
		headers: { Authorization: `Bearer ${token}` },
	});
		console.log('response from updShopperProfile:', response.data);
	return response.data;
};

export const updShopperSectors =  async (token: string, data: any) => 
{
	const response = await api.post('/api/upd_shopper_sectors/', data, 
	{
		headers: { Authorization: `Bearer ${token}` },
	});
	return response.data;
}

export const updCreds =  async (token: string, data: any) => 
{
	const response = await api.post('/api/upd_creds/', data, 
	{
		headers: { Authorization: `Bearer ${token}` },
	});
	return response.data;
}

export const getNotifications = async (token: string, data: any) => 
{
	const response = await api.post('/api/get_notifications/', data,
	{
		headers: { Authorization: `Bearer ${token}` },
	});
	
	return response.data;
}

export const getTotViews = async (token: string, data: any) => 
{
	const response = await api.post('/api/get_tot_views/', data,
	{
		headers: { Authorization: `Bearer ${token}` },
	});
	
	return response.data;
}

export const getBusinessNotifications = async (token: string, data: any) => 
{
	const response = await api.post('/api/get_business_notifications/', data,
	{
		headers: { Authorization: `Bearer ${token}` },
	});
	
	return response.data;
}