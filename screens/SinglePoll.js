import React, {Component} from 'react';
import {ScrollView, Image, Text, View, ImageBackground} from 'react-native';
import styles from '../public/styles';
import {Button} from 'native-base';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {voteOptionOne, voteOptionTwo, voteOptionThree} from '../store';
import {connect} from 'react-redux';

class SinglePoll extends Component {
  constructor(props) {
    super(props);
    this.state = {
      optionOne: 'titanic',
      optionTwo: 'movie two',
      optionThree: 'toy story',
      optionOneVote: 0,
      optionTwoVote: 0,
      optionThreeVote: 0,
    };
  }

  totalVotes() {
    let totalVotes =
      this.state.optionOneVote +
      this.state.optionTwoVote +
      this.state.optionThreeVote;
    return totalVotes;
  }

  calcOfOptionOne() {
    let percentOfOptionOne = Math.ceil(
      (this.state.optionOneVote / this.totalVotes()) * 100,
    );
    return percentOfOptionOne;
  }
  calcOfOptionTwo() {
    let percentOfOptionTwo = Math.ceil(
      (this.state.optionTwoVote / this.totalVotes()) * 100,
    );
    return percentOfOptionTwo;
  }
  calcOfOptionThree() {
    let percentOfOptionThree = Math.ceil(
      (this.state.optionThreeVote / this.totalVotes()) * 100,
    );
    return percentOfOptionThree;
  }
  render() {
    console.log('STATE', this.state);
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
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 25,
              marginBottom: 30,
            }}>
            Movie Night
          </Text>
          <View>
            <Button
              full
              rounded
              style={{
                backgroundColor: '#2b81b5',
                justifyContent: 'center',
                marginBottom: 25,
              }}
              onPress={() =>
                this.setState({optionOneVote: this.state.optionOneVote + 1})
              }>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: 'bold',
                  color: 'white',
                }}>
                {this.state.optionOne}{' '}
                {this.calcOfOptionOne() ? this.calcOfOptionOne() + '%' : null}
              </Text>
            </Button>
            <Button
              full
              rounded
              style={{
                backgroundColor: '#2b81b5',
                justifyContent: 'center',
                marginBottom: 25,
                width: 220,
              }}
              onPress={() =>
                this.setState({optionTwoVote: this.state.optionTwoVote + 1})
              }>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: 'bold',
                  color: 'white',
                }}>
                {this.state.optionTwo}{' '}
                {this.calcOfOptionTwo() ? this.calcOfOptionTwo() + '%' : null}
              </Text>
            </Button>
            <Button
              full
              rounded
              style={{
                backgroundColor: '#2b81b5',
                justifyContent: 'center',
                marginBottom: 25,
              }}
              onPress={() =>
                this.setState({optionThreeVote: this.state.optionThreeVote + 1})
              }>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: 'bold',
                  color: 'white',
                }}>
                {this.state.optionThree}{' '}
                {this.calcOfOptionThree()
                  ? this.calcOfOptionThree() + '%'
                  : null}
              </Text>
            </Button>
          </View>
        </View>
      </ImageBackground>
    );
  }
}

const mapToState = state => {
  return {
    optionOne: state.optionOne,
    optionTwo: state.optionTwo,
    optionThree: state.optionThree,
  };
};

const dispatchToProps = dispatch => {
  return {
    voteOptionOne: () => dispatch(voteOptionOne()),
    voteOptionTwo: () => dispatch(voteOptionTwo()),
    voteOptionThree: () => dispatch(voteOptionThree()),
  };
};

export default connect(
  mapToState,
  dispatchToProps,
)(SinglePoll);
