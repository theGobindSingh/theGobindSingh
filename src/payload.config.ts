import { postgresAdapter } from "@payloadcms/db-postgres";
import { resendAdapter } from "@payloadcms/email-resend";
import { mcpPlugin } from "@payloadcms/plugin-mcp";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "path";
import { buildConfig } from "payload";
import sharp from "sharp";
import { fileURLToPath } from "url";
import { Blogs } from "./collections/Blogs";
import { CaseStudies } from "./collections/CaseStudies";
import { Experience } from "./collections/Experience";
import { Media } from "./collections/Media";
import { Users } from "./collections/Users";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  email: resendAdapter({
    defaultFromAddress: "thesinghgobind@gmail.com",
    defaultFromName: "Gobind Singh",
    apiKey: process.env.RESEND_API_KEY ?? "",
  }),
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Blogs, CaseStudies, Experience],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET ?? "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: postgresAdapter({
    push: false,
    pool: {
      connectionString: process.env.DATABASE_URL ?? "",
    },
  }),
  sharp,
  plugins: [
    mcpPlugin({
      collections: {
        blogs: {
          enabled: true,
        },
        "case-studies": {
          enabled: true,
        },
        experience: {
          enabled: true,
        },
        media: {
          enabled: true,
        },
      },
    }),
  ],
});
