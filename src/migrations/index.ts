import * as migration_20260715_160005_baseline from "./20260715_160005_baseline";

export const migrations = [
  {
    up: migration_20260715_160005_baseline.up,
    down: migration_20260715_160005_baseline.down,
    name: "20260715_160005_baseline",
  },
];
