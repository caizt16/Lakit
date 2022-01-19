import {Image, Pressable, StyleSheet, View} from "react-native";
import {Text} from "../components/Themed";
import Colors from "../constants/Colors";
import {Ionicons} from "@expo/vector-icons";
import {useState} from "react";

export default function ScheduleFeedbackScreen() {
    const [recording, setRecording] = useState(false);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Congratulations! You’ve finished </Text>
            <Text style={styles.subtitle}>Reading Books</Text>
            { !recording &&
                <Image source={require('lakit/assets/images/schedule-finished.png')}/>}
            <View style={styles.recordContainer}>
                <Text style={styles.recordTitle}>How do you feel ?</Text>
                { !recording &&
                    <View>
                        <Text style={styles.recordContent}>Press to talk about your feelings</Text>
                    </View>
                }
                <Ionicons.Button
                    onPress={() => setRecording(!recording)}
                    iconStyle={{margin: 12}}
                    name='mic-circle'
                    size={80}
                    color={Colors.v2.secondary}
                    backgroundColor={Colors.v2.darkSurface}
                />
                { !recording &&
                    <View>
                        <Text style={styles.recordContent}>Not feel like talking?</Text>
                        <Pressable style={styles.skipButton} onPress={() => {}}>
                            <Text style={styles.skipText}>SKIP</Text>
                        </Pressable>
                    </View>
                }
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: Colors.v2.background,
    },
    title: {
        color: Colors.v2.primary,
        fontSize: 17,
        lineHeight: 20,
        padding: 5,
    },
    subtitle: {
        color: Colors.v2.primary,
        fontSize: 24,
        lineHeight: 28,
        fontWeight: '900',
        paddingBottom: 10,
    },
    recordContainer: {
        flex: 1,
        alignItems: 'center',
        alignSelf: 'stretch',
        justifyContent: 'flex-start',

        padding: 5,
        margin: 15,

        backgroundColor: Colors.v2.darkSurface,
        borderRadius: 15,
    },
    recordTitle: {
        color: Colors.v2.secondary,
        fontSize: 24,
        lineHeight: 28,
        fontWeight: '900',
    },
    recordContent: {
        color: Colors.v2.secondary,
        fontSize: 13,
        lineHeight: 15,
    },
    recordButton: {
        backgroundColor: Colors.v2.secondary,
        width: 60,
        height: 60,
        borderRadius: 30,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    skipButton: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderRadius: 15,
        backgroundColor: '#E1E3D5',
        margin:2,
    },
    skipText: {
        color: Colors.v2.secondary,
        fontSize: 13,
        lineHeight: 15,
    },
});
