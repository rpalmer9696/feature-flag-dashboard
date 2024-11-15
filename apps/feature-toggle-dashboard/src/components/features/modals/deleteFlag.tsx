import { Button, Modal, TextInput } from "@mantine/core";
import { useFlagListContext } from "../flag-list/context";
import { useForm } from "@mantine/form";
import { FlagType } from "../types";
import { useModalContext } from "./context";

interface DeleteFlagModalProps {
  uuid: string;
}

export const DeleteFlagModal = ({ uuid }: DeleteFlagModalProps) => {
  const { deleteFlag } = useFlagListContext();
  const { isDeleteModalOpen, closeDeleteModal } = useModalContext();

  return (
    <Modal
      opened={isDeleteModalOpen}
      onClose={closeDeleteModal}
      title="Delete Flag"
    >
      <p style={{ textAlign: "center", padding: "12px" }}>
        Are you sure you want to delete this flag? This action cannot be undone.
      </p>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "12px",
        }}
      >
        <Button onClick={closeDeleteModal}>Cancel</Button>
        <Button
          color="red"
          onClick={() => {
            deleteFlag(uuid);
            closeDeleteModal();
          }}
        >
          Delete Flag
        </Button>
      </div>
    </Modal>
  );
};
