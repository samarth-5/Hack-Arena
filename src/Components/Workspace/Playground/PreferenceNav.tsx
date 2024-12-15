import React, { useEffect, useState } from 'react'
import { AiOutlineFullscreen, AiOutlineFullscreenExit, AiOutlineSetting } from 'react-icons/ai'
import { ISettings } from './Playground';
import SettingsModal from '@/Components/Modals/SettingsModal';

type Props = {
	settings: ISettings;
	setSettings: React.Dispatch<React.SetStateAction<ISettings>>;
}

export default function PreferenceNav({setSettings, settings}: Props) {

  const [isFullScreen, setIsFullScreen] = useState(false);

  const handleFullScreen = () => {
	if (isFullScreen) {
		document.exitFullscreen();
	} else {
		document.documentElement.requestFullscreen();
	}
	setIsFullScreen(!isFullScreen);
  };

  useEffect(() => {
	function exitHandler(e: any) {
		if (!document.fullscreenElement) {
			setIsFullScreen(false);
			return;
		}
		setIsFullScreen(true);
	}

	if (document.addEventListener) {
		document.addEventListener("fullscreenchange", exitHandler);
		document.addEventListener("webkitfullscreenchange", exitHandler);
		document.addEventListener("mozfullscreenchange", exitHandler);
		document.addEventListener("MSFullscreenChange", exitHandler);
	} 
  }, [isFullScreen]);

  return (
    <div className='flex items-center justify-between bg-dark-layer-2 h-11 w-full'>
        <div className='flex items-center justify-between bg-dark-layer-2 h-11 w-full'>
			<div className='flex items-center'>
				<button className='flex cursor-pointer items-center rounded-full focus:outline-none bg-white text-black hover:bg-gray-300  px-2 py-1.5 font-medium'>
					<div className='flex items-center px-1'>
						<div className='text-xs text-label-2 text-black'>JavaScript</div>
					</div>
				</button>
			</div>
        </div>

        <div className='flex items-center m-2'>
				<button className='preferenceBtn group' onClick={() => setSettings({ ...settings, settingsModalIsOpen: true })}>
					<div className='h-4 w-4 text-white font-bold text-lg'>
						<AiOutlineSetting />
					</div>
					<div className='preferenceBtn-tooltip'>
						Settings
					</div>
				</button>

				<button className='preferenceBtn group' onClick={handleFullScreen}>
					<div className='h-4 w-4 text-white font-bold text-lg'>
						{!isFullScreen ? <AiOutlineFullscreen /> : <AiOutlineFullscreenExit />}
					</div>
					<div className='preferenceBtn-tooltip'>Full Screen</div>
				</button>
			</div>
		{settings.settingsModalIsOpen && <SettingsModal settings={settings} setSettings={setSettings} />}
    </div>
  )
}