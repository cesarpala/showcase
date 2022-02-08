import React, {PureComponent} from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';
import {GameLoop} from 'react-native-game-engine';

const RADIUS = 25;

const User = ({rank, style: _styles}) => {
  return (
    <View style={_styles}>
      <Text>{rank}</Text>
    </View>
  );
};

export default class BestGameEver extends PureComponent {
  constructor() {
    super();
    this.users = [];
    this.space_beteewn = 0;
    for (let index = 0; index < 5; index++) {
      this.users.push({rank: index + 1, x: this.space_beteewn, y: 0});
      this.space_beteewn += 75;
    }
    this.state = {
      x: 0,
      y: 0,
      users: [],
    };
    this.setState(() => ({
      ...this.state,
      users: this.users,
    }));

    setInterval(() => {
      this.users = this.users.map(element => {
        return {
          ...element,
          rank: Math.random().toFixed(1) * 10,
        };
      });
      this.setState(() => ({
        ...this.state,
        users: this.users,
      }));
    }, 1000);

    setInterval(() => {
      this.users = this.users.map(element => {
        const step =
          element.rank !== 1 && element.rank > 0
            ? 1 / element.rank + (1 / element.rank) * (1 / 2)
            : element.rank === 0
            ? 0
            : 1;
        return {
          ...element,
          y: element.y + step,
          step,
        };
      });
      this.setState(() => ({
        ...this.state,
        users: this.users,
      }));
    }, 100);
  }

  renderPlayers = () => {
    return this.state.users.map(e => {
      console.log(e.step, e.rank);
      return <User style={[styles.player, {left: e.x, top: e.y}]} />;
    });
  };
  render() {
    return (
      <GameLoop style={styles.container} onUpdate={this.updateHandler}>
        {this.renderPlayers()}
      </GameLoop>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  finger: {
    borderColor: '#CCC',
    borderWidth: 4,
    borderRadius: RADIUS * 2,
    width: RADIUS * 2,
    height: RADIUS * 2,
    backgroundColor: 'pink',
    position: 'absolute',
  },
  player: {
    position: 'absolute',
    backgroundColor: 'pink',
    width: RADIUS * 2,
    height: RADIUS * 2,
    borderRadius: RADIUS * 2,
  },
});
