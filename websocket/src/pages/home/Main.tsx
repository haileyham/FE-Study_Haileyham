import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';

export default function Main() {
    const navigate = useNavigate();
    return (
        <>
            <ChatPageBtn
                onClick={() => {
                    navigate('/chat');
                }}
            >
                채팅하기
            </ChatPageBtn>
        </>
    );
}

const ChatPageBtn = styled.button`
    width: 20rem;
    padding: 1rem;
    border-radius: 5px;
    border: none;
    font-size: 1.2rem;
    font-weight: 900;
    color: #a724fe;
    background-color: #eedcfa;
    cursor: pointer;
    &:hover {
        background-color: #c1b3ff;
    }
`;
