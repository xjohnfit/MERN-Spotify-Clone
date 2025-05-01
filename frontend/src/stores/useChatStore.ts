import { create } from 'zustand';
import { axiosInstance } from '../lib/axios';
import { Message } from '../types';
import { io } from 'socket.io-client';

interface ChatStore {
    users: any[];
    isLoading: boolean;
    error: string | null;

    //socket.io
    socket: any; // Define the type of your socket instance
    isConnected: boolean;
    onlineUsers: Set<string>;
    userActivities: Map<string, string>;
    messages: Message[];

    fetchUsers: () => Promise<void>;
    initializeSocket: (userId: string) => void;
    disconnectSocket: () => void;
    sendMessage: (
        receiverId: string,
        senderId: string,
        content: string
    ) => void;
}

const socketBaseURL = 'http://localhost:5003'; // Replace with your socket server URL

const socket = io(socketBaseURL, {
    autoConnect: false, // connect is user is authenticated
    withCredentials: true,
});

export const useChatStore = create<ChatStore>((set, get) => ({
    users: [],
    isLoading: false,
    error: null,

    socket: null,
    isConnected: false,
    onlineUsers: new Set(),
    userActivities: new Map(),
    messages: [],

    fetchUsers: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await axiosInstance.get('/users');
            set({ users: response.data });
        } catch (error: any) {
            set({ error: error.response.data.message });
        } finally {
            set({ isLoading: false });
        }
    },

    //socket.io
    initializeSocket: (userId: string) => {
        if (!get().isConnected) {
          socket.auth = { userId };
            socket.connect();
            socket.emit('userConnected', userId);

            socket.on('onlineUser', (users: string[]) => {
                set({ onlineUsers: new Set(users) });
            });

            socket.on('userActivity', (activities: [string, string][]) => {
                set({ userActivities: new Map(activities) });
            });

            socket.on('userDisconnected', (userId: string) => {
                set((state) => {
                    const updatedUsers = new Set(state.onlineUsers);
                    updatedUsers.delete(userId);
                    return { onlineUsers: updatedUsers };
                });
            });

            socket.on('receiveMessage', (message: Message) => {
                set((state) => ({
                    messages: [...state.messages, message],
                }));
            });

            socket.on('messageSent', ({ userId, activity}) => {
              set((state) => {
                const newActivities = new Map(state.userActivities);
                newActivities.set(userId, activity);
                return { userActivities: newActivities };
              });
            });

            set({ isConnected: true});
        }
    },

    disconnectSocket: () => {
      if(get().isConnected) {
        socket.disconnect();
        set({ isConnected: false });
      }
    },

    sendMessage: (receiverId: string, senderId: string, content: string) => {},
}));
