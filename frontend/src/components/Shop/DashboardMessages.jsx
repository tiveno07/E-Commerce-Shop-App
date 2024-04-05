import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { backend_url, server } from "../../server";
import { useNavigate } from "react-router";
import { AiOutlineArrowRight, AiOutlineSend } from "react-icons/ai";
import { format } from "timeago.js";

import { TfiGallery } from "react-icons/tfi";
import styles from "../../styles/styles";
import socketIO from "socket.io-client";
const ENDPOINT = "http://localhost:4000/";
const socketId = socketIO(ENDPOINT, { transports: ["websocket"] });

export const DashboardMessages = () => {
  const { seller } = useSelector((state) => state.seller);
  const sellers = seller?.seller;
  const [conversation, setConversation] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState(null);
  const [userData, setUserData] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [activeStatus, setActiveStatus] = useState(false);
  const [newMessage, setNewMessage] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    socketId.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data?.sender,
        text: data?.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members?.includes(arrivalMessage?.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    if (seller) {
      const userId = sellers?._id;
      socketId.emit("addUser", userId);
      socketId.on("getUsers", (data) => {
        setOnlineUsers(data);
      });
    }
  }, [sellers._id, seller]);

  const onlineCheck = (chat) => {
    const chatMembers = chat?.members?.find(
      (member) => member !== sellers?._id
    );
    const online = onlineUsers?.find((user) => user?.userId === chatMembers);
    return online ? true : false;
  };

  useEffect(() => {
    const getMessage = async () => {
      try {
        const response = await axios.get(
          `${server}messages/get-all-messages/${currentChat?._id}`
        );
        setMessages(response.data.messages);
      } catch (error) {
        console.error(error);
      }
    };
    getMessage();
  }, [currentChat]);

  const sendMessageHandler = async (e) => {
    e.preventDefault();

    const message = {
      sender: sellers?._id,
      text: newMessage,
      conversationId: currentChat?._id,
    };
    const receiverId = currentChat?.members?.find(
      (member) => member?.id !== sellers?._id
    );

    socketId.emit("sendMessage", {
      senderId: sellers?._id,
      receiverId,
      text: newMessage,
    });

    try {
      if (newMessage !== "") {
        await axios
          .post(`${server}message/create-new-message`, message)
          .then((res) => {
            console.log(messages, "jhgfd");
            setMessages([...messages, res?.data?.message]);
            updateLastMessage();
          })
          .catch((error) => {
            console.error(error); // NOTE - use "error.response.data` (not "error")
          });
      }
    } catch (error) {
      console.error(error); // NOTE - use "error.response.data` (not "error")
    }
  };

  const updateLastMessage = async () => {
    socketId.emit("updateLastMessage", {
      lastMessage: newMessage,
      lastMessageId: sellers?._id,
    });

    await axios
      .put(`${server}conversation/update-last-message/${currentChat?._id}`, {
        lastMessage: newMessage,
        lastMessageId: sellers?._id,
      })
      .then((res) => {
        console.log(res.data.conversation);
        setNewMessage("");
      })
      .catch((error) => {
        console.error(error); // NOTE - use "error.response.data` (not "error")
      });
  };

  console.log(arrivalMessage, currentChat, "cdv");
  useEffect(() => {
    try {
      axios
        .get(
          `${server}conversation/get-all-conversation-seller/${sellers?._id}`,
          { withCredentials: true }
        )
        .then((res) => {
          setConversation(res.data.conversation);
        })
        .catch((err) => {
          console.error(err.response.data.message);
        });
    } catch (error) {
      console.error(error);
    }
  }, [sellers?._id]);

  // Get Messages
  useEffect(() => {
    const getMessage = async () => {
      try {
        const response = await axios.get(
          `${server}message/get-all-messages/${currentChat?._id}`
        );
        setMessages(response?.data?.messages);
      } catch (error) {
        console.error(error); // NOTE - use "error.response.data` (not "error")
      }
    };
    getMessage(); // always returns the function inside the useeffect so it can run
  }, [currentChat, messages]);

  return (
    <div className="w-[90%] bg-white m-5 h-[85vh] overflow-y-scroll rounded">
      {!open && (
        <>
          <h1 className="text-center text-[30px] py-3 font-Poppins">
            All Messages
          </h1>
          {conversation &&
            conversation?.map((item, index) => (
              <MessageList
                data={item}
                key={index}
                index={index}
                setCurrentChat={setCurrentChat}
                setOpen={setOpen}
                sellerId={sellers?._id}
                userData={userData}
                setActiveStatus={setActiveStatus}
                setUserData={setUserData}
                online={onlineCheck(item)}
              />
            ))}
        </>
      )}

      {open && (
        <SellerInbox
          userData={userData}
          messages={messages}
          setOpen={setOpen}
          sendMessageHandler={sendMessageHandler}
          setNewMessage={setNewMessage}
          newMessage={newMessage}
          sellerId={sellers?._id}
          activeStatus={activeStatus}
        />
      )}
    </div>
  );
};

const MessageList = ({
  data,
  userData,
  setUserData,
  sellerId,
  index,
  setOpen,
  online,
  setActiveStatus,
  setCurrentChat,
}) => {
  const [active, setActive] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    setActiveStatus(online);
    const userId = data?.members?.find((user) => user !== sellerId);

    const getUser = async () => {
      try {
        const res = await axios.get(`${server}user/user-info/${userId}`);
        setUserData(res.data.user);
      } catch (error) {
        console.error(error);
      }
    };
    getUser();
  }, [sellerId, setUserData, setActiveStatus, online, data]);

  const handleClick = (id) => {
    navigate(`?${id}`);
    setOpen(true);
  };

  console.log(online, "jhgf");
  return (
    <div
      className={`${
        active === index ? "bg-[#00000010]" : "bg-transparent"
      }cursor-pointer w-full flex p-3 px-3 `}
      onClick={(e) =>
        setActive(index) || handleClick(data?._id) || setCurrentChat(data)
      }
    >
      <div className="relative">
        <img
          src={`${backend_url}${userData?.avatar}`}
          className="w-[50px] h-[50px] rounded-full"
          alt=""
        />
        {online ? (
          <div className="w-[12px] h-[12px] bg-green-400 rounded-full absolute top-[2px] right-[2px]"></div>
        ) : (
          <div className="w-[12px] h-[12px] bg-[#c7b9b9] rounded-full absolute top-[2px] right-[2px]"></div>
        )}
      </div>
      <div className="pl-3">
        <h1 className="text-[18px]">{userData?.name}</h1>
        <p className="text-[16px] text-[#000c]">
          {data?.lastMessageId !== userData?._id
            ? "You: "
            : userData?.name?.split(" ")[0] + ": "}
          {data?.lastMessage}
        </p>
      </div>
    </div>
  );
};

const SellerInbox = ({
  setOpen,
  sendMessageHandler,
  newMessage,
  setNewMessage,
  messages,
  sellerId,
  userData,
  activeStatus,
}) => {
  return (
    <div className="w-full min-h-full flex flex-col justify-between">
      <div className="w-full flex items-center justify-between p-3 bg-slate-200">
        <div className="flex">
          <img
            src={`${backend_url}${userData?.avatar}`}
            className="w-[60px] h-[60px] rounded-full"
            alt=""
          />
          <div className="pl-3">
            <h3 className="text-[18px] font-[600]">{userData?.name}</h3>
            <h1>Active Now</h1>
          </div>
        </div>
        <AiOutlineArrowRight
          className="cursor-pointer"
          size={27}
          onClick={() => setOpen(false)}
        />
      </div>

      {/*Messages Sent */}
      <div className="px-3 h-[65vh] py-3 overflow-y-scroll">
        {messages &&
          messages?.map((item, index) => (
            <div
              className={`flex w-full my-2 ${
                item?.sender === sellerId ? "justify-end" : "justify-start"
              }`}
            >
              {item?.sender !== sellerId && (
                <img
                  src="http://localhost:8000/amino-1710196377538-794107883.png"
                  className="w-[40px] h-[40px] rounded-full mr-3"
                  alt=""
                />
              )}
              <div>
                <div className="w-max p-2 rounded bg-[#38c776] text-[#fff] h-min">
                  <p>{item?.text}</p>
                </div>
              </div>

              <p className="text-[12px] text-[#000]">
                {format(item?.createdAt)}
              </p>
            </div>
          ))}
      </div>

      {/*Messages Replied */}

      {/* Send Message Input*/}
      <form
        className="p-3 relative w-full flex justify-between items-center"
        onSubmit={sendMessageHandler}
      >
        <div className="w-[5%]">
          <TfiGallery className="cursor-pointer" size={20} />
        </div>
        <div className="w-[95%]">
          <input
            type="text"
            required
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Enter Your Message...."
            className={`${styles.input} p-4`}
          />
          <input type="submit" value="Send" className="hidden" id="send" />
          <label type="submit" htmlFor="send">
            <AiOutlineSend
              size={26}
              className="absolute mt-1 right-4 top-5 cursor-pointer"
            />
          </label>
        </div>
      </form>
    </div>
  );
};
