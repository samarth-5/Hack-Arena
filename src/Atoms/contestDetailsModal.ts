import { atom } from "recoil";

type ContestDetailsModalState = {
    isOpen: boolean;
};

const initalContestDetailsModalState: ContestDetailsModalState = {
    isOpen: false,
};

export const contestDetailsModalState = atom<ContestDetailsModalState>({
    key: "contestDetailsModalState",
    default: initalContestDetailsModalState,
});