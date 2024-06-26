import React from 'react';
import {View, StyleSheet, Text as RNText, TouchableOpacity} from 'react-native';
import {Card, IconButton, useTheme} from 'react-native-paper';
import moment from 'moment';
import {Octicons} from '@expo/vector-icons';
import {FontAwesome5} from '@expo/vector-icons';
import {Feather} from '@expo/vector-icons';
import {Ionicons} from '@expo/vector-icons';
import {AntDesign} from '@expo/vector-icons';

interface ScheduleItemProps {
  bookTitle: string;
  task: string;
  dueDate: string;
  completed: boolean;
  taskType: string;
  onPress: () => void; // navigation purposes - to do list
}

const ScheduleItem: React.FC<ScheduleItemProps> = ({
  bookTitle,
  task,
  dueDate,
  completed,
  taskType,
  onPress,
}) => {
  const theme = useTheme();
  const dueDateMoment = moment(dueDate, 'M/D');
  const isDueSoon =
    dueDateMoment.isBefore(moment().add(1, 'days')) &&
    dueDateMoment.isAfter(moment());

  const cardStyle = isDueSoon ? styles.dueSoon : {};

  const textColor = isDueSoon ? '#FFFFFF' : '#FFFFFF';
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
    <TouchableOpacity onPress={onPress}>
    <Card style={[styles.card, cardStyle]}>
      <Card.Content style={styles.cardContent}>
        <View style={[styles.textContainer, {width: '16%'}]}>{iconButton}</View>
        <View style={[styles.textContainer, {width: '55%'}]}>
          <RNText style={[styles.bookTitle, {color: textColor}]}>
            {bookTitle}
          </RNText>
          <RNText style={[styles.task, {color: textColor}]}>{task}</RNText>
        </View>
        <View style={[styles.textContainer, {width: '15%'}]}>
          <RNText style={[styles.dueDate, {color: textColor}]}>{'Due'}</RNText>
          <RNText style={[styles.dueDate, {color: textColor}]}>
            {dueDate}
          </RNText>
        </View>
        <View style={[styles.cardContent, {width: '14%'}]}>
          {isDueSoon && <Ionicons name="alarm" size={24} color="white" />}
          {isDueSoon ? (
            <AntDesign name="right" size={24} color={textColor} />
          ) : (
            <View style={{marginHorizontal: '60%', width: '100%'}}>
              <AntDesign name="right" size={24} color={textColor} />
            </View>
          )}
        </View>
      </Card.Content>
    </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 350,
    marginVertical: 6,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3297D8',
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
    fontFamily: 'KarlaBold',
    fontSize: 16,
  },
  dueDate: {
    fontSize: 18,
    fontFamily: 'KarlaBold',
  },
  task: {
    fontSize: 20,
    fontFamily: 'KarlaBold',
  },
  dueSoon: {
    backgroundColor: '#EA3F3F', // Red for items due within 24 hours
  },
});

export default ScheduleItem;
