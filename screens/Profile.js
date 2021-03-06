import React, {Component} from 'react';
import {
  ScrollView,
  Text,
  View,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import styles from '../public/styles';
import {Button} from 'native-base';
import ImagePicker from 'react-native-image-picker';
import {connect} from 'react-redux';
import {toggle_availability, get_polls} from '../store';

const AllFriends = require('../public/AllFriends.jpg');
const College = require('../public/College.jpg');
const Foodie = require('../public/Foodie.jpg');
const Lockers = require('../public/Lockers.jpg');
const Office = require('../public/Office.jpg');
const Parents = require('../public/Parents.jpg');
const Party = require('../public/Party.jpg');
const Single = require('../public/Single.jpg');

const catergories = [
  {name: 'AllFriends', img: AllFriends},
  {name: 'College', img: College},
  {name: 'Single', img: Single},
  {name: 'High School', img: Lockers},
  {name: 'Office', img: Office},
  {name: 'Party', img: Party},
  {name: 'Parents', img: Parents},
  {name: 'Foodie', img: Foodie},
];

const {width} = Dimensions.get('window');

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      available: this.props.currentUser.available,
      avatarSource: this.props.currentUser.imageUrl,
    };
    this.availablityChangeHandler = this.availablityChangeHandler.bind(this);
  }

  availablityChangeHandler() {
    this.props.toggleAvailability(this.props.currentUser.username);
    this.props.availability
      ? this.setState({available: false})
      : this.setState({available: true});
  }

  selectImage = async () => {
    await ImagePicker.showImagePicker(
      {noData: true, mediaType: 'photo'},
      response => {
        console.log('Response = ', response);

        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else {
          this.setState({
            avatarSource: response.uri,
          });
        }
      },
    );
  };

  render() {
    const totalFriends = this.props.currentUser.friends.length;
    const username = this.props.currentUser.username;
    let {avatarSource} = this.state;
    const allPolls = this.props.allPolls.length;
    return (
      <ImageBackground
        style={styles.title}
        source={require('../public/Background.png')}>
        <View style={styles.ProfileContainer}>
          <View>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                onPress={this.selectImage}
                style={styles.profilePicBTN}>
                <View style={{flex: 1, alignItems: 'center'}}>
                  <ImageBackground
                    source={{uri: avatarSource}}
                    style={[
                      styles.profilePic,
                      this.state.available
                        ? {borderColor: '#60F718', borderWidth: 4}
                        : null,
                    ]}
                  />
                </View>
              </TouchableOpacity>
              <View style={{flex: 3}}>
                <View style={styles.topSection}>
                  <View style={styles.alignCen}>
                    <Text style={{fontWeight: 'bold', fontSize: 22}}>
                      {username}
                    </Text>
                  </View>
                  <View style={styles.alignCen}>
                    <Text>{totalFriends}</Text>
                    <Text style={{fontSize: 10, color: 'grey'}}>Friends</Text>
                  </View>
                  <View style={styles.alignCen}>
                    <Text>{allPolls}</Text>
                    <Text style={{fontSize: 10, color: 'grey'}}>Events</Text>
                  </View>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    paddingTop: 15,
                  }}>
                  <Button
                    bordered
                    dark
                    style={styles.statBtnLRG}
                    onPress={this.availablityChangeHandler}>
                    <Text style={styles.scrollTxt}>Status</Text>
                  </Button>

                  <Button bordered dark style={styles.statBtnSML}>
                    <Text style={styles.scrollTxt}>Log Out</Text>
                  </Button>
                </View>
              </View>
            </View>
            <ScrollView>
              <View style={styles.categorySection}>
                {catergories.map((category, ind) => {
                  return (
                    <TouchableOpacity
                      onPress={() =>
                        this.props.navigation.navigate('FriendGroup')
                      }>
                      <View
                        key={ind}
                        style={[
                          {width: width / 2},
                          {height: width / 2},
                          {marginBottom: 2},
                          ind % 2 !== 0 ? {paddingLeft: 2} : {paddingLeft: 0},
                        ]}>
                        <ImageBackground
                          style={{flex: 1, width: undefined, height: undefined}}
                          source={category.img}>
                          <Text style={styles.categoryLabels}>
                            {category.name}
                          </Text>
                        </ImageBackground>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </ScrollView>
          </View>
        </View>
      </ImageBackground>
    );
  }
}
const mapStateToProps = state => {
  return {
    availability: state.user.availability,
    currentUser: state.user.currentUser,
    allPolls: state.polls.polls,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    toggleAvailability: username => {
      dispatch(toggle_availability(username));
    },
    getPolls: username => {
      dispatch(get_polls(username));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
