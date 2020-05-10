import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Alert, StatusBar, Dimensions, FlatList, TouchableOpacity, Image, ActivityIndicator, BackHandler } from 'react-native'
import BackgroundHeader from '../../components/HomeScreen/BackgroundHeader'
import EmotionIcon from '../../components/childComponents/EmotionIcon'


const HomeScreen = ({navigation}) => {
    const [tab, setTab] = useState();
    const [news, setNews] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getNew();
        BackHandler.addEventListener("hardwareBackPress", backAction);
        return () =>
        BackHandler.addEventListener("hardwareBackPress", backAction);
    }, [getNew]);

    const backAction = () => {
        Alert.alert("Hold on!", "Bạn có muốn thoát khỏi ứng dụng không?", [
          {
            text: "Không",
            onPress: () => null,
            style: "cancel"
          },
          { text: "Có", onPress: () => BackHandler.exitApp() }
        ]);
        return true;
      };

    const getNew = () => {
        return fetch(
            'https://gist.githubusercontent.com/duclinh21122000/66e63de212ae94f65f0cb76ca134dd09/raw/b8f27eff2177c71587c4941a75f534dbe8a68f49/new.json',
        )
            .then(response => response.json())
            .then(json => {
                setNews(json.new_array);
                setIsLoading(false);
            })
            .catch(error => {
                console.error(error);
            });
    };

    const _alertGreet = () => {
        alert('Xin chào! Tôi cảm thấy rất tốt 😄');
    }
    const _alertGood = () => {
        alert('Xin chào! Tôi cảm thấy tốt 😊');
    }
    const _alertNeutral = () => {
        alert('Xin chào! Tôi cảm thấy bình thường 😐');
    }
    const _alertBad = () => {
        alert('Xin chào! Tôi cảm thấy tệ 🙁');
    }
    const _alertAwful = () => {
        alert('Xin chào! Tôi cảm thấy rất tồi tệ 😞');
    }

    return (
        <>
            <StatusBar barStyle="dark-content" />
            <View style={[styles.container]}>
                <BackgroundHeader style={[styles.bg]} />
                <View style={[styles.scrollView]}>
                    <View style={[styles.containerHome]}>
                        <View style={styles.headerContainer}>
                            <Text style={styles.heading}>Xin chào!</Text>
                            <Text style={styles.desc}>Hôm nay bạn cảm thấy thế nào?</Text>
                        </View>
                        {tab == 0 && _alertGreet()}
                        {tab == 1 && _alertGood()}
                        {tab == 2 && _alertNeutral()}
                        {tab == 3 && _alertBad()}
                        {tab == 4 && _alertAwful()}
                        <EmotionIcon selected={tab} onSelected={index => setTab(index)} />
                        <View style={{ flex: 0.5, alignItems: 'center', flexDirection: 'column', marginTop: 60 }}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>TIN TỨC SỨC KHOẺ HÔM NAY</Text>
                        </View>
                        <View style={styles.flatList}>
                        {isLoading ? <ActivityIndicator size="large" color="rgb(232,133,130)"/> : (
                            <FlatList
                                data={news}
                                renderItem={({ item }) =>
                                    <TouchableOpacity  onPress={()=> {navigation.navigate('Detail', item)}}>
                                        <View
                                            style={styles.containerFlat}>
                                            <View style={styles.rightNew}>
                                                <Text style={styles.titleNew}>{item.title}</Text>
                                                <Text style={styles.pubDate}>{item.pubDate}</Text>
                                            </View>
                                            <View style={styles.leftNew}>
                                                <Image style={{ width: 100, height: 90, borderRadius: 6 }}
                                                    source={{ uri: item.image }}
                                                    resizeMode="contain" />
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                }
                                keyExtractor={(item, index) => index.toString()}
                            />
                            )}
                        </View>
                    </View>
                </View>
            </View>
        </>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    bg: {
        position: 'absolute',
        width: Dimensions.get('window').width,
        height: 220,
    },
    scrollView: {
        flex: 1,
    },
    containerHome: {
        flex: 1,
    },
    headerContainer: {
        padding: 20,
        paddingHorizontal: 30,
        marginTop: 10,
    },
    heading: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#FFF',
    },
    desc: {
        fontSize: 18,
        fontWeight: '400',
        color: '#fff',
        marginTop: 5,
    },
    flatList: {
        flex: 7,
        marginTop: 5
    },
    containerFlat: {
        flex: 1,
        flexDirection: 'row',
        borderRadius: 6,
        borderWidth: 1,
        borderColor: '#CCC',
        margin: 5
    },
    rightNew: {
        flex: 6,
        flexDirection: "column",
        paddingLeft: 5,
        justifyContent: 'center',
    },
    titleNew: {
        fontSize: 16,
        fontWeight: 'bold',
        // textAlign: 'justify',
        justifyContent: 'center',
    },
    pubDate: {
        fontSize: 11,
    },
    leftNew: {
        flex: 4,
        alignItems: 'center',
    }
})
