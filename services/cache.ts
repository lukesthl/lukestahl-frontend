import { createHash } from "crypto";
import { promises as fs } from "fs";
import path from "path";

export class Cache<T> {
	constructor(private readonly options = { path: "./cache" }) {}

	generateHash(key: string) {
		return createHash("SHA1").update(key).digest("hex");
	}

	public async get(key: string): Promise<T | null> {
		let content: T | null = null;
		try {
			const time = Date.now();
			const fileKey = this.generateHash(key);
			const filePath = path.join(this.options.path, `${fileKey}.json`);
			const data = await fs.readFile(filePath, { encoding: "utf8" });
			content = JSON.parse(data) as T;
			console.log("time to read cache", Date.now() - time + "ms");
		} catch (error) {
			if (error instanceof Error && error.name === "ENOENT") {
				return null;
			}
		}
		return content;
	}

	public async set(key: string, value: T): Promise<void> {
		const time = Date.now();
		const fileKey = this.generateHash(key);
		const filePath = path.join(this.options.path, `${fileKey}.json`);
		await fs.mkdir(this.options.path, { recursive: true });
		await fs.writeFile(filePath, JSON.stringify(value));
		console.log("time to write cache", Date.now() - time + "ms");
	}
}
