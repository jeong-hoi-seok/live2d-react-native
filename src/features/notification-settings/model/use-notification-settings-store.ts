import { create } from "zustand";

type NotificationSettingsState = {
  pushEnabled: boolean;
  chatEnabled: boolean;
  marketingEnabled: boolean;
  setPushEnabled: (value: boolean) => void;
  setChatEnabled: (value: boolean) => void;
  setMarketingEnabled: (value: boolean) => void;
};

export const useNotificationSettingsStore = create<NotificationSettingsState>((set) => ({
  pushEnabled: true,
  chatEnabled: true,
  marketingEnabled: false,
  setPushEnabled: (pushEnabled) => set({ pushEnabled }),
  setChatEnabled: (chatEnabled) => set({ chatEnabled }),
  setMarketingEnabled: (marketingEnabled) => set({ marketingEnabled }),
}));
