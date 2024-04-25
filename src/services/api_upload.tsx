import api from './api';

export const shopperProfilePic = async (token: string, formData: any) => 
{
	try {
		const response = await api.post('/api/shopper_profile_pic', formData, 
		{
			headers: 
			{
			'Content-Type': 'multipart/form-data',
			'Authorization': `Bearer ${token}`,
			},
		});

		return response.data;
	} 
	catch (error) 
	{
		console.error(error);
	
		return false;
	}
}

export const businessDisplayImage = async (token: string, formData: any) => 
{
	try {
		const response = await api.post('/api/business_display_image', formData, 
		{
			headers: 
			{
			'Content-Type': 'multipart/form-data',
			'Authorization': `Bearer ${token}`,
			},
		});

		return response.data;
	} 
	catch (error) 
	{
		console.error(error);
	
		return false;
	}
}

export const businessBannerImage = async (token: string, formData: any) => 
{
	try {
		const response = await api.post('/api/business_banner_image', formData, 
		{
			headers: 
			{
			'Content-Type': 'multipart/form-data',
			'Authorization': `Bearer ${token}`,
			},
		});

		return response.data;
	} 
	catch (error) 
	{
		console.error(error);
	
		return false;
	}
}

export const businessProfilePic = async (token: string, formData: any) => 
{
	try {
		const response = await api.post('/api/business_profile_pic', formData, 
		{
			headers: 
			{
			'Content-Type': 'multipart/form-data',
			'Authorization': `Bearer ${token}`,
			},
		});

		return response.data;
	} 
	catch (error) 
	{
		console.error(error);
	
		return false;
	}
}

export const promotionImage = async (token: string, formData: any) => 
{
	try {
		const response = await api.post('/api/promotion_image', formData, 
		{
			headers: 
			{
			'Content-Type': 'multipart/form-data',
			'Authorization': `Bearer ${token}`,
			},
		});

		return response.data;
	} 
	catch (error) 
	{
		console.error(error);
	
		return false;
	}
}

export const updPromotionImage = async (token: string, formData: any) => 
{
	try {
		const response = await api.post('/api/upd_promotion_image', formData, 
		{
			headers: 
			{
			'Content-Type': 'multipart/form-data',
			'Authorization': `Bearer ${token}`,
			},
		});

		return response.data;
	} 
	catch (error) 
	{
		console.error(error);
	
		return false;
	}
}

export const eventImage = async (token: string, formData: any) => 
{
	try {
		const response = await api.post('/api/event_image', formData, 
		{
			headers: 
			{
			'Content-Type': 'multipart/form-data',
			'Authorization': `Bearer ${token}`,
			},
		});

		return response.data;
	} 
	catch (error) 
	{
		console.error(error);
	
		return false;
	}
}

export const updEventImage = async (token: string, formData: any) => 
{
	try {
		const response = await api.post('/api/upd_event_image', formData, 
		{
			headers: 
			{
			'Content-Type': 'multipart/form-data',
			'Authorization': `Bearer ${token}`,
			},
		});

		return response.data;
	} 
	catch (error) 
	{
		console.error(error);
	
		return false;
	}
}