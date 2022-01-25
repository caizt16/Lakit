import {Image, Pressable, ScrollView, StyleSheet} from 'react-native';
import {Text, View} from '../components/Themed';
import {AntDesign, Ionicons} from "@expo/vector-icons";
import {Styles} from "../constants/Styles";
import Colors from "../constants/Colors";
import {ScheduleStackScreenProps} from "../types";

export default function DashboardMainScreen({navigation}: ScheduleStackScreenProps<'Main'>) {
  return (
      <ScrollView>
        <View style={styles.container}>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%' }} >
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image source={require('lakit/assets/images/dashboard-avatar.png')} />
              <Text style={styles.userName}>Bart</Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={styles.profile}>{'My profile >'}</Text>
            </View>
          </View>
          <View style={{alignItems: 'center'}}>
            <Text style={styles.content}>Your overall stress level is</Text>
            <Image
                style={{marginVertical: 25}}
                source={require('lakit/assets/images/dashboard-stress.png')}/>
            <Text style={styles.stress}>Strain</Text>
          </View>
          <Pressable style={styles.tipBackground} onPress={() => navigation.navigate('Help')}>
            <View style={{backgroundColor: 'transparent', flexDirection: 'row'}}>
              <Ionicons name="ios-bulb-outline" size={24} color="black" />
              <Text style={styles.tipContent}>
                Feeling stressful?{'\n'}
                Click to find some help
              </Text>
            </View>
            <AntDesign name="right" size={24} color="black"/>
          </Pressable>
          <Image source={require('lakit/assets/images/dashboard-trend.png')}/>
          <View style={styles.dataBackground}>
            <View style={{backgroundColor: 'transparent', flexDirection: 'row'}}>
              <Text style={styles.hrValue}>90</Text>
              <Text style={styles.hrUnit}> bpm</Text>
            </View>
            <Text style={styles.hrContent}>Average{'\n'}Heart Rate</Text>
          </View>
          <Text style={styles.subtitle}>My Device</Text>
          <Image
              style={{marginVertical: 15}}
              source={require('lakit/assets/images/dashboard-bluetooth.png')}/>
        </View>
      </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 32,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  subtitle: {
    width: '100%',

    fontWeight: '900',
    fontSize: 24,
    lineHeight: 28,
  },
  content: {
    padding: 15,
    fontSize: 17,
    lineHeight: 20,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  userName: {
    fontWeight: '500',
    fontSize: 24,
    lineHeight: 28,
    margin: 15,
  },
  profile: {
    fontWeight: '500',
    fontSize: 17,
    lineHeight: 20,
  },
  stress: {
    fontWeight: '500',
    fontSize: 24,
    lineHeight: 28,
  },
  tipBackground: {
    ...Styles.roundedBackground,
    backgroundColor: '#FFFDE5',
  },
  tipContent: {
    marginLeft: 15,
    fontSize: 13,
    lineHeight: 15,
  },
  dataBackground: {
    ...Styles.roundedBackground,
    backgroundColor: Colors.v2.lightSurface,
  },
  hrValue: {
    fontWeight: '900',
    fontSize: 36,
    lineHeight: 42,
    color: Colors.v2.primary,
  },
  hrUnit: {
    alignSelf: 'flex-end',
    padding: 5,

    fontWeight: '900',
    fontSize: 17,
    lineHeight: 19,
    color: Colors.v2.primary,
  },
  hrContent: {
    fontSize: 17,
    lineHeight: 19,
    color: Colors.v2.secondary,
  },
});

