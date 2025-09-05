import { createClient } from "@sanity/client";

export const client = createClient({
  projectId: "5nahy5tc",
  dataset: "production",
  apiVersion: "2023-01-01", // use today's date
  useCdn: true, // `false` if you want fresh data always
});
