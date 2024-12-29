import { Text, TouchableOpacity } from 'react-native'
import React from 'react'
import tw from 'twrnc'

const CustomButton = ({ title, handlePress, 
    containerStyles, textStyles, isLoading
}) => {
  return (
   <TouchableOpacity 
        style={tw`bg-yellow-500 rounded-xl min-h-[62px] justify-center items-center 
                ${containerStyles} ${isLoading ? tw`opacity-50`: tw``}`}
        onPress={handlePress}
        activeOpacity={0.7}
        disabled={isLoading}
    >
        <Text style={tw`font-semibold text-lg ${textStyles}`}>
            {title}
        </Text>
   </TouchableOpacity>
  )
}

export default CustomButton