import {Pressable, StyleSheet} from 'react-native';
import {Text, View} from '../components/Themed';
import {Agenda, AgendaEntry, AgendaSchedule, DateData} from "react-native-calendars";
import {useState} from "react";
import ScheduleCapsule from "../components/ScheduleCapsule";
import {ScheduleStackScreenProps} from "../types";
import Colors from "../constants/Colors";

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

  function rowHasChanged(r1: AgendaEntry, r2: AgendaEntry) {
    return r1.name !== r2.name;
  }

  function timeToString(time: number) {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  }
  return (
      <View style={{flex: 1}}>
        <View style={{flex: 7}}>
          <Agenda
              items={items}
              loadItemsForMonth={loadItems}
              selected={'2022-01-16'}
              renderItem={renderItem}
              renderDay={() => { return <View/>; }}
              rowHasChanged={rowHasChanged}
              showClosingKnob={true}
              theme={{
                backgroundColor: Colors.v2.background,

                agendaKnobColor: Colors.v2.primary,
                dotColor: Colors.v2.primary,
                selectedDayBackgroundColor: Colors.v2.primary,

                todayTextColor: Colors.v2.secondary,
              }}
          />
        </View>
        <View style={{flex: 1, justifyContent: 'center', padding: 20}}>
          <Pressable style={styles.button}>
            <Text style={styles.buttonText}>Add new task</Text>
          </Pressable>
        </View>
      </View>
);

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.v2.background,
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
  },

  button: {
    alignItems: 'center',
    alignSelf: 'flex-end',
    justifyContent: 'center',

    backgroundColor: Colors.v2.primary,

    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 15,
  },
  buttonText: {
    fontWeight: '900',
    fontSize: 17,
    lineHeight: 20,

    color: Colors.v2.background,
  }
});
