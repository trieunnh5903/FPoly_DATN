import { Text } from "react-native"
import CustomBottomSheet from "../bottomsheet"
import { useAppTheme } from "@themes/theme.config";
import { useStyles } from "./styles";
import { useAppDispatch, useAppSelector } from "@redux/storeAndStorage/persist";
import { toggleBottomSheet } from "@redux/slice/track.slice";
import { View } from "react-native";
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { Track, useTrackPlayer } from "@hooks/useTrackPlayer";
import { useMemo } from "react";
import { getAudioFiles } from "@services/track.player.service";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import _ from "lodash";
import { setIsLoading } from "@redux/slice/app.slice";

export const TrackPlayerBottomSheet = () => {
    const { colors } = useAppTheme();
    const styles = useStyles(colors);
    const {
        bottomSheetVisible,
        currentEBook,
        isPlaying,
        track,
        isReady,
        isBuffering
    } = useAppSelector(state => state.root.track);
    const dispatch = useAppDispatch();
    const {
        addTrack,
        play,
        onClear,
    } = useTrackPlayer();

    const { isLoading } = useAppSelector(state => state.root.app);

    const data: AudioFile[] = useMemo(() => {
        if (currentEBook) {
            return getAudioFiles(currentEBook._id, "Phần", true);
        } else {
            return [];
        }
    }, [currentEBook])

    const onItemPress = _.once((item: AudioFile, index: number) => {
        dispatch(setIsLoading(true));
        dispatch(toggleBottomSheet(false));
        if (track) {
            onClear();
        }
        const newTrack: Track = {
            id: item.id,
            url: item.url,
            title: item.title,
            artist: currentEBook?.author?.name ?? "Unknown",
            duration: 100,
        }
        setTimeout(() => {
            console.log("play");
            addTrack(newTrack);
            play();
            dispatch(setIsLoading(false));
        }, 2000);
    })

    const _renderItem = (item: AudioFile, index: number) => {
        return (
            <TouchableOpacity
                onPress={() => onItemPress(item, index)}
                style={styles.item}
                key={index}>
                <Text style={styles.text}>{item.title}</Text>
                <Text style={styles.text}>{currentEBook?.title}</Text>
            </TouchableOpacity>
        )
    }


    return (
        <CustomBottomSheet
            visible={bottomSheetVisible}
            enablePanDownToClose={true}
            onClose={() => {
                dispatch(toggleBottomSheet(false));
            }}
        >
            <View style={styles.container}>
                <Text style={styles.title}>Audio list</Text>
                <ScrollView
                    contentContainerStyle={{
                        paddingBottom: 46,
                    }}
                >
                    {
                        data.map((item, index) => {
                            return _renderItem(item, index);
                        })
                    }
                </ScrollView>
            </View>
        </CustomBottomSheet>
    )
}