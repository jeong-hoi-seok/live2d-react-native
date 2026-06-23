import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { ThemeProvider } from "@react-navigation/native";
import { Icon, Label, NativeTabs, VectorIcon } from "expo-router/unstable-native-tabs";

import { DESIGN_COLORS } from "@/shared/lib/design-system";
import { APP_DARK_THEME, APP_SURFACE } from "@/shared/lib/navigation-theme";

const TAB_ICON_ACTIVE = DESIGN_COLORS.primary;
const TAB_ICON_INACTIVE = DESIGN_COLORS.secondary;

export default function TabsLayout() {
  return (
    <ThemeProvider value={APP_DARK_THEME}>
      <NativeTabs
        minimizeBehavior="onScrollDown"
        labelVisibilityMode="unlabeled"
        tintColor={TAB_ICON_ACTIVE}
        iconColor={{
          default: TAB_ICON_INACTIVE,
          selected: TAB_ICON_ACTIVE,
        }}
        labelStyle={{ color: TAB_ICON_INACTIVE, fontFamily: "Pretendard-Regular" }}
        blurEffect="systemChromeMaterialDark"
        backgroundColor={APP_SURFACE}
      >
        <NativeTabs.Trigger name="index">
          <Label hidden>홈</Label>
          <Icon
            sf={{ default: "house", selected: "house.fill" }}
            androidSrc={<VectorIcon family={MaterialCommunityIcons} name="home-outline" />}
          />
        </NativeTabs.Trigger>
        <NativeTabs.Trigger name="chat">
          <Label hidden>대화</Label>
          <Icon
            sf={{ default: "message", selected: "message.fill" }}
            androidSrc={<VectorIcon family={MaterialCommunityIcons} name="message-outline" />}
          />
        </NativeTabs.Trigger>
        <NativeTabs.Trigger name="profile">
          <Label hidden>MY</Label>
          <Icon
            sf={{ default: "person", selected: "person.fill" }}
            androidSrc={<VectorIcon family={MaterialCommunityIcons} name="account-outline" />}
          />
        </NativeTabs.Trigger>
      </NativeTabs>
    </ThemeProvider>
  );
}
