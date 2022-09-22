/* eslint-disable prettier/prettier */
import React, {useRef, useState} from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import { FILTERS } from './Data';



const App = () => {

  const extractedUri = useRef('');

  console.log(extractedUri)

  const [selectedFilterIndex, setIndex] = useState(0);

  const onExtractImage = ({nativeEvent}) => {

    extractedUri.current = nativeEvent.uri;
  };


  const onSelectFilter = selectedIndex => {
    setIndex(selectedIndex);
  };
  const renderFilterComponent = ({item, index}) => {
    const FilterComponent = item.filterComponent;
    const image = (
      <Image
        style={styles.filterSelector}
        source={{uri:'http://aidiaasia.org/images/experts/2y7pG-dr.-kamrul-ahsan.jpg'}}
        resizeMode={'contain'}
      />
    );
    return (
      <TouchableOpacity onPress={() => onSelectFilter(index)}>
        <Text style={styles.filterTitle}>{item.title}</Text>
        <FilterComponent image={image} />
      </TouchableOpacity>
    );
  };
  const SelectedFilterComponent = FILTERS[selectedFilterIndex].filterComponent;
  return (
    <>
      <SafeAreaView />
      {selectedFilterIndex === 0 ? (
        <Image
          style={styles.image}
          source={{uri:'http://aidiaasia.org/images/experts/2y7pG-dr.-kamrul-ahsan.jpg'}}
          resizeMode={'contain'}
        />
      ) : (
        <SelectedFilterComponent
          onExtractImage={onExtractImage}
          extractImageEnabled={true}
          image={
            <Image
              style={styles.image}
              source={{uri:'http://aidiaasia.org/images/experts/2y7pG-dr.-kamrul-ahsan.jpg'}}
              resizeMode={'contain'}
            />
          }
        />
      )}
      <FlatList
        data={FILTERS}
        keyExtractor={item => item.title}
        horizontal={true}
        renderItem={renderFilterComponent}
      />
    </>
  );
};
export default App;
const styles = StyleSheet.create({
  image: {
    width: 520,
    height: 520,
    marginVertical: 10,
    alignSelf: 'center',
  },
  filterSelector: {
    width: 100,
    height: 100,
    margin: 5,
  },
  filterTitle: {
    fontSize: 12,
    textAlign: 'center',
  },
});