import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { Platform, StyleProp, StyleSheet, ViewStyle } from "react-native";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetHandleProps,
  BottomSheetView
} from "@gorhom/bottom-sheet";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AppThemeColors, useAppTheme } from "../../themes/theme.config";
import { Indicator } from "../Indicator/Indicator";

export interface CustomBottomSheetProps {
  visible: boolean;
  onClose?: () => void;
  height?: number;
  children?: React.ReactNode | React.ReactNode[];
  handleComponent?: React.FC<BottomSheetHandleProps>;
  indicator?: boolean;
  style?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  backDropOpacity?: number;
  enablePanDownToClose?: boolean;
  snapPoints?: string[];
}

const CustomBottomSheet: React.FC<CustomBottomSheetProps> = (
  {
    onClose,
    handleComponent,
    visible = false,
    children,
    indicator = true,
    style,
    containerStyle,
    backDropOpacity = 0.4,
    enablePanDownToClose = false,
    snapPoints,
    ...props
  }) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const { colors } = useAppTheme();
  const { bottom: safeBottomArea } = useSafeAreaInsets();
  const styles = useStyle(colors);

  useEffect(() => {
    if (visible) {
      bottomSheetRef.current?.expand()
    }
    else {
      bottomSheetRef.current?.close();
    }
  }, [visible]);

  const contentContainerStyle = useMemo(
    () => [
      styles.contentContainerStyle,
      {
        paddingBottom: safeBottomArea || 6
      }
    ],
    [safeBottomArea, styles.contentContainerStyle]
  );

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        style={{ zIndex: 1000 }}
        {...props}
        pressBehavior="close"
        opacity={backDropOpacity}
        disappearsOnIndex={-1}
      />
    ),
    [backDropOpacity]
  );

  const renderIndicator = useMemo(() => {
    return <Indicator />;
  }, []);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={-1}
      snapPoints={snapPoints}
      enableDynamicSizing={snapPoints ? false : true}
      animateOnMount
      enableOverDrag={false}
      enablePanDownToClose={enablePanDownToClose}
      onClose={onClose}
      backdropComponent={renderBackdrop}
      style={style}
      containerStyle={containerStyle}
      handleStyle={{ display: "none" }}
      keyboardBehavior={Platform.OS === "android" ? "extend" : "interactive"}
      keyboardBlurBehavior="restore">
      <BottomSheetView style={contentContainerStyle}>
        {indicator && renderIndicator}
        {children}
      </BottomSheetView>
    </BottomSheet>
  );
};

const useStyle = (colors: AppThemeColors) =>
  StyleSheet.create({
    contentContainerStyle: {
      overflow: "hidden",
      borderTopLeftRadius: 12,
      borderTopRightRadius: 12,
      backgroundColor: colors.background
    }
  });

export default CustomBottomSheet;
