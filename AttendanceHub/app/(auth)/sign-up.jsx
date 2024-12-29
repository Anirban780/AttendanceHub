import { View, Text, ScrollView, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import tw from 'twrnc'
import { SafeAreaView } from 'react-native-safe-area-context'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import { Link, useRouter } from 'expo-router'
import Logo from '../../assets/images/App-Logo.png'
import { createUser } from '../../lib/appwrite'
import { useGlobalContext } from '../../context/GlobalProvider'

const SignUp = () => {
  const [form, setForm] = useState({
    name: '',
    enrollment: '',
    email: '',
    password: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const { setUser, setIsLogged } = useGlobalContext();
  const router = useRouter();
  
  const submit = async () => {
    if(!form.name || !form.email || !form.enrollment || !form.password){
      Alert.alert('Error', "Please fill in all the fields")
    }

    setIsSubmitting(true);

    
    try{
      const result = await createUser(
        form.email, form.password, form.name, form.enrollment
      );
      
      //set it to global state ...
      setUser(result);
      setIsLogged(true);
      router.replace('/home');
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
            Register to AttendanceHub
          </Text>

          <FormField
            title="Name"
            value={form.name}
            handleChangeText={(e) => setForm({ ...form, name: e })}
            otherStyles='mt-7'
            
          />
          <FormField
            title="Enrollment No."
            value={form.enrollment}
            handleChangeText={(e) => setForm({ ...form, enrollment: e })}
            otherStyles='mt-7'
            
          />
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
            title='Sign Up'
            handlePress={submit}
            containerStyles='mt-7'
            isLoading={isSubmitting}
          />

          <View style={tw`justify-center pt-5 flex-row gap-2`}>
            <Text style={tw`text-lg`}>
              Already have an account ?
            </Text>
            <Link
              href="/sign-in"
              style={tw`text-yellow-500 font-semibold text-lg`}
            >
              Sign In
            </Link>
          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignUp