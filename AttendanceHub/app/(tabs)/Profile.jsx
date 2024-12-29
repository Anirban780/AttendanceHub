import { View, Text, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getAccount, getCurrentUser} from '../../lib/appwrite';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'twrnc'

const ProfileScreen = () => {
  const [user, setUser] = useState(null);
  const [userData , setUserData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    //fetch user details
    const fetchData = async() => {
      try {
        const accountData = await getAccount();
        setUser(accountData);

        const userData = await getCurrentUser();
        setUserData(userData);
      }
      catch (error) {
        setError(error);
      }
    }

    fetchData();
  }, []);


  return (
    <SafeAreaView style={tw`bg-primary h-full`}>
      <View style={tw`w-full bg-gray-100 flex justify-center items-center h-full px-4`}>
          {error && <Text> {error} </Text>}

          {user && userData ? (
            <>
              <Image 
                source={userData.avatarUrl ? { uri: userData.avatarUrl } : require('../../assets/images/placeholder.jpg')}
                style={tw`w-[100px] h-[100px] rounded-[50px] mb-[10px]`}
              />

              <Text style={tw`text-[20px] font-medium mb-10 text-[#333]`}>{user.name}</Text>
              <Text style={tw`text-[16px] font-medium  text-[#333]`}>Email: {user.email}</Text>
              <Text style={tw`text-[16px] font-medium  text-[#333]`}>Enrollment No. {userData.enrollment}</Text>
            </>
          ): (
            <Text> No user data found </Text>
          )}
      </View>
    </SafeAreaView>
  )
}

export default ProfileScreen