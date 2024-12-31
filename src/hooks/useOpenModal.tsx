import {
	ReactNode,
	createContext,
	useCallback,
	useContext,
	useMemo,
	useState,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { generateUUID } from '@/utils/uuid';

interface ReturnValue {
	isModalOpen: boolean;
	openModal: () => void;
	closeModal: () => void;
}

export const useOpenModal = (): ReturnValue => {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const openModal = useCallback(() => {
		setIsModalOpen(true);
	}, []);

	const closeModal = useCallback(() => {
		setIsModalOpen(false);
	}, []);

	return { isModalOpen, openModal, closeModal };
};

// Provider

interface ModalsContext {
	modals: string[];
	addModal: (e: string) => void;
	removeModal: (e: string) => Promise<any>;
}

const ModalContext = createContext<ModalsContext>({
	modals: [],
	addModal: () => {},
	removeModal: () => Promise.resolve([]),
});
const ModalProvider = ModalContext.Provider;

interface ModalsProviderProps {
	children: ReactNode | ReactNode[];
}

export const ModalsProvider = ({ children }: ModalsProviderProps) => {
	const [modals, setModal] = useState<string[]>([]);

	const addModal = useCallback((m: string) => setModal([...modals, m]), [modals]);

	const removeModal = useCallback(
		(m: string) =>
			new Promise((resolve) => {
				setModal((newModals) => {
					const lastModal = newModals[newModals?.length - 1];
					if (m !== lastModal) return newModals;

					const filteredModals = newModals.filter((modal) => m !== modal);
					resolve(filteredModals);
					return filteredModals;
				});
			}),
		[modals, setModal],
	);

	const values = useMemo(
		() => ({
			modals,
			addModal,
			removeModal,
		}),
		[modals, addModal, removeModal],
	);

	return <ModalProvider value={values}>{children}</ModalProvider>;
};

function useModals() {
	const modals = useContext(ModalContext);
	if (!modals) {
		throw new Error('useModal hook doesnt call in the provider!');
	}

	return modals;
}
