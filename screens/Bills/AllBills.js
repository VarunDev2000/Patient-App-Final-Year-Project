import React, { Component } from "react";
import { SafeAreaView, Dimensions, View, LogBox,
  Text, TouchableOpacity, StyleSheet, StatusBar, FlatList,  Image, RefreshControl  } from "react-native";
import CardView from 'react-native-cardview';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon1 from 'react-native-vector-icons/MaterialIcons';
import BillTable from '../../Components/BillTable';

import Loader from "../../Components/Loader";

import colors  from "../../config/colors";


class AllBills extends Component {
    state = {
        height: Dimensions.get("screen").height,

        loadervisible : true,

        data: [],
        account: "",

        tableTitle: ['BILL ID', 'TEST NAME', 'DATE', 'HOSPITAL NAME','PRICE','BILL DOCUMENT','STATUS'],
        billData: [],
    }

    componentDidMount(){
      //console.log(this.props.route.params.data);
      this.prepareBillData(this.props.route.params.data, this.props.route.params.account)
    }

    prepareBillData = (data, account) =>{
      let billData = [];
      var data = data;

      for(var i = 0; i < data.length; i++){
        if(data[i][7] === account)
        {
            let temp = {};
            temp['id'] =  (i+1).toString();

            temp['tableData'] = [];
            temp['tableData'].push([data[i][0]])
            temp['tableData'].push([data[i][3]])
            temp['tableData'].push([data[i][4]])
            temp['tableData'].push([data[i][5]])
            temp['tableData'].push([data[i][1]])

            const hash = data[i][9];
            temp['tableData'].push([
              <TouchableOpacity activeOpacity={.8} onPress={() => this.props.navigation.navigate("BillDataFileScreen",{hash : hash})}>
                <Text numberOfLines={1} style={{width:"100%",textAlign:"left", margin:5,marginLeft:16,fontSize:15,fontFamily:"Poppins-Medium",marginTop:3,color:"#3495eb",textDecorationLine:"underline"}}>View</Text>
              </TouchableOpacity>
            ])
          

            if(data[i][8] == 0)
            {
              temp['tableData'].push([<View style={{flexDirection:"row"}}><Icon name="time" size={23} color="#c9c930" style={{marginLeft:12}}/><Text numberOfLines={1} style={{width:"80%", margin:5,fontWeight:"bold",marginTop:3,color:"#c9c930"}}>{data[i][2] >=2 ? ("APPROVED BY HOSPITAL ") : ("PENDING ")}</Text></View>])
            }
            else if(data[i][8] == 1)
            {
              temp['tableData'].push([<View style={{flexDirection:"row"}}><Icon name="checkmark-circle" size={23} color="green" style={{marginLeft:12}}/><Text style={{width:"40%", marginLeft:5,fontWeight:"bold",marginTop:2,color:"green"}}>APPROVED </Text></View>])
            }
            else if(data[i][8] == 2)
            {
              temp['tableData'].push([<View style={{flexDirection:"row"}}><Icon1 name="cancel" size={23} color="red" style={{marginLeft:12}}/><Text style={{width:"40%", marginLeft:5,fontWeight:"bold",marginTop:2,color:"red"}}>REJECTED </Text></View>])
            }

            billData.push(temp)
        }
      }

      //console.log(billData)
      this.setState({
        billData : billData,
        loadervisible : false
      })
    }

  render() {

    const allBillsItem = ({ item }) => (
      <CardView
      style={styles.billCard}
      cardElevation={3}
      cardMaxElevation={3}
      cornerRadius={2}>
          <BillTable
            tableTitle = {this.state.tableTitle}
            tableData = {item.tableData}
          />
      </CardView>
    );

    return (
        <SafeAreaView style={{ height: this.state.height,backgroundColor: colors.bgColor }}>
        <StatusBar backgroundColor={colors.primary} />
        <View style={{flex:1}}>
        <View style={styles.topLayout}>
          <TouchableOpacity activeOpacity={.6} onPress={() => this.props.navigation.goBack()}>
            <Icon name="arrow-back-sharp" size={30} color={colors.topBarIconColor} style={{marginLeft:18}}/>
          </TouchableOpacity>
          <Text style={styles.pageTitle}> ALL  BILLS </Text>
          <TouchableOpacity activeOpacity={1} onPress={null}>
            <Icon name="notifications" size={25} color={colors.primary} style={{marginRight:18}}/>
          </TouchableOpacity>
        </View>
        {this.state.loadervisible == true ? (<Loader />) : (
          <FlatList
            contentContainerStyle={styles.bottomLayout}
            data={this.state.billData}
            renderItem={allBillsItem}
            keyExtractor={item => item.id}
          />
        )
        }
        </View>

        </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
    topLayout: {
      flex:0,
      flexDirection:"row",
      height: "7%",
      width:"100%",
      backgroundColor: colors.primary,
      alignItems:"center",
      justifyContent:"space-between",
    }, 
    bottomLayout:{
      paddingBottom:50,
    },
    card: {
      width:"46%",
      margin:"2%",
      backgroundColor:colors.secondary,
      elevation:5,
      borderRadius:5,
    },
    billCard: {
      width:"96%",
      margin:"2%",
      marginTop:17,
      marginBottom:10,
      backgroundColor:colors.secondary,
      elevation:5,
      borderRadius:5,
    },
    cardHeading: {
      fontSize:13,
      padding:10,
      fontStyle:"italic",
      alignSelf:"center",
      color : colors.black,
    },
    cardHeadingSelected: {
        fontSize:14,
        padding:10,
        fontWeight:"bold",
        fontStyle:"italic",
        alignSelf:"center",
        color : colors.selectedTextColor,
    },
    cardImage: {
      width:"100%",
      height:170,
      marginBottom:2,
    },
    pageTitle: {
      fontSize:18,
      fontWeight:"bold",
      color:colors.secondary,
    },
  });
export default AllBills;
