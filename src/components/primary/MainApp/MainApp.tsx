import React, { useEffect, useState } from 'react';
import { SendIcon } from '../../../assets/icons/SendIcon/SendIcon';
import io from 'socket.io-client';
import './MainApp.scss';
// import { useHistory } from 'react-router-dom';

interface MessageType {
	id: string;
	text: string;
	from: string;
}

const socket = io('http://localhost:5000');

export const MainApp = () => {
	// const history = useHistory();
	const [messages, setMessages] = useState<MessageType[]>([]);
	const [inputText, setInputText] = useState('');

	useEffect(() => {
		socket.on('message', (data: any) => {
			setMessages((oldMessages) => {
				const newList = [...oldMessages];
				if (newList.length > 0 && newList[newList.length - 1].id === data.id) {
					return newList;
				} else {
					newList.push(data);
				}

				return newList;
			});
		});
		return () => {
			socket.removeAllListeners();
		};
	}, []);

	const onSubmit = (e: any) => {
		e.preventDefault();
		setMessages((oldMessages) => {
			const newList = [...oldMessages];
			if (inputText) {
				const message = {
					id: `${new Date()}`,
					text: inputText,
					from: ['a', 'b', 'c'][Math.floor(Math.random() * 3)],
				};
				newList.push(message);

				socket.emit('message', message);
			}

			setInputText('');
			return newList;
		});

		return false;
	};

	return (
		<div id='mainApp'>
			<div id='chatContainer'>
				{messages.map((message: MessageType) => (
					<div key={message.id} className={message.from === 'b' ? 'mine' : ''}>
						<div>
							<p>{message.from}</p>
							{message.text}
						</div>
					</div>
				))}
			</div>
			<form id='senderContainer' onSubmit={onSubmit}>
				<input
					placeholder='Type your message...'
					value={inputText}
					onChange={(e) => setInputText(e.target.value)}
				/>
				<button type='submit'>
					<SendIcon />
				</button>
			</form>
		</div>
	);
};
