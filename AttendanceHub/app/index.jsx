import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";
import { View, Text, Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import display from '../assets/images/App-front.png'
import logo from '../assets/images/App-Logo.png'
import CustomButton from '../components/CustomButton'
import Loader from '../components/Loader'
import { useGlobalContext } from "../context/GlobalProvider";
import tw from 'twrnc'
import { useEffect } from "react";

const index = () => {
    const { loading, isLogged } = useGlobalContext();
    const router = useRouter();

    useEffect(() => {
        if (!loading && isLogged) {
          router.push("/Home");
        }
      }, [loading, isLogged, router]);

    return (
        <SafeAreaView style={tw`bg-primary h-full`}>
            <Loader isLoading={loading} />

            <ScrollView
                contentContainerStyle={{
                    height: "100%",

                }}
            >
                <View style={tw`w-full bg-gray-100 flex justify-center items-center h-full px-4 bottom-4`}>
                    <Image
                        source={logo}
                        style={tw`w-75 h-[84px] bg-transparent mr-2 `}
                        resizeMode="contain"
                    />
                    <Image
                        source={display}
                        style={tw`max-w-[400px] w-full h-[330px]`}
                        resizeMode="contain"
                    />

                    <View style={tw`relative mt-2`}>
                        <Text style={tw`text-[22px] font-semibold text-center`}>
                            Track, manage, and analyze attendance like never before with
                            <Text style={tw`text-[#0E283F]`}> Attendance</Text>
                            <Text style={tw`text-[#1C95C4]`}>Hub!</Text>
                        </Text>

                    </View>

                    <Text style={tw`text-[16px] font-pregular mt-4 text-center`}>
                    Built to keep attendance hassle-free and accurate.
                    </Text>

                    <CustomButton
                        title="Continue"
                        handlePress={() => router.push("/sign-in")}
                        containerStyles='w-full mt-7'
                    />
                </View>
            </ScrollView>

            <StatusBar backgroundColor="#161622" style="light" />
        </SafeAreaView>
    )
}

export default index