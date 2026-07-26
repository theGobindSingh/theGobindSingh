import type { Block } from "payload";

import { ContainerBlock } from "./Container";
import { leafBlocks } from "./registry";

export const caseStudyBlocks: Block[] = [...leafBlocks, ContainerBlock];
