import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { useSelector } from 'react-redux';
import { commonApi } from '../../configs/axios.config';
import CHAT_CARD from '../Chat Card/Chat_Card';

const socket = io.connect('http://localhost:8080');

function Chat() {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [message, setMessage] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [messageInput, setMessageInput] = useState('');
  const user = useSelector((state) => state.data.value);

  useEffect(() => {
    socket.emit('addUser', user._id);
  }, [user]);

  useEffect(() => {
    socket.on('allUsers', (users) => {
      console.log(users);
    });
    socket.on('getMessage', (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
      });
    });
  }, [socket]);

  useEffect(() => {
    if (arrivalMessage && currentChat.members.includes(arrivalMessage.sender)) {
      setMessage((prev) => [...prev, arrivalMessage]);
    }
  }, [arrivalMessage]);

  useEffect(() => {
    const getConversation = async () => {
      try {
        const res = await commonApi.get(`/conversation/${user?._id}`);
        setConversations(res.data.conversation);
      } catch (error) {
        console.log(error);
      }
    };
    getConversation();
  }, []);

  useEffect(() => {
    const getMessages = async () => {
      const res = await commonApi.get(`message/${currentChat?._id}`);
      setMessage(res.data.messages);
    };
    getMessages();
  }, [currentChat]);

  const handleMessageChange = (e) => {
    e.preventDefault();
    setMessageInput(e.target.value);
  };

  const handleMessageSubmit = async (e) => {
    e.preventDefault();

    const data = {
      sender: user._id,
      text: messageInput,
      conversationId: currentChat._id,
    };

    const recieverId = currentChat.members.find((member) => member !== user._id);
    socket.emit('sendMessage', {
      senderId: user._id,
      recieverId,
      text: messageInput,
    });

    if (messageInput) {
      try {
        const res = await commonApi.post('/message', data);
        setMessage([...message, res.data.messages]);
        setMessageInput('');
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div>
      <div>
        <div className="flex h-screen antialiased text-gray-800">
          <div className="flex flex-row h-full w-full overflow-x-hidden">
            <div className="flex flex-col py-8 pl-6 pr-2 w-64 bg-white flex-shrink-0">
              <div className="flex flex-row items-center justify-center h-12 w-full">
                <div className="ml-2 font-bold text-2xl">Halo-Doc</div>
              </div>
              <div className="flex flex-col items-center bg-indigo-100 border border-gray-200 mt-4 w-full py-6 px-4 rounded-lg">
                <div className="h-20 w-20 rounded-full border overflow-hidden">
                  <img src={user.photoURL} alt="Avatar" className="h-full w-full" />
                </div>
                <div className="text-sm font-semibold mt-2">{user.name}</div>
              </div>
              <div className="flex flex-col mt-8">
                <div className="flex flex-row items-center justify-between text-xs">
                  <span className="font-bold">Active Conversations</span>
                  <span className="flex items-center justify-center bg-gray-300 h-4 w-4 rounded-full">4</span>
                </div>
                <div className="flex flex-col space-y-1 mt-4 -mx-2 h-48 overflow-y-auto">
                  {conversations.map((data) => (
                    <button
                      type="button"
                      key={data.members[0]}
                      className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2"
                      onClick={() => setCurrentChat(data)}
                    >
                      <div className="flex items-center justify-center h-8 w-8 bg-indigo-200 rounded-full">H</div>
                      <div className="ml-2 text-sm font-semibold">Henry Boyd</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex flex-col flex-auto h-full p-6">
              <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4">
                <div className="flex flex-col h-full overflow-x-auto mb-4">
                  <div className="flex flex-col h-full">
                    {currentChat ? (
                      <CHAT_CARD message={message} id={user._id} />
                    ) : (
                      'Please select user to start chat '
                    )}
                  </div>
                </div>
                {currentChat ? (
                  <div className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4">
                    <div className="flex-grow ml-4">
                      <div className="relative w-full">
                        <input
                          type="text"
                          className="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
                          onChange={handleMessageChange}
                          value={messageInput}
                        />
                      </div>
                    </div>
                    <div className="ml-4">
                      <button
                        type="button"
                        className="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0"
                        onClick={handleMessageSubmit}
                      >
                        <span>Send</span>
                        <span className="ml-2">
                          <svg
                            className="w-4 h-4 transform rotate-45 -mt-px"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                            />
                          </svg>
                        </span>
                      </button>
                    </div>
                  </div>
                ) : (
                  ' '
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;
