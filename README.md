# Samaelismo App

A modern React TypeScript application for the Samaelite community, featuring liturgical calendar, sacred texts, and AI-powered assistance.

## Features

- 🗓️ **Liturgical Calendar**: Interactive calendar with Samaelite festivities
- 📖 **Sacred Texts**: Access to Liber Spirae with all six Spiras
- 🤖 **AI Assistant**: Intelligent assistant for questions about festivities and doctrine
- 🔐 **Authentication**: User authentication with role-based access control
- 📱 **Responsive Design**: Mobile-friendly interface with Material-UI components
- 🌐 **PWA Support**: Progressive Web App capabilities

## Technologies

- **Frontend**: React 19, TypeScript, Material-UI
- **State Management**: Apollo Client for GraphQL
- **Routing**: React Router v7
- **Styling**: Tailwind CSS + Material-UI
- **Testing**: Vitest + React Testing Library
- **Build Tool**: Vite

## Development

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
npm install
```

### Available Scripts

```bash
# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run tests
npm run test

# Run tests once
npm run test:run

# Run tests with UI
npm run test:ui

# Run coverage analysis
npm run coverage

# Run coverage with UI
npm run coverage:ui

# Lint code
npm run lint
```

## Testing & Coverage

This project uses Vitest for testing with comprehensive coverage analysis.

### Running Tests

```bash
# Run tests in watch mode
npm run test

# Run tests once
npm run test:run

# Run with coverage
npm run coverage
```

### Coverage Configuration

- **Minimum Coverage**: 80% (branches, functions, lines, statements)
- **Reports**: Text, JSON, HTML
- **Excluded Files**: Test files, config files, build artifacts

### Coverage Thresholds

```typescript
thresholds: {
  global: {
    branches: 80,
    functions: 80,
    lines: 80,
    statements: 80
  }
}
```

## Project Structure

```
src/
├── components/          # React components
│   ├── layout/         # Layout components
│   ├── pages/          # Page components
│   └── *.tsx           # Individual components
├── contexts/           # React contexts
├── data/               # Data layer
│   ├── liturgical-calendar.ts
│   ├── sacred-texts.ts
│   └── utils.ts
├── constants/          # App constants
└── test/               # Test utilities
```

## API Integration

The app integrates with a GraphQL API for:
- User authentication
- Notice board functionality
- User profiles and diary entries

## Deployment

The application is configured for deployment on Vercel with:
- Automatic deployments from main branch
- Environment-specific configurations
- PWA service worker setup

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Ensure coverage thresholds are met
6. Submit a pull request

## License

This project is proprietary software for the Samaelite community.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
