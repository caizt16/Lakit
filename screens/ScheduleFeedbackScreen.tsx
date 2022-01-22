import {Image, Pressable, StyleSheet, View} from "react-native";
import {Text} from "../components/Themed";
import Colors from "../constants/Colors";
import {Ionicons} from "@expo/vector-icons";
import {useEffect, useState} from "react";
import Keys from "../constants/Keys";
import {Audio} from 'expo-av';
import * as FileSystem from 'expo-file-system';
import {RecordingOptions} from "expo-av/build/Audio/Recording.types";
import LottieView from 'lottie-react-native';

const recordingOptions: RecordingOptions = {
    // android not currently in use. Not getting results from speech to text with .m4a
    // but parameters are required
    android: {
        extension: '.m4a',
        outputFormat: Audio.RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_MPEG_4,
        audioEncoder: Audio.RECORDING_OPTION_ANDROID_AUDIO_ENCODER_AAC,
        sampleRate: 16000,
        numberOfChannels: 1,
        bitRate: 256000,
    },
    ios: {
        extension: '.wav',
        audioQuality: Audio.RECORDING_OPTION_IOS_AUDIO_QUALITY_HIGH,
        sampleRate: 16000,
        numberOfChannels: 1,
        bitRate: 256000,
        linearPCMBitDepth: 16,
        linearPCMIsBigEndian: false,
        linearPCMIsFloat: false,
    },
    web: {}
};

export default function ScheduleFeedbackScreen() {
    const [recording, setRecording] = useState<Audio.Recording>(null as any);
    const [status, setStatus] = useState("idle");
    const [recordText, setRecordText] = useState("");
    const [sentiText, setSentiText] = useState("");

    useEffect(() => {
        Audio.requestPermissionsAsync();
    }, []);

    const deleteRecordingFile = async () => {
        try {
            const info = await FileSystem.getInfoAsync(recording.getURI() || "");
            await FileSystem.deleteAsync(info.uri)
        } catch(error) {
            console.log("There was an error deleting recording file", error);
        }
    }

    const startRecording = async () => {
        const { status } = await Audio.requestPermissionsAsync();
        if (status !== 'granted') return;

        setStatus('recording');
        await Audio.setAudioModeAsync({
            allowsRecordingIOS: true,
            interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
            playsInSilentModeIOS: true,
            shouldDuckAndroid: true,
            interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
            playThroughEarpieceAndroid: true,
        });
        const recording = new Audio.Recording();

        try {
            await recording.prepareToRecordAsync(recordingOptions);
            await recording.startAsync();
        } catch (error) {
            console.log(error);
            stopRecording();
        }

        setRecording(recording);
    }

    const stopRecording = async () => {
        setStatus('processing');
        try {
            await recording?.stopAndUnloadAsync();
        } catch (error) {
            // Do nothing -- we are already unloaded.
        }
    }

    const resetRecording = () => {
        deleteRecordingFile();
        setRecording(null as any);
    };

    const getTranscription = async () => {
        try {
            const info = await FileSystem.getInfoAsync(recording.getURI() || "");
            console.log(`FILE INFO: ${JSON.stringify(info)}`);
            const buffer = await (await fetch(info.uri)).blob();

            const headers = new Headers();
            headers.append("Ocp-Apim-Subscription-Key", Keys.speech2text);

            const requestOptions = {
                method: 'POST',
                headers: headers,
                body: buffer,
            };

            fetch("https://eastus.stt.speech.microsoft.com/speech/recognition/conversation/cognitiveservices/v1?language=en-US", requestOptions)
                .then(response => response.text())
                .then(result => {
                    console.log(result)
                    const resultText = JSON.parse(result).DisplayText;
                    setStatus('analyzed');
                    setRecordText(resultText);
                    getSentiment(resultText);
                })
                .catch(error => console.log('error', error));

        } catch(error) {
            console.log('There was an error reading file', error);
            stopRecording();
            resetRecording();
        }
    }

    const getSentiment = async (input: string) => {
        const headers = new Headers();
        headers.append("Ocp-Apim-Subscription-Key", Keys.languageServices);
        headers.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "documents": [
                {
                    "id": "1",
                    "text": input
                }
            ]
        });

        const requestOptions = {
            method: 'POST',
            headers: headers,
            body: raw,
        };

        fetch("https://lakit-language-service.cognitiveservices.azure.com/text/analytics/v3.2-preview.1/sentiment?opinionMining=true", requestOptions)
            .then(response => response.text())
            .then(result => {
                console.log(result)
                setSentiText(JSON.parse(result).documents[0].sentiment);
            })
            .catch(error => console.log('error', error));
    }

    const micOnPressed = () => {
        if (status === 'idle') {
            startRecording()
        } else {
            stopRecording();
            getTranscription();
        }
    }
    return (
        <View style={styles.container}>
            <Text style={styles.subtitle}>Congratulations! You’ve finished </Text>
            <Text style={styles.title}>Reading Books</Text>
            { status === 'idle' &&
                <Image source={require('lakit/assets/images/schedule-finished.png')}/>
            }
            { !(status === 'analyzed') &&
                <View style={styles.recordContainer}>
                    <Text style={styles.recordTitle}>How do you feel ?</Text>
                    { status === 'idle' &&
                        <View>
                            <Text style={styles.recordContent}>Press to talk about your feelings</Text>
                        </View>
                    }
                    { (status === 'recording' || status === 'processing') &&
                        <LottieView
                            autoPlay={true}
                            style={{
                                width: 260,
                                height: 260,
                            }}
                            source={require('lakit/assets/animation/sound_wave_loading.json')}
                        />
                    }
                    {!(status === 'processing') &&
                        <Ionicons.Button
                            onPress={micOnPressed}
                            iconStyle={{margin: 12}}
                            name='mic-circle'
                            size={80}
                            color={Colors.v2.secondary}
                            backgroundColor={Colors.v2.darkSurface}
                        />
                    }
                    { status === 'idle' &&
                        <View>
                            <Text style={styles.recordContent}>Not feel like talking?</Text>
                            <Pressable style={styles.skipButton} onPress={() => {}}>
                                <Text style={styles.skipText}>SKIP</Text>
                            </Pressable>
                        </View>
                    }
                    { status === 'recording' &&
                        <Text style={styles.recordContent}>Press again to finish the memo.</Text>
                    }
                    { status === 'processing' &&
                        <Text style={styles.recordContent}>Processing...</Text>
                    }
                </View>
            }
            { status === 'analyzed' &&
                <View style={{flex: 1, width: '100%'}}>
                    <View style={{...styles.recordContainer, alignItems: 'flex-start'}}>
                        <Text style={styles.recordTitle}>Your Feelings</Text>
                        <Text style={styles.recordContent}>{recordText}</Text>
                    </View>
                    <View style={{
                        alignSelf: 'stretch',
                        alignItems: 'flex-start',
                        justifyContent: 'flex-start',

                        padding: 15,
                        margin: 15,
                        flex: 3}}>
                        <Text style={styles.title}>Your Emotions</Text>
                        <Text style={styles.subtitle}>We have anaylzed your emotions through
                            your audio</Text>
                        <Text style={styles.emotionContent}>{sentiText}</Text>
                    </View>
                </View>
            }
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
    subtitle: {
        color: Colors.v2.primary,
        fontSize: 17,
        lineHeight: 20,
        padding: 5,
    },
    title: {
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

        padding: 15,
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
    emotionContent: {
        alignSelf: 'center',

        color: Colors.v2.primary,
        fontSize: 17,
        lineHeight: 20,
        fontWeight: '900',
    },
});
