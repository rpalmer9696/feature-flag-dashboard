"use client";

import { Button, Modal, TextInput } from "@mantine/core";
import { useFlagListContext } from "../flag-list/context";
import { useModalContext } from "./context";
import { useEffect } from "react";

export const UpdateFlagModal = () => {
  const { updateFlagForm, onUpdateFlagFormSubmit } = useFlagListContext();
  const { isUpdateModalOpen, closeUpdateModal } = useModalContext();

  useEffect(() => {
    if (isUpdateModalOpen) {
      updateFlagForm.setFieldValue("name", "");
    }
  }, [isUpdateModalOpen, updateFlagForm]);

  return (
    <Modal
      opened={isUpdateModalOpen}
      onClose={closeUpdateModal}
      title="Update Flag"
    >
      <form onSubmit={updateFlagForm.onSubmit(onUpdateFlagFormSubmit)}>
        <TextInput
          label="Flag Name"
          {...updateFlagForm.getInputProps("name")}
        />

        <Button
          style={{ marginTop: "12px" }}
          type="submit"
          onClick={closeUpdateModal}
        >
          Update
        </Button>
      </form>
    </Modal>
  );
};
