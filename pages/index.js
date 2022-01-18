import Head from "next/head";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function Home() {
  return (
    <>
      <Head>
        <title>Freebox Home Dashboard</title>
      </Head>
      <Box
        display="grid"
        gridTemplateColumns="repeat(4, 1fr)"
        gridTemplateRows="repeat(2, 1fr)"
        gap={2}
        position="absolute"
        minHeight="100%"
        maxHeight="100%"
        minWidth="100%"
        maxWidth="100%"
        overflow="scroll"
      >
        <Box gridColumn="span 1">
          <Item>xs=8</Item>
        </Box>
        <Box gridColumn="span 1">
          <Item>xs=4</Item>
        </Box>
        <Box gridColumn="span 1">
          <Item>xs=4</Item>
        </Box>
        <Box gridColumn="span 1">
          <Item>xs=8</Item>
        </Box>
        <Box gridColumn="span 1">
          <Item>xs=8</Item>
        </Box>
        <Box gridColumn="span 1">
          <Item>xs=4</Item>
        </Box>
        <Box gridColumn="span 1">
          <Item>xs=4</Item>
        </Box>
        <Box gridColumn="span 1">
          <Item>xs=8</Item>
        </Box>
      </Box>
    </>
  );
}
