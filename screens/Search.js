import React, {Component} from 'react';
import {ScrollView, Image, Text, View, FlatList, Alert} from 'react-native';
import styles from '../public/styles';
import {Header, Thumbnail, Item, Input, Button} from 'native-base';
const {db} = require('../functions/util/config');

export default class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      value: '',
      users: [],
      searchResult: [],
    };
  }

  addFriendClick() {
    console.log('ADDED');
  }

  async componentDidMount() {
    const users = [];
    const userData = await db.collection('users').get();
    userData.forEach(element => {
      users.push(element.data());
    });
    this.setState({users});
  }

  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.searchBar}>
        <Header searchBar rounded>
          <Item>
            <Input
              value={this.state.value}
              placeholder="Search For Friends"
              onChangeText={value => {
                this.setState({value});
                const searchResult = this.state.users.filter(el =>
                  el.username.includes(value.toLowerCase()),
                );
                this.setState({searchResult});
              }}
            />
          </Item>
        </Header>

        <FlatList
          data={this.state.searchResult}
          renderItem={({item}) => (
            <View style={styles.resultElement}>
              <Thumbnail
                style={styles.TNDetails}
                source={{uri: item.imageUrl}}
              />
              <Text style={styles.listFriends}>{item.username}</Text>
              <Button
                style={styles.addFriendBtn}
                onPress={this.addFriendClick}
                title="Add"
              />
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />

        <View style={styles.mainContainer}>
          <View style={styles.navContainer}>
            <View style={styles.navButtonContainer}>
              <Button
                style={styles.NavButton}
                onPress={() => navigate('Dashboard')}>
                <Text style={styles.NavBtnText}> Dash</Text>
              </Button>
            </View>

            <View style={styles.navButtonContainer}>
              <Button
                style={styles.NavButton}
                onPress={() => navigate('Search')}>
                <Text style={styles.NavBtnText}> Search</Text>
              </Button>
            </View>

            <View style={styles.navButtonContainer}>
              <Button style={styles.NavButton} onPress={() => navigate('Poll')}>
                <Text style={styles.NavBtnText}> Poll</Text>
              </Button>
            </View>

            <View style={styles.navButtonContainer}>
              <Button
                style={styles.NavButton}
                onPress={() => navigate('Profile')}>
                <Text style={styles.NavBtnText}> Profile</Text>
              </Button>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
