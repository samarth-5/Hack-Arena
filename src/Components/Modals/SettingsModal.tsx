import { BsCheckLg, BsChevronDown } from "react-icons/bs";
import { IoClose } from "react-icons/io5";
import { ISettings } from "../Workspace/Playground/Playground";
import useLocalStorage from "@/hooks/useLocalStorage";

const EDITOR_FONT_SIZES = ["12px", "13px", "14px", "15px", "16px", "17px", "18px"];

interface SettingsModalProps {
	settings: ISettings;
	setSettings: React.Dispatch<React.SetStateAction<ISettings>>;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ setSettings, settings }) => {
	const [fontSize, setFontSize] = useLocalStorage("lcc-fontSize", "16px");

	const handleClickDropdown = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.stopPropagation();
		setSettings({ ...settings, dropdownIsOpen: !settings.dropdownIsOpen });
	};

	return (
		<div className='fixed inset-0 flex items-center justify-center z-50'>
			{/* Overlay */}
			<div
				className='absolute inset-0 bg-gradient-to-b from-black to-gray-900 opacity-80'
				onClick={() => setSettings({ ...settings, settingsModalIsOpen: false })}
			></div>

			{/* Modal Content */}
			<div className='relative bg-gradient-to-b from-gray-900 to-black text-white rounded-lg shadow-lg w-[90%] max-w-[500px]'>
				{/* Header */}
				<div className='flex items-center justify-between border-b border-gray-800 px-5 py-4'>
					<h2 className='text-lg font-medium'>Settings</h2>
					<button
						className='text-gray-400 hover:text-white transition'
						onClick={() => setSettings({ ...settings, settingsModalIsOpen: false })}
					>
						<IoClose size={20} />
					</button>
				</div>

				{/* Body */}
				<div className='px-6 pt-4 pb-6'>
					<div className='flex justify-between items-start'>
						<div className='w-[60%]'>
							<h3 className='text-base font-medium'>Font size</h3>
							<p className='text-gray-400 mt-1.5'>
								Choose your preferred font size for the code editor.
							</p>
						</div>
						<div className='w-[40%]'>
							<div className='relative'>
								<button
									onClick={handleClickDropdown}
									className='flex items-center justify-between w-full rounded bg-gradient-to-b from-gray-800 to-black px-3 py-1.5 text-left hover:from-gray-700 hover:to-black text-white'
									type='button'
								>
									{fontSize}
									<BsChevronDown />
								</button>
								{/* Dropdown */}
								{settings.dropdownIsOpen && (
									<ul
										className='absolute mt-2 w-full max-h-48 overflow-auto rounded-lg bg-gradient-to-b from-black to-gray-900 shadow-lg z-10'
										style={{
											filter:
												"drop-shadow(rgba(255, 255, 255, 0.1) 0px 1px 3px) drop-shadow(rgba(255, 255, 255, 0.2) 0px 6px 16px)",
										}}
									>
										{EDITOR_FONT_SIZES.map((fontSize, idx) => (
											<SettingsListItem
												key={idx}
												fontSize={fontSize}
												selectedOption={settings.fontSize}
												handleFontSizeChange={(fontSize) => {
													setFontSize(fontSize);
													setSettings({ ...settings, fontSize: fontSize });
												}}
											/>
										))}
									</ul>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
export default SettingsModal;

interface SettingsListItemProps {
	fontSize: string;
	selectedOption: string;
	handleFontSizeChange: (fontSize: string) => void;
}

const SettingsListItem: React.FC<SettingsListItemProps> = ({
	fontSize,
	selectedOption,
	handleFontSizeChange,
}) => {
	return (
		<li
			className='relative flex h-8 cursor-pointer select-none py-1.5 pl-2 hover:bg-gradient-to-b from-gray-800 to-black rounded-lg text-white'
			onClick={() => handleFontSizeChange(fontSize)}
		>
			<div
				className={`flex h-5 flex-1 items-center pr-2 ${
					selectedOption === fontSize ? "font-medium" : "text-gray-400"
				}`}
			>
				<div className='whitespace-nowrap'>{fontSize}</div>
			</div>
			<span
				className={`flex items-center pr-2 ${
					selectedOption === fontSize ? "text-white" : "invisible"
				}`}
			>
				<BsCheckLg />
			</span>
		</li>
	);
};
