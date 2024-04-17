import React, { useState } from 'react';
import { View, StyleSheet, Text as RNText, TouchableOpacity } from 'react-native';
import { Card, IconButton, useTheme } from 'react-native-paper';
import moment from 'moment';
import { Octicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

interface ScheduleItemProps {
  bookTitle: string;
  task: string;
  dueDate: string;
  completed: boolean;
  taskType: string;
}

const ScheduleItem: React.FC<ScheduleItemProps> = ({
  bookTitle,
  task,
  dueDate,
  completed,
  taskType,
}) => {
  const theme = useTheme();
  const dueDateMoment = moment(dueDate, 'M/D');
  const isDueSoon =
    dueDateMoment.isBefore(moment().add(1, 'days')) &&
    dueDateMoment.isAfter(moment());

  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  const cardStyle = isDueSoon ? { ...styles.card, backgroundColor: 'red' } : styles.card;


  const textColor = isClicked ? 'white' : 'white';

  const iconSize = 40;

  const iconButton =
    taskType == 'read' ? (
      <Feather name="book-open" size={iconSize} color={textColor} />
    ) : taskType == 'quiz' ? (
      <Octicons name="tasklist" size={iconSize} color={textColor} />
    ) : (
      <FontAwesome5 name="list-alt" size={iconSize} color={textColor} />
    );

  return (
    <TouchableOpacity
      style={[styles.card, cardStyle]}
      onPress={handleClick}
    >
      <Card.Content style={styles.cardContent}>
        <View style={[styles.textContainer, { width: '16%' }]}>{iconButton}</View>
        <View style={[styles.textContainer, { width: '55%' }]}>
          <RNText style={[styles.bookTitle, { color: 'white' }]}>{bookTitle}</RNText>
          <RNText style={[styles.task, { color: textColor }]}>{task}</RNText>
        </View>
        <View style={[styles.textContainer, { width: '15%' }]}>
          <RNText style={[styles.dueDate, { color: 'white' }]}>
            {'Due'}
          </RNText>
          <RNText style={[styles.dueDate, { color: 'white' }]}>
            {dueDate}
          </RNText>
        </View>
        <View style={[styles.cardContent, { width: '20%' }]}>
          {isDueSoon && <Ionicons name="alarm" size={24} color="white" />}
          {isDueSoon ? (
            <AntDesign name="right" size={24} color={textColor} />
          ) : (
            <View style={{ marginHorizontal: '60%', width: '100%' }}>
              <AntDesign name="right" size={24} color={textColor} />
            </View>
          )}
        </View>
      </Card.Content>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 350,
    height:60,
    marginVertical: 4,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#00BFFF', // Teal blue
    borderRadius: 10, // Rounded corners
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  textContainer: {
    justifyContent: 'center', // Ensure the text is centered vertically
    marginHorizontal: 3, // Add some horizontal space

  },
  bookTitle: {
    fontSize: 18,
  },
  dueDate: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  task: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  dueSoon: {
    backgroundColor: 'red', // Dark for items due within 24 hours
    color: 'red',
  },
  clicked: {
    
  },
});

export default ScheduleItem;
