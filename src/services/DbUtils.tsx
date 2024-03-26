import AsyncStorage from '@react-native-async-storage/async-storage';
import {register} from './auth';

const DbUtils = 
{
    setItem: async (key: string, value: string) => 
    {
        try 
        {
            await AsyncStorage.setItem(key, value);
        } 
        catch (error) 
        {
            console.error(error);
        }
    },

    getItem: async (key: string) => {
        try 
        {
            const value = await AsyncStorage.getItem(key);
        
            return value;
        } 
        catch (error) 
        {
            console.error(error);
        }
    },

    removeItem: async (key: string) => 
    {
        try 
        {
            await AsyncStorage.removeItem(key);
        } 
        catch (error) 
        {
            console.error(error);
        }
    },

    clear: async () => 
    {
        try 
        {
            await AsyncStorage.clear();
        } 
        catch (error) 
        {
            console.error(error);
        }
    },

    checkData: async (key: string) => 
    {
        const value = await AsyncStorage.getItem(key);

        if (value !== null) 
        {
            console.log('Data exists');
            return true;
        } 
        else 
        {
            console.log('No data with this key');
            return false;
        }
    },
};

export default DbUtils;
