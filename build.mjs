import { $ } from "bun";

const builds = {
	windows: [
		{
			cpu: "x64",
		},
	],
	linux: [
		{
			cpu: "arm64",
		},
		{
			cpu: "x64",
		},
	],
	macos: [
		{
			cpu: "arm64",
		},
		{
			cpu: "x64",
		},
	],
};

const pkg = await Bun.file("package.json").json();

for (const os in builds) {
	for (const build of builds[os]) {
		console.log(os, build.cpu);
		await $`bun build --compile --target=bun-${os}-${build.cpu} ./index.mjs --outfile dist/${os}/${pkg.dependencies["@dgrammatiko/create-joomla-extension"]}/${build.cpu}/cje`; // v17.3.0
	}
}

const regex = new RegExp("const version = '(.+)';", "gm");
const subst = `const version = '${pkg.dependencies["@dgrammatiko/create-joomla-extension"]}';`;

const index = await Bun.file("index.html").text();
const result = index.replace(regex, subst);
await Bun.write('./index.html', result);
