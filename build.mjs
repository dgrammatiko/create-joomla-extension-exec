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

for (const os in builds) {
	for (const build of builds[os]) {
		console.log(os, build);
		await $`bun build --compile --target=bun-${os}-${build.cpu} ./index.mjs --outfile dist/${os}/${build.cpu}/cje`; // v17.3.0
	}
}

