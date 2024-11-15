"use client";

import { createSafeContext } from "@mantine/core";

interface ModalContextValue {
  closeAddModal: () => void;
  closeDeleteModal: () => void;
  closeUpdateModal: () => void;
  isAddModalOpen: boolean;
  isDeleteModalOpen: boolean;
  isUpdateModalOpen: boolean;
  openAddModal: () => void;
  openDeleteModal: () => void;
  openUpdateModal: () => void;
}

export const [ModalContextProvider, useModalContext] =
  createSafeContext<ModalContextValue>(
    "ModalContext must be used within a ModalContextProvider"
  );
