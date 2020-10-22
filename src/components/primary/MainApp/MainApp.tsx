import React, { useEffect, useState } from 'react';
import { SendIcon } from '../../../assets/icons/SendIcon';
import io from 'socket.io-client';
import { useSelector, useDispatch } from 'react-redux';
import { selectUsername } from '../../../redux/slices/userInfo';
import {
	selectMessages,
	addMessage,
	Message,
} from '../../../redux/slices/messages';
import { v4 as uuid } from 'uuid';
import './MainApp.scss';

const socket = io('http://localhost:5000');

export const MainApp = () => {
	const dispatch = useDispatch();
	const messages = useSelector(selectMessages);
	const [inputText, setInputText] = useState('');
	const username = useSelector(selectUsername);

	useEffect(() => {
		socket.on('message', (message: Message) => {
			console.log('executed');

			dispatch(addMessage(message));
		});

		return () => {
			socket.removeAllListeners();
		};
	}, [dispatch]);

	const formatMessageDate = (createdAt: string) => {
		const weekDays = ['Son', 'Mon', 'Tue', 'Wed', 'The', 'Fri', 'Sat'];
		const months = [
			'Jan',
			'Feb',
			'Mar',
			'Apr',
			'May',
			'Jun',
			'Jul',
			'Aug',
			'Sep',
			'Oct',
			'Nov',
			'Dec',
		];

		const getWeekNumber = (date: Date) => {
			const firstDayOfYear: Date = new Date(date.getFullYear(), 0, 1);
			const pastDaysOfYear: any =
				(date.getTime() - firstDayOfYear.getTime()) / 86400000;
			return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
		};
		const appendZero = (value: number) => {
			return value < 10 ? `0${value}` : value.toString();
		};

		const currentDate = new Date();
		const messageDate = new Date(createdAt);

		const currentWeekNumber = getWeekNumber(currentDate);
		const messageWeekNumber = getWeekNumber(messageDate);
		if (messageDate.getDate() === currentDate.getDate()) {
			const hours = appendZero(messageDate.getHours());
			const minutes = appendZero(messageDate.getMinutes());
			const seconds = appendZero(messageDate.getSeconds());
			return `${hours}:${minutes}:${seconds}`; // 15:22:50
		} else if (currentWeekNumber === messageWeekNumber) {
			const weekDay = weekDays[messageDate.getDay()];
			const month = months[messageDate.getMonth()];
			return `${weekDay} ${month} ${messageDate.getDate()}`; // Mon 21 Oct
		} else {
			const month = months[messageDate.getMonth()];
			return `${messageDate.getDate()} ${month} ${messageDate.getFullYear()}`; // Oct 21 2020
		}
	};

	const onSubmit = (e: any) => {
		e.preventDefault();

		if (inputText) {
			const message: Message = {
				id: uuid(),
				text: inputText,
				from: username,
				date: `${new Date()}`,
			};
			dispatch(addMessage(message));

			socket.emit('message', message);

			setInputText('');
		}

		return false;
	};

	const isMine = (message: Message) => message.from === username;

	return (
		<div id='mainApp'>
			<div id='chatContainer'>
				{messages.map((message: Message) => (
					<div
						id='message'
						key={message.id}
						className={isMine(message) ? 'mine' : ''}
					>
						{isMine(message) && <p>{formatMessageDate(message.date)}</p>}
						<div>
							<p>{message.from}</p>
							{message.text}
						</div>
						{!isMine(message) && <p>{formatMessageDate(message.date)}</p>}
					</div>
				))}
			</div>
			<form id='senderContainer' name='form' onSubmit={onSubmit}>
				<input
					placeholder='Type your message...'
					value={inputText}
					onChange={(e) => setInputText(e.target.value)}
					autoFocus
				/>
				<button type='submit'>
					<SendIcon />
				</button>
			</form>
		</div>
	);
};
