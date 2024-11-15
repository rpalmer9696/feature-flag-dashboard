"use client";

import { useDisclosure } from "@mantine/hooks";
import { PropsWithChildren } from "react";
import { ModalContextProvider } from "./context";

interface ModalProviderProps extends PropsWithChildren {}

export const ModalProvider = ({ children }: ModalProviderProps) => {
  const [isAddModalOpen, { open: openAddModal, close: closeAddModal }] =
    useDisclosure(false);

  const [
    isDeleteModalOpen,
    { open: openDeleteModal, close: closeDeleteModal },
  ] = useDisclosure(false);

  const [
    isUpdateModalOpen,
    { open: openUpdateModal, close: closeUpdateModal },
  ] = useDisclosure(false);

  return (
    <ModalContextProvider
      value={{
        closeAddModal,
        closeDeleteModal,
        closeUpdateModal,
        isAddModalOpen,
        isDeleteModalOpen,
        isUpdateModalOpen,
        openAddModal,
        openDeleteModal,
        openUpdateModal,
      }}
    >
      {children}
    </ModalContextProvider>
  );
};
