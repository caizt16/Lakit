import {StyleSheet} from 'react-native';
import {Text, View} from '../components/Themed';
import {Agenda, AgendaEntry, AgendaSchedule, DateData} from "react-native-calendars";
import {useState} from "react";
import ScheduleCapsule from "../components/ScheduleCapsule";
import {ScheduleStackScreenProps} from "../types";

export default function ScheduleMainScreen({navigation}: ScheduleStackScreenProps<'Main'>) {
  const [items, setItems] = useState<AgendaSchedule>({});

  function loadItems(day: DateData) {

    setTimeout(() => {
      for (let i = -15; i < 85; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = timeToString(time);

        if (!items[strTime]) {
          items[strTime] = [];

          const numItems = Math.floor(Math.random() * 3 + 1);
          for (let j = 0; j < numItems; j++) {
            items[strTime].push({
              name: 'Item for ' + strTime + ' #' + j,
              height: Math.max(50, Math.floor(Math.random() * 150)),
              day: strTime
            });
          }
        }
      }

      const newItems: AgendaSchedule = {};
      Object.keys(items).forEach(key => {
        newItems[key] = items[key];
      });
      setItems(newItems);
    }, 1000);
  }

  function renderItem() {
    return (
        <ScheduleCapsule onPressAction={() => navigation.navigate('Feedback')}/>
    );
  }

  function renderEmptyDate() {
    return (
        <View style={styles.emptyDate}>
          <Text>This is empty date!</Text>
        </View>
    );
  }

  function rowHasChanged(r1: AgendaEntry, r2: AgendaEntry) {
    return r1.name !== r2.name;
  }

  function timeToString(time: number) {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  }
  return (
      <Agenda
          items={items}
          loadItemsForMonth={loadItems}
          selected={'2017-05-16'}
          renderItem={renderItem}
          renderEmptyDate={renderEmptyDate}
          rowHasChanged={rowHasChanged}
          showClosingKnob={true}
          // markingType={'period'}
          // markedDates={{
          //    '2017-05-08': {textColor: '#43515c'},
          //    '2017-05-09': {textColor: '#43515c'},
          //    '2017-05-14': {startingDay: true, endingDay: true, color: 'blue'},
          //    '2017-05-21': {startingDay: true, color: 'blue'},
          //    '2017-05-22': {endingDay: true, color: 'gray'},
          //    '2017-05-24': {startingDay: true, color: 'gray'},
          //    '2017-05-25': {color: 'gray'},
          //    '2017-05-26': {endingDay: true, color: 'gray'}}}
          // monthFormat={'yyyy'}
          // theme={{calendarBackground: 'red', agendaKnobColor: 'green'}}
          theme={{backgroundColor: 'white'}}
          //renderDay={(day, item) => (<Text>{day ? day.day: 'item'}</Text>)}
          // hideExtraDays={false}
      />
  );

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },

  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30
  }
});
