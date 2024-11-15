import { Container } from "@mantine/core";
import styles from "./container.module.scss";

export const FeatureContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <Container className={styles.container}>{children}</Container>;
};
