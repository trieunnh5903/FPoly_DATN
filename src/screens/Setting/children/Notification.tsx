import { StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Popins } from '../../../components/popins';
import { SwitchNotification } from '../components/SwitchNotification';
import { AppThemeColors, useAppTheme } from '@themes/theme.config';
import { useTranslation } from 'react-i18next';
import { AccountScreenTranslationKey, OtherTranslationKey, RoutesTranslationKey } from '@translations/constants';
import HeaderComponents from '../components/HeaderComponents';
import PushNotification, { Importance } from 'react-native-push-notification';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Notification: React.FC = () => {
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    const { colors } = useAppTheme();
    const styles = useStyles(colors);
    const { t: translate } = useTranslation(RoutesTranslationKey.ortherRoute);
    const { t: translate1 } = useTranslation(RoutesTranslationKey.accountRoute);
    
    const cancelCustomNotifications = () => {
        // Cancel your custom notifications here using react-native-push-notification
        PushNotification.cancelAllLocalNotifications();
    };
    useEffect(() => {
        const loadSwitchState = async () => {
          try {
            const savedState = await AsyncStorage.getItem('switchState');
            if (savedState !== null) {
              setIsEnabled(JSON.parse(savedState));
      
              // Call the function to handle enabling/disabling app system notifications
              handleEnableAppSystemNotifications(JSON.parse(savedState));
            }
          } catch (error) {
            console.error('Error loading switch state:', error);
          }
        };
      
        loadSwitchState();
      }, []);

      const handleEnableAppSystemNotifications = (value: boolean) => {
        // Your logic to handle enabling/disabling app system notifications
        if (value) {
            // Perform actions when the switch is turned on
            console.log('App system notifications enabled');
        } else {
            // Perform actions when the switch is turned off
            cancelCustomNotifications();
            console.log('App system notifications disabled');
        }
    
        // Persist the state in AsyncStorage
        AsyncStorage.setItem('switchState', JSON.stringify(value)).catch((error) => {
            console.error('Error saving switch state:', error);
        });
    };
    
    return (
        <View style={[styles.container]}>
            <HeaderComponents title={translate1(AccountScreenTranslationKey.Notification)} />
            <View style={{ paddingHorizontal: 16 }}>
                <Text style={styles.txtContent}>{translate(OtherTranslationKey.Notifymewhen)}</Text>
              
                <SwitchNotification
                    title={translate(OtherTranslationKey.EnableAppSystemNotifications)}
                    isEnabled={isEnabled}
                    onValueChange={(val) => {
                        setIsEnabled(val);
                        handleEnableAppSystemNotifications(val);
                    }}
                />
            </View>
        </View>
    );
}

export default Notification;

const useStyles = (colors: AppThemeColors) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    txtContent: {
        fontFamily: Popins[600],
        color: colors.text,
        fontSize: 16,
        paddingVertical: 24
    },
});
