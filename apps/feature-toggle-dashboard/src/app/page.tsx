import { Title } from "@mantine/core";
import { FeatureContainer, FlagList } from "~/components/features";
import { ModalProvider } from "~/components/features/modals";

export default function Home() {
  return (
    <main>
      <ModalProvider>
        <FeatureContainer>
          <Title order={1}>Feature toggles</Title>
          <FlagList />
        </FeatureContainer>
      </ModalProvider>
    </main>
  );
}
