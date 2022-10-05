import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableHighlight, View } from 'react-native';

const Main = ({handleAddItem, handleUpdateText, updateItem = null}) => {
  const [item, setItem] = useState("");

  const changeText = () => {
    console.log('====================================');
    console.log(updateItem);
    console.log('====================================');
    if(item) {
      if(updateItem) {
        handleUpdateText(item)
      } else {
        handleAddItem(item)
      }
      setItem("")
    } else {
      alert('Not empty')
    }
  }

  useEffect(() => {
    setItem(updateItem)
  }, [updateItem]);

   return <View  style={{height: '30%', justifyContent: 'center'}}>
        <Text style={{textAlign:'center', fontSize: 25}}>To Do List</Text>
        <TextInput value={item} style={{borderWidth: 2, height: 40, marginTop: 30, width: 300, borderRadius: 10, paddingLeft: 10}} onChangeText={(text) => setItem(text)}/>
        <TouchableHighlight onPress={changeText} style={{backgroundColor: '#429', height: 40,  marginTop: 10, borderRadius: 10  }}><Text style={{textAlign: 'center', color: 'white', lineHeight: 40}}>Thêm</Text></TouchableHighlight>
    </View>
}

const Item = ({item, id, handleDeleteTodo, handleUpdateTodo}) => {
  
  const handleDelete = () => {
    handleDeleteTodo(id)
  }

  const handleUpdate = () => {
    handleUpdateTodo(id)
  }

  return <View style={{height: 70, backgroundColor: '#e9e9e6', justifyContent: 'center', paddingLeft: 20, paddingRight: 20, borderBottomColor: 'black', borderBottomWidth: 1}}>
   <View style={{justifyContent:'space-between', width: '100%', flexDirection: 'row'}}>
   <Text>{id + 1} {" "}{item}</Text>
    <View>
      <TouchableHighlight onPress={handleUpdate}><Text style={{color:'#8d8c05', fontSize: 20}}>Update</Text></TouchableHighlight>
      <TouchableHighlight onPress={handleDelete}><Text style={{color:'red', fontSize: 20}}>Xoa</Text></TouchableHighlight>
    </View>
   </View>
  </View>
}

export default function App() {
  const [list, setList] = useState([])
  const [updateItem, setUpdateItem] = useState()

  const handleAddItem = (item) => {
    setList([...list, item])
  }

  const handleDeleteTodo = (index) => {
    setList(list.filter((x, idex) => idex != index))
  }

  const handleUpdateTodo = (index) => {
    setUpdateItem({
      name: list[index],
      index
    })
  }
  
  const handleUpdateText = item => {
    setList([].concat(list.map((x, index) => {
      return index == updateItem.index ? item : x;
     })))
    setUpdateItem(null)
  }
  return (
    <View style={styles.container}>
      <Main handleAddItem={handleAddItem} handleUpdateText={handleUpdateText} updateItem={updateItem?.name}/>
      <Text style={{fontSize: 20, marginTop: 20}}>Danh sách</Text>
      <ScrollView style={{marginTop: 30, borderTopWidth: 2, borderTopColor: 'black', width: '100%', height: '60%', overflow: 'scroll'}}>
          {
          list.map((item, index) => <Item item={item} id={index} handleDeleteTodo={handleDeleteTodo} handleUpdateTodo={handleUpdateTodo}/>)
          }
        </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
