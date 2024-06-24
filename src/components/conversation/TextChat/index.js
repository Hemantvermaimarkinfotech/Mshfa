import "./index.scss";

import React, { useEffect, useRef, useState } from "react";
import { Send } from "@material-ui/icons";
import { useIntl } from "react-intl";
import { Client } from "@twilio/conversations";
import { datadogRum } from "@datadog/browser-rum";
import { TextField } from "components/forms";
import { Message } from "components/conversation";
import { useThrottle } from "hooks/common";

const TextChat = ({
  readonly = false,
  token,
  channelName,
  userName,
  onConnected,
  doctor,
  patient,
}) => {
  const scrollableContainer = useRef(null);
  const [conversation, setConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const intl = useIntl();

  useEffect(() => {
    const onConversationJoined = (conversation) => {
      // Add patient's ID to the conversation, then sets the conversation to the updated version with the patient's ID added.
      conversation.add(patient.id).then(() => setConversation(conversation));
    };

    // Handles a found conversation
    const onConversationFound = (conversation) => {
      if (conversation.status !== "joined") {
        // joins the conversation if not joined.
        conversation
          .join()
          .then(onConversationJoined)
          .catch((err) => {
            const errorObj = { ...err };
            datadogRum.addError(errorObj, {
              tags: {
                twilio: "twilio",
              },
            });
          });
      } else {
        // Sets conversation
        setConversation(conversation);
      }
      // Add a message listener.
      conversation.on("messageAdded", handleNewMessage);
      // Then calls onConnected() function to show text chat.
      onConnected();
    };

    const onConversationNotFound = (client) => {
      /* Creates a conversation with a unique name (channelName),
         then calls the function onConversationFound.*/
      client
        .createConversation({ uniqueName: channelName })
        .then(onConversationFound)
        .catch((err) => {
          const errorObj = { ...err };
          datadogRum.addError(errorObj, {
            tags: {
              twilio: "twilio",
            },
          });
        });
    };

    if (token) {
      // Creates a new client with a given token
      const client = new Client(token);
      // sets up a listener for when the client is initialized.
      client.on("stateChanged", (state) => {
        if (state === "initialized") {
          // If initialized, it calls getConversationByUniqueName to find a conversation with a specific unique name.
          client
            .getConversationByUniqueName(channelName)
            //If the conversation is found, onConversationFound is called.
            .then((response) => {
              onConversationFound(response);
            })
            //If the conversation is not found, onConversationNotFound is called with the client object as an argument.
            .catch((err) => {
              const errorObj = { ...err };
              datadogRum.addError(errorObj, {
                tags: {
                  twilio: "twilio",
                },
              });
              onConversationNotFound(client);
            });
        }
      });
    }
  }, [token, channelName]);

  useEffect(() => {
    if (conversation) {
      // If a conversation exists, retrieves all of messages and sets the state of messages to an array of messages.
      conversation.getMessages().then((messages) => {
        setMessages(messages.items);
        if (scrollableContainer.current) {
          // If a scrollableContainer ref exists, it calls the scrollChatToBottom function on it to scroll the chat to the bottom.
          scrollChatToBottom(scrollableContainer.current);
        }
      });
      // If conversation is not defined, messages state is set to an empty array.
    } else {
      setMessages([]);
    }
  }, [conversation, scrollableContainer]);

  const isScrolledToBottom = (element) => {
    return element.scrollHeight - element.clientHeight <= element.scrollTop + 1;
  };

  const isLocalMessage = (author) => author === doctor.doctorId;

  const scrollChatToBottom = (element) => {
    element.scrollTop = element.scrollHeight - element.clientHeight;
  };

  const handleNewMessage = (message) => {
    let isOnBottom;

    if (scrollableContainer.current) {
      isOnBottom = isScrolledToBottom(scrollableContainer.current);
    }

    setMessages((currentMessages) => [...currentMessages, message]);

    // User doesn't search for something in the chat history, just waits for new messages
    if (isOnBottom && scrollableContainer.current) {
      scrollChatToBottom(scrollableContainer.current);
    }
  };

  const handleSendMessage = () => {
    const normalizedText = text.trim();
    /* Sends a message to a conversation with the given normalizedText and userId. If successful, clears the text state.
    If normalizedText is empty, the message won't be sent. */
    if (normalizedText) {
      conversation
        .sendMessage(normalizedText, { userId: userName })
        .then(() => setText(""));
        console.log('manikkkkkk',normalizedText)
    }
  };

  const renderMessages = (messages) => {
    return messages.map((message) => {
      return (
        <Message
          data={message}
          local={isLocalMessage(message.author)}
          key={message.state.sid}
          avatar={
            isLocalMessage(message.author) ? doctor?.avatar : patient?.avatar
          }
        />
      );
    });
  };

  const throttledHandleSendMessage = useThrottle(handleSendMessage, 500);

  const handleEnterPressed = (e) => {
    if (e.keyCode === 13 && !e.shiftKey) {
      e.preventDefault();
      throttledHandleSendMessage();
    }
  };

  const handleChange = (e) => setText(e.target.value);

  const fieldIsNotEmpty = (text) => !!text.trim();

  const renderFooter = () => {
    return (
      <div className="text-chat__footer">
        <TextField
          multiline
          maxRows={3}
          value={text}
          onChange={handleChange}
          onKeyDown={handleEnterPressed}
          placeholder={intl.formatMessage({ id: "words.common.type-message" })}
        />
        <Send
          className={`text-chat__icon ${
            !fieldIsNotEmpty(text) ? "text-chat__icon--disabled" : ""
          }`}
          onClick={throttledHandleSendMessage}
        />
      </div>
    );
  };

  const renderChat = (messages) => {
    return (
      <>
        <div className="text-chat__content" ref={scrollableContainer}>
          {/* If the length of the "messages" array isn't empty, it calls the
          "renderMessages" function with the "messages" array as an argument. */}
          {!!messages.length && renderMessages(messages)}
        </div>
        {!readonly && renderFooter()}
      </>
    );
  };

  return (
    <div className={"text-chat"}>{conversation && renderChat(messages)}</div>
  );
};

export default TextChat;
