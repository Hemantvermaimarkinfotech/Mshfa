import './index.scss';

import React, { useRef } from "react";
import { BoxLoader } from "components/layout";
import { Message } from "components/conversation";


const ChatHistory = ({ doctor, patient, messages, isLoading }) => {

    const scrollableContainer = useRef(null);

    const isLocalMessage = (author) =>  author.indexOf('mobile-user') === -1;

    const renderMessages = (messages) => {
        return messages.map((message) => {
            return <Message
                data={message}
                local={isLocalMessage(message.author)}
                key={message.state.sid}
                avatar={isLocalMessage(message.author) ? doctor?.avatar : patient?.avatar}
                renderLocalAuthor={true}
            />
        })
    }

    const renderChat = (messages) => {
        return (
            <>
                <div className="chat-history__content" ref={scrollableContainer}>
                    {!!messages.length && renderMessages(messages)}
                </div>
            </>
        )
    }

    return (
        <div className={'chat-history'}>
            {isLoading ? <div className={'chat-history__loader'}>
                    <BoxLoader />
                <div className="chat-history__loader-text">Connecting</div>
            </div> :
                (
                    messages.length ? renderChat(messages) :
                        <div className={'chat-history__loader'}>
                            <div className="chat-history__loader-text">There are no messages</div>
                        </div>
                )
            }
        </div>
    )

}

export default ChatHistory;