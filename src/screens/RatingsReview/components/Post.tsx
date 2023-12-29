import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Icon1 from 'react-native-vector-icons/FontAwesome';
// import {formatTimestamp} from './components/screenComponents/utils';
import {useTranslation} from 'react-i18next';
import {RoutesTranslationKey} from '../../../translations/constants';
import {AppThemeColors, useAppTheme} from '@themes/theme.config';
import {Comment} from '@services/types';
import moment from 'moment';
import {Divider} from 'react-native-paper';
import {Popins} from '@components/popins';

// interface PostProps {
//   postInfo: {
//     postTitle: string;
//     postPersonImage: any;
//     postText: string;
//     likes: number;
//     isLiked: boolean;
//     timestamp: string;
//     buttonText: string;
//     style?: {[key: string]: any};
//   };
// }

const Post: React.FC<Comment> = ({
  comment,
  _user: {isFavorite},
  rating,
  author: {avatarUrl, username},
  postDate,
  favorites,
}) => {
  // const [like, setLike] = useState(postInfo.isLiked);
  // const handlePressButton = () => {
  //   setIsButtonSelected(!isButtonSelected);
  // };

  // const [isButtonSelected, setIsButtonSelected] = useState(false);
  // const formattedTimestamp = formatTimestamp(postDate);
  const {colors} = useAppTheme();
  const styles = useStyle(colors);
  // const [isLiked, setIsLiked] = useState(isFavorite);
  // const {t: translate} = useTranslation(RoutesTranslationKey.splashRoute);
  // const onLikePress = () => {
  //   setIsLiked(!isLiked);
  // };
  if (!comment) {
    return;
  }
  return (
    // <ScrollView
    //   style={[styles.container]}
    //   pagingEnabled={true}
    //   decelerationRate={0.9}
    //   scrollEventThrottle={16}>
    //   <View style={styles.content}>
    //     <View style={styles.header}>
    //       <View style={styles.userInfo}>
    //         <Image source={{uri: avatarUrl}} style={styles.profileImage} />
    //         <Text style={styles.postTitle}>{comment}</Text>
    //       </View>
    //       <View
    //         style={{
    //           flexDirection: 'row',
    //           alignItems: 'center',
    //           marginLeft: 'auto',
    //         }}>
    //         <View
    //           style={[
    //             styles.button,
    //             // isButtonSelected && {
    //             //   backgroundColor: '#F89300',
    //             // },
    //           ]}>
    //           <View
    //             style={{flexDirection: 'row', alignItems: 'center', left: 4}}>
    //             <Icon1
    //               name="star"
    //               style={{
    //                 color: isButtonSelected
    //                   ? 'white'
    //                   : styles.txtReviewIcon.color,
    //               }}
    //               size={14}
    //             />
    //             <Text
    //               style={[
    //                 styles.txtReviewText,
    //                 isButtonSelected && {
    //                   color: 'white',
    //                 },
    //               ]}>
    //               {postInfo.buttonText}
    //             </Text>
    //           </View>
    //         </View>
    //         {/* <TouchableOpacity>
    //           <Icon2
    //             name="dots-horizontal-circle-outline"
    //             style={{marginLeft: 10, color: colors.text}}
    //             size={24}
    //           />
    //         </TouchableOpacity> */}
    //       </View>
    //     </View>
    //     <Text style={styles.postText}>{postInfo.postText}</Text>
    //     <View style={styles.timestampContainer}>
    //       <Text style={styles.timestampText}>
    //         {formatTimestamp(postInfo.timestamp)}
    //       </Text>
    //     </View>
    //     <View style={styles.iconBar}>
    //       <View style={[styles.iconsLeft]}>
    //         <TouchableOpacity onPress={() => setLike(!like)}>
    //           <AntDesign
    //             name={like ? 'heart' : 'hearto'}
    //             style={[
    //               styles.icon,
    //               {
    //                 color: like ? '#F89300' : colors.text,
    //               },
    //             ]}
    //             size={22}
    //           />
    //         </TouchableOpacity>

    //         <Text style={styles.likesText}>
    //           {like} {like ? postInfo.likes + 1 : postInfo.likes}
    //         </Text>
    //       </View>
    //     </View>
    //   </View>
    // </ScrollView>

    <View style={styles.content}>
      <View style={styles.header}>
        {/* info user */}
        <View style={styles.userInfo}>
          {avatarUrl ? (
            <Image source={{uri: avatarUrl}} style={styles.profileImage} />
          ) : (
            <AntDesign name="user" color={colors.text} size={30} />
          )}
          <Text style={styles.postTitle}>{username}</Text>
          <Text style={styles.timestampText}>•</Text>
          <Text style={styles.timestampText}>{moment(postDate).fromNow()}</Text>
        </View>

        {/* rating */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginLeft: 'auto',
          }}>
          <View style={[styles.button]}>
            <View style={{flexDirection: 'row', alignItems: 'center', left: 4}}>
              <Icon1
                name="star"
                style={{
                  color: colors.primary,
                }}
                size={14}
              />
              <Text style={[styles.txtReviewText]}>{rating.toString()}</Text>
            </View>
          </View>
        </View>
      </View>

      {/* comment */}
      <Text style={styles.postText}>{comment}</Text>

      <Divider style={{backgroundColor: colors.border}} />
      {/* like */}
      {/* <View style={styles.iconBar}>
        <View style={[styles.iconsLeft]}>
          <TouchableOpacity>
            <AntDesign
              onPress={onLikePress}
              name={isLiked ? 'heart' : 'hearto'}
              style={[styles.icon]}
              color={isLiked ? '#F89300' : colors.text}
              size={22}
            />
          </TouchableOpacity>

          <Text style={styles.likesText}>
            {isLiked ? favorites + 1 : favorites}
          </Text>
        </View>
      </View> */}
    </View>
  );
};

export default Post;

const useStyle = (colors: AppThemeColors) =>
  StyleSheet.create({
    container: {
      borderBottomColor: 'gray',
      borderBottomWidth: 0.1,
    },
    content: {
      width: Dimensions.get('window').width, // Đảm bảo rằng nội dung của mỗi trang sẽ có chiều rộng bằng chiều rộng của cửa sổ
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 15,
    },
    userInfo: {
      gap: 10,
      flexDirection: 'row',
      alignItems: 'center',
    },
    profileImage: {
      width: 40,
      height: 40,
      borderRadius: 100,
    },
    postTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: colors.text,
    },
    icon: {
      marginLeft: 10,
      bottom: 35,
    },
    postText: {
      fontSize: 13,
      margin: 10,
      fontFamily: Popins[400],
      left: 8,
      bottom: 8,
      color: colors.text,
    },
    iconBar: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 12,
      paddingVertical: 15,
    },
    iconsLeft: {
      flexDirection: 'row',
      alignItems: 'center',
    },

    likesText: {
      fontFamily: Popins[400],
      fontSize: 14,
      left: 10,
      paddingVertical: 2,
      bottom: 32,
      color: colors.text,
    },
    button: {
      borderWidth: 2,
      borderColor: colors.primary,
      paddingHorizontal: 10,
      borderRadius: 30,
      width: 65,
    },
    txtReviewIcon: {
      color: colors.primary,
      fontFamily: Popins[700],
      fontSize: 17,
      alignItems: 'center',
      marginRight: 5,
    },
    txtReviewText: {
      color: colors.primary,
      fontFamily: Popins[500],
      fontSize: 17,
      alignSelf: 'center',
      marginLeft: 8,
      top: 2,
    },
    timestamp: {
      color: 'gray',
      fontSize: 12,
    },
    timestampContainer: {
      backgroundColor: 'red',
      color: colors.textDescription,
    },
    timestampText: {
      color: colors.text,
      fontSize: 14,
    },
  });
