"use client";

import { Button, Modal, TextInput } from "@mantine/core";
import { useFlagListContext } from "../flag-list/context";
import { useForm } from "@mantine/form";
import { useModalContext } from "./context";
import { useEffect } from "react";

export const AddFlagModal = () => {
  const { createFlag } = useFlagListContext();
  const { isAddModalOpen, closeAddModal } = useModalContext();

  const form = useForm({ initialValues: { name: "" } });

  useEffect(() => {
    if (isAddModalOpen) {
      form.setFieldValue("name", "");
    }
  }, [isAddModalOpen, form]);

  return (
    <Modal opened={isAddModalOpen} onClose={closeAddModal} title="Add Flag">
      <form
        onSubmit={form.onSubmit((values) =>
          createFlag(values.name.toLocaleLowerCase())
        )}
      >
        <TextInput label="Flag Name" {...form.getInputProps("name")} />

        <Button
          style={{ marginTop: "12px" }}
          type="submit"
          onClick={closeAddModal}
        >
          Add Flag
        </Button>
      </form>
    </Modal>
  );
};
