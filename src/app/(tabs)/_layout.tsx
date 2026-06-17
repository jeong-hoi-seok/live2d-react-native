import { Tabs } from "expo-router";
import HomeIcon from "../../../assets/icons/home.svg";
import PersonIcon from "../../../assets/icons/person.svg";
import SmsIcon from "../../../assets/icons/sms.svg";

const ACTIVE = "#dadada";
const INACTIVE = "#7f7f7f";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: ACTIVE,
        tabBarInactiveTintColor: INACTIVE,
        tabBarIconStyle: {
          marginBottom: 4,
        },
        tabBarStyle: {
          backgroundColor: "#1f1f1f",
          paddingTop: 8,
          borderTopWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "홈",
          tabBarIcon: ({ color, size }) => <HomeIcon width={size} height={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: "대화",
          tabBarIcon: ({ color, size }) => <SmsIcon width={size} height={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "MY",
          tabBarIcon: ({ color, size }) => <PersonIcon width={size} height={size} color={color} />,
        }}
      />
    </Tabs>
  );
}
