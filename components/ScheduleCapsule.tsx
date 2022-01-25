import styled from "styled-components/native";
import {View} from "react-native";
import {Feather} from '@expo/vector-icons';
import Colors from "../constants/Colors";

interface ScheduleCapsuleProps {
    onPressAction: () => void;
}

export default function ScheduleCapsule(props: ScheduleCapsuleProps) {
    return (
        <Background>
            <Capsule style={{backgroundColor: Colors.v2.darkSurface}}
                     onPress={() => props.onPressAction()}>
                <Itemize/>
                <View style={{paddingLeft: 7}}>
                    <Title>Go to the park</Title>
                    <Content>9:30</Content>
                    <Tag text='Music'/>
                </View>
                <Smile/>
            </Capsule>
        </Background>
    );
}

const Background = styled.View`
  padding: 10px;
  margin-left: 10px;
  margin-right: 10px;
`;

const Capsule = styled.Pressable`
  flex-direction: row;
  align-items: stretch;
  
  padding: 10px;
  border-radius: 15px;
`;

const Itemize = styled.View`
  height: 10px;
  width: 10px;
  border-radius: 5px;
  
  margin-top: 3px;
  
  background: #6A6A6A;
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