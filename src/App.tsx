import React, { useEffect, useState } from 'react';
function App() {
	const [isOpen, setOpen] = useState(false);
	const [isSent, setSent] = useState(false);

	const [fromMain, setFromMain] = useState<string | null>(null);

	const handleToggle = () => {
		if (isOpen) {
			setOpen(false);
			setSent(false);
			setFromMain(null);
		} else {
			setOpen(true);
		}
	};
	const sendMessageToElectron = () => {
		window.Main.sendMessage("Hello I'm from React World");
		setSent(true);
	};

	useEffect(() => {
		window.Main.on('message', (fromMain: string) => {
			setFromMain(fromMain);
		});
	}, [fromMain]);

	return (
		<div className=' flex flex-col justify-center items-center h-screen bg-gray-800 space-y-4'>
			<h1 className='text-2xl text-gray-200'>
				Vite + React + Typescript + Electron + Tailwind
			</h1>
			<button
				className='bg-yellow-400 py-2 px-4 rounded focus:outline-none shadow hover:bg-yellow-200'
				onClick={handleToggle}>
				Click Me
			</button>
			{isOpen && (
				<div className='flex flex-col space-y-4 items-center'>
					<div className='flex space-x-3'>
						<h1 className='text-xl text-gray-50'>
							💝 Welcome 💝, now send a massage to the Main 📩📩
						</h1>
						<button
							onClick={sendMessageToElectron}
							className=' bg-green-400 rounded px-4 py-0 focus:outline-none hover:bg-green-300'>
							Send
						</button>
					</div>
					{isSent && (
						<div>
							<h4 className=' text-green-500'>Massage sent!!</h4>
						</div>
					)}
					{fromMain && (
						<div>
							{' '}
							<h4 className=' text-yellow-200'>{fromMain}</h4>
						</div>
					)}
				</div>
			)}
		</div>
	);
}

export default App;
