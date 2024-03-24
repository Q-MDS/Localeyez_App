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
	const response = await api.post('/api/register/', data);

	return response.data;
};

export const login = async (email: string, password: string) => {
    try {
      const response = await api.post('/api/login', {
        email,
        password
      });
  
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error('Login failed');
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
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