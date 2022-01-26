import {Image, ScrollView} from "react-native";

export default function DashboardSupportScreen() {
    return (
        <ScrollView>
            <Image
                style={{width: '100%',}}
                source={require('lakit/assets/images/dashboard-support-mock.png')}/>
        </ScrollView>
    )
}