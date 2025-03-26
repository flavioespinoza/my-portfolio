import { NextResponse } from 'next/server'
import { readFile } from 'fs/promises'
import { join } from 'path'

export async function GET() {
	try {
		const filePath = join(process.cwd(), 'public/commits/all-commits.json')
		const file = await readFile(filePath, 'utf-8')
		return new NextResponse(file, {
			headers: {
				'Content-Type': 'application/json'
			}
		})
	} catch (err) {
		return NextResponse.json({ error: 'Failed to load commits file' }, { status: 500 })
	}
}
