import {Image, ScrollView} from "react-native";

export default function DashboardHelpScreen() {
    return (
        <ScrollView>
            <Image source={require('lakit/assets/images/dashboard-help-mock.png')}/>
        </ScrollView>
    )
}