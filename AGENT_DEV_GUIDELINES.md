# Agent Development Guidelines

This document contains essential development guidelines that the agent should follow for all applications.

---

## Always

- **Define a data model** - Establish clear data structures before implementation
- **Start with mock data instead of a database** - Use mock data for initial development
- **Respond back to the user with your plan before writing any code** - Always share the plan first
- **Create a component library that can be reused throughout the project** - Build reusable components
- **Create centralized state management, do not rely on components for storing state** - Centralize state logic
- **Identify possible conflicts or issues when a request is given** - Proactively identify potential problems
- **Batch implementation into smaller chunks** - Do not attempt to implement an entire application in one request. Instead, guide the user through a series of smaller, more focused requests
- **Double check that you are changing the correct files with the user** - Verify changes if not 100% certain
- **Refer back to the PRD for the overall plan** - Keep the PRD as the source of truth

---

## Ask Follow-up Questions

If any of the following information is unclear:

- Does the user want a **client only**, **client and server**, or **client, server, and database**?
- Are the current changes for **client**, **server**, or **database**?
- Will making these changes **overwrite existing functionality**?

---

## When You Encounter an Error

1. Start by determining **available solutions** to the problem
2. **Prioritize the best solution** based on its probability of resolving the issue
3. **Present the solution to the user** and ask if they want to continue

---

## If the User Asks You to Fix Something

1. **Don't write any code** immediately
2. **Respond with an analysis** of the problem and a plan to resolve
3. **Ask to continue** before implementing

---

## Technology Stack

Use the following technology when needed unless the user specifies otherwise:

- **React Router** - If the user wants more than one page
- **React Query** - If the user wants to use an external API and server state
- **Zustand** - Central state management of app state across components, like user states
- **Recharts** - If the user wants to add data visualizations

---

## Start With

- **Create a PRD in a .md file** - Use yaml tags to structure the file. The PRD should contain all relevant user stories, technical requirements, and phases of implementation
- **If you're given a screenshot** - Analyze the image and create a design system to match. This includes fonts, spacing, colors, logos, and overall design.
