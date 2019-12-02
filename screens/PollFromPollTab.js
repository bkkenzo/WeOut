import React, {Component} from 'react';
import {ScrollView, Image, Text, View, ImageBackground} from 'react-native';
import styles from '../public/styles';
import {Button, Item, Label, Input} from 'native-base';
import {TouchableOpacity} from 'react-native-gesture-handler';

export default class PollFromPollTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      themeTitle: '',
      suggestionTimer: '',
      voteTimer: '',
      limit: '',
    };
  }
  render() {
    return (
      <ImageBackground
        style={styles.title}
        source={require('../public/Background.png')}>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Poll')}>
          <Image
            style={{width: 50, height: 50, marginTop: 50, marginLeft: 8}}
            source={require('../public/BackArrow.png')}
          />
        </TouchableOpacity>

        <View style={styles.centerish}>
          <Item floatingLabel>
            <Label> Theme Title (ex: 'Movie Night') </Label>

            <Input
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={themeTitle =>
                this.setState({themeTitle: themeTitle})
              }
            />
          </Item>

          <Item floatingLabel>
            <Label> Set Timer for Suggestion Input </Label>

            <Input
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={suggestionTimer =>
                this.setState({suggestionTimer: suggestionTimer})
              }
            />
          </Item>

          <Item floatingLabel>
            <Label> Set Timer for Votes </Label>

            <Input
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={voteTimer => this.setState({voteTimer: voteTimer})}
            />
          </Item>

          <Item floatingLabel>
            <Label> How Many Suggestions? (Set A Limit) </Label>

            <Input
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={limit => this.setState({limit: limit})}
            />
          </Item>
        </View>
        <Button
          full
          style={{
            backgroundColor: '#2b81b5',
            justifyContent: 'center',
          }}
          onPress={() => this.props.navigation.navigate('SinglePoll')}>
          <Text
            style={{
              fontSize: 15,
              fontWeight: 'bold',
              color: 'white',
            }}>
            Submit Poll
          </Text>
        </Button>
      </ImageBackground>
    );
  }
}