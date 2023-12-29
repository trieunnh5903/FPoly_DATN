import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { AppThemeColors, useAppTheme } from '@themes/theme.config';
import ItemContactus, { IContactus } from '../components/ItemContactus';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';

const Contactus:React.FC = () => {
  const { colors } = useAppTheme();
    const styles = useStyles(colors);
    const DataContactus: IContactus[] = [
      {
        icon : <MaterialCommunityIcons name='headset' size={24} color={colors.primary}/>,
        title : 'Customer Service'
      },
      {
        icon : <FontAwesome name='whatsapp' size={24} color={colors.primary}/>,
        title : 'WhatsApp'
      },
      {
        icon : <MaterialCommunityIcons name='web' size={24} color={colors.primary}/>,
        title : 'Website'
      },
      {
        icon : <MaterialCommunityIcons name='facebook' size={24} color={colors.primary}/>,
        title : 'Facebook'
      },
      {
        icon : <FontAwesome name='twitter' size={24} color={colors.primary}/>,
        title : 'Twitter'
      },
      {
        icon : <Entypo name='instagram-with-circle' size={24} color={colors.primary}/>,
        title : 'Instagram'
      },
    ]
  return (
    <View>
      {
        DataContactus.map((item, index) => (
          <ItemContactus icon={item.icon} title={item.title} key={index}/>
        ))
      }
    </View>
  )
}

export default Contactus

const useStyles = (colors: AppThemeColors) => StyleSheet.create({

})
