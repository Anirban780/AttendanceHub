import { View, Text, TouchableOpacity, TextInput, Button } from 'react-native'
import React, { useState } from 'react'
import tw from 'twrnc'
import FontAwesome from 'react-native-vector-icons/FontAwesome'



const FormField = ({ title, value, placeholder, handleChangeText, otherStyles, ...props }) => {
    const [showPassword, setShowPassword] = useState(false);
    
    return (
        <View style={tw`space-y-2 ${otherStyles}`}>
            <Text style={tw`text-base left-2 bottom-1`}>
                {title}
            </Text>

            <View style={tw`w-full border-2 h-14 px-4 rounded-2xl`}>
                <TextInput
                    style={tw`flex-1 text-black text-[16px] text-base pr-10`} // Add pr-10 to make room for the eye icon
                    value={value}
                    placeholder={placeholder}
                    placeholderTextColor="#7b7b8b"
                    onChangeText={handleChangeText}
                    secureTextEntry={title === 'Password' && !showPassword}
                />

                {title === 'Password' && (
                    <TouchableOpacity
                        onPress={() => setShowPassword(!showPassword)}
                        style={tw`absolute right-4 top-4 transform -translate-y-1/2`}
                    >
                        <FontAwesome
                            name={showPassword ? 'eye-slash' : 'eye'}
                            size={20}
                            style={[
                                showPassword ? tw`ml-2` : tw``, // Conditional style for eye-slash
                            ]}
                        />
                    </TouchableOpacity>
                )}

            </View>
        </View>
    );
};

export default FormField;
