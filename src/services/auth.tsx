import api from './api';

export const isLoggedIn = async (token: string) =>
{
	const response = await api.get('/api/test/',
	{
		headers: { Authorization: `Bearer ${token}` },
	});

	return response.data;
};

export const register = async (data: any) =>
{
	// const response = await api.post('/api/register/', data);
	console.log('Registering...');

	// console.log('Response:', data);
	try {
		const response = await api.post('/api/register/', data);
		// console.log('Response:', response);
	
		if (response.status === 200) {
		  return response.data;
		} else {
		  throw new Error('Register failed');
		}
	  } catch (error) {
		console.error(error);
		throw error;
	  }

	// return response.data;
};

export const login = async (credOne: string, credTwo: string) => 
{
    try 
	{
		const response = await api.post('/api/login', {credOne, credTwo});
  
		if (response.status === 200) 
		{
			return response.data;
		} 
		else 
		{
			throw new Error('Login failed');
		}
	} 
	catch (error) 
	{
		console.error(error);
		throw error;
	}
};

export const registerShopper = async (data: any) =>
	{
		console.log('Registering shopper...');
	
		try {
			const response = await api.post('/api/register_shopper/', data);
			// console.log('Response:', response);
		
			if (response.status === 200) {
			  return response.data;
			} else {
			  throw new Error('Register failed');
			}
		  } catch (error) {
			console.error(error);
			throw error;
		  }
	
		// return response.data;
	};

export const logOut = async (token: string) =>
{
	const response = await api.get('/api/logout/',
		{
			headers: { Authorization: `Bearer ${token}` },
		},
	);

	return response.data;
};