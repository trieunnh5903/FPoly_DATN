import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import { AccountScreenTranslationKey, OtherTranslationKey, RoutesTranslationKey } from '@translations/constants';
import { AppThemeColors, useAppTheme } from '@themes/theme.config';
import HeaderComponents from '../components/HeaderComponents';
import { ScrollView, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { Popins } from '@components/popins';
import FAQ from './FAQ';
import Contactus from './Contactus';


interface Tab {
  titleTab: OtherTranslationKey
}

const listTab:Tab[] = [
  {
    titleTab: OtherTranslationKey.FAQ
  },
  {
    titleTab: OtherTranslationKey.Contactus
  }
]

const HelpCenter:React.FC = () => {
    const { t: translate1 } = useTranslation(RoutesTranslationKey.accountRoute);
    const {t} = useTranslation(RoutesTranslationKey.ortherRoute);
    const { colors } = useAppTheme();
    const styles = useStyles(colors);
    const [titleTab, setTitleTab] = useState('FAQ');
    const setTitleTabFilter = (titleTab: string) => {
      setTitleTab(titleTab)
    }
  return (
    <View style={styles.container}>
      <HeaderComponents title={translate1(AccountScreenTranslationKey.HelpCenter)} />
      <View style={styles.listTab}>
        {
          listTab.map((item, index)=> (
            <TouchableOpacity style={[styles.btnTab, titleTab === item.titleTab && styles.btnTabActive]} key={index}
            onPress={() => setTitleTabFilter(item.titleTab)}
            >
              <Text style={[styles.textTab, titleTab === item.titleTab && styles.textTabActive]}>{t(item.titleTab)}</Text>
            </TouchableOpacity>
          ))
        }
      </View>
      {titleTab === 'FAQ' ? (
        <ScrollView>
          <FAQ/>
        </ScrollView>
      ) : (
        <View style={{paddingHorizontal: 16}}>
          <Contactus/>
        </View>
      )}
    </View>
  )
}

export default HelpCenter

const useStyles = (colors: AppThemeColors) => StyleSheet.create({
    container: {
        backgroundColor: colors.background,
        flex: 1,
    },
    listTab: {
      backgroundColor: colors.background,
      padding: 15,
      flexDirection: 'row',
      justifyContent: 'center',
    },
    btnTab: {
      width: Dimensions.get('screen').width / 2.2,
      borderBottomWidth: 2,
      borderBottomColor: colors.backgroundCategory,
      padding: 10,
      justifyContent: 'center',
      alignItems: 'center'
    },
    btnTabActive: {
      borderBottomColor: colors.primary
    },
    textTab: {
      fontSize: 16,
      fontFamily: Popins[600],
      color: colors.textTab
    },
    textTabActive: {
      color: colors.primary
    },
})
