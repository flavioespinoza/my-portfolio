**Criterion 1**
- Criterion description: Diagnoses how the reference is disrupted or can be set to a value of null during asynchronous updates because of render timing issues.
- Source/s: Source A (React Docs – forwardRef and useRef)
- Justification/Rationale: If the AI model can identify that the primary cause of the reference’s instability during asynchronous re-renders, it demonstrates an expert-level understanding of React’s reconciliation and lifecycle processes.
- Weight: Primary Objective
- Criterion type: Analysis
- Dependencies: None
**Criterion 2**
- Criterion description: Explains that if useImperativeHandle is used the wrong way or is missing, the parent component has a hard time talking to or controlling the child component.
- Source/s: Source A, Source B
- Justification/Rationale: Recognizing that a missing imperative handle is why the reference can't share methods demonstrates that the model understands how React handles communication between parent and child components.
- Weight: Primary Objective
- Criterion type: Analysis
- Dependencies: Criterion 1
**Criterion 3**
- Criterion description: Demonstrates how to correctly use useImperativeHandle inside forwardRef so that the parent component can safely call the openModal method of the child.
- Source/s: Source B
- Justification/Rationale: It shows the AI model understands React’s pattern for imperative control—directly telling a component what to do—and encapsulated interactions, where a component keeps its private methods secure and only shares the ones that should be used.
- Weight: Primary Objective
- Criterion type: Implementation
- Dependencies: Criterion 2
**Criterion 4**
- Criterion description: Uses a reference that is internal and stays the same which keeps access to the DOM when a component updates.
- Source/s: Source B
- Justification/Rationale: If the AI model uses a ref such as internalButtonRef shown in Source B to stay connected to a DOM element during re-renders, it shows the AI model understands how React maintains a reliable reference during component updates.
- Weight: Primary Objective
- Criterion type: Implementation
- Dependencies: Criterion 3
**Criterion 5**
- Criterion description: Demonstrates that the AI model understands that during a re-render, React only updates the parts of the DOM that have changed from the initial render. It also shows that the model recognizes the need for stable references during asynchronous re-renders, reflecting an understanding of React’s commit phase and fiber updates.
- Source/s: Source A, Source C
- Justification/Rationale: It shows an expert-level comprehension of how asynchronous functionality affects rendering and reference stability.
- Weight: Primary Objective
- Criterion type: Analysis
- Dependencies: Criterion 1
**Criterion 6**
- Criterion description: Emphasizes the importance of effective state management during asynchronous updates to keep component behavior predictable and safe.
- Source/s: Source B (Modal.tsx)
- Justification/Rationale: It demonstrates that the AI model understands how React updates state at different times and why correctly implemented state management fosters component stability and expected behavior.
- Weight: Primary Objective
- Criterion type: Analysis
- Dependencies: Criterion 5
**Criterion 7**
- Criterion description: Ensures the child component’s openModal method runs properly even with frequent asynchronous updates.
- Source/s: Source B (Modal.tsx), Source C (React Docs – Batching and State Updates)
- Justification/Rationale: Tests whether the AI model considers race conditions or state batching, and that React does not execute each state update immediately, so functionality relying on immediate updates can fail when batching.
- Weight: Primary Objective
- Criterion type: Implementation
- Dependencies: Criterion 6
**Criterion 8**
- Criterion description: Verifies that the child component's openModal method is exposed correctly and can only be called by the parent component when the child component is mounted.
- Source/s: Source B (Modal.tsx), Source D (React Docs – Component Lifecycle and Cleanup)
- Justification/Rationale: Stopping calls to unmounted child component methods demonstrates understanding of React’s lifecycle and cleanup methods.
- Weight: Not Primary Objective
- Criterion type: Implementation
- Dependencies: Criterion 7
**Criterion 9**
- Criterion description: Verifies that the refactored component works the way it is supposed to after the fix, and that no other functionality is changed.
- Source/s: Source B (Modal.tsx), Source E (React Testing Library Docs – Regression Testing)
- Justification/Rationale: Confirms the fix causes no new bugs and verifies expected code behavior.
- Weight: Not Primary Objective
- Criterion type: Integration
- Dependencies: Criterion 8
**Criterion 10**
- Criterion description: Verifies that the AI model delivers production-ready TypeScript code that follows React’s best practices and standard patterns.
- Source/s: Source F (React Docs – Code Style and Best Practices), Source G (TypeScript Handbook – Code Quality Guidelines)
- Justification/Rationale: Demonstrates that the AI model can produce clean, readable, and maintainable TypeScript code aligned with React standards, showing readiness for real-world deployment.
- Weight: Not Primary Objective
- Criterion type: Style and Convention
- Dependencies: Criteria: 1, 2, 3, 4, 5, 6, 7, 8, 9
