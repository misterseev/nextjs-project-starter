import { mkdir, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const name = process.argv[2];
if (!name || !/^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/.test(name)) {
  console.error("Usage: pnpm feature <kebab-case-name>");
  process.exitCode = 1;
} else {
  const directory = new URL(`../src/features/${name}/`, import.meta.url);
  try {
    // Non-recursive creation deliberately refuses to overwrite an existing feature.
    await mkdir(directory);
    for (const folder of [
      "actions",
      "components",
      "hooks",
      "schemas",
      "server",
      "types",
      "utils",
      "views",
    ]) {
      const path = new URL(`${folder}/`, directory);
      await mkdir(path);
      await writeFile(new URL(".gitkeep", path), "");
    }
    await writeFile(
      new URL("index.ts", directory),
      "// Export only intentional client-safe types, components, and utilities.\nexport {};\n",
    );
    await writeFile(
      new URL("server.ts", directory),
      'import "server-only";\n\n// Export server services here; never re-export them from index.ts.\nexport {};\n',
    );
    await writeFile(
      new URL("README.md", directory),
      `# ${name}\n\nOwner: assign in your project.\n\nRoutes compose this feature through its public API. Validate inputs in schemas, keep privileged data access under server/, and authorize reads and mutations at the data boundary. Document rendering, caching, invalidation, and tests as behavior is added. Remove unused directories.\n`,
    );
    console.log(`Created ${fileURLToPath(directory)}`);
  } catch (error) {
    if (error.code === "EEXIST")
      console.error(
        `Feature "${name}" already exists; no files were overwritten.`,
      );
    else console.error("Could not create the feature:", error.message);
    process.exitCode = 1;
  }
}
