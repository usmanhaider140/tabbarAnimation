import * as React from 'react';
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Animated,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-dynamic-vector-icons';

const {width} = Dimensions.get('window');

export default function StaticTabbar({tabs, value}) {
  const [values, setValues] = React.useState(
    tabs.map((_, i) => new Animated.Value(i === 0 ? 1 : 0)),
  );

  React.useEffect(() => {
    const newValues = tabs.map((_, i) => new Animated.Value(i === 0 ? 1 : 0));
    setValues(newValues);
  }, [tabs]);

  const onPress = index => {
    const tabWidth = width / tabs.length;
    Animated.sequence([
      Animated.parallel(
        values.map(v =>
          Animated.timing(v, {
            toValue: 0,
            duration: 100,
            useNativeDriver: true,
          }),
        ),
      ),
      Animated.parallel([
        Animated.spring(value, {
          toValue: tabWidth * index,
          useNativeDriver: true,
        }),
        Animated.spring(values[index], {
          toValue: 1,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  };

  return (
    <View style={styles.container}>
      {tabs.map((tab, key) => {
        const tabWidth = width / tabs.length;
        const cursor = tabWidth * key;
        const opacity = value.interpolate({
          inputRange: [cursor - tabWidth, cursor, cursor + tabWidth],
          outputRange: [1, 0, 1],
          extrapolate: 'clamp',
        });
        const translateY = values[key].interpolate({
          inputRange: [0, 1],
          outputRange: [64, 0],
          extrapolate: 'clamp',
        });
        const opacity1 = values[key].interpolate({
          inputRange: [0, 1],
          outputRange: [0, 1],
          extrapolate: 'clamp',
        });
        return (
          <React.Fragment {...{key}}>
            <TouchableWithoutFeedback onPress={() => onPress(key)}>
              <Animated.View style={[styles.tab, {opacity}]}>
                <Icon name={tab.name} type="Feather" color="black" size={25} />
              </Animated.View>
            </TouchableWithoutFeedback>
            <Animated.View
              style={{
                position: 'absolute',
                top: -8,
                left: tabWidth * key,
                width: tabWidth,
                height: 64,
                justifyContent: 'center',
                alignItems: 'center',
                opacity: opacity1,
                transform: [{translateY}],
              }}>
              <View style={styles.activeIcon}>
                <Icon name={tab.name} type="Feather" color="black" size={25} />
              </View>
            </Animated.View>
          </React.Fragment>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 64,
  },
  activeIcon: {
    backgroundColor: 'white',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
