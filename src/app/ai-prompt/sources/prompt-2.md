Prompt: React forwardRef stability under async updates (Next.js 14, React 18, TypeScript)

Context
A Next.js 14 + React 18 + TypeScript project exhibits a regression where parent components intermittently lose the ability to control child UI during asynchronous updates (frequent re-renders). A visible symptom is that clicking the parent’s “Open Modal” no longer opens the modal component reliably.

Task
1) Perform an in-depth analysis of why parent→child control breaks during asynchronous updates. Focus on the usage of forwardRef, missing/misused useImperativeHandle, unstable refs across re-renders, and lifecycle/unmount edge cases.
2) Propose concrete fixes and tradeoffs.
3) Provide fully revised, production-ready TypeScript code for every file that requires changes. Preserve the public API of components unless a change is clearly justified.
4) Verify functional parity and that no regressions are introduced.

Environment and Constraints
- Framework: Next.js 14, React 18
- Language: TypeScript with "strict": true
- Package manager: Yarn
- Do not add UI libraries for the modal; keep existing component structure.
- Keep component names and props stable unless explicitly justified.
- Follow React best practices (no unsafe patterns, no unnecessary effects).
- Include a simple test/verification plan we can follow manually.

Deliverables (order and format)
A) Analysis (≤ 400 words):
   - Root cause(s) tied to React 18 behavior: batching, re-renders, ref stability, unmount safety.
   - Why the current forwardRef pattern fails without useImperativeHandle and stable refs.

B) Code (TypeScript):
   - Provide complete, final code blocks for each changed file.
   - Maintain stable imperative API via useImperativeHandle (e.g., openModal()).
   - Use internal stable refs (useRef) and unmount guards for async flows.
   - Ensure accessibility basics remain intact (button focus remains usable).

C) Verification steps (≤ 10 steps):
   - Steps we can run locally (yarn dev) to confirm the modal opens reliably after multiple quick async triggers and after remounts.
   - Include at least one step that demonstrates no calls happen on an unmounted child.

Success Criteria
- Parent can reliably call the child’s imperative method (e.g., openModal()) under rapid or delayed async updates.
- No state updates on unmounted components (no console warnings).
- The fix preserves prior behavior and introduces no regressions (functional parity).
- Code follows React and TypeScript standards.

Sources (use these exact names in your citations)
- Source A – Directory Structure and Files.pdf
- Source B – Forwarding Refs – React.pdf
- Source C – Hooks API Reference – React.pdf
- Source D – Rules of React – React.pdf
- Source E – TypeScript – Rules.pdf

Instructions
- Cite relevant lines/sections from Sources B–E in your analysis to justify the approach.
- In code sections, do not include ellipses; provide complete files.
- If no change is needed in a file, omit it from the code section.
