import {Image, ScrollView} from "react-native";

export default function DashboardHelpScreen() {
    return (
        <ScrollView>
            <Image
                style={{width: '100%'}}
                source={require('lakit/assets/images/dashboard-help-mock.png')}/>
        </ScrollView>
    )
}