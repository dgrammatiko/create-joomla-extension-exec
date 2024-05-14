import { $ } from "bun";

const pkg = await Bun.file("package.json").json();

const regex = new RegExp("const version = '(.+)';", "gm");
const subst = `const version = '${pkg.dependencies["@dgrammatiko/create-joomla-extension"]}';`;

const index = await Bun.file("index.html").text();
const result = index.replace(regex, subst);
await Bun.write("./index.html", result);

await $`rm -rf dist`;
