import React, {Component} from 'react';
import {
  ScrollView,
  Text,
  View,
  ImageBackground,
  SafeAreaView,
  Alert,
} from 'react-native';
import styles from '../public/styles';
import {Button, Thumbnail, Container} from 'native-base';
import {connect} from 'react-redux';
import {
  getFriends,
  get_users,
  accept_friend,
  dismiss,
  get_notifications,
} from '../store';

const FRIENDSandFAMILY = [
  {
    title: 'Taco Tuesday',
    winningVote: 'Beef Tacos!!',
    percentage: '79%',
    date: 'Today, Dec 3 2019',
    where: 'Riviera Mayan',
  },
  {
    title: 'Movie Night',
    winningVote: 'The Notebook',
    percentage: '58%',
    date: 'Saturday, Dec 7 2019',
    where: "Kaitlyn's House",
  },
  {
    title: 'Restaurant',
    winningVote: 'Nobu',
    percentage: '84%',
    date: 'Tuesday, Dec 31, 2019',
    where: '555 Broadway',
  },
];

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeIndex: 0,
      friends: [],
    };
  }

  segmentClicked(index) {
    this.setState({
      activeIndex: index,
    });
  }
  checkActive = index => {
    if (this.state.activeIndex !== index) {
      return {color: 'grey'};
    } else {
      return {};
    }
  };

  renderCurrentSection() {
    return (
      <View>
        <Text
          style={{
            fontSize: 25,
            fontWeight: 'bold',
            textAlign: 'center',
            paddingBottom: 25,
            paddingTop: 20,
          }}>
          Upcoming Events:
        </Text>
        <View style={{alignItems: 'center'}}>
          {FRIENDSandFAMILY.map((event, indx) => {
            return (
              <View style={{margin: 10, alignItems: 'center'}}>
                <Text style={{fontSize: 22, fontWeight: 'bold'}}>
                  {event.title}
                </Text>
                <Text style={{fontWeight: 'bold'}}>
                  Winning Suggestion: {event.winningVote}
                </Text>
                <Text style={{fontWeight: 'bold'}}>When: {event.date}</Text>
                <Text style={{fontWeight: 'bold'}}>Where: {event.where}</Text>
              </View>
            );
          })}
        </View>
      </View>
    );
  }
  renderPastSection() {
    return (
      <View>
        <Text style={styles.paragraph}>Nothing in History</Text>
      </View>
    );
  }
  renderNotifications() {
    return (
      <View>
        <Text
          style={{
            fontSize: 25,
            fontWeight: 'bold',
            textAlign: 'center',
            paddingBottom: 25,
            paddingTop: 20,
          }}>
          Notifications:
        </Text>
        <ScrollView>
          {this.props.notifications.map((notif, idx) => {
            if (notif.includes('request to add you as friend')) {
              return (
                <View style={{marginTop: 5, marginLeft: 10, marginRight: 10}}>
                  <View style={{flexDirection: 'row'}}>
                    <View style={{flex: 2}}>
                      <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                        {notif}
                      </Text>
                    </View>

                    <View
                      style={{
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                      }}>
                      <View>
                        <Button
                          style={{
                            backgroundColor: '#2b81b5',
                            width: 60,
                          }}
                          onPress={() => {
                            const friend = notif.slice(0, notif.length - 29);
                            Alert.alert(
                              'You have accepted their Friend Request!', // might want to change this later to display the senders name, not the usernames name.
                            );
                            this.props.acceptFriend(
                              this.props.currentUser.username,
                              friend,
                              idx,
                            );
                          }}>
                          <Text
                            style={{
                              fontWeight: 'bold',
                              marginLeft: 4,
                              color: 'white',
                            }}>
                            Accept
                          </Text>
                        </Button>
                      </View>
                      <View>
                        <Button
                          style={{backgroundColor: '#ff4c30', width: 60}}
                          onPress={() => {
                            Alert.alert(
                              'You Have Denied Their Friend Request!', // might want to change this later to display the senders name, not the usernames name.
                            );
                            this.props.dismiss(
                              this.props.currentUser.username,
                              idx,
                            );
                          }}>
                          <Text
                            style={{
                              fontWeight: 'bold',
                              marginLeft: 12,
                              color: 'white',
                            }}>
                            Deny
                          </Text>
                        </Button>
                      </View>
                    </View>
                  </View>
                </View>
              );
            } else {
              return (
                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: 7,
                    marginLeft: 10,
                    marginRight: 10,
                  }}>
                  <View style={{flex: 2}}>
                    <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                      {notif}
                    </Text>
                  </View>

                  <View style={{flex: 1, padding: 20, marginLeft: 50}}>
                    <Button
                      style={{backgroundColor: '#b8bab5'}}
                      onPress={() => {
                        Alert.alert(
                          'You Have Dismissed This Poll Invitation!', // might want to change this later to display the senders name, not the usernames name.
                        );
                        this.props.dismiss(
                          this.props.currentUser.username,
                          idx,
                        );
                      }}>
                      <Text style={{fontWeight: 'bold', marginLeft: 22}}>
                        Dismiss
                      </Text>
                    </Button>
                  </View>
                </View>
              );
            }
          })}
        </ScrollView>
        <View>
          {this.props.numOfNotifications ? (
            <Text>{''}</Text>
          ) : (
            <Text style={styles.paragraph}>You dont have any notification</Text>
          )}
        </View>
      </View>
    );
  }

  renderSection() {
    if (this.state.activeIndex === 0) {
      return <View>{this.renderCurrentSection()}</View>;
    } else if (this.state.activeIndex === 1) {
      return <View>{this.renderPastSection()}</View>;
    } else if (this.state.activeIndex === 2) {
      return <View>{this.renderNotifications()}</View>;
    }
  }

  async componentDidMount() {
    await this.props.getFriends(this.props.currentUser.username);
    await this.props.getUsers();
    await this.props.getNotifications(this.props.currentUser.username);
  }

  render() {
    return (
      <ImageBackground
        style={styles.title}
        source={require('../public/Background.png')}>
        <View style={styles.logo}>
          {/* This is is just an empty space to allow the logo to show */}
        </View>

        <View style={styles.mainContainer}>
          <View style={styles.top}>
            <View style={styles.scrollContainer}>
              <View style={styles.scrollHeight}>
                <View style={styles.proportionsOfScroll}>
                  <Text style={styles.scrollTxt}>All Friends</Text>
                </View>
                <View style={styles.proportionsOfScrollPRT2}>
                  <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.scrollPadding}>
                    {this.props.users.map((user, indx) => {
                      if (
                        user.available &&
                        this.props.friends.includes(user.username)
                      ) {
                        return (
                          <Thumbnail
                            key={indx}
                            style={styles.TNDetails}
                            source={{uri: user.imageUrl}}
                          />
                        );
                      }
                    })}
                  </ScrollView>
                </View>
              </View>
            </View>

            <View style={styles.mainContainerCALANDAR}>
              <View style={styles.tabBackgroundColor}>
                <Button
                  onPress={() => this.segmentClicked(0)}
                  transparent
                  active={this.state.activeIndex === 0}>
                  <Text style={styles.NavBtnText}> Current Events</Text>
                </Button>

                <Button
                  onPress={() => this.segmentClicked(1)}
                  transparent
                  active={this.state.activeIndex === 1}>
                  <Text style={styles.NavBtnText}> Past Events</Text>
                </Button>

                <Button
                  onPress={() => this.segmentClicked(2)}
                  transparent
                  active={this.state.activeIndex === 2}>
                  <Text style={styles.NavBtnText}>
                    Notifications
                    {this.props.numOfNotifications
                      ? `(${this.props.numOfNotifications})`
                      : ''}
                  </Text>
                </Button>
              </View>
              <ImageBackground
                style={styles.opacityImg}
                imageStyle={{opacity: 0.3}}
                source={require('../public/Brooklyn.jpg')}>
                {this.renderSection()}
              </ImageBackground>
            </View>
          </View>
        </View>
      </ImageBackground>
    );
  }
}

const mapToState = state => {
  return {
    currentUser: state.user.currentUser,
    friends: state.user.friends,
    users: state.user.users,
    numOfFriends: state.user.numOfFriends,
    notifications: state.user.notifications,
    numOfNotifications: state.user.numOfNotifications,
  };
};

const dispatchToProps = dispatch => {
  return {
    getFriends: username => dispatch(getFriends(username)),
    getUsers: () => dispatch(get_users()),
    acceptFriend: (username, friend, idx) =>
      dispatch(accept_friend(username, friend, idx)),
    dismiss: (username, idx) => dispatch(dismiss(username, idx)),
    getNotifications: username => dispatch(get_notifications(username)),
  };
};

export default connect(mapToState, dispatchToProps)(Dashboard);
