import React, { useEffect, useState } from 'react';
import { SendIcon } from '../../../assets/icons/SendIcon';
import io from 'socket.io-client';
import { useSelector } from 'react-redux';
import { selectUsername } from '../../../redux/slices/userInfo';
import './MainApp.scss';

interface MessageType {
	id: string;
	text: string;
	from: string;
}

const socket = io('http://localhost:5000');

export const MainApp = () => {
	const [messages, setMessages] = useState<MessageType[]>([]);
	const [inputText, setInputText] = useState('');
	const username = useSelector(selectUsername);

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
					from: username,
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
					<div
						key={message.id}
						className={message.from === username ? 'mine' : ''}
					>
						<p>{message.id}</p>
						<div>
							<p>{message.from}</p>
							{message.text}
						</div>
						<p>{message.id}</p>
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
