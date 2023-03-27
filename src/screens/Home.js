import { SafeAreaView, StyleSheet, Text, View, StatusBar, Button, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import TxtContainer from '../components/TxtContainer';
import TxtInput from '../components/TxtInput';
import * as ImagePicker from 'expo-image-picker';

//firebase
import { db,storage } from '../../firebaseConfig';
import { doc, setDoc, collection, addDoc,getDownloadURL,ref,getStorage,getDoc} from "firebase/firestore"; 
import {  uploadBytesResumable } from "firebase/storage";




export default function Home() {
    const [image, setImage] = useState(null);
    const[date,setdate]=useState("");
    const[text1,settext1]=useState("");
    const[text2,settext2]=useState("");

    const [imgUrl, setImgUrl] = useState(null);
  const [progresspercent, setProgresspercent] = useState(0);
  const [uploading, setUploading] = useState(false)

  



    



    const btn=async()=>{
        const docRef = await addDoc(collection(db, "data"), {
            date,
            text1,
            text2
          });
          alert("data submited successfully");
          setdate();
          settext1();
          settext2();
    }

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        const source = {uri: result.assets[0].uri}
         console.log(source)
        // setImage(source)

        console.log(result);

        if (!result.canceled) {
            setImage(result.assets[0].uri);
            uploadImageTops(result.assets[0].uri);
        }
    };

    //uploading image

    const uploadImageTops = async (imglink) => {
        
        try {
          const item = imglink;
          const blob = await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = function () {
              resolve(xhr.response);
            };
            xhr.onerror = function () {
              reject(new TypeError("Network request failed"));
            };
            xhr.responseType = "blob";
            xhr.open("GET", item, true);
            xhr.send(null);
          });
          const imageRef = ref(storage, `images/${Date()}`);
          const metadata = {
            contentType: "image/jpeg",
          };
    
          await uploadBytes(imageRef, blob, metadata)
            .then(async (snapshot) => {
              const washingtonRef = doc(db, "data");
              const downloadURL = await getDownloadURL(imageRef);
    
              // Set the "capital" field of the city 'DC'
              await updateDoc(washingtonRef, {
                image: downloadURL,
              });
    
              const abc = await getDoc(doc(db, "data"));
              console.warn(abc.data());
             
    
              // await updateDoc(doc(db, "tops", docRef.id), {
              //   imageUrl: downloadURL,
              // });
    
              blob.close();
            })
            .then(() => {
              // alert("HELLOW G");
              console.log("hl");
            
            });
        } catch (error) {
          console.warn(error);
         
        }
      };
    


   
    
    
    


    return (
        <SafeAreaView style={styles.container}>
            <StatusBar />
            <View style={styles.TextContainer1}><Text style={styles.text1}>Dashboard</Text>

            </View>

            <TxtContainer name={"Date"} />
            <TxtInput name={"DD-MM-YYYY"} value={date} onChangeText={(text)=>{
                setdate(text)
            }} />

            <TxtContainer name={"Text Line 1"} />
            <TxtInput value={text1} onChangeText={(text)=>{
                settext1(text)
            }} name={"ENTER LINE NO 1"} />


            <TxtContainer name={"Text Line 2"} />
            <TxtInput value={text2} onChangeText={(text)=>{
                settext2(text)
            }} name={"ENTER LINE NO 2"} />


            <View style={styles.ImageContainer}>

                <View style={styles.InnerContainer}>
                    <Button title="Choose an Image" onPress={pickImage} />
                </View>

            </View>

            <View style={styles.btnContainer}>
                <TouchableOpacity onPress={()=>btn()} style={styles.btn}>
                    <Text style={styles.text2}>Submit</Text>
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white"
    },
    TextContainer1: {
        width: wp("100%"),
        height: hp("5%"),
        marginTop: hp("2%"),
        // backgroundColor: "green",
        justifyContent: "center",
        alignItems: "center"

    }, text1: {
        fontWeight: "bold",
        fontSize: hp("2.2%")
    }, ImageContainer: {
        width: wp("100%"),
        height: hp("20%"),
        marginTop: hp("3%"),
        // backgroundColor:"red",
        justifyContent: "center",
        alignItems: "center"
    }, InnerContainer: {
        width: "90%",
        height: "100%",
        borderWidth: hp("0.3%"),
        borderColor: "blue",
        borderRadius: hp("1%"),
        justifyContent: "center",
        alignItems: "center"
    },btnContainer:{
        width:wp("100%"),
        height:hp("8%"),
        // backgroundColor:"red",
        marginTop:hp("8%"),
        justifyContent:"center",
        alignItems:"center"
    },btn:{
        width:"90%",
        height:"100%",
        backgroundColor:"blue",
        borderRadius:hp("1%"),
        justifyContent:"center",
        alignItems:"center"
    },text2:{
        fontWeight:"bold",
        color:"white"
    }
})