import { useMutation } from "@apollo/client";

import { ConversationAPI } from "api";

export const useConversation = () => {
  const [getTwilioToken, { data }] = useMutation(
    ConversationAPI.getTwilioToken()
  );
  // Function takes a "room" (id) and returns a token from the Twilio API.
  const getToken = (room) => {
    // uses getTwilioToken() method to make a request to the API, passing in the "room" parameter as an input.
    return getTwilioToken({
      variables: {
        input: { appointmentId: room },
      },
      // The response from the API is then parsed to return the token.
    }).then((response) => ({
      tokenOfVideo: response.data.getTwilioConversationVideoToken.tokenOfVideo,
      tokenOfChat: response.data.getTwilioConversationVideoToken.tokenOfChat,
    }));
  };
  // Return an object that includes getToken and the token values from the data object.
  return {
    getToken,
    tokenOfVideo: data?.getTwilioConversationVideoToken?.tokenOfVideo,
    tokenOfChat: data?.getTwilioConversationVideoToken?.tokenOfChat,
  };
};
