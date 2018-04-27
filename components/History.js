import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { receiveEntries, addEntry } from '../actions';
import { timeToString, getDailyReminderValue } from '../utils/helpers';
import { fetchCalendarResults } from '../utils/api';

class History extends Component {
  componentDidMount() {
    const { dispatch } = this.props;

    fetchCalendarResults()
      .then(entries => dispatch(receiveEntries(entries)))
      .then(({ entries }) => {
        if (!entries[timeToString()]) {
          dispatch(
            addEntry({
              [timeToString()]: getDailyReminderValue()
            })
          );
        }
      });
  }
  render() {
    return (
      <View>
        <Text>{JSON.stringify(this.props)}</Text>
        <Text>I am the egg man</Text>
      </View>
    );
  }
}

function mapsStateToProps(entries) {
  return { entries };
}

export default connect(mapsStateToProps)(History);
