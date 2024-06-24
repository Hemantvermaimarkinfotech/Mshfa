import { useEffect, useState } from "react";
import { Client } from "@twilio/conversations";

import { useConversation } from "hooks/conversation";

export const useChat = (appointmentId, doctorId, patientId) => {
  const { getToken } = useConversation();

  const [isLoading, setLoading] = useState(true);
  const [token, setToken] = useState(null);
  const [conversation, setConversation] = useState(null);

  const [messages, setMessages] = useState([]);

  const handleNewMessage = (message) => {
    setMessages((currentMessages) => [...currentMessages, message]);
  };

  useEffect(() => {
    if (appointmentId && doctorId) {
      getToken(appointmentId).then((e) => setToken(e?.tokenOfChat));
    }
  }, [appointmentId, doctorId]);

  useEffect(() => {
    const onConversationJoined = (conversation) => {
      conversation.add(patientId).then(() => setConversation(conversation));
    };

    const onConversationFound = (conversation) => {
      if (conversation.status !== "joined") {
        conversation.join().then(onConversationJoined);
      } else {
        setConversation(conversation);
      }
      conversation.on("messageAdded", handleNewMessage);
      setLoading(false);
    };

    const onConversationNotFound = (client) => {
      client
        .createConversation({ uniqueName: appointmentId })
        .then(onConversationFound);
    };

    if (token?.tokenOfChat) {
      const client = new Client(token?.tokenOfChat);
      client.on("stateChanged", (state) => {
        if (state === "initialized") {
          client
            .getConversationByUniqueName(appointmentId)
            .then(onConversationFound)
            .catch(() => onConversationNotFound(client));
        }
      });
    }
  }, [token, appointmentId]);

  useEffect(() => {
    if (conversation) {
      conversation.getMessages().then(({ items }) => {
        setMessages(items);
      });
    } else {
      setMessages([]);
    }
  }, [conversation]);

  return {
    messages,
    isLoading,
    token,
  };
};
