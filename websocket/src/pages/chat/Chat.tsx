import { styled } from 'styled-components';

export default function Chat() {
    return (
        <>
            <ChattingContainer>
                <MessageList>
                    <Message></Message>
                    <Message></Message>
                </MessageList>
                <ChattingForm>
                    <ChattingInput />
                    <ChattingSendBtn>Send</ChattingSendBtn>
                </ChattingForm>
            </ChattingContainer>
        </>
    );
}

const ChattingContainer = styled.div`
    position: relative;
    margin: auto;
    /* width: 40rem; */
    height: 100vh;
    background-color: #ffeded;
`;

const ChattingForm = styled.form`
    position: absolute;
    bottom: 0;
    display: flex;
    gap: 0.3rem;
    width: 100%;
    padding: 0.5rem;
    box-sizing: border-box;
    background-color: #ff7878;
`;

const ChattingInput = styled.input`
    padding: 0.5rem;
    border: none;
    border-radius: 5px;
    flex-grow: 1;
    &:focus {
        outline: none;
    }
`;

const ChattingSendBtn = styled.button`
    background-color: #f8d5d5;
    padding: 0.5rem;
    border: none;
    border-radius: 5px;
    cursor: pointer;
`;

const MessageList = styled.ul`
    list-style: none;
    /* background-color: #ffffff; */
    margin: 0;
    padding: 0;
`;

const Message = styled.li`
    padding: 1rem;
    background-color: #cebaf1;
    &:nth-child(odd) {
        background: #c29de8;
    }
`;
