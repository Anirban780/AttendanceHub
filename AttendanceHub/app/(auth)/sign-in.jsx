import { View, Text, ScrollView, Image, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import tw from 'twrnc'
import { SafeAreaView } from 'react-native-safe-area-context'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import { Link, useRouter } from 'expo-router'
import Logo from '../../assets/images/App-Logo.png'
import { getCurrentUser, signIn } from '../../lib/appwrite'
import { useGlobalContext } from '../../context/GlobalProvider'
import AsyncStorage from '@react-native-async-storage/async-storage'

const SignIn = () => {
  const [form, setForm] = useState({
    email: '',
    password: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const { setUser, setIsLogged } = useGlobalContext();
  const router = useRouter();

  useEffect(() => {
    const loadCredentials = async() => {
      try{
        const savedEmail = await AsyncStorage.getItem('userEmail');
        const savedPassword = await AsyncStorage.getItem('userPassword');

        if(savedEmail && savedPassword){
          setForm({ email: savedEmail, password: savedPassword });
        }
      }
      catch(error){
        Alert.alert("Error", error.message);
      }
    }

    loadCredentials();
  }, []);
  
  const submit = async () => {
    if(!form.email || !form.password){
          Alert.alert('Error', "Please fill in all the fields")
        }
    
        setIsSubmitting(true);
    
        try{
          await signIn(
            form.email, form.password
          );
          
          // Save credentials for auto-fill
          await AsyncStorage.setItem('userEmail', form.email);
          await AsyncStorage.setItem('userPassword', form.password);

          const result = await getCurrentUser();
          setUser(result);
          setIsLogged(true);

          Alert.alert("Success", 'User signed in Successfully');
    
          router.replace('/Home');
        }
        catch(error){
          Alert.alert('Error', error.message);
        }
        finally {
          setIsSubmitting(false);
        }
  }

  return (
    <SafeAreaView style={tw`bg-gray-100 h-full justify-center`}>
      <ScrollView>
        <View style={tw`w-full justify-center min-h-[85vh] px-4 my-6`}>
          <Image
            source={Logo}
            resizeMode='cover' 
            style= {tw`w-60 h-[45px]`}  
          />

          <Text style={tw`text-2xl text-black text-semibold mt-5 ml-2 font-semibold`}>
            Login to AttendanceHub
          </Text>

          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles='mt-7'
            keyBoardType='email-address'
          />
          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles='mt-7'

          />

          <CustomButton
            title='Sign In'
            handlePress={submit}
            containerStyles='mt-7'
            isLoading={isSubmitting}
          />

          <View style={tw`justify-center pt-5 flex-row gap-2`}>
            <Text style={tw`text-lg`}>
              Don't have an account ?
            </Text>
            <Link
              href="/sign-up"
              style={tw`text-yellow-500 font-semibold text-lg`}
            >
              Sign Up
            </Link>
          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn