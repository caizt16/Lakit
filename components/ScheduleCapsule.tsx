import styled from "styled-components/native";
import {View} from "react-native";
import {Feather} from '@expo/vector-icons';
import Colors from "../constants/Colors";
import {AgendaEntry} from "react-native-calendars";

interface ScheduleCapsuleProps {
    onPressAction: () => void;
    entry: AgendaEntry;
}

export default function ScheduleCapsule(props: ScheduleCapsuleProps) {
    const realEntry = JSON.parse(props.entry.name)
    return (
        <Background>
            <Capsule style={{backgroundColor: Colors.v2.darkSurface}}
                     onPress={() => props.onPressAction()}>
                <View style={{paddingLeft: 7}}>
                    <Title>{realEntry.title}</Title>
                    <Content>{realEntry.time}</Content>
                    <View style={{flexDirection: 'row'}}>
                        {
                            realEntry.tags.map((tag) => {
                                return (<Tag key={tag} text={tag}/>)
                            })
                        }
                    </View>
                </View>
                <Smile/>
            </Capsule>
        </Background>
    );
}

const Background = styled.View`
  padding: 10px 15px;
  margin-left: 10px;
  margin-right: 10px;
`;

const Capsule = styled.Pressable`
  flex-direction: row;
  align-items: stretch;

  padding: 10px 30px;
  border-radius: 15px;
`;

const Title = styled.Text`
  font-size: 18px;
  line-height: 20px;
  
  color: #6A6A6A;
`;

const Content = styled.Text`
  color: #6A6A6A;
`;

// @ts-ignore
const Tag = ({text}) => {
    return (
        <TagStyle>
            <Content>{text}</Content>
        </TagStyle>
    );
}

const TagStyle = styled.View`
  align-self: baseline;
  margin-top: 5px;
  margin-right: 10px;
  padding-left: 10px;
  padding-right: 10px;
  
  border-radius: 15px;
  background-color: #FFFFFF;
  align-items: baseline;
`;

const Smile = () => {
    return(
        <SmileStyle>
            <Feather name="smile" size={30} color="#6A6A6A" />
        </SmileStyle>
    );
}

const SmileStyle = styled.View`
  position: absolute;
  right: 0;
  margin: 10px;
`;