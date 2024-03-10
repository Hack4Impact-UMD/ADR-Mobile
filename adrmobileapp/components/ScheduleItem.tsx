import React from 'react';
import {View, StyleSheet, Text as RNText} from 'react-native';
import {Card, IconButton, useTheme} from 'react-native-paper';
import moment from 'moment';

interface ScheduleItemProps {
  bookTitle: string;
  task: string;
  dueDate: string;
  completed: boolean;
}

const ScheduleItem: React.FC<ScheduleItemProps> = ({
  bookTitle,
  task,
  dueDate,
  completed,
}) => {
  const theme = useTheme();
  const dueDateMoment = moment(dueDate, 'M/D');
  const isDueSoon =
    dueDateMoment.isBefore(moment().add(1, 'days')) &&
    dueDateMoment.isAfter(moment());
  const isPastDue = dueDateMoment.isBefore(moment(), 'day');

  const cardStyle = completed
    ? styles.completed
    : isPastDue
    ? styles.pastDue
    : isDueSoon
    ? styles.highlight
    : {};
  const textColor = isDueSoon || isPastDue ? '#FFFFFF' : theme.colors.text;

  return (
    <Card style={[styles.card, cardStyle]}>
      <Card.Content style={styles.cardContent}>
        <IconButton icon="book-open-page-variant" size={24} color={textColor} />
        <View style={styles.textContainer}>
          <RNText style={[styles.bookTitle, {color: textColor}]}>
            {bookTitle}
          </RNText>
          <RNText style={[styles.task, {color: textColor}]}>
            {task} - Due {dueDate}
          </RNText>
        </View>
        {isDueSoon && !completed && (
          <IconButton
            icon="clock-time-four-outline"
            size={24}
            color={textColor}
          />
        )}
        <IconButton icon="chevron-right" size={24} color={textColor} />
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 350,
    marginVertical: 4,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF', // Default background
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  textContainer: {
    justifyContent: 'center', // Ensure the text is centered vertically
    marginHorizontal: 8, // Add some horizontal space
  },
  bookTitle: {
    fontSize: 12,
  },
  task: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  completed: {
    backgroundColor: '#CCCCCC', // Grey for completed items
  },
  pastDue: {
    backgroundColor: '#FFCCCC', // Light red for past due items
  },
  highlight: {
    backgroundColor: '#333333', // Dark for items due within 24 hours
  },
});

export default ScheduleItem;
