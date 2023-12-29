import {Text, TouchableOpacity, View} from 'react-native';
import {
  OtherTranslationKey,
  RoutesTranslationKey,
} from '@translations/constants';
import React from 'react';
import {useAppTheme} from '@themes/theme.config';
import {useStyles} from '@screens/Detail/DetailScreen';
import {useNavigation} from '@react-navigation/native';
import {RootStackName, RootStackProps} from '@navigator/types';
import {useTranslation} from 'react-i18next';
import {OcticonsIcons} from '@utils/utils';

interface ReviewBoxProps {
  defaultRating: number;
  setDefaultRating: React.Dispatch<React.SetStateAction<number>>;
}
export const ReviewBox: React.FC<ReviewBoxProps> = ({
  defaultRating,
  setDefaultRating,
}) => {
  const {colors} = useAppTheme();
  const styles = useStyles(colors);
  const navigation = useNavigation<RootStackProps>();
  const {t: translate} = useTranslation(RoutesTranslationKey.ortherRoute);
  const onWriteReviewPress = () => {
    navigation.navigate(RootStackName.WriteAReview);
  };
  return (
    <View style={{}}>
      <Text style={styles.txtRate}>
        {translate(OtherTranslationKey.RatethisEbook)}
      </Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 20,
          paddingTop: 15,
        }}>
        {Array.from({length: 5}).map((item, index) => {
          return (
            <TouchableOpacity
              onPress={() => setDefaultRating(index)}
              activeOpacity={0.5}
              key={'star' + index}>
              {defaultRating !== 0 && index <= defaultRating ? (
                <OcticonsIcons name="star-fill" color={'#F89300'} size={35} />
              ) : (
                <OcticonsIcons name="star" color={colors.text} size={35} />
              )}
            </TouchableOpacity>
          );
        })}
      </View>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          paddingTop: 20,
        }}>
        <TouchableOpacity onPress={onWriteReviewPress} style={styles.btnReview}>
          <Text style={styles.txtReview}>
            {translate(OtherTranslationKey.WriteaReview)}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
