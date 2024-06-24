import { gql } from "@apollo/client";

class ConversationAPI {
  getTwilioToken() {
    return gql`
      mutation GetTwilioConversationVideoTokenMutation($input: GetTwilioConversationVideoTokenInput!) {
        getTwilioConversationVideoToken(input: $input) {
          tokenOfChat
          tokenOfVideo
        }
      }
    `;
  }
}

export default new ConversationAPI();
