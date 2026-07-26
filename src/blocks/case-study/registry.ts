import type { Block } from "payload";

import { BulletListBlock } from "./BulletList";
import { CaseStudyImageBlock } from "./CaseStudyImage";
import { ChipListBlock } from "./ChipList";
import { CaseStudyCodeBlock } from "./Code";
import { EyebrowBlock } from "./Eyebrow";
import { Heading3Block } from "./Heading3";
import { NumberedListBlock } from "./NumberedList";
import { ParaBlock } from "./Para";
import { SignatureBlock } from "./Signature";
import { SimpleCardBlock } from "./SimpleCard";
import { StatBlock } from "./Stat";

/**
 * Leaf blocks only — no `container`. A `container` field referencing itself
 * blows Payload's config-flattening step (infinite recursion), and the
 * source content never nests a container inside a container anyway, so
 * containers are capped at one level of leaf blocks.
 */
export const leafBlocks: Block[] = [
  ParaBlock,
  NumberedListBlock,
  BulletListBlock,
  EyebrowBlock,
  Heading3Block,
  CaseStudyCodeBlock,
  CaseStudyImageBlock,
  SimpleCardBlock,
  ChipListBlock,
  StatBlock,
  SignatureBlock,
];
