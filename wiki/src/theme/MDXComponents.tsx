import { Icon } from "@iconify/react";
import MDXComponents from "@theme-original/MDXComponents";
import React from "react";
import Table from "../components/table";

function Yes() {
  return <Icon icon="oi:check" height="33" color="green" />;
}

function No() {
  return <Icon icon="dashicons:no" height="45" color="red" />;
}

export default {
  ...MDXComponents,
  TestEZTable: Table,
  IIcon: Icon,
  Yes: Yes,
  No: No,
};
