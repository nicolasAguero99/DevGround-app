<p align="center">
  <img src="./devground-logo-banner.svg" alt="DevGround logo" width="1200" />
</p>


# DevGround

**DevGround** is a desktop application for experimenting with HTML, CSS, and JavaScript in real time. Built for learning, prototyping, or trying out ideas without running a server: everything runs on your machine with a comfortable, configurable interface.

## Features

- **Two working modes**
  - **Playground**: Edit HTML, CSS, and JavaScript with live preview. Ideal for mockups and full pages.
  - **Sandbox**: JavaScript only with integrated console. Useful for testing logic, algorithms, or exercises without touching HTML/CSS.

- **Code editor**
  - Based on [Monaco Editor](https://microsoft.github.io/monaco-editor/) (same engine as VS Code).
  - Syntax highlighting and support for HTML, CSS, and JS.
  - Emmet for HTML/CSS.

- **Live preview**
  - In Playground, the preview updates according to the content in the panels.
  - In Sandbox, output is shown in the console (logs, errors, etc.).

- **Configurable layouts**
  - Panel layout: 2×2, horizontal, or vertical.
  - Panels can be reorganized according to the chosen layout.

- **Themes and configuration**
  - Editor themes and UI options in a configuration modal.
  - Preference persistence (Tauri Store).

- **Desktop application**
  - Built with [Tauri](https://tauri.app/): lightweight binaries, Rust on the backend, and web tech on the frontend.

## Tech stack

| Area | Stack |
|------|--------|
| **Desktop** | [Tauri 2](https://tauri.app/) |
| **Frontend** | React 19, TypeScript, Vite 7 |
| **Styling** | Tailwind CSS 4 |
| **State** | Zustand |
| **Editor** | Monaco Editor (`@monaco-editor/react`) |
| **Animations** | Motion (formerly Framer Motion) |
| **Backend (Rust)** | Plugins: store, dialog, fs, opener |

## Requirements

- [Bun](https://bun.sh/) (or Node.js if you prefer `npm`/`pnpm`)
- [Rust](https://www.rust-lang.org/tools/install) (to build the Tauri backend)
- System dependencies for Tauri: [official guide](https://tauri.app/develop/getting-started/prerequisites)

## Installation

```bash
# Clone the repository
git clone https://github.com/your-username/devground.git
cd devground

# Install frontend dependencies
bun install
```

Or with npm:

```bash
npm install
```

## Development

Run the app in development mode (Vite frontend + Tauri window):

```bash
bun run tauri dev
```

With npm:

```bash
npm run tauri dev
```

The frontend is served at `http://localhost:1420` and the Tauri window opens automatically.

## Testing

Tests use [Vitest](https://vitest.dev/) and [Testing Library](https://testing-library.com/). The Tauri store is mocked in `src/test/setup.ts` so tests run without the Tauri runtime.

```bash
bun run test        # watch mode
bun run test:run    # single run
```

Covered areas: document generation (Playground/Sandbox), debounce, custom theme utils, layout and editors stores, constants, and the choose-mode screen.

## Production build

Build the executable and installers:

```bash
bun run tauri build
```

Artifacts are in `src-tauri/target/release/` (and in `bundle/` depending on the platform).

## Project structure

```
├── src/                    # Frontend (React + Vite)
│   ├── api/                # Backend calls (e.g. AI suggestions)
│   ├── assets/             # Images, icons, logos
│   ├── components/         # React components
│   │   ├── choose-mode/    # Playground vs Sandbox choice screen
│   │   ├── code-editor/    # Monaco editor per technology
│   │   ├── console-preview/# Console and preview
│   │   ├── main-aside/     # Sidebar (layouts, config)
│   │   ├── main-config-modal/ # Configuration and themes modal
│   │   └── main-screen/    # Playground, Sandbox, loader
│   ├── constants/          # Constants, default config, themes
│   ├── context/            # React Context (e.g. main screen)
│   ├── hooks/              # Custom hooks
│   ├── store/              # Global state (Zustand): editors, layout, themes
│   ├── types/              # TypeScript types
│   └── utils/              # Utilities (editor themes, commands, logic)
├── src-tauri/              # Tauri backend (Rust)
│   └── src/
│       ├── lib.rs          # Commands and app configuration
│       └── main.rs         # Entry point
├── index.html
├── package.json
├── vite.config.ts
└── tsconfig.json
```

## Contributing

Contributions are welcome. For larger changes, open an *issue* first to discuss. Typical steps:

1. Fork the repository.
2. Create a branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -m 'Add X'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a Pull Request.

Make sure the project still builds (`bun run build` and `bun run tauri build`). See [CONTRIBUTING.md](CONTRIBUTING.md) for details.

## Reporting bugs

If you find a bug or have a suggestion, open an [issue](https://github.com/nicolasAguero99/DevGround-app/issues) in the repository.

## License

This project is open source under the MIT License. See [LICENSE](LICENSE) for details. For trademark and branding, see [TRADEMARK.md](TRADEMARK.md).
