import React from 'react';
import {View, StyleSheet, Text as RNText} from 'react-native';
import {Card, IconButton, useTheme} from 'react-native-paper';
import moment from 'moment';
import {Octicons} from '@expo/vector-icons';
import {FontAwesome5} from '@expo/vector-icons';
import {Feather} from '@expo/vector-icons';
import {Ionicons} from '@expo/vector-icons';
import {AntDesign} from '@expo/vector-icons';
import {NavigationProp} from '@react-navigation/native';
import {RootStackParamList} from '../App';

interface ScheduleItemProps {
  navigation: NavigationProp<RootStackParamList>;
  item: any;
}

export function ScheduleItem(props: ScheduleItemProps): React.JSX.Element {
  const theme = useTheme();
  const dueDateMoment = moment(props.item.dueDate, 'M/D');
  const isDueSoon =
    dueDateMoment.isBefore(moment().add(1, 'days')) &&
    dueDateMoment.isAfter(moment());

  const cardStyle = isDueSoon ? styles.dueSoon : {};

  const textColor = isDueSoon ? '#FFFFFF' : '#757575';
  const iconSize = 40;

  const navLink =
    props.item.taskType == 'read'
      ? 'BookMain'
      : props.item.taskType == 'quiz'
      ? 'BookQuiz'
      : 'BookQuiz';

  const iconButton =
    props.item.taskType == 'read' ? (
      <Feather name="book-open" size={iconSize} color={textColor} />
    ) : props.item.taskType == 'quiz' ? (
      <Octicons name="tasklist" size={iconSize} color={textColor} />
    ) : (
      <FontAwesome5 name="list-alt" size={iconSize} color={textColor} />
    );

  return (
    <Card
      style={[styles.card, cardStyle]}
      onPress={() => {
        props.navigation.navigate(navLink, {
          book: props.item,
        });
      }}>
      <Card.Content style={styles.cardContent}>
        <View style={[styles.textContainer, {width: '16%'}]}>{iconButton}</View>
        <View style={[styles.textContainer, {width: '55%'}]}>
          <RNText style={[styles.bookTitle, {color: textColor}]}>
            {props.item.bookTitle}
          </RNText>
          <RNText style={[styles.task, {color: textColor}]}>
            {props.item.task}
          </RNText>
        </View>
        <View style={[styles.textContainer, {width: '15%'}]}>
          <RNText style={[styles.dueDate, {color: textColor}]}>{'Due'}</RNText>
          <RNText style={[styles.dueDate, {color: textColor}]}>
            {props.item.dueDate}
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
  );
}

const styles = StyleSheet.create({
  card: {
    width: 350,
    marginVertical: 4,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#d9d9d9', // Default background
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
    fontSize: 16,
    fontWeight: 'bold',
  },
  task: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  dueSoon: {
    backgroundColor: '#757575', // Dark for items due within 24 hours
  },
});

export default ScheduleItem;
