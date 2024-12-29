import { View, Text, TouchableOpacity, Modal, FlatList } from 'react-native'
import React, { useState } from 'react'
import tw from 'twrnc'
import Calendar from "./../../node_modules/react-native-calendars/src/calendar/index";

const HomeScreen = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [items, setItems] = useState([]);

  const dayItems = {
    Sunday: ['Relax at home', 'Read a book', 'Family time'],
    Monday: ['Team Meeting at 10 AM', 'Project Work', 'Go for a run'],
    Tuesday: ['Grocery shopping', 'Lunch with Sarah', 'Yoga class'],
    Wednesday: ['Work on the presentation', 'Weekly team sync', 'Cook dinner'],
    Thursday: ['Client calls', 'Plan weekend trip', 'Watch a movie'],
    Friday: ['Submit weekly report', 'Dinner with friends', 'Game night'],
    Saturday: ['Do laundry', 'Clean the house', 'Go for a hike'],
  };

  const handleDayPress = (day) => {
    const date = new Date(day.dateString);
    const dayName = date.toLocaleString('en-US', { weekday: 'long' });

    setSelectedDate(day.dateString);
    setItems(dayItems[dayName] || []);
  }

  return (
    <View style={tw`flex justify-center`}>
      <Calendar
        style={tw`rounded-[10px] m-[20px] shodow-lg`}
        hideExtraDays={true}
        onDayPress={handleDayPress}
        markedDates={{
          [selectedDate]: {
            selected: true,
            selectedColor: '#30ECF7',
          }
        }}
      />

      {selectedDate && (
        <View style={tw`mt-[20px] px-[20px]`}>
          <Text style={tw`text-[18px] font-medium mb-[10px]`}>
            Events on {new Date(selectedDate).toLocaleString('en-US', { weekday: 'long' })} ({selectedDate}):
          </Text>

          {items.length > 0 ? (
            <FlatList
              data={items}
              keyExtractor={(index) => index.toString()}
              renderItem={({ item }) =>
                <Text style={tw`text-[16px] py-[5px] border-b-[1px] border-b-[#ddd]`}>{item}</Text>}
            />
          ) : (
            <Text style={tw`text-[16px] text-[#888] mt-[10px]`}>No events for the day</Text>
          )}
        </View>
      )}
    </View>
  )
}

export default HomeScreen