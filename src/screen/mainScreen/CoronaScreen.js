import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Dimensions, RefreshControl, ActivityIndicator, FlatList } from 'react-native'
import { SliderBox } from "react-native-image-slider-box";
import Icon from 'react-native-vector-icons/Fontisto';
const CoronaScreen = () => {
    const [news, setNews] = useState([]);
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(true);
    const [arrayholder, setArrayholder] = useState([]);
    const [text, setText] = useState('');
    useEffect(() => {
        getNew();
        getData();
    }, []);

    const getData = () =>{
        return fetch('https://ncovi.huynhhieu.com/api.php?code=external&fbclid=IwAR3xfBEMzEe_o1kHU5ueF6Wox_IZWrguSPr2rii07ksAt6u08HJ81tYqhlc')
        .then(response => response.json())
        .then(responseJson => {
            setData(responseJson.data),
            setIsLoading(false),
            setIsRefreshing(false)
            setArrayholder(responseJson.data);
        })
        .catch(error => {
            console.error(error);
            
        });
    }

    const getNew = () => {
        fetch('https://gist.githubusercontent.com/duclinh21122000/66e63de212ae94f65f0cb76ca134dd09/raw/b8f27eff2177c71587c4941a75f534dbe8a68f49/new.json')
            .then((response) => response.json())
            .then((json) => setNews(json.new_array))
            .catch((error) => console.error(error)) 
    }

    const SearchFilterFunction = text => {
        const newData = arrayholder.filter(function(item) {
          const itemData = item.country ? item.country.toUpperCase() : ''.toUpperCase();
          const textData = text.toUpperCase();
          return itemData.indexOf(textData) > -1;
        });
        setData(newData), setText(text);
    };

    const onRefresh = () =>{
        setData(data),
        getData()
    }

    let new_image = [];
    for (let i = 0; i < news.length - 20; i++) {
        new_image.push(news[i].image);
    }

    let corona = [];
    for(let i =1; i < data.length; i++){
        corona.push(data[i]);
    }

    return (
        <View style={[styles.container]}>
            <View style={styles.header}>
                <Image
                    source={require('../../image/cooltext355905380449505.png')}
                    style={{ width: 150, height: 50 }}
                />
            </View>
            <View style={[styles.sliderBox]}>
                <SliderBox
                    images={new_image}
                    sliderBoxHeight={180}
                    dotColor="#FFEE58"
                    inactiveDotColor="#90A4AE"
                    paginationBoxVerticalPadding={20}
                    autoplay
                    circleLoop
                    resizeMethod={'resize'}
                    resizeMode={'cover'}
                    paginationBoxStyle={{
                        position: "absolute",
                        bottom: 0,
                        padding: 0,
                        alignItems: "center",
                        alignSelf: "center",
                        justifyContent: "center",
                        paddingVertical: 10
                    }}
                    dotStyle={{
                        width: 10,
                        height: 10,
                        borderRadius: 5,
                        marginHorizontal: 0,
                        padding: 0,
                        margin: 0,
                        backgroundColor: "rgba(128, 128, 128, 0.92)"
                    }}
                    ImageComponentStyle={{ borderRadius: 15, width: '95%' }}
                    imageLoadingColor="#2196F3"
                />
            </View>
            <View style={styles.containSearch}>
                <TextInput
                    style={styles.inputSearch}
                    placeholder="Tìm kiếm..."
                    placeholderTextColor='white'
                    onChangeText={text => SearchFilterFunction(text)}
                    value={text}
                    underlineColorAndroid="transparent"
                />
                <TouchableOpacity style={styles.btnSearch}>
                    <Icon name="search" size={20} color="white" />
                </TouchableOpacity>
            </View>
            <View style={{ alignItems: 'center', marginTop: 10}}>
                <Text style={{ fontSize: 20, fontWeight: '400' }}>Cập nhật tình hình Covid19 mới nhất</Text>
            </View>
            <View style={[styles.main]}>
            {isLoading ? <ActivityIndicator size="large" color="rgb(232,133,130)"/> : (
            <FlatList
                    data={data}
                    renderItem={({item}) =>
                        <View style={styles.listItem}>
                            <Text style={styles.txtNameNation}>Quốc gia: {item.country}</Text>
                            <View style={styles.data}>
                                <View style={styles.boxCase}>
                                    <View style={styles.numCase}>
                                        <Text style={{fontSize: 20, color: '#FFD700', fontWeight: 'bold' }}>{item.cases}</Text>
                                    </View>
                                    <View style={styles.txtCase}>
                                        <Text style={{fontSize: 18, color: 'white', fontWeight: 'bold'}}>Nhiễm bệnh</Text>
                                    </View>
                                </View>
                                <View style={styles.boxDeath}>
                                    <View style={styles.numDeath}>
                                        <Text style={{fontSize: 20, color: '#F08080', fontWeight: 'bold' }}>{item.deaths}</Text>
                                    </View>
                                    <View style={styles.txtDeath}>
                                        <Text style={{fontSize: 18, color: 'white', fontWeight: 'bold'}}>Tử vong</Text>
                                    </View>
                                </View>
                                <View style={styles.boxRecovered}>
                                    <View style={styles.numRecovered}>
                                        <Text style={{fontSize: 20, color: '#2E8B57', fontWeight: 'bold' }}>{item.recovered}</Text>
                                    </View>
                                    <View style={styles.txtRecovered}>
                                        <Text style={{fontSize: 18, color: 'white', fontWeight: 'bold'}}>Bình phục</Text>
                                    </View>
                                    </View>
                            </View>
                        </View>
                    }
                    refreshControl={
                        <RefreshControl
                            refreshing = {isRefreshing}
                            onRefresh = {onRefresh.bind(this)}
                            
                        />
                    }
                    keyExtractor={(item, index) => index.toString()}
                />
            )}
            </View>
        </View>
    )
}

export default CoronaScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        height: 60,
        backgroundColor: 'rgb(232,133,130)',
        alignItems: 'center',
        elevation: 10,
        justifyContent: 'center'
    },
    sliderBox: {
        height: 180,
        marginTop: 10
    },
    containSearch: {
        alignItems: 'center',
        marginTop: 10,
    },
    inputSearch: {
        height: 50,
        width: Dimensions.get('window').width - 20,
        borderRadius: 10,
        paddingLeft: 10,
        backgroundColor: 'rgb(232,133,130)',
        color: 'white',
        fontSize: 16,
    },
    btnSearch: {
        position: 'absolute',
        top: 15,
        right: 30,
    },
    main: {
        flex: 1,
        padding: 5
    },
    istItem:{
        flex: 1,
        flexDirection: 'column',
        marginLeft: 20,
        marginRight: 20,
    },
    txtNameNation: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    data: {
        flex: 9,
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 10,
    },
    boxCase: {
        flex: 3,
        flexDirection: 'column',
        backgroundColor: '#F5F5DC',
        alignItems: 'center'
    },
    boxDeath: {
        flex: 3,
        flexDirection: 'column',
        backgroundColor: '#FFF0F5',
        marginLeft: 15,
        alignItems: 'center'
    },
    boxRecovered: {
        flex: 3,
        flexDirection: 'column',
        backgroundColor: '#F0FFF0',
        marginLeft: 15,
        alignItems: 'center',
    },
    numCase: {
        flex: 6,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center'
    },
    txtCase: {
        flex: 4,
        backgroundColor: '#FFD700',
        borderRadius: 8,
        elevation: 4,
        width: '100%',
        alignItems: 'center',
    },
    numDeath: {
        flex: 6,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center'
    },
    txtDeath: {
        flex: 4,
        backgroundColor: '#F08080',
        elevation: 4,
        borderRadius: 8,
        width: '100%',
        alignItems: 'center',
    },
    numRecovered: {
        flex: 6,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center'
    },
    txtRecovered: {
        flex: 4,
        backgroundColor: '#2E8B57',
        elevation: 4,
        borderRadius: 8,
        width: '100%',
        alignItems: 'center',
    },
})
