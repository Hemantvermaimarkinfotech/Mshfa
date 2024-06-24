import "./index.scss";

import React, { useEffect, useState } from "react";
import { AttachmentOutlined } from "@material-ui/icons";
import { datadogRum } from "@datadog/browser-rum";
import noAvatar from "assets/images/no-avatar.svg";
import { formatISOtoHumanReadable, getDaysFromNow } from "utils/date";

const Message = ({ data, local, avatar, renderLocalAuthor = false }) => {
  const [attachmentURL, setAttachmentURL] = useState("");

  useEffect(() => {
    if (data.media) {
      data.media
        .getContentTemporaryUrl()
        .then((url) => {
          setAttachmentURL(url);
        })
        .catch((error) => {
          // Handle the error here
          datadogRum.addError(error.message, {
            tags: {
              twilio: "twilio",
            },
          });
        });
    }
  }, []);

  const isAttachment = (message) => {
    return message.type === "media";
  };

  const renderAuthor = () => {
    if (local && !renderLocalAuthor) return null;
    return (
      <div className="message__author">
        <img
          className={"message__avatar"}
          src={avatar || noAvatar}
          alt="avatar"
        />
      </div>
    );
  };

  const renderTextMessage = (message) => {
    return <span className="message__text">{message.body}</span>;
  };

  const renderAttachment = (media) => {
    return (
      <a
        href={attachmentURL}
        target={"_blank"}
        download={"attachment"}
        className="message__attachment"
      >
        <AttachmentOutlined className={"message__icon"} />
        <span className={"message__filename"}>
          {media?.filename || "untitled"}
        </span>
      </a>
    );
  };

  // TODO: ADD MESSAGE TIMESTAMP (data.state.timestamp);
  return (
    <div
      className={`message ${local ? "message--local" : "message--remote"} ${
        data.media ? "message--media" : ""
      }`}
    >
      {renderAuthor()}
      <div className="message__data">
        <div className={"message__content"}>
          {isAttachment(data)
            ? renderAttachment(data)
            : renderTextMessage(data)}
        </div>
        <div className={`message__date ${local && "text-end"}`}>
          {formatISOtoHumanReadable(
            data.state.timestamp,
            getDaysFromNow(data.state.timestamp) === 0 ? "h:mm A" : undefined
          )}
        </div>
      </div>
    </div>
  );
};

export default Message;
