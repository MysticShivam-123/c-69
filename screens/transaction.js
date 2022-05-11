import React from 'react';
import {Text,View,StyleSheet,TouchableOpacity} from 'react-native';
import *as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { CAMERA } from 'expo-permissions';

export default class TransactionScreen extends React.Component{
constructor(){
super();
this.state={
domState:'normal',
hasCameraPermissions:null,
scanned:false,
scannedData:''
}
}

getCameraPermissions=async(domState)=>{
const{status}=await Permissions.askAsync(Permissions.CAMERA);
this.setState({
hasCameraPermissions:status==='granted',
domState:domState,
sacnned:false
})    
}

handleBarCodeScanner=async({type,data})=>{
this.setState({
scannedData:data,
domState:'normal',
scanned:true
})
}
render(){
const {domState,hasCameraPermissions,scanned,scannedData}=this.state;
if(domState==='scanner'){
return(
<BarCodeScanner
onBarCodeScanned={scanned?undefined:this.handleBarCodeScanner} 
style={StyleSheet.absoluteFillObject}>

</BarCodeScanner>
)
}
return(
<View style={styles.container}>
<Text style={styles.text}>
{hasCameraPermissions?scannedData:'Request For Camera Permissions'}
</Text>
<TouchableOpacity style={styles.button}
onPress={()=>this.getCameraPermissions('scanner')}>
<Text style={styles.text}>
Scan QR Code
</Text>
</TouchableOpacity>
</View>
)
}
}

const styles=StyleSheet.create({
container:{
flex:1,
justifyContent:'center',
alignItems:'center',
backgroundColor:'#5653t4'
},
text:{
color:'#000',
fontSize:30
},
button:{
width: "43%",
height: 55,
justifyContent: "center", 
alignItems: "center", 
backgroundColor: "#F48D20", 
borderRadius: 15
}
})